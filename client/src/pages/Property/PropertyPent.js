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

function PropertyPent() {
  const [allProperties, setAllProperties] = useState([]);
  const [originalProperties, setOriginalProperties] = useState([]);
  const [defaultType] = useState("PentHouses");

  const fetchAllProperties = async (filterParams = {}) => {
    try {
      const response = await httpCommon.get(`/list`, {
        params: filterParams
      });
      console.log("response____AllProperties", response);

      if (response.data.status === "success") {
        setAllProperties(response.data.data);
        setOriginalProperties(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (formData) => {
    let filteredProperties = originalProperties;

    // Filter by search term
    if (formData.search) {
      filteredProperties = filteredProperties.filter((item) =>
        item.ltg_regions.toLowerCase().includes(formData.search.toLowerCase()) ||
        item.ltg_categories.toLowerCase().includes(formData.search.toLowerCase())
      );
    }

    // Filter by location (ltg_regions)
    if (formData.location && formData.location !== 'any') {
      filteredProperties = filteredProperties.filter((item) =>
        item.ltg_regions.toLowerCase() === formData.location.toLowerCase()
      );
    }

    // Filter by type (ltg_categories)
    if (formData.type && formData.type !== 'any') {
      filteredProperties = filteredProperties.filter((item) =>
        item.ltg_categories === formData.type
      );
    }

    // Always set property based on formData before filtering
    const selectedProperty = formData.property || defaultType;

    // Filter by property type (ltg_type)
    if (formData.property && formData.property !== 'any') {
      filteredProperties = filteredProperties.filter((item) =>
        item.ltg_type === selectedProperty
      );
    }

    // Filter by price range (ltg_det_sale_price)
    if (formData.price && (formData.price.min || formData.price.max)) {
      const minPrice = formData.price && formData.price.min !== undefined ? formData.price.min : "";
      const maxPrice = formData.price && formData.price.max !== undefined ? formData.price.max : "";

      filteredProperties = filteredProperties.filter((item) => {
        let salePrice = 0;
        if (item.ltg_type === "CommercialProperties") {
          salePrice = parseInt(item.ltg_det_comm_prop_sale_price, 10);
        }
        else if (item.ltg_type === "PentHouses") {
          salePrice = parseInt(item.ltg_det_penthouses_sale_price, 10);
        }
        else if (item.ltg_type === "RowHouses") {
          salePrice = parseInt(item.ltg_det_row_house_sale_price, 10);
        }
        else if (item.ltg_type === "Plots") {
          salePrice = parseInt(item.ltg_det_plot_sale_price, 10);
        }
        else if (item.ltg_type === "Villaments") {
          salePrice = parseInt(item.ltg_det_villaments_sale_price, 10);
        }
        else {
          salePrice = parseInt(item.ltg_det_sale_price, 10);
        }

        if (minPrice !== "" && maxPrice !== "") {
          return salePrice >= minPrice && salePrice <= maxPrice;
        } else if (minPrice !== "") {
          return salePrice >= minPrice;
        } else if (maxPrice !== "") {
          return salePrice <= maxPrice;
        } else {
          return true;
        }

      });
    }

    // Filter by area range (ltg_det_pmts_area_dts)
    if (formData.area && (formData.area.min || formData.area.max)) {
      const minArea = formData.area && formData.area.min !== undefined ? formData.area.min : "";
      const maxArea = formData.area && formData.area.max !== undefined ? formData.area.max : "";

      filteredProperties = filteredProperties.filter((item) => {
        let areaMatch = 0;
        if (item.ltg_type === "CommercialProperties") {
          areaMatch = item.ltg_det_comm_prop_pmts_area_dts?.match(/(\d+)/);
        }
        else if (item.ltg_type === "PentHouses") {
          areaMatch = item.ltg_det_penthouses_pmts_area_dts?.match(/(\d+)/);
        }
        else if (item.ltg_type === "RowHouses") {
          areaMatch = item.ltg_det_row_house_pmts_area_dts?.match(/(\d+)/);
        }
        else if (item.ltg_type === "Plots") {
          areaMatch = item.ltg_det_plot_pmts_area_dts?.match(/(\d+)/);
        }
        else if (item.ltg_type === "Villaments") {
          areaMatch = item.ltg_det_villaments_pmts_area_dts?.match(/(\d+)/);
        }
        else {
          areaMatch = item.ltg_det_pmts_area_dts?.match(/(\d+)/);
        }

        if (areaMatch) {
          const area = parseInt(areaMatch[0], 10);

          if (minArea !== "" && maxArea !== "") {
            return area >= minArea && area <= maxArea;
          } else if (minArea !== "") {
            return area >= minArea;
          } else if (maxArea !== "") {
            return area <= maxArea;
          } else {
            return true;
          }
        } else {
          return false;
        }

      });
    }

    // Filter by bedrooms (ltg_det_pmts_bed_rom)
    if (formData.bedRooms) {
      filteredProperties = filteredProperties.filter((item) => {
        let bedroom = 0;
        if (item.ltg_type === "PentHouses") {
          bedroom = parseInt(item.ltg_det_penthouses_pmts_bed_rom, 10);
        }
        else if (item.ltg_type === "RowHouses") {
          bedroom = parseInt(item.ltg_det_row_house_pmts_bed_rom, 10);
        }
        else if (item.ltg_type === "Villaments") {
          bedroom = parseInt(item.ltg_det_villaments_pmts_bed_rom, 10);
        }
        else {
          bedroom = parseInt(item.ltg_det_pmts_bed_rom, 10);
        }
        return bedroom >= parseInt(formData.bedRooms, 10);
      });
    }

    // Filter by bathrooms (ltg_det_pmts_bth_rom)
    if (formData.bathRooms) {
      filteredProperties = filteredProperties.filter((item) => {
        let bathroom = 0;
        if (item.ltg_type === "PentHouses") {
          bathroom = parseInt(item.ltg_det_penthouses_pmts_bth_rom, 10);
        }
        else if (item.ltg_type === "RowHouses") {
          bathroom = parseInt(item.ltg_det_row_house_pmts_bth_rom, 10);
        }
        else if (item.ltg_type === "Villaments") {
          bathroom = parseInt(item.ltg_det_villaments_pmts_bth_rom, 10);
        }
        else {
          bathroom = parseInt(item.ltg_det_pmts_bth_rom, 10);
        }
        return bathroom >= parseInt(formData.bathRooms, 10);
      });
    }

    // Filter by status (ltg_det_pmts_status)
    if (formData.status && formData.status !== 'any') {
      filteredProperties = filteredProperties.filter((item) => {
        let status = '';
        if (item.ltg_type === "CommercialProperties") {
          status = item.ltg_det_comm_prop_pmts_status;
        }
        else if (item.ltg_type === "PentHouses") {
          status = item.ltg_det_penthouses_pmts_status;
        }
        else if (item.ltg_type === "RowHouses") {
          status = item.ltg_det_row_house_pmts_status;
        }
        else if (item.ltg_type === "Plots") {
          status = item.ltg_det_plot_pmts_status;
        }
        else if (item.ltg_type === "Villaments") {
          status = item.ltg_det_villaments_pmts_status;
        }
        else {
          status = item.ltg_det_pmts_status;
        }
        return status === formData.status;
      });
    }

    // Filter by amenities
    if (formData.amenities && formData.amenities.length > 0) {
      filteredProperties = filteredProperties.filter((item) => {
        let amenities = [];
        if (item.ltg_type === "CommercialProperties") {
          amenities = item.ltg_det_comm_prop_amenities ? item.ltg_det_comm_prop_amenities.split(', ').map((amenity) => amenity.trim()) : [];
        }
        else if (item.ltg_type === "PentHouses") {
          amenities = item.ltg_penthouses_det_amenities ? item.ltg_det_penthouses_amenities.split(', ').map((amenity) => amenity.trim()) : [];
        }
        else if (item.ltg_type === "RowHouses") {
          amenities = item.ltg_det_row_house_amenities ? item.ltg_dett_row_house_amenities.split(', ').map((amenity) => amenity.trim()) : [];
        }
        else if (item.ltg_type === "Plots") {
          amenities = item.ltg_det_plot_amenities ? item.ltg_det_plot_amenities.split(', ').map((amenity) => amenity.trim()) : [];
        }
        else if (item.ltg_type === "Villaments") {
          amenities = item.ltg_det_villaments_amenities ? item.ltg_det_villaments_amenities.split(', ').map((amenity) => amenity.trim()) : [];
        }
        else {
          amenities = item.ltg_det_amenities ? item.ltg_det_amenities.split(', ').map((amenity) => amenity.trim()) : [];
        }
        return formData.amenities.every((amenity) => amenities.includes(amenity));
      });
    }

    setAllProperties(filteredProperties);
  };

  useEffect(() => {
    fetchAllProperties({ property: defaultType });
  }, []);

  return (
    <>
      <Container>
        <SearchForm
          onFilterChange={handleFilterChange}
          defaultProperty={defaultType}
        />
        {(allProperties).map((item) => (
          <Card item={item} />
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

export default PropertyPent;
