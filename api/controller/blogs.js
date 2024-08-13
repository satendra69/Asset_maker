const db = require('../connect');
const path = require('path');

// Create a new blog post
exports.createBlog = async (req, res) => {
    const { title, content, status, visibility, rank, date } = req.body;
    const imageUrl = req.file ? req.file.path.replace(/\\/g, '/').replace('public/', '') : null;

    if (!title || !content || !status || !visibility || rank === undefined || !date) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO blogs (title, content, status, visibility, `rank`, date, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, content, status, visibility, rank, date, imageUrl]
        );
        res.status(201).send({ id: result.insertId, ...req.body, imageUrl });
    } catch (err) {
        res.status(500).send({ error: 'Failed to create blog post' }, err);
    }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const [blogs] = await db.execute('SELECT * FROM blogs ORDER BY date DESC');
        res.send(blogs);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch blogs' }, err);
    }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const [blogs] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id]);
        if (blogs.length === 0) {
            return res.status(404).send({ error: 'Blog not found' });
        }
        res.send(blogs[0]);
    } catch (err) {
        res.status(500).send({ error: 'Failed to fetch blog post' }, err);
    }
};

// Update a blog post
exports.updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, status, visibility, rank, date, existingImageUrl } = req.body;

    const imageUrl = req.file
        ? req.file.path.replace(/\\/g, '/').replace('public/', '')
        : existingImageUrl ? existingImageUrl : null;

    if (!title || !content || !status || !visibility || rank === undefined || !date) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        const [result] = await db.execute(
            'UPDATE blogs SET title = ?, content = ?, status = ?, visibility = ?, `rank` = ?, date = ?, imageUrl = ? WHERE id = ?',
            [title, content, status, visibility, rank, date, imageUrl, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Blog not found' });
        }
        res.send({ id, ...req.body, imageUrl });
    } catch (err) {
        console.error('Error updating blog post:', err);
        res.status(500).json({ error: 'Failed to update blog post' });
    }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM blogs WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Blog not found' });
        }
        res.send({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Failed to delete blog post' }, err);
    }
};
