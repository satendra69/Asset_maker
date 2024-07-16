const nodemailer = require("nodemailer");

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "scheduler2625@gmail.com",
    pass: "tzsmaxieiroasryp",
  },
});

module.exports = transporter;
