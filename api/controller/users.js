const createError = require("../middleware/creatError");
const db = require("../connect");

// Function to get user
const getUsers = (req, res, next) => {
  const admin = req.isAdmin;

  // only admin can access all user list
  if (!admin) {
    return next(createError(401, "only admin can access all user list"));
  }

  // Construct the SQL query to get all users
  const getUsersQuery = `SELECT * FROM users`;

  // Execute the query
  db.query(getUsersQuery, (error, results, fields) => {
    if (error) {
      return next(error);
    }
    // Check if users exist
    if (!results || results.length === 0) {
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
const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  // Construct the SQL query to update the user
  let updateUserQuery = "UPDATE users SET ";
  let fields = [];
  let values = [];

  if (updatedUserData.username) {
    fields.push("username = ?");
    values.push(updatedUserData.username);
  }

  if (updatedUserData.avatar) {
    fields.push("avatar = ?");
    values.push(updatedUserData.avatar);
  }

  if (updatedUserData.email) {
    fields.push("email = ?");
    values.push(updatedUserData.email);
  }

  if (updatedUserData.phoneno) {
    fields.push("phoneno = ?");
    values.push(updatedUserData.phoneno);
  }

  if (updatedUserData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(updatedUserData.password, salt);
    fields.push("password = ?");
    values.push(hashedPassword);
  }

  if (fields.length === 0) {
    return res.status(400).send("No fields to update");
  }

  updateUserQuery += fields.join(", ") + " WHERE id = ?";
  values.push(userId);

  // Execute the query
  db.query(updateUserQuery, values, (error, results, fields) => {
    if (error) {
      return next(error);
    }
    // Check if the user was updated successfully
    if (results.affectedRows === 0) {
      return next(createError(401, "User not found or no changes were made"));
    }
    res.status(200).send("User updated successfully.");
  });
};

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
};
