require('dotenv').config();

const fs = require('fs');

module.exports.CREATE_UPLOADS_DIR = () => {
  const uploadDirectories = [
    'uploads',
  ];

  for (let i = 0; i < uploadDirectories.length; i++) {
    fs.access(uploadDirectories[i], fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(uploadDirectories[i], { recursive: true }, (err) => {
          if (err) throw err;
        });
      };
    });
  };
};
