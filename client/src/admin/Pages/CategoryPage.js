import React, { useState, useEffect } from "react";
import { FaList, FaMapMarkedAlt, FaEdit, FaTrashAlt } from "react-icons/fa";
import httpCommon from "../../http-common";

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [categoryForm, setCategoryForm] = useState({
        name: "",
        description: "",
        parentCategory: "",
        listingType: "",
    });
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await httpCommon.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryForm({ ...categoryForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            if (editingCategory) {
                await httpCommon.patch(`/categories/${editingCategory.id}`, categoryForm, config);
            } else {
                await httpCommon.post("/categories", categoryForm, config);
            }
            fetchCategories();
            setCategoryForm({ name: "", description: "", parentCategory: "", listingType: "" });
            setEditingCategory(null);
        } catch (error) {
            console.error("Error saving category", error);
        }
    };

    const handleEdit = (category) => {
        setCategoryForm(category);
        setEditingCategory(category);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await httpCommon.delete(`/categories/${id}`, config);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category", error);
        }
    };

    return (
        <div className="p-4 mx-auto">
            <div className="h-[90vh] overflow-y-scroll px-10">
                <div className="flex flex-wrap">
                    <div className="w-full mb-4 lg:w-1/3 lg:mb-0 lg:pr-4">
                        <h2 className="flex items-center mb-4 text-xl font-bold">
                            <FaMapMarkedAlt className="mr-2" /> Category Form
                        </h2>
                        <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={categoryForm.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter category name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Description</label>
                                <textarea
                                    name="description"
                                    value={categoryForm.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter category description"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Parent Category</label>
                                <select
                                    name="parentCategory"
                                    value={categoryForm.parentCategory}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="" disabled>
                                        Select Parent Category
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Listing Type</label>
                                <select
                                    name="listingType"
                                    value={categoryForm.listingType}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="" disabled>
                                        Select Property Type
                                    </option>
                                    <option value="Apartments">Apartments</option>
                                    <option value="Villas">Villas</option>
                                    <option value="Plots">Plots</option>
                                    <option value="RowHouses">Row Houses</option>
                                    <option value="CommercialProperties">Commercial Properties</option>
                                    <option value="Villaments">Villaments</option>
                                    <option value="PentHouses">Pent Houses</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </form>
                    </div>
                    <div className="w-full lg:w-2/3 lg:pl-4">
                        <h2 className="flex items-center mb-4 text-xl font-bold">
                            <FaList className="mr-2" /> Categories
                        </h2>
                        <ul className="p-4 bg-white rounded shadow-md">
                            {categories.map((category) => (
                                <li key={category.id} className="flex items-center justify-between p-2 mb-2 border-b border-gray-300">
                                    <span>{category.name}</span>
                                    <div>
                                        <button className="mr-2 text-blue-500 hover:text-blue-700" onClick={() => handleEdit(category)}>
                                            <FaEdit />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(category.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
