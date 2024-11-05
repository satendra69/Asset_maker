import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const { id: RowID, ltg_type: TypeGet } = location.state || {};
  const [open, setOpen] = useState(false);

  const [properties, setProperties] = useState([]);
  const [singlePageData, setSinglePageData] = useState([]);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [singlePageImgData, setSinglePageImgData] = useState([]);
  const [brochureData, setBrochureData] = useState([]);

  useEffect(() => {
    if (!RowID || !TypeGet) {
      navigate('/Property');
      return;
    }
    getPropertiesData();
    getSinglepropertiesData(RowID, TypeGet);
    singlePageImg(RowID);
    getBrochureData(RowID);
  }, [RowID, TypeGet, navigate]);

  useEffect(() => {
    if (properties.length && singlePageData.length) {
      const matchedType = singlePageData[0]?.ltg_type;
      const matchedCategory = singlePageData[0]?.ltg_categories;
      const matchedRowID = singlePageData[0]?.RowID;

      const similar = properties.filter(property =>
        property.ltg_type === matchedType &&
        property.ltg_categories === matchedCategory &&
        property.RowID !== matchedRowID
      );
      setSimilarProperties(similar);
    }
  }, [properties, singlePageData]);

  // console.log(similarProperties, "similarProperties");

  const handleClose = () => {
    setOpen(false);
  };

  // Fetch properties data
  const getPropertiesData = async () => {
    try {
      const response = await httpCommon.get("/list");
      if (response.data.status === "success") {
        const allProperties = response.data.data;
        setProperties(allProperties);
        // console.log("allProperties", allProperties);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSinglepropertiesData = async (RowID, TypeGet) => {
    try {
      const response = await httpCommon.get(`/list/${RowID}/${TypeGet}`);
      if (response.data.status === "success") {
        setSinglePageData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const singlePageImg = async (RowID) => {
    try {
      const response = await httpCommon.get(`/list/singlePageImg/${RowID}`);
      if (response.data.status === "success") {
        const filteredData = response.data.data?.filter(item => item.type !== 'Brochure');
        setSinglePageImgData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getBrochureData = async (RowID) => {
    try {
      const response = await httpCommon.get(`/list/singlePageImg/${RowID}`);
      if (response.data.status === "success") {
        const brochureData = response.data.data?.filter(item => item.type === 'Brochure');
        setBrochureData(brochureData);
      }
    } catch (error) {
      console.error("Error fetching brochure data:", error);
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
      formatted = `${(numericPrice / 100000).toFixed(1)} Lakhs`;
    } else {
      formatted = `${(numericPrice / 10000000).toFixed(2)} Cr`;
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
  // const formattedPrice = formatPrice(price != null ? price.toLocaleString('en-IN') : '0');
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
  // const formattedSuffixPrice = formatPrice(suffixPrice != null ? suffixPrice.toLocaleString('en-IN') : '0');
  const { numeric: numericSuffixPrice, formatted: formattedSuffixPrice } = formatPrice(suffixPrice != null ? suffixPrice.toLocaleString('en-IN') : '0');

  const getPropertyDetails = (type, item) => {
    switch (type) {
      case 'CommercialProperties':
        return {
          description: item.ltg_det_comm_prop_desc,
          price: formatPrice(item.ltg_det_comm_prop_sale_price, true),
          suffixPrice: formatPrice(item.ltg_det_comm_prop_suffix_price, true),
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

      // Get the property details based on the type
      const details = getPropertyDetails(item.ltg_type, item);

      return {
        key: item.ltg_det_mstRowID,
        title: item.ltg_title,
        imgUrl: imgUrl,
        ...details,
      };
    });

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
        <div className="flex items-start justify-between mb-5">
          <div>
            {singlePageData?.[0]?.ltg_projectName && (
              <h1 className="text-2xl font-semibold">{singlePageData[0].ltg_projectName}</h1>
            )}
            {singlePageData?.[0]?.ltg_title && (
              <h2 className="text-3xl font-bold">{singlePageData[0].ltg_title}</h2>
            )}
            <div className="flex items-center mt-2 text-gray-600">
              <img src="/pin.png" alt="Location Pin" className="w-5 h-5 mr-2" />
              {address}
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-semibold text-gray-500">
              ₹{formattedPrice}
            </span>

            {numericSuffixPrice > 0 && (
              <span className="relative ml-2 text-3xl font-semibold text-red-600 line-through-red">
                ₹{formattedSuffixPrice}
              </span>
            )}

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
        <MortgageCalculator price={price} />
      </section>

      {/* InquiryForm Section */}
      <section className="mt-10">
        <InquiryForm propertyId={RowID} listingType={TypeGet} item={singlePageData} />
      </section>

      {/* Social Section */}
      <Social />
    </Container>
  );
}

export default SinglePage;
