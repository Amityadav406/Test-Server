
require('dotenv').config();

const welcomeUserModel = (callback) => {
  callback('Node server welcomes you in user routes :)');
};

const SYSTEM_ERROR = "An error occurred, please refer to the system administrator";

const getListModule = async (callback) => {

  const createdatesql = `SELECT id, first_name, last_name,dob, nationality, phone,email FROM data ORDER BY id DESC LIMIT 10`;
  DBConnection.query(createdatesql, (err, rows) => {
    if (err) {
      ERROR(err);
      callback(false, SYSTEM_ERROR);
    } else {
      callback(rows, false);
    };
  });
}

module.exports = { getListModule };
