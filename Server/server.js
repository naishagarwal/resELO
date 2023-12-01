const express = require('express')
const app = express()
const port = 4000
const path = require('path');
var fs = require('fs');
const Resume_Database = require('./resume_database.js');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(__dirname + '/database/sqlite.db');
let resume_db = new Resume_Database(db);
const {get_multer_object} = require('./upload_pdf.js');
const upload_pdf = get_multer_object(resume_db)
resume_db.populate_database("test");


// have something here to make sure users.json file is empty when first starting the server up
//I think the user.json file does not have to exist, will create automatically, but should test this out 

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  next();
});

app.use('/resumes', express.static(path.join(__dirname, 'database/clubs')));

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

app.post('/signup', (req, res) => {
  //storing username and password
  const {username, password} = req.body;
  
  //load existing users
  let users = JSON.parse(fs.readFileSync('users.json', 'utf-8'))

  //check if user already exists
  if (users.some(user => user.username == username)){
    res.send("User already exists")
  }

  //adding new user
  users.push({username, password})
  //adding new user to file (JSON.stringfy is converting javascript to JSON string)
  fs.writeFileSync('users.json', JSON.stringify(users, null))

  //sending success message
  res.send('User signed up sucessfully')

  
}

)

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

