const createError = require("../middleware/creatError");
const db = require("../connect");
const moment = require("moment");
// Function to get user
const getCity = (req, res, next) => {
  // Construct the SQL query to get all users
  const getUsersQuery = `SELECT * FROM cities`;

  // Execute the query
  db.query(getUsersQuery, (error, results, fields) => {
    if (error) {
      return next(error);
    }
    // Check if users exist
    if (results.length === 0) {
      return next(createError(401, "No citity found"));
    }
    // Users found, send user data
    res.status(200).send(results);
  });
};

// Function to delete user
const deleteCity = (req, res, next) => {
  const cityId = req.params.id;
  const admin = req.isAdmin;

  // only admin can acess all user list
  if (!admin) {
    return next(createError(401, "only admin can delete city"));
  }

  // Construct the SQL query to delete the user
  const deleteUserQuery = `DELETE FROM cities WHERE id = ?`;

  // Execute the query
  db.query(deleteUserQuery, [cityId], (error, results, fields) => {
    if (error) {
      return next(error);
    }
    res.status(200).send("deleted.");
  });
};

// Function to update user
const updateCity = (req, res, next) => {
  const cityId = req.params.id;
  const admin = req.isAdmin;

  // only admin can acess all user list
  if (!admin) {
    return next(createError(401, "only admin can delete city"));
  }

  // Construct the SQL query to update the user
  const updateUserQuery = "UPDATE cities SET `name`=? WHERE id = ?";

  // Execute the query
  db.query(
    updateUserQuery,
    [req.body.name, cityId],
    (error, results, fields) => {
      if (error) {
        return next(error);
      }
      // Check if the user was updated successfully
      if (results.affectedRows === 0) {
        return next(createError(401, "No changes were made"));
      }
      res.status(200).send("City updated successfully.");
    }
  );
};

// add user
// Add Comments
const addCity = (req, res) => {
  // authorization

  const admin = req.isAdmin;
  console.log("Admin", admin);

  // only admin can acess all user list
  if (admin == 0) {
    return res.status(401).send("only admin can add city");
  }
  const getCityQuery = `SELECT * FROM cities WHERE name = ?`;
  db.query(getCityQuery, [req.body.name], (err, citi) => {
    if (err) res.status(400).send(err);
    if (citi.length > 0) return res.status(400).send("city alredy exist");
    const q = "INSERT INTO cities(`name`,`createdAt`) VALUES (?)";
    const values = [
      req.body.name,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send("City has been created.");
    });
  });
};
module.exports = {
  deleteCity,
  addCity,
  getCity,
  updateCity,
};
