const express = require("express");
const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
} = require("../controller/categories");
const verifyToken = require("../middleware/jwt");

const router = express.Router();

/* Get all categories */
router.get("/", getAllCategories);

/* Create a new category */
router.post("/", verifyToken, createCategory);

/* Update a category */
router.patch("/:id", verifyToken, updateCategory);

/* Delete a category */
router.delete("/:id", verifyToken, deleteCategory);

module.exports = router;
