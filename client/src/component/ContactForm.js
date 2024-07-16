import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <form className="w-full md:w-1/2 max-w-lg px-4 py-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none focus:bg-white"
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
            className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none focus:bg-white"
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
            className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none focus:bg-white"
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
            className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none focus:bg-white"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="w-full px-3 py-2 rounded-md bg-gray-200 focus:outline-none focus:bg-white"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
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

export default ContactForm;
