const express = require('express')
const upload = require('./upload');
const app = express()
const port = 4000

// var serveIndex = require('serve-index');

// app.use(express.static(__dirname + "/"))
// app.use('/videos', serveIndex(__dirname + '/videos'));
var fs = require('fs');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

app.use(express.json())

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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

