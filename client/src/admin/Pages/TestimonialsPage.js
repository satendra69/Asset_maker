import React, { useState, useEffect, useRef } from "react";
import { FaList, FaEdit, FaTrashAlt, FaStar } from "react-icons/fa";
import httpContent from "../../http-content";

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [testimonialForm, setTestimonialForm] = useState({
        name: "",
        designation: "",
        message: "",
        rating: 5,
    });
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [photo, setPhoto] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await httpContent.get("/testimonials");
            setTestimonials(response.data);
            if (editingTestimonial) {
                const testimonialToEdit = response.data.find(t => t.id === editingTestimonial.id);
                if (testimonialToEdit) {
                    setTestimonialForm({
                        name: testimonialToEdit.name,
                        designation: testimonialToEdit.designation,
                        message: testimonialToEdit.message,
                        rating: testimonialToEdit.rating,
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching testimonials", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTestimonialForm({ ...testimonialForm, [name]: value });
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", testimonialForm.name);
        formData.append("designation", testimonialForm.designation);
        formData.append("message", testimonialForm.message);
        formData.append("rating", testimonialForm.rating);
        if (photo) {
            formData.append("photo", photo);
        } else {
            console.log("No photo to append.");
        }

        try {
            if (editingTestimonial) {
                await httpContent.patch(`/testimonials/${editingTestimonial.id}`, formData);
            } else {
                await httpContent.post("/testimonials", formData);
            }
            fetchTestimonials();
            resetForm();
        } catch (error) {
            console.error("Error saving testimonial", error);
        }
    };

    const resetForm = () => {
        setTestimonialForm({ name: "", designation: "", message: "", rating: 5 });
        setEditingTestimonial(null);
        setPhoto(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleEdit = (testimonial) => {
        setEditingTestimonial(testimonial);
        setTestimonialForm({
            name: testimonial.name,
            designation: testimonial.designation,
            message: testimonial.message,
            rating: testimonial.rating,
        });
    };

    const handleDelete = async (id) => {
        try {
            await httpContent.delete(`/testimonials/${id}`);
            fetchTestimonials();
        } catch (error) {
            console.error("Error deleting testimonial", error);
        }
    };

    return (
        <div className="p-4 mx-auto">
            <div className="h-[90vh] overflow-y-scroll px-10">
                <div className="flex flex-wrap">
                    <div className="w-full mb-4 lg:w-1/3 lg:mb-0 lg:pr-4">
                        <h2 className="flex items-center mb-4 text-xl font-bold">
                            Testimonial Form
                        </h2>
                        <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={testimonialForm.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={testimonialForm.designation}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter designation"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Message</label>
                                <textarea
                                    name="message"
                                    value={testimonialForm.message}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter message"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Rating</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={testimonialForm.rating}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter rating (1-5)"
                                    required
                                    min="1"
                                    max="5"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Photo</label>
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handlePhotoChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    accept="image/*"
                                    ref={fileInputRef}
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                                    {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="w-full lg:w-2/3">
                        <h2 className="flex items-center mb-4 text-xl font-bold">
                            <FaList className="mr-2" /> Testimonials List
                        </h2>
                        <ul className="flex flex-col gap-4">
                            {testimonials.map((testimonial) => (
                                <li
                                    key={testimonial.id}
                                    className="flex items-center justify-between p-4 bg-white rounded shadow-md"
                                >
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p>{testimonial.designation}</p>
                                        <p className="my-2">{testimonial.message}</p>
                                        <p className="flex items-center">
                                            <FaStar className="mr-2 text-yellow-500" /> {testimonial.rating}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            className="text-blue-500"
                                            onClick={() => handleEdit(testimonial)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleDelete(testimonial.id)}
                                        >
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

export default TestimonialsPage;
