import React, { useState } from "react";

import { FaHome, FaMoneyBillWave, FaHandshake } from 'react-icons/fa';
import { GiTeamIdea } from 'react-icons/gi';
import Container from "../Container";
import httpCommon from "../../http-common";

const EnquiryChoose = () => {
  const [formData, setFormData] = useState({
    inquiryType: "",
    namePrefix: "",
    name: "",
    email: "",
    maxPrice: "",
    minSize: "",
    phone: "",
    message: "",
    listingType: "",
    propertyId: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await httpCommon.post('/contact/cityEnquiry', formData);
      console.log(response.data.message);
      setSuccessMessage("Inquiry submitted successfully!");
      setFormData({
        inquiryType: "",
        namePrefix: "",
        name: "",
        email: "",
        maxPrice: "",
        minSize: "",
        phone: "",
        message: "",
        listingType: "",
        propertyId: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container>
      <section className="mb-10 -mt-16 md:mt-5">
        <div className="flex flex-wrap">
          {/* Enquiry Form Section */}
          <div className="w-full mb-8 md:w-6/12 md:px-6">
            <div className="p-6 bg-white border rounded-md shadow-2xl">
              <h2 className="mb-2 text-4xl font-bold text-center">
                Real Estate Inquiry Form
              </h2>
              <form className="w-full" onSubmit={handleSubmit}>
                {/* Inquiry Type */}
                <div className="mb-2">
                  <label className="block mb-1 text-xs font-bold tracking-wide uppercase" htmlFor="inquiryType">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded focus:outline-none"
                  >
                    <option>Select</option>
                    <option>Property Seeker</option>
                    <option>Property Seller</option>
                    <option>Acquaintance</option>
                    <option>Careers</option>
                  </select>
                </div>

                {/* Listing Type - Conditional Render */}
                {(formData.inquiryType === "Property Seller" || formData.inquiryType === "Property Seeker") && (
                  <div className="mb-2">
                    <label className="block mb-1 text-xs font-bold tracking-wide uppercase" htmlFor="listingType">
                      Listing Type
                    </label>
                    <select
                      id="listingType"
                      name="listingType"
                      value={formData.listingType}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded focus:outline-none"
                    >
                      <option>Select Listing Type</option>
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>Commercial</option>
                      <option>Plot</option>
                      <option>Row House</option>
                      <option>Penthouse</option>
                    </select>
                  </div>
                )}

                {/* Personal Info */}
                <div className="flex flex-wrap">
                  <div className="w-full mb-2 md:w-1/2">
                    <label className="block mb-1 text-xs font-bold tracking-wide uppercase" htmlFor="namePrefix">
                      Name
                    </label>
                    <div className="flex">
                      <select
                        id="namePrefix"
                        name="namePrefix"
                        value={formData.namePrefix}
                        onChange={handleChange}
                        className="block w-1/3 px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l"
                      >
                        <option>Mr</option>
                        <option>Ms</option>
                        <option>Mrs</option>
                      </select>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-2/3 px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded-r"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  <div className="w-full mb-2 md:w-1/2 md:pl-2">
                    <label className="block mb-1 text-xs font-bold tracking-wide uppercase" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded-r"
                      placeholder="Your Phone Number"
                    />
                  </div>
                  <div className="w-full mb-2">
                    <label className="block mb-1 text-xs font-bold tracking-wide uppercase" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="w-full mb-2 md:w-1/2 md:pr-2">
                    <label className="block mb-1 text-xs font-bold tracking-wide uppercase" htmlFor="maxPrice">
                      Max Price
                    </label>
                    <input
                      id="maxPrice"
                      name="maxPrice"
                      type="text"
                      value={formData.maxPrice}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded"
                      placeholder="Max Price"
                    />
                  </div>
                  <div className="w-full mb-2 md:w-1/2 md:pl-2">
                    <label className="block mb-1 text-xs font-bold tracking-wide uppercase" htmlFor="minSize">
                      Minimum Size (Sq Ft)
                    </label>
                    <input
                      id="minSize"
                      name="minSize"
                      type="text"
                      value={formData.minSize}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded"
                      placeholder="Minimum Size"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-xs font-bold tracking-wide uppercase" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter Your Message"
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-400 rounded"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white transition duration-200 rounded-md bg-slate-900 hover:bg-slate-950"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {successMessage && (
                <p className="mt-4 text-center text-green-500">{successMessage}</p>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full md:w-6/12">
            <div className="flex flex-col p-6 bg-gray-100 border rounded-md shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-center">Why Choose Us</h2>
              <div className="flex flex-col">
                <div className="flex items-center p-4 mb-4 bg-white border rounded-md shadow">
                  <FaHome className="text-teal-500" size={30} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Wide Range of Properties</h3>
                    <p>We have a variety of options for every buyer.</p>
                  </div>
                </div>
                <div className="flex items-center p-4 mb-4 bg-white border rounded-md shadow">
                  <GiTeamIdea className="text-teal-500" size={30} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Team of Experts</h3>
                    <p>Our proactive team will assist you in selecting the property that best fits you.</p>
                  </div>
                </div>
                <div className="flex items-center p-4 mb-4 bg-white border rounded-md shadow">
                  <FaMoneyBillWave className="text-teal-500" size={30} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Financing Made Easy</h3>
                    <p>We offer properties at competitive rates with flexible financing options.</p>
                  </div>
                </div>
                <div className="flex items-center p-4 mb-4 bg-white border rounded-md shadow">
                  <FaHandshake className="text-teal-500" size={30} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Trusted by Thousands</h3>
                    <p>Join over 1108 satisfied clients who have trusted us with their property needs.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default EnquiryChoose;
