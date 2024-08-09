import express from 'express';
import {
    getSavedProperties,
    addToSavedList,
    removeFromSavedList,
} from '../controllers/savedListController';

const router = express.Router();

// Get saved properties for a user
router.get('/:userId', getSavedProperties);

// Add a property to the saved list
router.post('/add', addToSavedList);

// Remove a property from the saved list
router.delete('/remove', removeFromSavedList);

// Submit an inquiry form
router.post('/inquiry', submitInquiryForm);

export default router;
