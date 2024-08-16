const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create a new blog post
router.post('/', upload.single('file'), blogController.createBlog);

// Get all blogs
router.get('/', blogController.getAllBlogs);

// Get a single blog post by ID
router.get('/:id', blogController.getBlogById);

// Update a blog post
router.put('/:id', upload.single('file'), blogController.updateBlog);

// Delete a blog post
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
