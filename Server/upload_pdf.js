
// const { add_resume } = require('./file_info.js');
const { add_resume } = require('./resume_database.js');
const multer = require('multer');
const fs = require('fs');

function get_multer_object(resume_database) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.originalUrl.split('/').length != 3) {
        // res.status(400).json({ message: 'Invalid ClubLink' });
        cb(new Error('Invalid ClubLink'));
      }

      club_path = __dirname+'/database/clubs/'+req.originalUrl.split('/')[2];
      console.log(club_path)
      if(!fs.existsSync(club_path)){
        // res.status(400).json({ message: 'Club does not exist' });
        cb(new Error('Club does not exist'));
      }
      cb(null, club_path);
    },
    filename: (req, file, cb) => {
      file_name = Date.now() + '-' + file.originalname;
      resume_database.add_resume(req.originalUrl.split('/')[2], file_name, req.body.author_name, req.body.author_email).then(() => {
        cb(null, file_name);
      });
    },
  });

  const upload_pdf = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == 'application/pdf') {
        cb(null, true);
      } else {
        cb(null, false);
        // return cb(new Error('Only .pdf format allowed!'));
      }
    }
  });
  return upload_pdf;
}

module.exports = { get_multer_object };