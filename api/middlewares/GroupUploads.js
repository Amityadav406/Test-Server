module.exports = GroupUploads = (req, res, next) => {
  const uploadFiles = new Object();

  for (const file of req.files) {
    if (uploadFiles.hasOwnProperty(file.fieldname)) {
      uploadFiles[file.fieldname] = [...uploadFiles[file.fieldname], file];
    } else {
      uploadFiles[file.fieldname] = [file];
    };
  };

  req.files = uploadFiles;

  next();
}