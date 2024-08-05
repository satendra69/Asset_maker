const Category = require('../models/Category');

const createCategory = async (req, res) => {
    const { name, description, parentCategory, listingType } = req.body;

    // Validation for required field 'name'
    if (!name) {
        return res.status(400).json({ message: "Name is required." });
    }

    try {
        await Category.createCategory(name, description || null, parentCategory || null, listingType || null);
        res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description, parentCategory, listingType } = req.body;

    // Validation for required field 'name'
    if (!name) {
        return res.status(400).json({ message: "Name is required." });
    }

    try {
        const result = await Category.updateCategory(id, name, description || null, parentCategory || null, listingType || null);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Category.deleteCategory(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
