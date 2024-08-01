const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../connect");
const nodemailer = require("nodemailer");

let otpStore = {};

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Registration endpoint
const registerP = (req, res) => {
  console.log("Register endpoint hit");
  const { email, username, password } = req.body;

  // Check if username or email already exists
  const qCheck = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(qCheck, [username, email], (err, results) => {
    if (err) {
      console.error("Database error during user lookup:", err);
      return res.status(500).json(err);
    }

    // If user exists
    if (results.length > 0) {
      const existingUser = results[0];
      if (existingUser.username === username) {
        return res.status(400).json({ error: "Username already exists." });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: "Email already exists." });
      }
    }

    // Generate OTP and store it
    const otp = generateOTP();
    otpStore[email] = otp;

    console.log("OTP generated:", otp);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const qInsert = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    const values = [username, email, hashedPassword];

    console.log("Query:", qInsert, values);

    db.query(qInsert, [values], (err, data) => {
      if (err) {
        console.error('Database error during user insertion:', err);
        return res.status(500).json(err);
      }
      console.log("Mailing started");
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      let mailDetails = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Account Verification",
        html: `<h3>Hello,</h3>
          <p>Welcome to our platform! To verify your account, please use the following 6-digit OTP (One-Time Password):</p>
          <h2>Your OTP: <span style="font-weight: bold; color: blue;">${otp}</span></h2>
          <p>Please enter this OTP in the verification form to complete the process.</p>`,
      };

      console.log("Sending OTP email...");
      mailTransporter.sendMail(mailDetails, function (err, results) {
        if (err) {
          console.error("Error sending mail:", err);
          return res.status(500).json(err);
        } else {
          console.log("Mail sent successfully");
          return res.status(200).json({
            message: "User has been created. Please check your email for the OTP.",
          });
        }
      });
    });
  });
};

// Verify email
const verifyP = (req, res) => {
  console.log("Verify endpoint hit");
  const { email, otp } = req.body;

  if (!email || !otp) {
    console.log("Missing email or OTP");
    return res.status(400).json({
      msg: "Email and OTP are required",
    });
  }

  if (otpStore[email] === otp) {
    delete otpStore[email];
    console.log("Email verified successfully");
    return res.status(200).json({
      msg: "Email verified successfully",
    });
  } else {
    console.log("Invalid OTP");
    return res.status(400).json({
      msg: "Invalid OTP",
    });
  }
};

// Login endpoint
const loginP = (req, res) => {
  console.log("Login endpoint hit");
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      console.log("User not found");
      return res.status(404).json("User not found!");
    }

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

    if (!checkPassword) {
      console.log("Wrong password or username");
      return res.status(400).json("Wrong password or username!");
    }

    const token = jwt.sign(
      { id: data[0].id, isAdmin: data[0].admin },
      process.env.JWT_KEY
    );

    const { password, ...others } = data[0];

    return res.status(200).json({
      message: "Logged in successfully 😊 👌",
      token,
      user: others,
    });
  });
};

// Logout endpoint
const logoutP = (req, res) => {
  console.log("Logout endpoint hit");
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none",
  }).status(200).json("User has been logged out.");
};

module.exports = { loginP, logoutP, registerP, verifyP };
