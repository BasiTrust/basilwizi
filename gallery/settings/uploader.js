const multer = require('multer');
const path   = require('path');

/** Storage Engine */
exports.storageEngine = multer.diskStorage({
  destination: '../../public/gallery',
  filename: function(req, file, fn) {
    fn(null, new Date().getTime().toString()+ '-' + file.fieldname+ path.extname(file.originalname));
  }
});

//init
exports.upload = multer({
  storage: this.storageEngine,
  limits: { fileSize: 200000 },
  fileFilter: function(req, file, callback) {
    validateFile(file, callback);
  }
}).single('photo');


var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}
