import React, { useState } from "react";
import httpCommon from '../../http-common';

const InquiryForm = ({ propertyId, listingType }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await httpCommon.post('/contact/enquiry', {
                ...formData,
                listingType,
                propertyId,
            });
            if (response.data.message === "Inquiry submitted successfully") {
                setSubmitSuccess(true);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    message: "",
                });
            }
        } catch (error) {
            console.error("Error submitting inquiry:", error);
            alert('Failed to submit inquiry. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center md:flex-row">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg px-4 py-8 bg-gray-100 rounded-lg shadow-lg md:w-1/2"
            >
                <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email Address"
                        className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone"
                        className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Submit
                </button>
                {submitSuccess && (
                    <div className="mt-4 text-green-600">
                        Inquiry submitted successfully!
                    </div>
                )}
            </form>
            <div className="hidden md:block md:w-1/2">
                <img
                    src="/call.png"
                    alt="Contact Illustration"
                    className="w-full"
                    style={{ background: "transparent" }}
                />
            </div>
        </div>
    );
};

export default InquiryForm;
