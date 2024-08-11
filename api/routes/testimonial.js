const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const testimonialController = require('../controller/testimonial');

const router = express.Router();

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/images'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Ensure the uploads directory exists
fs.mkdirSync('./public/images', { recursive: true });

// Routes
router.get('/', testimonialController.getAllTestimonials);
router.post('/', upload.single('photo'), testimonialController.addTestimonial);
router.patch('/:id', upload.single('photo'), testimonialController.editTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
