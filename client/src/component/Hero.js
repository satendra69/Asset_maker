import React, { useState, useEffect } from "react";
import Container from "./Container";
import Lottie from "lottie-react";
import MultiCrousel from "./MultiCrousel";
import httpCommon from "../http-common";
import cloufLottie from "../public/wave.json";

function Hero() {
  const [properties, setProperties] = useState([]);
  const [propertyCounts, setPropertyCounts] = useState({
    Bengaluru: 0,
    Hyderabad: 0,
    Tirupati: 0,
  });
  const [featuredPropertyCounts, setFeaturedPropertyCounts] = useState({
    Bengaluru: 0,
    Hyderabad: 0,
    Tirupati: 0,
  });

  // Fetch properties data
  const getPropertiesData = async () => {
    try {
      const response = await httpCommon.get("/list");
      if (response.data.status === "success") {
        const properties = response.data.data;
        setProperties(properties);
        updatePropertyCounts(properties);
        updateFeaturedPropertyCounts(properties);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updatePropertyCounts = (properties) => {
    const counts = {
      Bengaluru: 0,
      Hyderabad: 0,
      Tirupati: 0,
    };

    properties.forEach((property) => {
      if (property.ltg_regions === "Bengaluru") counts.Bengaluru += 1;
      if (property.ltg_regions === "Hyderabad") counts.Hyderabad += 1;
      if (property.ltg_regions === "Tirupati") counts.Tirupati += 1;
    });

    setPropertyCounts(counts);
  };

  const updateFeaturedPropertyCounts = (properties) => {
    const counts = {
      Bengaluru: 0,
      Hyderabad: 0,
      Tirupati: 0,
    };

    const featuredProperties = properties?.filter(
      (property) =>
        property.ltg_mark_as_featured === "true" &&
        ["Bengaluru", "Hyderabad", "Tirupati"].includes(property.ltg_regions)
    );

    featuredProperties.forEach((property) => {
      if (property.ltg_regions === "Bengaluru") counts.Bengaluru += 1;
      if (property.ltg_regions === "Hyderabad") counts.Hyderabad += 1;
      if (property.ltg_regions === "Tirupati") counts.Tirupati += 1;
    });

    setFeaturedPropertyCounts(counts);
  };

  function formatPrice(price, onlyFormatted = false) {
    if (price == null) {
      return onlyFormatted ? "N/A" : { numeric: 0, formatted: "N/A" };
    }

    const numericPrice = parseFloat(price.replace(/,/g, ""));
    if (isNaN(numericPrice)) {
      return onlyFormatted ? "N/A" : { numeric: 0, formatted: "N/A" };
    }

    let formatted;
    if (numericPrice < 1000) {
      formatted = numericPrice.toString();
    } else if (numericPrice < 100000) {
      formatted = `${(numericPrice / 1000).toFixed(0)} Thousand`;
    } else if (numericPrice < 10000000) {
      const lakhs = numericPrice / 100000;
      formatted = lakhs % 1 === 0 ? `${lakhs.toFixed(0)} Lakhs` : `${lakhs.toFixed(1)} Lakhs`;
    } else {
      const crores = numericPrice / 10000000;
      formatted = crores % 1 === 0 ? `${crores.toFixed(0)} Cr` : `${crores.toFixed(2)} Cr`;
    }

    return onlyFormatted ? formatted : { numeric: numericPrice, formatted };
  }


  const getPropertyDetails = (type, item) => {
    switch (type) {
      case 'CommercialProperties':
        return {
          description: item.ltg_det_comm_prop_desc,
          price: formatPrice(item.ltg_det_comm_prop_sale_price, true),
          suffixPrice: formatPrice(item.ltg_det_comm_prop_suffix_price, true),
          callForPrice: item?.ltg_det_comm_prop_call_for_price,
          bedroom: '', // empty for CommercialProperties
          bathroom: '', // empty for CommercialProperties
          parking: item.ltg_det_comm_prop_pmts_car_parking,
          area: item.ltg_det_comm_prop_pmts_area_dts,
          address: item.ltg_det_comm_prop_address,
          RowID: item.ltg_det_mstRowID,
          type: item.ltg_type,
          featured: item.ltg_mark_as_featured,
        };
      case 'PentHouses':
        return {
          description: item.ltg_det_penthouses_desc,
          price: formatPrice(item.ltg_det_penthouses_sale_price, true),
          suffixPrice: formatPrice(item.ltg_det_penthouses_suffix_price, true),
          callForPrice: item?.ltg_det_penthouses_call_for_price,
          bedroom: item.ltg_det_penthouses_pmts_bed_rooms,
          bathroom: item.ltg_det_penthouses_pmts_bath_rooms,
          parking: item.ltg_det_penthouses_pmts_car_parking,
          area: item.ltg_det_penthouses_pmts_area_dts,
          address: item.ltg_det_penthouses_address,
          RowID: item.ltg_det_mstRowID,
          type: item.ltg_type,
          featured: item.ltg_mark_as_featured,
        };
      case 'Plots':
        return {
          description: item.ltg_det_plot_desc,
          price: formatPrice(item.ltg_det_plot_sale_price, true),
          suffixPrice: formatPrice(item.ltg_det_plot_suffix_price, true),
          callForPrice: item?.ltg_det_plot_call_for_price,
          bedroom: '', // empty for Plots
          bathroom: '', // empty for Plots
          parking: '', // empty for Plots
          area: item.ltg_det_plot_pmts_area_dts,
          address: item.ltg_det_plot_address,
          RowID: item.ltg_det_mstRowID,
          type: item.ltg_type,
          featured: item.ltg_mark_as_featured,
        };
      case 'RowHouses':
        return {
          description: item.ltg_det_row_house_desc,
          price: formatPrice(item.ltg_det_row_house_sale_price, true),
          suffixPrice: formatPrice(item.ltg_det_row_house_suffix_price, true),
          callForPrice: item?.ltg_det_row_house_call_for_price,
          bedroom: item.ltg_det_row_house_pmts_bed_rooms,
          bathroom: item.ltg_det_row_house_pmts_bath_rooms,
          parking: item.ltg_det_row_house_pmts_car_parking,
          area: item.ltg_det_row_house_pmts_area_dts,
          address: item.ltg_det_row_house_address,
          RowID: item.ltg_det_mstRowID,
          type: item.ltg_type,
          featured: item.ltg_mark_as_featured,
        };
      case 'Villaments':
        return {
          description: item.ltg_det_villaments_desc,
          price: formatPrice(item.ltg_det_villaments_sale_price, true),
          suffixPrice: formatPrice(item.ltg_det_villaments_suffix_price, true),
          callForPrice: item?.ltg_det_villaments_call_for_price,
          bedroom: item.ltg_det_villaments_pmts_bed_rooms,
          bathroom: item.ltg_det_villaments_pmts_bath_rooms,
          parking: item.ltg_det_villaments_pmts_car_parking,
          area: item.ltg_det_villaments_pmts_area_dts,
          address: item.ltg_det_villaments_address,
          RowID: item.ltg_det_mstRowID,
          type: item.ltg_type,
          featured: item.ltg_mark_as_featured,
        };
      default:
        return {
          description: item.ltg_det_desc,
          price: formatPrice(item.ltg_det_sale_price, true),
          suffixPrice: formatPrice(item.ltg_det_suffix_price, true),
          callForPrice: item?.ltg_det_call_for_price,
          bedroom: item.ltg_det_pmts_bed_rom,
          bathroom: item.ltg_det_pmts_bth_rom,
          parking: item.ltg_det_pmts_car_park,
          area: item.ltg_det_pmts_area_dts,
          address: item.ltg_det_address,
          RowID: item.ltg_det_mstRowID,
          type: item.ltg_type,
          featured: item.ltg_mark_as_featured,
        };
    }
  };

  const Featured = properties
    .filter(item => item.ltg_mark_as_featured === "true")
    .map((item) => {
      const mainImage = Array.isArray(item.attachments)
        ? item.attachments?.filter(att => att.type === "Main")
        : [];

      const imgUrl = mainImage.length > 0
        ? httpCommon.defaults.baseURL + mainImage[0].attachment
        : httpCommon.defaults.baseURL + '\\images\\defaultasset.jpg';

      // Get the property details based on the type
      const details = getPropertyDetails(item.ltg_type, item);

      return {
        key: item.ltg_det_mstRowID,
        title: item.ltg_title,
        propertyUrl: item.propertyUrl,
        imgUrl: imgUrl,
        ...details,
      };
    });

  useEffect(() => {
    getPropertiesData();
  }, []);

  return (
    <>
      <section className="relative bg-white featured-listings padingm">
        <div className="max-w-4xl mx-auto">
          <Lottie
            animationData={cloufLottie}
            loop={true}
            className="absolute top-0 left-0 right-0"
          />
        </div>
      </section>

      <section className="relative featured-listings">
        <Container className={"space-y-5  md:pt-80 pt-20"}>
          <h2 className="text-center ">Discover Our Featured Listings</h2>
          <p className="text-center ">
            A few properties you can buy with your eyes closed. Properties that
            are verified. Buy with confidence and 100% assurance.
          </p>
          <MultiCrousel data={Featured} details={true} />
        </Container>
      </section>

      <section className="my-10 top-cities">
        <Container className="space-y-3">
          <h2 className="text-xl font-semibold md:text-2xl">Top Cities In India</h2>
          <p className="text-sm md:text-base">Best places to live in India</p>
          <hr className="bg-[#FECE51] w-32 h-1" />

          <div className="grid items-center justify-center grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 py-7">
            <a href="/Cities/Bengaluru" className="place-link">
              <div className="h-auto p-3 bg-white border rounded-md shadow-md md:p-5">
                <img src="/bengaluru.png" alt="Bengaluru" className="object-cover w-full h-24 rounded-md md:h-32" />
                <h3 className="mt-2 text-sm text-center md:text-base">Bengaluru</h3>
                <p className="text-xs font-light text-center md:text-sm">{propertyCounts.Bengaluru} properties</p>
              </div>
            </a>

            <div className="h-auto p-3 bg-white border rounded-md shadow-md md:p-5">
              <img src="/delhi.png" alt="Delhi" className="object-cover w-full h-24 rounded-md md:h-32" />
              <h3 className="mt-2 text-sm text-center md:text-base">Delhi</h3>
              <p className="text-xs font-light text-center md:text-sm">0 properties</p>
            </div>

            <div className="h-auto p-3 bg-white border rounded-md shadow-md md:p-5">
              <img src="/pune.png" alt="Pune" className="object-cover w-full h-24 rounded-md md:h-32" />
              <h3 className="mt-2 text-sm text-center md:text-base">Pune</h3>
              <p className="text-xs font-light text-center md:text-sm">0 properties</p>
            </div>

            <a href="/Cities/Hyderabad" className="place-link">
              <div className="h-auto p-3 bg-white border rounded-md shadow-md md:p-5">
                <img src="/hyderabad.png" alt="Hyderabad" className="object-cover w-full h-24 rounded-md md:h-32" />
                <h3 className="mt-2 text-sm text-center md:text-base">Hyderabad</h3>
                <p className="text-xs font-light text-center md:text-sm">{propertyCounts.Hyderabad} properties</p>
              </div>
            </a>

            <a href="/Cities/Tirupati" className="place-link">
              <div className="h-auto p-3 bg-white border rounded-md shadow-md md:p-5">
                <img src="/tirupati.jpg" alt="Tirupati" className="object-cover w-full h-24 rounded-md md:h-32" />
                <h3 className="mt-2 text-sm text-center md:text-base">Tirupati</h3>
                <p className="text-xs font-light text-center md:text-sm">{propertyCounts.Tirupati} properties</p>
              </div>
            </a>

            <div className="h-auto p-3 bg-white border rounded-md shadow-md md:p-5">
              <img src="/ahmedabad.jpg" alt="Ahmedabad" className="object-cover w-full h-24 rounded-md md:h-32" />
              <h3 className="mt-2 text-sm text-center md:text-base">Ahmedabad</h3>
              <p className="text-xs font-light text-center md:text-sm">0 properties</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-5 my-2 bg-white feature-collection md:my-10">
        <Container className={"space-y-3"}>
          <h2>Featured Collection in Top Cities</h2>
          <p>Curated & Handpicked Properties</p>
          <hr className="bg-[#FECE51] w-32 h-1" />
          <div className="items-center collection md:flex md:gap-5">
            {['Bengaluru', 'Hyderabad', 'Tirupati'].map((region, index) => {
              const imageSrcMap = {
                Bengaluru: "/BeFunky-collage-2023-10-19T142541.707.jpg",
                Hyderabad: "/mumbai_tall_buildings.jpg",
                Tirupati: "/FeatureImage_Top-10-Cheapest-Cities-In-India-20231-732x375.jpg"
              };

              const capitalizedRegion = region.charAt(0).toUpperCase() + region.slice(1);

              return (
                <a href={`/Cities/${capitalizedRegion}`} key={index} className="relative p-1 rounded-md shadow-md md:w-1/3 md:h-72 md:p-4 group md:aspect-auto">
                  <img
                    src={imageSrcMap[region]}
                    className="object-cover w-full h-full transition-all duration-1000 shadow-inner group-hover:blur-sm shadow-black"
                    alt={capitalizedRegion}
                  />
                  <div className="absolute bottom-5 w-[91%] p-4 bg-black opacity-55 group-hover:bg-transparent">
                    <h3 className="text-center text-white">{capitalizedRegion}</h3>
                    <p className="text-xs text-center text-white">
                      {featuredPropertyCounts[region]} properties
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

export default Hero;
