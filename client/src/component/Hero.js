import React, { useState, useEffect, useRef } from "react";
import Container from "./Container";
import SelectPlaceholder from "./Select";
import { TextField } from "@mui/material";
import { Button } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import { FcSearch } from "react-icons/fc";
import SingleCrousel from "./Crousel";
import MultiCrousel from "./MultiCrousel";
import PropertyCard from "./PropertyCard";
import { GiVillage } from "react-icons/gi";
import { FaKeycdn } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import Exploretypes from "./Explore";
import { useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import Lottie from "lottie-react";
import cityLottie from "../public/top-cities.json";
import cloufLottie from "../public/wave.json";
import httpCommon from "../http-common";

function Hero() {
  const [rent, setRent] = React.useState("BUY");
  const [category, setCategory] = useState("Apartments");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [getProperties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    property: "",
    bedroom: "",
  });

  useEffect(() => {
    getproperties();
  }, []);
  // get properties Listing data
  const getproperties = async () => {
    try {
      const response = await httpCommon.get("/list");
      console.log("response____getLabel", response);

      if (response.data.status === "success") {
        setProperties(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log("getProperties___", getProperties);
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const handleRent = (event) => {
    const {
      target: { value },
    } = event;
    setRent(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const heroData = [
    {
      key: 1,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "9000000",
      imgUrl: "/h1.jpg",
    },
    {
      key: 2,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "1000000",
      imgUrl: "/h2.jpg",
    },
    {
      key: 3,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "6000000",
      imgUrl: "/h3.jpg",
    },
  ];
  const appartments = [
    {
      key: 1,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "9000000",
      imgUrl:
        "https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg",
    },
    {
      key: 2,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "1000000",
      imgUrl:
        "https://media.istockphoto.com/id/483773209/photo/new-cozy-cottage.jpg?s=612x612&w=0&k=20&c=y1rwmoHBg-ZoE7L5WkIWjrTmwXofzqIbozTJyftDu1E=",
    },
    {
      key: 3,
      title: "Samanvaya Lotus Lea",
      description: "2455 Area Details 2021 Year Built",
      price: "6000000",
      imgUrl:
        "https://assets.architecturaldigest.in/photos/60083e76274aca243711c3a4/16:9/w_2560%2Cc_limit/ghaziabad-uttar-pradesh-homes-photos-1366x768.jpg",
    },
  ];
  // const Featured = [
  //   {
  //     key: 1,
  //     title: "Samanvaya Lotus Lea",
  //     description: "Downtown, Dubai, UAE",
  //     price: "9000000.00",
  //     imgUrl: "/h1.jpg",
  //   },
  //   {
  //     key: 2,
  //     title: "Spacious & Luxurious",
  //     description: "Downtown, Dubai, UAE",
  //     price: "1000000.00",
  //     imgUrl: "/h2.jpg",
  //   },
  //   {
  //     key: 3,
  //     title: "Samanvaya Lotus Lea",
  //     description: "Downtown, Dubai, UAE",
  //     price: "6000000.00",
  //     imgUrl: "/h3.jpg",
  //   },
  // ];
  // function formatPrice(price) {
  //   // Remove commas from price and parse it as a float
  //   const numericPrice = parseFloat(price.replace(/,/g, ""));

  //   if (numericPrice < 1000) {
  //     return numericPrice;
  //   } else if (numericPrice < 100000) {
  //     return `${(numericPrice / 1000).toFixed(0)}k`;
  //   } else if (numericPrice < 10000000) {
  //     return `${(numericPrice / 100000).toFixed(0)}L`;
  //   } else {
  //     return `${(numericPrice / 10000000).toFixed(0)}CR`;
  //   }
  // }
  // const Featured = getProperties.map((item) => ({
  //   key: item.RowID,
  //   title: item.ltg_title,
  //   description: item.ltg_det_address,
  //   price: formatPrice(item.ltg_det_price),
  //   imgUrl: httpCommon.defaults.baseURL + item.attachment,
  // }));
  function formatPrice(price) {
    if (price == null) {
      return "N/A"; // or any default value you prefer
    }

    // Remove commas from price and parse it as a float
    const numericPrice = parseFloat(price.replace(/,/g, ""));

    if (isNaN(numericPrice)) {
      return "N/A"; // or any default value you prefer
    }

    if (numericPrice < 1000) {
      return numericPrice;
    } else if (numericPrice < 100000) {
      return `${(numericPrice / 1000).toFixed(0)}k`;
    } else if (numericPrice < 10000000) {
      return `${(numericPrice / 100000).toFixed(0)}L`;
    } else {
      return `${(numericPrice / 10000000).toFixed(0)}CR`;
    }
  }

  const Featured = getProperties.map((item) => ({
    key: item.RowID,
    title: item.ltg_title,
    description: item.ltg_det_address,
    price: formatPrice(item.ltg_det_price),
    imgUrl: httpCommon.defaults.baseURL + item.attachment,
  }));

  console.log("httpCommon.defaults.baseURL______", httpCommon.defaults.baseURL);
  const handleCategory = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // const handleSearch
  const handleSearch = () => {
    const encodeFilter = encodeURIComponent(JSON.stringify(filters));
    navigate(`/list/${encodeFilter}`);
  };
  return (
    <>
      <section className=" relative featured-listings padingm bg-white mt-8">
        <Container>
          <Lottie
            animationData={cloufLottie}
            loop={true}
            className="absolute top-0 left-0 right-0"
          />
        </Container>
      </section>
      <section className=" relative featured-listings">
        <Container className={"space-y-5  md:pt-80 pt-20"}>
          <h2 className="text-center  ">Discover Our Featured Listings</h2>
          <p className="text-center ">
            A few properties you can buy with your eyes closed. Properties that
            are verified. Buy with confidence and 100% assurance.
          </p>
          <MultiCrousel data={Featured} details={true} />
        </Container>
      </section>
      {/* <Exploretypes /> */}

      <section className="top-cities my-10 ">
        <Container className={"space-y-3"}>
          <h2>Top Cities In India</h2>
          <p>Best places to live in India</p>
          <hr className="bg-[#FECE51] w-32 h-1" />

          <div className="places py-7 md:flex md:flex-row grid grid-cols-2 gap-1 justify-center md:justify-between items-center md:gap-5 mx-auto">
            <div className="bg-white shadow-md rounded-md w-max  border md:px-8 px-4 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
              <img
                src="/bangalore.png"
                className="object-cover w-full h-[60%] "
              />
              <h3 className="text-center">Bangalore</h3>
              <p className="text-center text-xs font-light">1000+ properties</p>
            </div>
            <div className="bg-white shadow-md rounded-md w-max  border md:px-8 px-4 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
              <img src="/delhi.png" className="object-cover w-full h-[60%] " />
              <h3 className="text-center">Delhi</h3>
              <p className="text-center text-xs font-light">5000+ properties</p>
            </div>
            <div className="bg-white shadow-md rounded-md w-max  border md:px-8 px-4 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
              <img src="/pune.png" className="object-cover w-full h-[60%] " />
              <h3 className="text-center">Pune</h3>
              <p className="text-center text-xs font-light">1000+ properties</p>
            </div>
            <div className="bg-white shadow-md rounded-md w-max  border md:px-8 px-4 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
              <img
                src="/hyderabad.png"
                className="object-cover w-full h-[60%] "
              />
              <h3 className="text-center">Hyderabad</h3>
              <p className="text-center text-xs font-light">1000+ properties</p>
            </div>

            <div className="bg-white shadow-md rounded-md w-max  border md:px-8 px-4 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
              <img
                src="/tripuati.jpg"
                className="object-cover w-full h-[60%] "
              />
              <h3 className="text-center">Triputati</h3>
              <p className="text-center text-xs font-light">1000+ properties</p>
            </div>
            <div className="bg-white shadow-md rounded-md w-max  border md:px-8 px-4 md:h-40 h-28  mx-auto md:mx-0 mb-5 md:mb-0">
              <img
                src="/bangalore.png"
                className="object-cover w-full h-[60%] "
              />
              <h3 className="text-center">Bangalore</h3>
              <p className="text-center text-xs font-light">1000+ properties</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Feature Collection in Top Cities */}
      <section className="feature-collection md:my-10 my-2 bg-white py-5">
        <Container className={"space-y-3"}>
          <h2>Featured Collection in Top Cities</h2>
          <p>Curated & Handpicked Properties</p>
          <hr className="bg-[#FECE51] w-32 h-1" />

          <div className="collection md:flex items-center md:gap-5  ">
            <div className="md:w-1/3 md:h-72  rounded-md shadow-md md:p-4 p-1 group relative  md:aspect-auto">
              <img
                src="https://images.moneycontrol.com/static-mcnews/2023/10/BeFunky-collage-2023-10-19T142541.707.jpg"
                className="h-full w-full object-cover shadow-inner group-hover:blur-sm transition-all duration-1000 shadow-black  "
              />
              <div className="absolute bottom-5 w-[91%] p-4  bg-black opacity-55 group-hover:bg-transparent">
                <h3 className="text-center text-white">Bangalore</h3>
                <p className="text-center text-xs  text-white">
                  1000+ properties
                </p>
              </div>
            </div>
            <div className="md:w-1/3 h-72 md:space-y-3  flex items-center md:block gap-5">
              <div className="h-1/2 w-full rounded-md shadow-md p-2 group relative">
                <img
                  src="https://qph.cf2.quoracdn.net/main-qimg-761eda8931ce2b553ae7618ae8424087.webp"
                  className="h-full w-full object-cover shadow-inner  group-hover:blur-sm transition-all duration-1000"
                />
                <div className="absolute bottom-2 w-[95%] p-1  bg-black opacity-55 group-hover:bg-transparent">
                  <h3 className="text-center text-white">Hyderabad</h3>
                  <p className="text-center text-xs  text-white">
                    12000+ properties
                  </p>
                </div>
              </div>
              <div className="h-1/2 w-full rounded-md shadow-md p-1 group relative">
                <img
                  src="https://homebazaar-blog.s3.ap-south-1.amazonaws.com/knowledge/wp-content/uploads/2023/05/11104405/FeatureImage_Top-10-Cheapest-Cities-In-India-20231-732x375.jpg"
                  className="h-full w-full object-cover shadow-inner shadow-black group-hover:blur-sm transition-all duration-1000"
                />
                <div className="absolute bottom-1 w-[97%] p-1  bg-black opacity-55 group-hover:bg-transparent">
                  <h3 className="text-center text-white">Triputai</h3>
                  <p className="text-center text-xs  text-white">
                    1000+ properties
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 md:h-72  rounded-md shadow-md p-4 group relative ">
              <img
                src="https://homebazaar-blog.s3.ap-south-1.amazonaws.com/knowledge/wp-content/uploads/2023/05/12054434/Bangalore.jpg"
                className="h-full w-full object-cover shadow-inner shadow-black group-hover:blur-sm transition-all duration-1000"
              />
              <div className="absolute bottom-5 w-[91%]  p-4  bg-black opacity-55 group-hover:bg-transparent">
                <h3 className="text-center text-white">Bangalore</h3>
                <p className="text-center text-xs  text-white">
                  1000+ properties
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Hero;
