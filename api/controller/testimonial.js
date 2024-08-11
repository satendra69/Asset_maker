const db = require('../connect');
const fs = require('fs');
const path = require('path');

// Fetch all testimonials
exports.getAllTestimonials = async (req, res) => {
    try {
        const [testimonials] = await db.query('SELECT * FROM testimonials');

        const testimonialsWithImages = testimonials.map(testimonial => {
            return {
                ...testimonial,
                photo: testimonial.photo ? testimonial.photo.toString('base64') : null
            };
        });
        res.json(testimonialsWithImages);
    } catch (error) {
        console.error("Error fetching testimonials", error);
        res.status(500).json({ message: 'Error fetching testimonials' });
    }
};

// Add a new testimonial
exports.addTestimonial = async (req, res) => {
    const { name, designation, message, rating } = req.body;
    let photo = null;

    if (req.file) {
        try {
            photo = fs.readFileSync(path.join(__dirname, '..', req.file.path));
        } catch (err) {
            return res.status(500).json({ message: 'Error reading uploaded photo', error: err });
        }
    } else {
        console.log("No file uploaded.");
    }

    try {
        const [result] = await db.query(
            'INSERT INTO testimonials (name, designation, message, photo, rating) VALUES (?, ?, ?, ?, ?)',
            [name, designation, message, photo, rating]
        );
        res.status(201).json({ id: result.insertId, name, designation, message, rating });
    } catch (error) {
        console.error("Error adding testimonial:", error);
        res.status(500).json({ message: 'Error adding testimonial', error: error.message });
    }
};

// Edit an existing testimonial
exports.editTestimonial = async (req, res) => {
    const { id } = req.params;
    const { name, designation, message, rating } = req.body;
    let photo = null;

    if (req.file) {
        try {
            photo = fs.readFileSync(path.join(__dirname, '..', req.file.path));
        } catch (err) {
            return res.status(500).json({ message: 'Error reading uploaded photo', err });
        }
    }

    try {
        const [result] = await db.query(
            'UPDATE testimonials SET name = ?, designation = ?, message = ?, photo = ?, rating = ? WHERE id = ?',
            [name, designation, message, photo, rating, id]
        );
        res.json({ message: 'Testimonial updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating testimonial', error });
    }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM testimonials WHERE id = ?', [id]);
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting testimonial', error });
    }
};
