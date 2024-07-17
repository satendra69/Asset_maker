import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpCommon from "../../http-common";
import Container from "../../component/Container";
import SearchForm from "../../component/search/search";
import Card from "../../component/card/card";
import Social from "../../component/Social";
import { FaSellsy } from "react-icons/fa6";
import { MdAddHome } from "react-icons/md";
import { IoMdHappy } from "react-icons/io";
import { FaRegHandshake } from "react-icons/fa";

function PropertyApartment() {
  const [properties, setProperties] = useState([]);
  const type = "Apartments";

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (filterParams = {}) => {
    try {
      const response = await httpCommon.get(`/list/listing/${type}`, {
        params: filterParams
      });
      //console.log("response____Property", response);

      if (response.data.status === "success") {
        setProperties(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (newFilters) => {
    fetchProperties(newFilters);
  };

  return (
    <>
      <Container>
        <SearchForm onFilterChange={handleFilterChange} />
        {properties.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </Container>
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
                <h2 className="text-white price">2,000 +</h2>
                <p className="text-white description">Properties Sold</p>
              </div>
            </div>
            <div className="flex items-center gap-5 2">
              <MdAddHome className="text-blue-700" size={42} />
              <div>
                <h2 className="text-white price">80 +</h2>
                <p className="text-white description">Projects Handled</p>
              </div>
            </div>
            <div className="flex items-center gap-5 3">
              <IoMdHappy className="text-blue-700" size={42} />
              <div>
                <h2 className="text-white price">400 +</h2>
                <p className="text-white description">NRI Clientele Served</p>
              </div>
            </div>
            <div className="flex items-center gap-5 3">
              <FaRegHandshake className="text-blue-700" size={42} />
              <div>
                <h2 className="text-white price">150 +</h2>
                <p className="text-white description">Satisfied Builders</p>
              </div>
            </div>
          </div>
        </Container>

        <hr className="" />
      </section>
      <Social />
    </>
  );
}

export default PropertyApartment;
