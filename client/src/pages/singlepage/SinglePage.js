import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import httpCommon from "../../http-common";
import Slider from "../../component/slider/slider";
import Container from "../../component/Container";
import InquiryForm from './InquiryForm';
import DialogProperty from "../../component/card/DialogProperty";
import Social from "../../component/Social";
import PropertyDetails from "../../component/propertyDetail/PropertyDetail";
import MortgageCalculator from "./MortgageCalculator";
import MultiCrousel from "../../component/MultiCrousel";

function SinglePage() {
  const { propertyurl } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [singlePageData, setSinglePageData] = useState([]);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [singlePageImgData, setSinglePageImgData] = useState([]);
  const [brochureData, setBrochureData] = useState([]);

  useEffect(() => {
    if (!propertyurl) {
      navigate("/Property");
      return;
    }
    fetchData();
  }, [propertyurl, navigate]);

  useEffect(() => {
    if (properties.length && singlePageData.length) {
      const matchedType = singlePageData[0]?.ltg_type;
      const matchedCategory = singlePageData[0]?.ltg_categories;

      const similar = properties.filter(property =>
        property.ltg_type === matchedType &&
        property.ltg_categories === matchedCategory
      );
      setSimilarProperties(similar);
    }
  }, [properties, singlePageData]);

  const handleClose = () => {
    setOpen(false);
  };

  // Fetch properties data
  const fetchData = async () => {
    try {
      const [allPropertiesResponse, singlePageResponse] = await Promise.all([
        httpCommon.get("/list"),
        httpCommon.get(`/list/singleProperty/${propertyurl}`)
      ]);

      if (allPropertiesResponse.data.status === "success") {
        setProperties(allPropertiesResponse.data.data);
      }

      if (singlePageResponse.data.status === "success") {
        setSinglePageData(singlePageResponse.data.data);
      }

      try {
        const imgResponse = await httpCommon.get(`/list/singlePageImg/${propertyurl}`);
        if (imgResponse.data.status === "success") {
          const filteredData = imgResponse.data.data?.filter(item => item.type !== "Brochure");
          setSinglePageImgData(filteredData);

          const brochureData = imgResponse.data.data?.filter(item => item.type === "Brochure");
          setBrochureData(brochureData);
        }
      } catch (imgError) {
        console.warn("Failed to fetch single page image data:", imgError.message);
        setSinglePageImgData([]);
        setBrochureData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
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
      // formatted = `${(numericPrice / 100000).toFixed(1)} Lakhs`;
      const lakhs = numericPrice / 100000;
      formatted = lakhs % 1 === 0 ? `${lakhs.toFixed(0)} Lakhs` : `${lakhs.toFixed(1)} Lakhs`;
    } else {
      // formatted = `${(numericPrice / 10000000).toFixed(2)} Cr`;
      const crores = numericPrice / 10000000;
      formatted = crores % 1 === 0 ? `${crores.toFixed(0)} Cr` : `${crores.toFixed(2)} Cr`;
    }

    return onlyFormatted ? formatted : { numeric: numericPrice, formatted };
  }

  const scrollToCalculator = () => {
    const element = document.getElementById('mortgage-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addressMapping = {
    Plots: singlePageData?.[0]?.ltg_det_plot_address,
    Villas: singlePageData?.[0]?.ltg_det_address,
    Apartments: singlePageData?.[0]?.ltg_det_address,
    RowHouses: singlePageData?.[0]?.ltg_det_row_house_address,
    Villaments: singlePageData?.[0]?.ltg_det_villaments_address,
    PentHouses: singlePageData?.[0]?.ltg_det_penthouses_address,
    CommercialProperties: singlePageData?.[0]?.ltg_det_comm_prop_address,
  };

  const address = singlePageData?.[0] ? addressMapping[singlePageData?.[0]?.ltg_type] || singlePageData?.[0].ltg_det_address : "Address not available";

  const priceMapping = {
    Plots: singlePageData?.[0]?.ltg_det_plot_sale_price,
    Villas: singlePageData?.[0]?.ltg_det_sale_price,
    Apartments: singlePageData?.[0]?.ltg_det_sale_price,
    RowHouses: singlePageData?.[0]?.ltg_det_row_house_sale_price,
    CommercialProperties: singlePageData?.[0]?.ltg_det_comm_prop_sale_price,
    Villaments: singlePageData?.[0]?.ltg_det_villaments_sale_price,
    PentHouses: singlePageData?.[0]?.ltg_det_penthouses_sale_price,
  };

  const price = priceMapping[singlePageData?.[0]?.ltg_type] || singlePageData?.[0]?.ltg_det_sale_price;
  const { numeric: numericPrice, formatted: formattedPrice } = formatPrice(price != null ? price.toLocaleString('en-IN') : '0');

  const suffixPriceMapping = {
    Plots: singlePageData?.[0]?.ltg_det_plot_suffix_price,
    Villas: singlePageData?.[0]?.ltg_det_suffix_price,
    Apartments: singlePageData?.[0]?.ltg_det_suffix_price,
    RowHouses: singlePageData?.[0]?.ltg_det_row_house_suffix_price,
    CommercialProperties: singlePageData?.[0]?.ltg_det_comm_prop_suffix_price,
    Villaments: singlePageData?.[0]?.ltg_det_villaments_suffix_price,
    PentHouses: singlePageData?.[0]?.ltg_det_penthouses_suffix_price,
  };

  const suffixPrice = suffixPriceMapping[singlePageData?.[0]?.ltg_type] || singlePageData?.[0]?.ltg_det_suffix_price;
  const { numeric: numericSuffixPrice, formatted: formattedSuffixPrice } = formatPrice(suffixPrice != null ? suffixPrice.toLocaleString('en-IN') : '0');

  const callForPriceMapping = {
    Plots: singlePageData?.[0]?.ltg_det_plot_call_for_price,
    Villas: singlePageData?.[0]?.ltg_det_call_for_price,
    Apartments: singlePageData?.[0]?.ltg_det_call_for_price,
    RowHouses: singlePageData?.[0]?.ltg_det_row_house_call_for_price,
    CommercialProperties: singlePageData?.[0]?.ltg_det_comm_prop_call_for_price,
    Villaments: singlePageData?.[0]?.ltg_det_villaments_call_for_price,
    PentHouses: singlePageData?.[0]?.ltg_det_penthouses_call_for_price,
  };

  const callForPrice = callForPriceMapping[singlePageData?.[0]?.ltg_type] || singlePageData?.[0]?.ltg_det_call_for_price;

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

  const SimilarP = similarProperties
    .map((item) => {
      const mainImage = Array.isArray(item.attachments)
        ? item.attachments?.filter(att => att.type === "Main")
        : [];

      const imgUrl = mainImage.length > 0
        ? httpCommon.defaults.baseURL + mainImage[0].attachment
        : httpCommon.defaults.baseURL + '\\images\\defaultasset.jpg';

      const details = getPropertyDetails(item.ltg_type, item);

      return {
        key: item.ltg_det_mstRowID,
        title: item.ltg_title,
        imgUrl: imgUrl,
        ...details,
      };
    });

  const singleRowID = singlePageData?.[0]?.ltg_det_mstRowID;
  const singleType = singlePageData?.[0]?.ltg_type;

  return (
    <Container className="py-10">
      <DialogProperty
        open={open}
        setOpen={setOpen}
        item={singlePageData}
        handleClose={handleClose}
      />

      {/* Slider Section */}
      <div className="mb-10">
        <Slider images={singlePageImgData} />
      </div>

      {/* Details Section */}
      <div className="p-4 mb-10">
        <div className="flex flex-col items-start justify-between mb-5 md:flex-row">
          <div className="mb-4 md:mb-0">
            {/* Project Name and Title */}
            {singlePageData && singlePageData[0]?.ltg_projectName && singlePageData[0].ltg_projectName !== 'undefined' && (
              <h1 className="text-2xl font-semibold">{singlePageData[0].ltg_projectName}</h1>
            )}
            {singlePageData?.[0]?.ltg_title && (
              <h2 className="text-3xl font-bold">{singlePageData[0].ltg_title}</h2>
            )}

            {/* Location */}
            <div className="flex items-center mt-2 text-gray-600">
              <img src="/pin.png" alt="Location Pin" className="w-5 h-5 mr-2" />
              {address}
            </div>
          </div>

          <div className="text-right">
            {/* Price Display */}
            <div className="flex items-center justify-end">
              {numericPrice > 0 ? (
                <>
                  <span className="p-2 text-3xl italic font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-teal-500">
                    ₹{formattedPrice}
                  </span>
                  {numericSuffixPrice > 0 && (
                    <span className="relative ml-4 text-xl font-semibold text-red-600 line-through">
                      ₹{formattedSuffixPrice}
                    </span>
                  )}
                </>
              ) : (
                <span className="p-2 text-3xl italic font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-gray-500 to-gray-700">
                  {callForPrice || "Call for Price"}
                </span>
              )}
            </div>

            {/* Mortgage Calculator Button */}
            <button
              className="flex items-center gap-2 mt-2 text-blue-600"
              onClick={scrollToCalculator}
            >
              Est. Mortgage Calculator <FaChevronCircleDown />
            </button>
          </div>
        </div>
      </div>

      {/* Property Details Section */}
      <PropertyDetails property={singlePageData} images={singlePageImgData} brochure={brochureData} />

      {/* Similar Properties */}
      {SimilarP && SimilarP.length > 0 && (
        <section>
          <h2 className="mb-4 ml-2 text-2xl font-bold">Similar Properties</h2>
          <MultiCrousel data={SimilarP} details={true} />
        </section>
      )}

      {/* Mortgage Calculator Section */}
      <section id="mortgage-calculator" className="mt-10">
        <MortgageCalculator price={numericPrice} />
      </section>

      {/* InquiryForm Section */}
      <section className="mt-10">
        <InquiryForm propertyId={singleRowID} listingType={singleType} item={singlePageData} />
      </section>

      {/* Social Section */}
      <Social />
    </Container>
  );
}

export default SinglePage;
