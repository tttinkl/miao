var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: '126',
    auth: {
      user: 'tttinkl',
      pass: 'tianHEdi12'
    }
  });
  
  module.exports = transporter;