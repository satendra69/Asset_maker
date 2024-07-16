import React, { useState } from 'react';

function CreateCategory() {
    const [categoryName, setCategoryName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        function createCategory(name) {
            return new Promise((resolve) => {
                setTimeout(() => resolve({ success: true, message: 'Category created successfully!' }), 1000);
            });
        }

        createCategory(categoryName).then(response => {
            if (response.success) {
                setMessage(response.message);
            } else {
                setMessage('Error creating category');
            }
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Create New Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="categoryName" className="block text-gray-700">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">Create Category</button>
            </form>
            {message && <div className="mt-4 text-center text-green-600">{message}</div>}
        </div>
    );
}

export default CreateCategory;