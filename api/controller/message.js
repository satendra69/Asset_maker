const createError = require("../middleware/creatError");
const db = require("../connect");
const path = require("path");
const transporter = require("../middleware/transpoter");
const fs = require("fs");
const { escape } = require("mysql2");
// Function to get user
const getMessage = (req, res, next) => {
  const admin = req.isAdmin;

  // only admin can acess all user list
  if (!admin) {
    return next(createError(401, "only admin can acess all message list"));
  }

  // Construct the SQL query to get all users
  const getMessageQuery = `SELECT m.*, l.name AS propertyName, l.address
  FROM messages m
  JOIN listings l ON m.propertyId = l.Id;`;

  // Execute the query
  db.query(getMessageQuery, (error, results, fields) => {
    if (error) {
      return res.status(400).send(error);
    }
    // Check if users exist
    if (results.length === 0) {
      return next(createError(401, "No users found"));
    }
    // Users found, send user data
    res.status(200).send(results);
  });
};

// Function to delete user
const deleteMessaage = (req, res, next) => {
  const admin = req.isAdmin;

  // only admin can acess all message list
  if (!admin) {
    return next(createError(401, "only admin can delete message"));
  }

  const messageIdToDelete = req.params.id;
  console.log(messageIdToDelete, "hiiiiiiiiiii");
  // Construct the SQL query to delete the message
  const deleteUserQuery = `DELETE FROM messages WHERE id = ?`;

  // Execute the query
  db.query(deleteUserQuery, [messageIdToDelete], (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(400).send(error);
    }
    res.status(200).send("deleted.");
  });
};

// Register a message

const registerMessage = async (req, res) => {
  const q = `
    INSERT INTO messages 
    (message, name, number, email, purpose, userId, propertyId) 
    VALUE (?)`;
  const values = [
    req.body.message,
    req.body.name,
    req.body.number,
    req.body.email,
    req.body.purpose,
    req.body.userId,
    59,
  ];
  const { email } = req.body;
  db.query(q, [values], async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    const mailOptions = {
      from: "scheduler2625@gmail.com", // Replace with your sending email
      to: email,
      subject: "Property Inquiry Confirmation",
      html: fs
        .readFileSync(
          path.join(__dirname, "../views/emails/messageTemplate.html"),
          "utf-8"
        )
        .replace(/{{name}}/g, req.body.name)
        .replace(/{{number}}/g, req.body.number)
        .replace(/{{email}}/g, req.body.email)
        .replace(/{{purpose}}/g, req.body.purpose)
        .replace(/\[Website Link\]/g, "[https://assetmakers.com/]"), // Replace with your website link
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: %s", info.messageId); // Log successful email sending

    res
      .status(200)
      .send("Your message has been sent. We will respond within 24 hours.");
  });
};

module.exports = {
  deleteMessaage,

  getMessage,
  registerMessage,
};
