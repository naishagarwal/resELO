const express = require('express')
//const session = rquire('express-session')
const upload = require('./upload');
const app = express()
const port = 4000

// var serveIndex = require('serve-index');

// app.use(express.static(__dirname + "/"))
// app.use('/videos', serveIndex(__dirname + '/videos'));
var fs = require('fs');

// have something here to make sure users.json file is empty when first starting the server up
//I think the user.json file does not have to exist, will create automatically, but should test this out 

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

app.use(express.json())
//app.use(bodyParser.json()) //parsing through user JSON file 

app.get('/', (req, res) => {
  res.json({ username: 'Flavio' })
})

app.post('/', (req, res) => {
  res.send('POST request to the homepage')
  console.log(req.body)
  fs.writeFile("uploads/" + req.body.file_name, req.body.file_content, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
})

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully!' });
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

