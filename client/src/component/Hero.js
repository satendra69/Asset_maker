import React, { useState, useEffect } from "react";
import Container from "./Container";
import Lottie from "lottie-react";
import MultiCrousel from "./MultiCrousel";
import httpCommon from "../http-common";
import cityLottie from "../public/top-cities.json";
import cloufLottie from "../public/wave.json";

function Hero() {
  const [properties, setProperties] = useState([]);
  const [propertyCounts, setPropertyCounts] = useState({
    bengaluru: 0,
    hyderabad: 0,
    tirupati: 0,
  });
  const [featuredPropertyCounts, setFeaturedPropertyCounts] = useState({
    bengaluru: 0,
    hyderabad: 0,
    tirupati: 0,
  });
  const [storedMainImage, setStoredMainImage] = useState([]);

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


  // Fetch images and brochures
  const getImagesData = async () => {
    try {
      const imgResponse = await httpCommon.get(`/list/images/`);
      if (imgResponse.data.status === "success") {
        const imageData = imgResponse.data.data;

        // Separate gallery and brochure data
        const mainImageData = imageData.filter(item => item.type === "Main");

        // Set images and brochures
        setStoredMainImage(mainImageData);
      } else {
        console.error("Error fetching image data: Response status not successful");
      }
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  }

  const updatePropertyCounts = (properties) => {
    const counts = {
      bengaluru: 0,
      hyderabad: 0,
      tirupati: 0,
    };

    properties.forEach((property) => {
      if (property.ltg_regions === "bengaluru") counts.bengaluru += 1;
      if (property.ltg_regions === "hyderabad") counts.hyderabad += 1;
      if (property.ltg_regions === "tirupati") counts.tirupati += 1;
    });

    setPropertyCounts(counts);
  };

  const updateFeaturedPropertyCounts = (properties) => {
    const counts = {
      bengaluru: 0,
      hyderabad: 0,
      tirupati: 0,
    };

    const featuredProperties = properties.filter(
      (property) =>
        property.ltg_mark_as_featured === "true" &&
        ["bengaluru", "hyderabad", "tirupati"].includes(property.ltg_regions)
    );

    featuredProperties.forEach((property) => {
      if (property.ltg_regions === "bengaluru") counts.bengaluru += 1;
      if (property.ltg_regions === "hyderabad") counts.hyderabad += 1;
      if (property.ltg_regions === "tirupati") counts.tirupati += 1;
    });

    setFeaturedPropertyCounts(counts);
  };

  function formatPrice(price) {
    if (price == null) {
      return "N/A";
    }

    const numericPrice = parseFloat(price.replace(/,/g, ""));

    if (isNaN(numericPrice)) {
      return "N/A";
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

  const getPropertyDetails = (type, item) => {
    switch (type) {
      case 'CommercialProperties':
        return {
          description: item.ltg_det_comm_prop_desc,
          price: formatPrice(item.ltg_det_comm_prop_sale_price),
          bedroom: '', // empty for CommercialProperties
          bathroom: '', // empty for CommercialProperties
          parking: item.ltg_det_comm_prop_pmts_car_parking,
          area: item.ltg_det_comm_prop_pmts_area_dts,
          address: item.ltg_det_comm_prop_address,
        };
      case 'PentHouses':
        return {
          description: item.ltg_det_penthouses_desc,
          price: formatPrice(item.ltg_det_penthouses_sale_price),
          bedroom: item.ltg_det_penthouses_pmts_bed_rooms,
          bathroom: item.ltg_det_penthouses_pmts_bath_rooms,
          parking: item.ltg_det_penthouses_pmts_car_parking,
          area: item.ltg_det_penthouses_pmts_area_dts,
          address: item.ltg_det_penthouses_address,
        };
      case 'Plots':
        return {
          description: item.ltg_det_plot_desc,
          price: formatPrice(item.ltg_det_plot_sale_price),
          bedroom: '', // empty for Plots
          bathroom: '', // empty for Plots
          parking: '', // empty for Plots
          area: item.ltg_det_plot_pmts_area_dts,
          address: item.ltg_det_plot_address,
        };
      case 'RowHouses':
        return {
          description: item.ltg_det_row_house_desc,
          price: formatPrice(item.ltg_det_row_house_sale_price),
          bedroom: item.ltg_det_row_house_pmts_bed_rooms,
          bathroom: item.ltg_det_row_house_pmts_bath_rooms,
          parking: item.ltg_det_row_house_pmts_car_parking,
          area: item.ltg_det_row_house_pmts_area_dts,
          address: item.ltg_det_row_house_address,
        };
      case 'Villaments':
        return {
          description: item.ltg_det_villaments_desc,
          price: formatPrice(item.ltg_det_villaments_sale_price),
          bedroom: item.ltg_det_villaments_pmts_bed_rooms,
          bathroom: item.ltg_det_villaments_pmts_bath_rooms,
          parking: item.ltg_det_villaments_pmts_car_parking,
          area: item.ltg_det_villaments_pmts_area_dts,
          address: item.ltg_det_villaments_address,
        };
      default:
        return {
          description: item.ltg_det_desc,
          price: formatPrice(item.ltg_det_sale_price),
          bedroom: item.ltg_det_pmts_bed_rom,
          bathroom: item.ltg_det_pmts_bth_rom,
          parking: item.ltg_det_pmts_car_park,
          area: item.ltg_det_pmts_area_dts,
          address: item.ltg_det_address,
        };
    }
  };

  const Featured = properties.map((item) => {
    // Ensure storedMainImage is an array
    if (!Array.isArray(storedMainImage)) {
      throw new Error("storedMainImage is not an array");
    }

    // Find the main image for this property based on ltg_mstRowID
    const mainImage = storedMainImage.find(img => img.ltg_mstRowID === item.ltg_det_mstRowID);

    // Take the first valid image or set a default image if none found
    const imgUrl = mainImage
      ? httpCommon.defaults.baseURL + mainImage.attachment
      : httpCommon.defaults.baseURL + '\images\defaultasset.jpeg';

    // Get the property details based on the type
    const details = getPropertyDetails(item.ltg_type, item);

    return {
      key: item.ltg_det_mstRowID,
      title: item.ltg_title,
      imgUrl: imgUrl,
      ...details,
    };
  });

  useEffect(() => {
    getPropertiesData();
    getImagesData();
  }, []);

  return (
    <>
      <section className="relative mt-8 bg-white featured-listings padingm">
        <Container>
          <Lottie
            animationData={cloufLottie}
            loop={true}
            className="absolute top-0 left-0 right-0"
          />
        </Container>
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

      <section className="my-10 top-cities ">
        <Container className={"space-y-3"}>
          <h2>Top Cities In India</h2>
          <p>Best places to live in India</p>
          <hr className="bg-[#FECE51] w-32 h-1" />

          <div className="grid items-center justify-center grid-cols-2 gap-1 mx-auto places py-7 md:flex md:flex-row md:justify-between md:gap-5">
            <a href="/Cities/Bengaluru" className="place-link">
              <div className="px-4 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-8 md:h-40 h-28 md:mx-0 md:mb-0">
                <img
                  src="/bengaluru.png"
                  alt="Bengaluru"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Bengaluru</h3>
                <p className="text-xs font-light text-center">{propertyCounts.bengaluru} properties</p>
              </div>
            </a>
            <div className="px-4 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-8 md:h-40 h-28 md:mx-0 md:mb-0">
              <img src="/delhi.png" alt="delhi" className="object-cover w-full h-[60%] " />
              <h3 className="text-center">Delhi</h3>
              <p className="text-xs font-light text-center">0 properties</p>
            </div>
            <div className="px-4 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-8 md:h-40 h-28 md:mx-0 md:mb-0">
              <img src="/pune.png" alt="pune" className="object-cover w-full h-[60%] " />
              <h3 className="text-center">Pune</h3>
              <p className="text-xs font-light text-center">0 properties</p>
            </div>
            <a href="/Cities/Hyderabad" className="place-link">
              <div className="px-4 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-8 md:h-40 h-28 md:mx-0 md:mb-0">
                <img
                  src="/hyderabad.png"
                  alt="Hyderabad"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Hyderabad</h3>
                <p className="text-xs font-light text-center">{propertyCounts.hyderabad} properties</p>
              </div>
            </a>
            <a href="Cities/Tirupati" className="place-link">
              <div className="px-4 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-8 md:h-40 h-28 md:mx-0 md:mb-0">
                <img
                  src="/tirupati.jpg"
                  alt="Tirupati"
                  className="object-cover w-full h-[60%] "
                />
                <h3 className="text-center">Tirupati</h3>
                <p className="text-xs font-light text-center">{propertyCounts.tirupati} properties</p>
              </div>
            </a>
            <div className="px-4 mx-auto mb-5 bg-white border rounded-md shadow-md w-max md:px-8 md:h-40 h-28 md:mx-0 md:mb-0">
              <img
                src="/ahmedabad.jpg"
                alt="ahmedabad"
                className="object-cover w-full h-[60%] "
              />
              <h3 className="text-center">Ahmedabad</h3>
              <p className="text-xs font-light text-center">0 properties</p>
            </div>
          </div>
        </Container>
      </section >

      <section className="py-5 my-2 bg-white feature-collection md:my-10">
        <Container className={"space-y-3"}>
          <h2>Featured Collection in Top Cities</h2>
          <p>Curated & Handpicked Properties</p>
          <hr className="bg-[#FECE51] w-32 h-1" />

          <div className="items-center collection md:flex md:gap-5">
            {['bengaluru', 'hyderabad', 'tirupati'].map((region, index) => {
              const imageSrcMap = {
                bengaluru: "https://images.moneycontrol.com/static-mcnews/2023/10/BeFunky-collage-2023-10-19T142541.707.jpg",
                hyderabad: "https://qph.cf2.quoracdn.net/main-qimg-761eda8931ce2b553ae7618ae8424087.webp",
                tirupati: "https://homebazaar-blog.s3.ap-south-1.amazonaws.com/knowledge/wp-content/uploads/2023/05/11104405/FeatureImage_Top-10-Cheapest-Cities-In-India-20231-732x375.jpg"
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
