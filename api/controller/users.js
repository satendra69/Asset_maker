const createError = require("../middleware/createError");
const db = require("../connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logoutP } = require("./auth");
const sgMail = require('@sendgrid/mail');

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to get users
const getUsers = async (req, res, next) => {
  const admin = req.isAdmin;

  if (!admin) {
    return next(createError(401, "Only admin can access all user list"));
  }

  try {
    const [results] = await db.query("SELECT * FROM users");

    if (!results || results.length === 0) {
      return res.status(404).send("No users found.");
    }

    res.status(200).send(results);
  } catch (error) {
    return next(error);
  }
};

// Function to delete user
const deleteUser = async (req, res, next) => {
  const userId = req.userId;
  const userIdToDelete = Number(req.params.id);

  // if (userId !== userIdToDelete) {
  //   return next(createError(401, "You can delete only your account!"));
  // }

  const deleteUserQuery = `DELETE FROM users WHERE id = ?`;

  try {
    const [results] = await db.query(deleteUserQuery, [userIdToDelete]);

    if (results.affectedRows === 0) {
      return next(createError(404, "User not found."));
    }

    if (userId === userIdToDelete) {
      logoutP(req, res);
    }

    res.status(200).send("Deleted successfully.");
  } catch (error) {
    return next(error);
  }
};

// Function to get user by ID
const getUser = async (req, res, next) => {
  const userId = req.params.id;

  const getUserQuery = `SELECT * FROM users WHERE id = ?`;

  try {
    const [results] = await db.query(getUserQuery, [userId]);

    if (!results || results.length === 0) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send(results[0]);
  } catch (error) {
    return next(error);
  }
};

// Function to update user
const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  let updateUserQuery = "UPDATE users SET ";
  let fields = [];
  let values = [];

  if (updatedUserData.username) {
    fields.push("username = ?");
    values.push(updatedUserData.username);
  }

  if (updatedUserData.avatar) {
    const cleanAvatarUrl = updatedUserData.avatar.replace(/^"|"$/g, "");
    fields.push("avatar = ?");
    values.push(cleanAvatarUrl);
  }


  if (updatedUserData.email) {
    fields.push("email = ?");
    values.push(updatedUserData.email);
  }

  if (updatedUserData.phoneno) {
    fields.push("phoneno = ?");
    values.push(updatedUserData.phoneno);
  }

  if (updatedUserData.admin) {
    fields.push("admin = ?");
    values.push(updatedUserData.admin);
  }

  if (updatedUserData.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(updatedUserData.password, salt);
    fields.push("password = ?");
    values.push(hashedPassword);
  }

  if (fields.length === 0) {
    return res.status(400).send("No fields to update");
  }

  updateUserQuery += fields.join(", ") + " WHERE id = ?";
  values.push(userId);

  try {
    const [results] = await db.query(updateUserQuery, values);

    if (results.affectedRows === 0) {
      return next(createError(404, "User not found or no changes were made"));
    }

    res.status(200).send("User updated successfully.");
  } catch (error) {
    return next(error);
  }
};

// Function to handle forgot password
const forgotPassword = async (req, res, next) => {
  const { email, frontendUrl } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return next(createError(400, "Invalid email format"));
  }

  try {
    const [results] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log("Query Results:", results);

    if (results.length === 0) {
      return next(createError(404, "User with this email does not exist"));
    }

    if (!process.env.JWT_KEY) {
      return next(createError(500, "JWT secret key is not configured"));
    }

    const user = results[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: "1h" });

    // Use the frontendUrl sent from the client
    const resetLink = frontendUrl
      ? `${frontendUrl}/reset-password?token=${token}`
      : `${req.protocol}://${req.get('host')}/reset-password?token=${token}`;

    const msg = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Request",
      html: `<p>To reset your password, please click the following link:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    };

    await sgMail.send(msg);

    res.status(200).send("Password reset link has been sent to your email.");
  } catch (error) {
    console.error("SendGrid Error:", error.response ? error.response.body : error);
    return next(createError(500, "Failed to send the password reset email."));
  }
};

// Function to reset password
const resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return next(createError(400, "Token and new password are required"));
  }

  try {

    if (!process.env.JWT_KEY) {
      return next(createError(500, "JWT secret key is not configured"));
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);
    const userId = payload.id;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const [results] = await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);

    if (results.affectedRows === 0) {
      return next(createError(404, "User not found or no changes made"));
    }

    res.status(200).send("Password has been reset successfully.");
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(createError(400, "Invalid or expired token"));
    }
    console.error("Error resetting password:", error);
    return next(createError(500, "Internal server error"));
  }
};

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  forgotPassword,
  resetPassword,
};
