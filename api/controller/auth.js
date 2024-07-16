const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../connect");

const nodemailer = require("nodemailer");
// Registration endpoint
const register = (req, res) => {
  //CHECK USER IF EXISTS
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`,`email`,`password`,`phoneno`) VALUE (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.phoneNumber,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      //   search that user
      const q = "SELECT * FROM users WHERE username = ?";

      db.query(q, [req.body.username], (err, userDb) => {
        if (err) return res.status(500).json(err);
        if (userDb.length === 0) return res.status(404).json("User not found!");

        return res.status(200).send("User has been created");
      });
    });
  });
};

const login = (req, res) => {
	console.log("enter____login",req.body.email);
	console.log("process.env.JWT_KEY",process.env.JWT_KEY);
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
	  console.log("data_____",data);
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign(
      { id: data[0].id, isAdmin: data[0].admin },
      process.env.JWT_KEY
    );

    // Decode the token
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);

    const { password, ...others } = data[0];

    return res
      .status(200)
      .json({ message: "Logged in successfully 😊 👌", token, user: others });
  });
};

const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};

// verify email
const verify = async function (req, res) {
  console.log("hiiiii");
  const { email, sixDigitOTP } = req.body;
  if (!email && !sixDigitOTP) {
    return req.json({
      msg: "email and otp is required",
    });
  } else {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      port: 25,
      host: "localhost",
      auth: {
        user: "contact@infodrive-solutions.com",
        pass: "pqhvdzpqfefdunzo",
      },
    });

    let mailDetails = {
      from: {
        name: "Asset Makers",
        address: "contact@infodrive-solutions.com",
      },
      //from: 'ats.admin@infodrive-solutions.com',
      to: email,
      subject: "Account Verification",
      html: `<h3>Hello,</h3>
      <p>Welcome to our platform! To verify your account, please use the following 6-digit OTP (One-Time Password):</p>
      <h2>Your OTP: <span style="font-weight: bold; color: blue;">${sixDigitOTP}</span></h2>
      <p>Please enter this OTP in the verification form to complete the process.</p>`,
    };
    mailTransporter.sendMail(mailDetails, function (err, results) {
      if (err) {
        console.log("Error Occurs", err);
        res.status(400).send(err);
      } else {
        return res.status(200).json({
          msg: "sucess",
          otp: sixDigitOTP,
        });
      }
    });
  }
};

module.exports = { login, logout, register, verify };
