const express = require("express");

const {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} = require("../controller/users.js");
const verifyToken = require("../middleware/jwt.js");

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.get("/:id", verifyToken, updateUser);

module.exports = router;
