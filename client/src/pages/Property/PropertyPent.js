import React, { useEffect, useState } from "react";
import { listData } from "../../dummy/dummy";
import Card from "../../component/card/card";
import Container from "../../component/Container";
import SearchForm from "../../component/search/search";
import { useParams } from "react-router-dom";
import httpCommon from "../../http-common";
import Social from "../../component/Social";
import { FaSellsy } from "react-icons/fa6";
import { MdAddHome } from "react-icons/md";
import { IoMdHappy } from "react-icons/io";
import { FaRegHandshake } from "react-icons/fa";


function PropertyPent() {
  const [filteredData, setFilteredData] = useState(listData);
  const [PentHousesData, setPentHousesData] = useState([]);
  const { filters } = useParams();

  const type = "PentHouses";

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (filterParams = {}) => {
    try {
      const response = await httpCommon.get(`/list/Propperty/${type}`, {
        params: filterParams
      });
      //console.log("response____Propperty", response);

      if (response.data.status === "success") {
        setPentHousesData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (formData) => {
    const filtered = listData.filter((item) => {
      const name = item.name ? item.name.toLowerCase() : '';
      const location = item.location ? item.location.toLowerCase() : '';
      const type = item.type ? item.type.toLowerCase() : '';
      const property = item.property ? item.property.toLowerCase() : '';
      const price = item.price ? item.price.toString() : '';
      const bedrooms = item.bedrooms ? item.bedrooms.toString() : '';

      return (
        name.includes(formData.search.toLowerCase()) &&
        (formData.location ? location.includes(formData.location.toLowerCase()) : true) &&
        (formData.type === "any" || type === formData.type.toLowerCase()) &&
        (formData.property === "any" || property === formData.property.toLowerCase()) &&
        (formData.minPrice === "" || parseInt(price) >= parseInt(formData.minPrice)) &&
        (formData.maxPrice === "" || parseInt(price) <= parseInt(formData.maxPrice)) &&
        (formData.bedroom === "" || parseInt(bedrooms) === parseInt(formData.bedroom))
      );
    });

    setFilteredData(filtered);
  };

  return (
    <>
      <Container>
              <SearchForm onFilterChange={handleFilterChange} />
              {PentHousesData.map((item) => (
                <Card key={item.id} item={item} />
              ))}
      </Container>
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
    </>
  );
}

export default PropertyPent;
