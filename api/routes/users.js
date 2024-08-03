const express = require("express");
const {
  getUsers,
  deleteUser,
  getUser,
  updateUser,
  forgotPassword,
  resetPassword,
} = require("../controller/users");
const verifyToken = require("../middleware/jwt");

const router = express.Router();

// Get all users (admin only)
router.get("/", verifyToken, getUsers);

// Get user by ID
router.get("/:id", verifyToken, getUser);

// Update user
router.put("/:id", verifyToken, updateUser);

// Delete user
router.delete("/:id", verifyToken, deleteUser);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password", resetPassword);

module.exports = router;
