const express = require('express');
const {
    getSavedProperties,
    addToSavedList,
    removeFromSavedList,
} = require('../controller/savedList');

const router = express.Router();


// Get saved properties for a user
router.get('/:userId', getSavedProperties);

// Add a property to the saved list
router.post('/add', addToSavedList);

// Remove a property from the saved list
router.delete('/remove', removeFromSavedList);

module.exports = router;
