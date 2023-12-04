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
resume_db.populate_database("test");

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


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  next();
});


app.use('/resumes', express.static(path.join(__dirname, 'database/clubs')));

app.post('/add_club', express.json(), (req, res) => {
  if (!req.headers.authorization) {
    console.log("No credentials");
    res.status(401).json({ message: 'Credentials needed' });
    return;
  }
  let club_name = req.body.club_name;
  resume_db.create_club(club_name).then(() => {

    user_db.add_club(req.headers.authorization, club_name).then(() => {
      console.log("Club added to user");
    }).catch((err) => {
      console.log(err);
      res.status(400).json({ message: err });
    });

  }).catch((err) => {
    console.log(err);
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

app.get("/club_info/*", express.json(), (req, res) => {
  let club_name = req.originalUrl.split('/')[2];
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
  })
  .then((userRecord) => {
      console.log("User Record:", userRecord);
      const userId = userRecord.uid;
      user_db.add_user(userId, email) //adding user to the current user database
      const userRef = admin.database().ref('users/' + userId);

      userRef.set({
        email: email,
        UID: userId
      })
      .then(() => {
          //get auth token here and return
          return res.status(201).send({uid: userRecord.uid});
      })
  .catch ((error) => {
    return res.status(500).send({error: error.message})
  });

})
.catch((error) => {
    console.error('Error creating user:', error);
    return res.status(500).send({error: error.message})
});

});


// app.get('/login', express.json(), (req, res) => {
//   //storing username and password
//   const {username, password} = req.body; //getting username from request

//   firebase.auth().signInWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         const userId = user.uid; //user's unique id 
//       }
//   )


// }

// )


app.post('/update_scores', express.json(), (req, res) => {
  
  console.log(req.body.club_name, req.body.winner, req.body.loser);
  if (req.body.club_name == undefined || req.body.winner == undefined || req.body.loser == undefined) {
    res.status(401).json({ message: 'Invalid request' });
    return;
  }
  console.log(decodeURI(req.body.club_name), decodeURI(req.body.winner), decodeURI(req.body.loser));
  resume_db.update_scores(decodeURI(req.body.club_name), decodeURI(req.body.winner), decodeURI(req.body.loser)).then((result) => {
    resume_db.get_all_rows("resume_info", (rows) => {
      rows.forEach((row) => {
          console.log(row);
      });
    });
  })
  res.json({ message: 'Scores updated successfully!' });
})


app.post('/upload/*', upload_pdf.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

