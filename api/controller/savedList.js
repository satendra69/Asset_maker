const db = require('../connect');

// Get saved properties for a user
const getSavedProperties = async (req, res) => {
    const { userId } = req.params;

    try {
        const [savedProperties] = await db.query('SELECT * FROM saved_properties WHERE user_id = ?', [userId]);
        res.json(savedProperties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching saved properties' });
    }
};

// Add a property to the saved list
const addToSavedList = async (req, res) => {
    const { userId, propertyId } = req.body;

    if (!userId || !propertyId) {
        return res.status(400).json({ message: 'User ID and Property ID are required' });
    }
    try {
        const [existingSavedProperty] = await db.query(
            'SELECT * FROM saved_properties WHERE user_id = ? AND property_id = ?',
            [userId, propertyId]
        );
        if (existingSavedProperty.length > 0) {
            return res.status(409).json({ message: 'Property already saved' });
        }
        await db.query(
            'INSERT INTO saved_properties (user_id, property_id) VALUES (?, ?)',
            [userId, propertyId]
        );
        res.status(201).json({ message: 'Property saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving property' });
    }
};


// Remove a property from the saved list
const removeFromSavedList = async (req, res) => {
    const { userId, propertyId } = req.body;

    if (!userId || !propertyId) {
        return res.status(400).json({ message: 'User ID and Property ID are required' });
    }
    try {
        const result = await db.query('DELETE FROM saved_properties WHERE user_id = ? AND property_id = ?', [userId, propertyId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Property not found in saved list' });
        }
        res.status(204).json({ message: 'Property removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing property' });
    }
};

// Function to check if a property is saved for a user
const checkSavedPropertyQQ = async (req, res) => {
    const { userId, propertyId } = req.query;
    console.log("User ID:", userId, "Property ID:", propertyId);

    if (!userId || !propertyId) {
        return res.status(400).json({ message: 'User ID and Property ID are required' });
    }

    try {
        const query = `
            SELECT EXISTS(
                SELECT 1
                FROM saved_properties
                WHERE user_id = ? AND property_id = ?
            ) AS isSaved
        `;
        console.log(query, [userId, propertyId]);

        const [[{ isSaved }]] = await db.execute(query, [userId, propertyId]);
        console.log(JSON.stringify({ isSaved: !!isSaved }));
        console.log(isSaved);

        return res.json({ isSaved: !!isSaved });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getSavedProperties,
    addToSavedList,
    removeFromSavedList,
    checkSavedPropertyQQ,
};
