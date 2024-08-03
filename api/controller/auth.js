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
const registerP = async (req, res) => {
  console.log("Register endpoint hit");
  const { email, username, password } = req.body;

  try {
    // Check if username or email already exists
    const qCheck = "SELECT * FROM users WHERE username = ? OR email = ?";
    const [results] = await db.query(qCheck, [username, email]);

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
    otpStore[email] = { otp, username, password };

    console.log("OTP generated:", otp);

    // Send mail
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

    await mailTransporter.sendMail(mailDetails);
    console.log("Mail sent successfully");
    return res.status(200).json({
      message: "User has been created. Please check your email for the OTP.",
      otp: otp,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    if (err.code === 'EAUTH') {
      return res.status(400).json({ error: "Username and Password not accepted." });
    }
    return res.status(500).json({ error: "An error occurred while registering the user." });
  }
};

// Verify email endpoint
const verifyP = async (req, res) => {
  console.log("Verify endpoint hit");
  const { email, otp } = req.body;

  if (!email || !otp) {
    console.log("Missing email or OTP");
    return res.status(400).json({
      msg: "Email and OTP are required",
    });
  }

  const storedData = otpStore[email];

  if (storedData && storedData.otp === otp) {
    const { username, password } = storedData;

    // Hash the password and insert the user into the database
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const qInsert = "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";
    await db.query(qInsert, [username, email, hashedPassword]);

    delete otpStore[email]; // Clear the stored data
    console.log("Email verified and user registered successfully");
    return res.status(200).json({
      msg: "Email verified successfully and user registered.",
    });
  } else {
    console.log("Invalid OTP");
    return res.status(400).json({
      msg: "Invalid OTP",
    });
  }
};

// Login endpoint
const loginP = async (req, res) => {
  console.log("Login endpoint hit");
  const { email, password } = req.body;

  try {
    const q = "SELECT * FROM users WHERE email = ?";
    const [data] = await db.query(q, [email]);

    if (data.length === 0) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found!" });
    }

    const checkPassword = bcrypt.compareSync(password, data[0].password);

    if (!checkPassword) {
      console.log("Wrong password or username");
      return res.status(400).json({ error: "Wrong password or username!" });
    }

    const token = jwt.sign(
      { id: data[0].id, isAdmin: data[0].admin },
      process.env.JWT_KEY
    );

    const { password: _, ...others } = data[0];

    return res.status(200).json({
      message: "Logged in successfully 😊 👌",
      token,
      user: others,
    });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "An error occurred during login." });
  }
};

// Logout endpoint
const logoutP = (req, res) => {
  console.log("Logout endpoint hit");
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none",
  }).status(200).json({ message: "User has been logged out." });
};

module.exports = { loginP, logoutP, registerP, verifyP };
