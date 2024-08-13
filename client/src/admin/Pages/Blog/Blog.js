import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import httpContent from '../../../http-content';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await httpContent.get('/blogs');
                setBlogs(res.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch blogs. Please try again later.');
                console.error(err);
            }
        };
        fetchBlogs();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await httpContent.delete(`/blogs/${id}`);
                setBlogs(blogs.filter((blog) => blog.id !== id));
                setError(null);
            } catch (err) {
                setError('Failed to delete the blog. Please try again later.');
                console.error(err);
            }
        }
    };

    return (
        <div className="p-8 w-full h-[94vh] overflow-y-scroll">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">All Blogs</h1>
                <Link to="/admin/blog/new" className="inline-block px-6 py-3 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700">
                    Create New Blog
                </Link>
            </div>

            {/* Error message display */}
            {error && (
                <div className="p-4 mb-4 text-red-700 bg-red-200 rounded">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <div key={blog.id} className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
                        {blog?.imageUrl && (
                            <img
                                src={`${httpContent.defaults.baseURL}/images/${blog?.imageUrl.split('/').pop()}`}
                                alt={blog.title}
                                className="object-cover w-full h-48" />
                        )}
                        <div className="p-6">
                            <h2 className="mb-2 text-2xl font-semibold text-gray-800">{blog.title}</h2>
                            <p className="mb-4 text-gray-600">{blog.content}</p>
                            <div className="mb-4 text-sm text-gray-500">
                                <div><strong>Status:</strong> {blog.status}</div>
                                <div><strong>Visibility:</strong> {blog.visibility}</div>
                                <div><strong>Rank:</strong> {blog.rank}</div>
                                <div><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</div>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                                    className="px-4 py-2 text-white transition duration-200 bg-green-600 rounded hover:bg-green-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="px-4 py-2 text-white transition duration-200 bg-red-600 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
