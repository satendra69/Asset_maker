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


const CitiesTirupati = () => {
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
        <div className="relative overflow-hidden h-96">
          {/* Image */}
          <img
            src={images[currentImageIndex]}
            alt={`Property ${currentImageIndex + 1}`}
            className="absolute inset-0 object-cover w-full h-full"
          />

          {/* Previous button */}
          <button
            className="absolute left-0 px-4 py-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2"
            onClick={() => handleImageChange("prev")}
          >
            {"<"}
          </button>

          {/* Next button */}
          <button
            className="absolute right-0 px-4 py-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 top-1/2"
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
      <section className="my-10 top-cities ">
        {/* <Container className={"space-y-3"}>
          <h2>Browse by Property Type</h2>
          <p>Best places to live in India</p>
          <hr className="bg-[#FECE51] w-32 h-1" />

          <div className="grid items-center justify-center grid-cols-2 gap-1 mx-auto places py-7 md:flex md:flex-row md:justify-between md:gap-5">
            <a href="/list" className="place-link">
              <div className="px-1 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-3 md:h-40 h-28 md:mx-0 md:mb-0">
                <img
                  src="/apartment.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Apartments</h3>
                <p className="text-xs font-light text-center">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="px-1 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-3 md:h-40 h-28 md:mx-0 md:mb-0">
                <img
                  src="/villas.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Villas</h3>
                <p className="text-xs font-light text-center">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="px-1 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-3 md:h-40 h-28 md:mx-0 md:mb-0">
                <img
                  src="/villaments.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Villaments</h3>
                <p className="text-xs font-light text-center">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div
                className="px-1 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-3 md:h-40 h-28 md:mx-0 md:mb-0"
                style={{ maxWidth: "200px" }}
              >
                <img
                  src="/row.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-sm text-center md:text-base">
                  Row&nbsp;Houses
                </h3>
                <p className="text-xs font-light text-center">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="px-1 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-3 md:h-40 h-28 md:mx-0 md:mb-0">
                <img
                  src="/commercial.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">
                  Commercial
                  <br />
                  Properties
                </h3>
                <p className="text-xs font-light text-center">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="px-1 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-3 md:h-40 h-28 md:mx-0 md:mb-0">
                <img
                  src="/plots.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Plots</h3>
                <p className="text-xs font-light text-center">
                  1000+ properties
                </p>
              </div>
            </a>
            <a href="/list" className="place-link">
              <div className="px-1 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-3 md:h-40 h-28 md:mx-0 md:mb-0">
                <img
                  src="/pent.png"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Pent&nbsp;Houses</h3>
                <p className="text-xs font-light text-center">
                  1000+ properties
                </p>
              </div>
            </a>
          </div>
        </Container> */}
          <Container className="space-y-3">
          <h2 className="text-lg font-semibold text-center md:text-left">Browse by Property Type</h2>
          <p className="text-center md:text-left">Best places to live in India</p>
          <hr className="bg-[#FECE51] w-32 h-1 mx-auto md:mx-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto py-7">
            {[
              { img: "/apartment.png", title: "Apartments" },
              { img: "/villas.png", title: "Villas" },
              { img: "/villaments.png", title: "Villaments" },
              { img: "/row.png", title: "Row Houses" },
              { img: "/commercial.png", title: "Commercial Properties" },
              { img: "/plots.png", title: "Plots" },
              { img: "/pent.png", title: "Pent Houses" },
            ].map(({ img, title }, index) => (
              <a href="#" key={index} className="place-link">
                <div className="bg-white border rounded-md shadow-md max-w-xs w-full mx-auto p-3 h-40 flex flex-col items-center">
                  <img src={img} className="object-cover w-full h-[60%]" alt={title}  style={{ objectFit: "contain", width: "100%", height: "60%" }}  />
                  
                  <h3 className="text-center text-sm md:text-base">{title}</h3>
                  <p className="text-xs font-light text-center">1000+ properties</p>
                </div>
              </a>
            ))}
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
          <div className="w-full left md:w-1/2 md:pr-10">
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              More than 10 Years of Experience
            </h2>
            <hr className="w-20 h-1 mb-4 bg-blue-800" />
            <p className="text-white">
              It’s not what we do, but how we do it that sets us apart. Get in
              touch with us today to experience our holistic services that will
              put you a step closer to your dream home.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 mt-10 right md:w-1/2 md:grid-cols-2 gap-7 md:mt-0">
            <div className="flex items-center gap-5 1">
              <FaSellsy className="text-blue-700" size={42} />
              <div>
                <h2 className="text-white price">3500 +</h2>
                <p className="text-white description">Properties Sold</p>
              </div>
            </div>
            <div className="flex items-center gap-5 2">
              <MdAddHome className="text-blue-700" size={42} />
              <div>
                <h2 className="text-white price">230 +</h2>
                <p className="text-white description">Projects Handled</p>
              </div>
            </div>
            <div className="flex items-center gap-5 3">
              <IoMdHappy className="text-blue-700" size={42} />
              <div>
                <h2 className="text-white price">400 +</h2>
                <p className="text-white description">NRI Clients Served</p>
              </div>
            </div>
            <div className="flex items-center gap-5 3">
              <FaRegHandshake className="text-blue-700" size={42} />
              <div>
                <h2 className="text-white price">40 +</h2>
                <p className="text-white description">Builders, Marketing Partners</p>
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

export default CitiesTirupati;
