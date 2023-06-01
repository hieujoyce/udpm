const multer = require('multer');
const path = require('path');

async function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|svg|glb/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  }
  return cb('Error: Images and excel file only!');
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    //console.log(file);
    cb(null, `${new Date().getTime()}${path.extname(file.originalname).toLowerCase()}`);
  },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = upload;
