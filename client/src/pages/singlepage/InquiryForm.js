import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import httpCommon from '../../http-common';

const InquiryForm = ({ propertyId, listingType, item }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        address: "",
        purpose: "buy",
    });
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [namePrefix, setNamePrefix] = useState("Mr");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentUser) {
            try {
                const addressMapping = {
                    Plots: item?.ltg_det_plot_address,
                    Villas: item?.ltg_det_address,
                    Apartments: item?.ltg_det_address,
                    RowHouses: item?.ltg_det_row_house_address,
                    Villaments: item?.ltg_det_villaments_address,
                    PentHouses: item?.ltg_det_penthouses_address,
                    CommercialProperties: item?.ltg_det_comm_prop_address,
                };

                const address = item ? addressMapping[item[0].ltg_type] || item[0].ltg_det_address : "Address not available";
                const propertyDetails = `Title: ${item[0]?.ltg_title || "Title not available"}, Address: ${address}`;
                const fullName = `${namePrefix} ${formData.name}`;
                const userId = `User: ${currentUser.username}, Email: ${currentUser.email}`;

                const response = await httpCommon.post('/contact/enquiry', {
                    ...formData,
                    name: fullName,
                    listingType,
                    userId,
                    propertyId,
                    propertyDetails,
                });

                if (response.data.message === "Inquiry submitted successfully") {
                    setSubmitSuccess(true);
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        message: "",
                        address: "",
                        purpose: "buy",
                    });
                }
            } catch (error) {
                console.error("Error submitting inquiry:", error);
                alert('Failed to submit inquiry. Please try again.');
            }
        } else {
            toast.error("Please Sign Up");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center md:flex-row">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg px-4 py-8 bg-gray-100 rounded-lg shadow-lg md:w-1/2"
            >
                <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
                <div className="flex mb-2">
                    <select
                        id="namePrefix"
                        value={namePrefix}
                        onChange={(e) => setNamePrefix(e.target.value)}
                        className="w-1/4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                    >
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                    </select>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-3/4 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="mb-2">
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
                <div className="mb-2">
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
                <div className="mb-2">
                    <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                    >
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                        <option value="lease">Lease</option>
                    </select>
                </div>
                <div className="">
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className="w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:bg-white"
                        required
                    ></textarea>
                </div>
                <div className="mb-2">
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
