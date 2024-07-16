import React, { useState, useEffect } from "react";
import Container from "../../component/Container";
import Apart from "../../component/Apart";
import Patners from "../../component/EnChoose/Patners";
import EnquiryChoose from "../../component/EnChoose/EnquiryChoose";
import Social from "../../component/Social";
import { FaSellsy } from "react-icons/fa6";
import { MdAddHome } from "react-icons/md";
import { IoMdHappy } from "react-icons/io";
import { FaRegHandshake } from "react-icons/fa";


const CitiesBangalore = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/tirupati2.jpg",
    "/tirupati1.jpg",
    // "/tirupati3.jpg",
    // "/tirupati4.jpg",
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
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ position: "relative", width: "100%", textAlign: "center" }}>
        {/* Image changing panel */}
        <div className="relative h-96 overflow-hidden">
          {/* Image */}
          <img
            src={images[currentImageIndex]}
            alt={`Property ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Previous button */}
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-black bg-opacity-50 text-white"
            onClick={() => handleImageChange("prev")}
          >
            {"<"}
          </button>

          {/* Next button */}
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-black bg-opacity-50 text-white"
            onClick={() => handleImageChange("next")}
          >
            {">"}
          </button>
        </div>

        {/* Text on top of the image */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "45px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            zIndex: "1", // Ensure text appears above the image changing panel
          }}
        >
          Properties in Tirupati
        </div>
      </div>

      {/* <Exploretypes /> */}
      {/* <Exploretypes /> */}
      <section className="top-cities my-10 ">
        <Container className={"space-y-3"}>
          <h2>Browse by Property Type</h2>
          <p>Best places to live in India</p>
          <hr className="bg-[#FECE51] w-32 h-1" />

          <div className="places py-7 md:flex md:flex-row grid grid-cols-2 gap-1 justify-center md:justify-between items-center md:gap-5 mx-auto">
            <a href="/list" className="place-link">
              <div className="bg-white shadow-md rounded-md w-max  border md:px-3 px-1 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
                <img
                  src="/apartment.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Apartments</h3>
                <p className="text-center text-xs font-light">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="bg-white shadow-md rounded-md w-max  border md:px-3 px-1 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
                <img
                  src="/villas.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Villas</h3>
                <p className="text-center text-xs font-light">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="bg-white shadow-md rounded-md w-max  border md:px-3 px-1 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
                <img
                  src="/villaments.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Villaments</h3>
                <p className="text-center text-xs font-light">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div
                className="bg-white shadow-md rounded-md w-max  border md:px-3 px-1 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0"
                style={{ maxWidth: "200px" }}
              >
                <img
                  src="/row.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center text-sm md:text-base">
                  Row&nbsp;Houses
                </h3>
                <p className="text-center text-xs font-light">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="bg-white shadow-md rounded-md w-max  border md:px-3 px-1 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
                <img
                  src="/commercial.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">
                  Commercial
                  <br />
                  Properties
                </h3>
                <p className="text-center text-xs font-light">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="bg-white shadow-md rounded-md w-max  border md:px-3 px-1 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
                <img
                  src="/plots.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Plots</h3>
                <p className="text-center text-xs font-light">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="bg-white shadow-md rounded-md w-max  border md:px-3 px-1 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
                <img
                  src="/pent.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Pent&nbsp;Houses</h3>
                <p className="text-center text-xs font-light">
                  1000+ properties
                </p>
              </div>
            </a>
          </div>
        </Container>
      </section>
      <Apart />
      <EnquiryChoose />
      <Patners />
      <section className="footerPatner  bg-[#1C1C1E] ">
        <Container
          className={
            "md:py-20 flex flex-col md:flex-row items-center justify-between"
          }
        >
          <div className="left md:w-1/2 w-full md:pr-10">
            <h2 className="text-white font-bold text-4xl md:text-5xl mb-4">
              More than 10 Years of Experience
            </h2>
            <hr className="w-20 h-1 bg-blue-800 mb-4" />
            <p className="text-white">
              It’s not what we do, but how we do it that sets us apart. Get in
              touch with us today to experience our holistic services that will
              put you a step closer to your dream home.
            </p>
          </div>
          <div className="right md:w-1/2 w-full grid md:grid-cols-2 grid-cols-1 gap-7 mt-10 md:mt-0">
            <div className="1 flex items-center gap-5">
              <FaSellsy className="text-blue-700" size={42} />
              <div>
                <h2 className="price text-white">2,000 +</h2>
                <p className="description text-white">Properties Sold</p>
              </div>
            </div>
            <div className="2 flex items-center gap-5">
              <MdAddHome className="text-blue-700" size={42} />
              <div>
                <h2 className="price text-white">80 +</h2>
                <p className="description text-white">Projects Handled</p>
              </div>
            </div>
            <div className="3 flex items-center gap-5">
              <IoMdHappy className="text-blue-700" size={42} />
              <div>
                <h2 className="price text-white">400 +</h2>
                <p className="description text-white">NRI Clientele Served</p>
              </div>
            </div>
            <div className="3 flex items-center gap-5">
              <FaRegHandshake className="text-blue-700" size={42} />
              <div>
                <h2 className="price text-white">150 +</h2>
                <p className="description text-white">Satisfied Builders</p>
              </div>
            </div>
          </div>
        </Container>

        <hr className="" />
      </section>
      <Social />
    </div>
  );
};

export default CitiesBangalore;
