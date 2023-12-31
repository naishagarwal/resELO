const firebase = require('firebase/app')
const auth = require('firebase/auth')
const analytics = require('firebase/analytics')
const admin = require('firebase-admin')

const express = require('express')
const app = express()
const port = 4000
const path = require('path');
var fs = require('fs');
const Resume_Database = require('./resume_database.js');
const User_Database = require('./user_database.js')
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(__dirname + '/database/sqlite.db');
let resume_db = new Resume_Database(db);
let user_db = new User_Database(db);
const {get_multer_object} = require('./upload_pdf.js');
const upload_pdf = get_multer_object(resume_db)
resume_db.populate_database();
resume_db.get_resumes("test")

const serviceAccount = require('./service_account.json')

admin.initializeApp({ //initializing database
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://reselo-default-rtdb.firebaseio.com/"
})

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const analytics = getAnalytics(app);


const { getDatabase} = require('firebase-admin/database') //getDatabase automatically calls the realDatabase without needing to specify a specific link
const database = getDatabase() //initializing firebase database


function checkUserClubAcess(req, res, next) {
  let club_name = "";
  if (req.method == "GET") {
    club_name = req.originalUrl.split('/')[2];
  } else if(req.method == "POST") {
    club_name = req.body.club_name;
  } else {
    res.status(400).json({ message: 'Invalid request' });
    return;
  }
  if (!req.headers.authorization) {
    console.log("No credentials");
    res.status(401).json({ message: 'Credentials needed' });
    return;
  }
  admin.auth().verifyIdToken(req.headers.authorization).then((decodedToken) => {
    user_db.check_user_acess_to_club(decodedToken.uid, club_name).then((result) => {
      // console.log("DOES USER HAVE ACCESS TO THIS CLUB: " + result)
      // console.log("CLUB NAME: " + club_name);
      // console.log("USER ID: " + decodedToken.uid);
      // user_db.get_clubs(decodedToken.uid).then((clubs) => {
      //   console.log("USER HAS ACCESS TO THIS CLUB");
      //   console.log(clubs);
      // });
      if (result) {
        console.log("REQUEST PASSED CREDENTIALS CHECK")
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    }).catch((err) => {
      console.log("USER DOES NOT HAVE ACESS TO THIS CLUB");
      res.status(400).json({ message: err });
    });
  }).catch((err) => {
    console.log("NO USER EXISTS");
    res.status(400).json({ message: err });
  });
}



app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization');
  next();
});


app.use('/resumes', express.static(path.join(__dirname, 'database/clubs')));



app.get('/get_resumes/*', (req, res) => {
  let club_name = req.originalUrl.split('/')[2];
  resume_db.get_resumes(club_name).then((resumes) => {
    console.log(resumes);
    res.status(200).json({ resumes: resumes });
  }).catch((err) => {
    console.log(err);
    res.status(400).json({ message: err });
  });
});


app.post('/add_club', express.json(), (req, res) => {
  let club_name = req.body.club_name;
  if (!req.headers.authorization) {
    console.log("No credentials");
    res.status(401).json({ message: 'Credentials needed' });
    return;
  }
  admin.auth().verifyIdToken(req.headers.authorization)
  .then((decodedToken) => {
    return decodedToken.uid;
  }).then((UID) => {
    resume_db.create_club(club_name).then((msg) => {
      console.log(msg);
      user_db.add_club(UID, club_name).then((msg) => {
        console.log(msg);
        
        user_db.get_clubs(UID).then((clubs) => {
          console.log(clubs);
          res.status(201).json({ message: 'Club added successfully!', clubs: clubs });
        }).catch((err) => {
          console.log(err);
          res.status(400).json({ message: err });
        });

      }).catch((err) => {
        console.log(err);
        res.status(400).json({ message: err });
      });
    }).catch((err) => {
      console.log(err);
      res.status(400).json({ message: err });
    });
  }).catch((err) => {
    console.log("AUTHENTICAITON VERIFCIATION FAILED");
    res.status(400).json({ message: err });
  });
});


