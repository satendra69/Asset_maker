import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { FcCallback } from "react-icons/fc";
import { FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import Contactus from "../public/contact-us.json";
import Lottie from "lottie-react";
import Social from "../component/Social";
import ContactForm from "../component/ContactForm";

function ContactUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    // "/property1.jpg",
    // "/property2.jpg",
    "/property4.jpg",
    // "/property5.jpg",
  ];

  const handleImageChange = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {/* Image changing panel */}
      <div className="relative overflow-hidden h-96">
        {/* Image */}
        <img
          src={images[currentImageIndex]}
          alt={`Property ${currentImageIndex + 1}`}
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Previous button */}
        {/* <button
          className="absolute left-0 px-4 py-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2"
          onClick={() => handleImageChange("prev")}
        >
          {"<"}
        </button> */}

        {/* Next button */}
        {/* <button
          className="absolute right-0 px-4 py-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2"
          onClick={() => handleImageChange("next")}
        >
          {">"}
        </button> */}
      </div>

      {/* Contact Us section */}
      <div className="max-w-6xl p-3 py-20 mx-auto space-y-10">
        <div className="flex items-center gap-2">
          <Lottie animationData={Contactus} loop={true} className="w-24" />
          <h2 className="text-3xl ">Contact Us</h2>
        </div>

        <div className="items-start justify-between block mt-10 content-wraper md:flex">
          <div className="flex flex-col items-center justify-center gap-3 p-5 mb-2 mr-2 space-x-5 space-y-5 border rounded-md shadow-md left">
            <p className="text-2xl ">Corporate Office</p>
            <p>
              We deal with properties in many cities and are headquartered in
              Bengaluru, Karnataka, India. You can get in touch with us for any
              query through our address mentioned below. To contact us
              instantly, you can choose to call us or email us.{" "}
            </p>
            <div className="grid grid-cols-1 space-y-5 md:grid-cols-2">
              <motion.div className="flex items-center gap-8">
                <motion.div
                  whileHover={{
                    scale: 1.5,
                    textShadow: "0px 0px 8px #fcfeff",
                    boxShadow: "0px 0px 8px #0c61c9",
                    borderRadius: "50%",
                  }}
                >
                  <FcCallback size={52} />
                </motion.div>

                <div>
                  <p className="font-bold">Call us</p>
                  <p>+91 9243024730</p>
                  <p>+91 7022856908</p>
                </div>
              </motion.div>
              <div className="flex items-center gap-8">
                <motion.div
                  whileHover={{
                    scale: 1.5,
                    textShadow: "0px 0px 8px #fcfeff",
                    boxShadow: "0px 0px 8px #0c61c9",
                    borderRadius: "25%",
                  }}
                >
                  <FaMapMarkerAlt size={52} className="text-[#2196F3]" />
                </motion.div>

                <div>
                  <p className="font-bold">Address</p>
                  <p>
                    #02, Level 5, Dhruti Arcade, Insight Academy Lane,
                    Marathalli, Bengaluru, 560103
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <motion.div
                  whileHover={{
                    scale: 1.5,
                    textShadow: "0px 0px 8px #fcfeff",
                    boxShadow: "0px 0px 8px #0c61c9",
                    borderRadius: "25%",
                  }}
                >
                  <FaEnvelope size={52} className="text-[#2196F3]" />
                </motion.div>

                <div>
                  <p className="font-bold">Email</p>
                  <p>
                    <a href="mailto:info@assetmakers.com">
                      info@assetmakers.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <motion.div
                  whileHover={{
                    scale: 1.5,
                    textShadow: "0px 0px 8px #fcfeff",
                    boxShadow: "0px 0px 8px #0c61c9",
                    borderRadius: "25%",
                  }}
                >
                  <FaClock size={52} className="text-[#2196F3]" />
                </motion.div>

                <div>
                  <p className="font-bold">Working Hours</p>
                  <p>Monday - Friday: 9:30 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center gap-5 p-5 border rounded-md shadow-md">
              <h1 className="text-2xl">RERA License Certification Number</h1>
              <p>PRM/KA/RERA/1251/446/AG/230427/003604</p>
            </div>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3888.4656838973183!2d77.69882092507596!3d12.942025937370644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%2302%2C%20Level%205%2C%20Dhruti%20Arcade%2C%20Insight%20Academy%20Lane%2C%20Marathalli%2C%20Bangalore%2C%20560103!5e0!3m2!1sen!2sin!4v1710156581285!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              style={{
                width: "100%",
                height: "250px",
                marginTop: "20px",
              }}
            ></iframe> */}
          </div>
        </div>

        <ContactForm />
      </div>
      <Social />
    </section>
  );
}

export default ContactUs;
