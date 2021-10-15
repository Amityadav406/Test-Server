
require('dotenv').config();

const jwt = require('jsonwebtoken');
const md5 = require('md5');

const SYSTEM_ERROR = "An error occurred, please refer to the system administrator";
const SOMETHING_WRONG = "Something went wrong, Try again";
const NOT_FOUND = "Requested Data not found";

const authUserModel = (email, password, callback) => {

  const sql = `SELECT * FROM user WHERE email='${email.toLowerCase()}'`;

  DBConnection.query(sql, (err, rows) => {
    if (err) {
      callback(false);
    } else {
      if (rows.length === 0)
        callback(false, 'User does not exist');
      else if (rows.length > 0 && md5(password) !== rows[0].password)
        callback(false, 'Email and password do not match');
      else {
        const user = {
          id: rows[0].id,
          role: rows[0].role.toUpperCase(),
        };

        jwt.sign({ user }, process.env.TOKEN_SECRET_KEY, { expiresIn: '7 days' }, (err, token) => {
          if (err) {
            callback(false);
          }
          else {
            callback({
              id: user.id,
              token,
            });
          };
        });
      };
    };
  });
};



module.exports = { authUserModel };
