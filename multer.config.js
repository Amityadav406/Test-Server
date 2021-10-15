const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `LD-${Math.round(Date.now())}-${file.originalname.replace(/\s/g, '-')}`);
  }
});

module.exports = multer({ storage: storage });
