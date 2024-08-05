const db = require('../connect');

const Region = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM regions');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM regions WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (region) => {
        const { name, description, latitude, longitude, location } = region;
        const [result] = await db.query(
            'INSERT INTO regions (name, description, latitude, longitude, location) VALUES (?, ?, ?, ?, ?)',
            [name, description, latitude, longitude, location]
        );
        return result.insertId;
    },

    update: async (id, region) => {
        const { name, description, latitude, longitude, location } = region;
        await db.query(
            'UPDATE regions SET name = ?, description = ?, latitude = ?, longitude = ?, location = ? WHERE id = ?',
            [name, description, latitude, longitude, location, id]
        );
    },

    delete: async (id) => {
        await db.query('DELETE FROM regions WHERE id = ?', [id]);
    }
};

module.exports = Region;
