const db = require('../connect');

const createCategory = async (name, description = null, listingType = null) => {
    const query = `
    INSERT INTO categories (name, description, listing_type)
    VALUES (?, ?, ?)`;
    const [result] = await db.execute(query, [name, description, listingType]);
    return result;
};

const getAllCategories = async () => {
    const query = `SELECT * FROM categories`;
    const [rows] = await db.execute(query);
    return rows;
};

const updateCategory = async (id, name, description = null, listingType = null) => {
    const query = `
    UPDATE categories
    SET name = ?, description = ?, listing_type = ?
    WHERE id = ?`;
    const [result] = await db.execute(query, [name, description, listingType, id]);
    return result;
};

const deleteCategory = async (id) => {
    const query = `DELETE FROM categories WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
