const createError = require("../middleware/creatError");
const db = require("../connect");

// Function to get user
const getUsers = (req, res, next) => {
  const admin = req.isAdmin;

  // only admin can acess all user list
  if (!admin) {
    return next(createError(401, "only admin can acess all user list"));
  }

  // Construct the SQL query to get all users
  const getUsersQuery = `SELECT * FROM users`;

  // Execute the query
  db.query(getUsersQuery, (error, results, fields) => {
    if (error) {
      return next(error);
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
const deleteUser = (req, res, next) => {
  const userId = req.userId;
  const userIdToDelete = req.params.id;

  // Check if the user is trying to delete their own account
  if (userId !== userIdToDelete) {
    return next(createError(401, "You can delete only your account!"));
  }

  // Construct the SQL query to delete the user
  const deleteUserQuery = `DELETE FROM users WHERE id = ?`;

  // Execute the query
  db.query(deleteUserQuery, [userIdToDelete], (error, results, fields) => {
    if (error) {
      return next(error);
    }
    res.status(200).send("deleted.");
  });
};

// Function to get user
const getUser = (req, res, next) => {
  const userId = req.params.id;

  // Construct the SQL query to get the user
  const getUserQuery = `SELECT * FROM users WHERE id = ?`;

  // Execute the query
  connection.query(getUserQuery, [userId], (error, results, fields) => {
    if (error) {
      return next(error);
    }
    // Check if user exists
    if (results.length === 0) {
      return next(createError(401, "User not found"));
    }
    // User found, send user data
    res.status(200).send(results[0]);
  });
};

// Function to update user
const updateUser = (req, res, next) => {
  const userId = req.userId;
  const updatedUserData = req.body;
  // Check if the user is trying to delete their own account
  if (userId !== req.params.id) {
    return next(createError(401, "You can delete only your account!"));
  }

  // Construct the SQL query to update the user
  const updateUserQuery =
    "UPDATE users SET `username`=?,`avatar`=? WHERE id = ?";

  // Execute the query
  db.query(
    updateUserQuery,
    [req.body.username, req.body.avatar, userId],
    (error, results, fields) => {
      if (error) {
        return next(error);
      }
      // Check if the user was updated successfully
      if (results.affectedRows === 0) {
        return next(createError(401, "User not found or no changes were made"));
      }
      res.status(200).send("User updated successfully.");
    }
  );
};

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
};
