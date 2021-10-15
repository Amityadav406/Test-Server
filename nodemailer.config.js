require('dotenv').config();

const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

module.exports.transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: process.env.SENDGRID_KEY
  }
}));

module.exports.mailOptions = (to, subject, mailBody) => {
  const messageConfiguration = {
    from: 'info@thegalleria.ae',
    to,
    subject,
    html: mailBody
  };

  return messageConfiguration;
};