app.get('/get_clubs', express.json(), (req, res) => {
  if (!req.headers.authorization) {
    console.log("No credentials");
    res.status(401).json({ message: 'Credentials needed' });
    return;
  }

  admin.auth().verifyIdToken(req.headers.authorization)
  .then((decodedToken) => {
    return decodedToken.uid;
  }).then((UID) => {
    user_db.get_clubs(UID).then((clubs) => {
      console.log(clubs);
      res.status(200).json({ clubs: clubs });
    }).catch((err) => {
      console.log(err);
      res.status(400).json({ message: err });
    });
  }).catch((err) => {
    console.log("AUTHENTICAITON VERIFCIATION FAILED");
    res.status(400).json({ message: err });
  });
});


app.get('/get_next_resumes/*', (req, res) => {
  let club_name = req.originalUrl.split('/')[2];

  resume_db.get_next_resumes(club_name).then((file_name) => {
    let link1 = "/resumes/"+club_name+"/"+file_name[0];
    let link2 = "/resumes/"+club_name+"/"+file_name[1];
    res.status(200).json({link1: link1, link2: link2})
  }).catch((err) => {
    console.log(err);
    res.status(400).json({ message: err });
  });
});

app.get("/club_info/*", express.json(), checkUserClubAcess, (req, res) => {
  let club_name = req.originalUrl.split('/')[2];
  console.log("TJIEGIJE"+req.originalUrl+"WWWWWWW");
  resume_db.get_club_info(club_name).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    console.log(err);
    res.status(400).json({ message: err });
  });
});


app.post('/signup', express.json(), (req, res) => {
  //storing username and password
  const {email, password} = req.body; //getting username from request

  admin.auth().createUser({
    email: email,
    emailVerified: false,
    password: password,
    disabled: false
  }).then((userRecord) => {
    console.log("User Record:", userRecord);
    const userId = userRecord.uid;
    console.log("user id is ", userId)
    console.log("email is ", email)

    user_db.add_user(userId, email).then(() => {
      console.log("user added to local databse")
      const users = user_db.get_all_users();
      console.log("all users", users)
      const usersRef = admin.database().ref('users/');
      //get all users from Firebase Realtime Database
      usersRef.once('value', (snapshot) => {
        const usersData = snapshot.val();
        console.log(usersData)

        //call user db populate users function
        user_db.populate_users(usersData).then(() => {
          console.log("users populated in local database")
          const userRef = admin.database().ref('users/' + userId);
            
        userRef.set({
          email: email,
          UID: userId
        }).then(() => {
          console.log("user added to firebase database")
          res.status(201).send({uid: userRecord.uid});
        }).catch((err) => {
          console.log(err);
          res.status(400).json({ message: err });
        });
    });
  });

    }).catch((err) => {
      console.log(err);
      res.status(400).json({ message: err });
    });
  }).catch((error) => {
    console.error('Error creating user:', error);
    return res.status(500).send({error: error.message})
  });

});


app.post('/update_scores', express.json(), (req, res) => {
  
  console.log(req.body.club_name, req.body.winner, req.body.loser);
  if (req.body.club_name == undefined || req.body.winner == undefined || req.body.loser == undefined) {
    res.status(401).json({ message: 'Invalid request' });
    return;
  }
  console.log(decodeURI(req.body.club_name), decodeURI(req.body.winner), decodeURI(req.body.loser));
  resume_db.update_scores(decodeURI(req.body.club_name), decodeURI(req.body.winner), decodeURI(req.body.loser)).then((result) => {
    if(result == null) {
      res.status(400).json({ message: 'Failed to update scores' });
      return;
    }
    res.json({ message: 'Scores updated successfully!' });
  }).catch((err) => {
    console.log(err);
    res.status(400).json({ message: err });
  });
})

app.get('/exists/*', (req, res) => {
  let club_name = req.originalUrl.split('/')[2];
  resume_db.club_exists(club_name).then((result) => {
    res.status(200).json({exists: result});
  }).catch((err) => {
    console.log(err);
    res.status(400).json({ message: err });
  });
});


app.post('/upload/*', upload_pdf.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

