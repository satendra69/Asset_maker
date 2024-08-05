const db = require('../connect');

const createCategory = async (name, description, parentCategory, listingType) => {
    const query = `
    INSERT INTO categories (name, description, parent_category, listing_type) 
    VALUES (?, ?, ?, ?)
  `;
    const [result] = await db.execute(query, [name, description, parentCategory, listingType]);
    return result;
};

const getAllCategories = async () => {
    const query = `SELECT * FROM categories`;
    const [rows] = await db.execute(query);
    return rows;
};

const updateCategory = async (id, name, description, parentCategory, listingType) => {
    const query = `
    UPDATE categories 
    SET name = ?, description = ?, parent_category = ?, listing_type = ? 
    WHERE id = ?
  `;
    const [result] = await db.execute(query, [name, description, parentCategory, listingType, id]);
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
