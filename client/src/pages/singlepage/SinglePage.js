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

function SinglePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: RowID, ltg_type: TypeGet } = location.state || {};
  const [open, setOpen] = useState(false);

  const [singlePageData, setsinglePageData] = useState([]);
  const [singlePageImgData, setsinglePageImgData] = useState([]);
  const [brochureData, setBrochureData] = useState([]);

  useEffect(() => {
    if (!RowID || !TypeGet) {
      navigate('/Property');
      return;
    }

    getSinglepropertiesData(RowID, TypeGet);
    singlePageImg(RowID);
    getBrochureData(RowID);
  }, [RowID, TypeGet, navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  const getSinglepropertiesData = async (RowID, TypeGet) => {
    try {
      const response = await httpCommon.get(`/list/${RowID}/${TypeGet}`);
      if (response.data.status === "success") {
        setsinglePageData(response.data.data);
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
        setsinglePageImgData(filteredData);
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
      return `${(numericPrice / 1000).toFixed(0)}Thousand`;
    } else if (numericPrice < 10000000) {
      return `${(numericPrice / 100000).toFixed(0)}Lakh`;
    } else {
      return `${(numericPrice / 10000000).toFixed(0)}Crore`;
    }
  }

  const scrollToCalculator = () => {
    const element = document.getElementById('mortgage-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            {singlePageData?.[0]?.ltg_title && (
              <h1 className="text-3xl font-bold">{singlePageData[0].ltg_title}</h1>
            )}
            <div className="flex items-center mt-2 text-gray-600">
              <img src="/pin.png" alt="Location Pin" className="w-5 h-5 mr-2" />
              {singlePageData?.[0]?.ltg_det_plot_address || singlePageData?.[0]?.ltg_det_address}
            </div>
          </div>
          <div className="text-right">
            <div className="mt-2 text-xl font-semibold">
              ₹
              {singlePageData && singlePageData[0]?.ltg_type && (
                <span>
                  {singlePageData[0].ltg_type === 'Plots' && formatPrice(singlePageData[0].ltg_det_plot_sale_price)}
                  {singlePageData[0].ltg_type === 'Villas' && formatPrice(singlePageData[0].ltg_det_sale_price)}
                  {singlePageData[0].ltg_type === 'Apartments' && formatPrice(singlePageData[0].ltg_det_sale_price)}
                  {singlePageData[0].ltg_type === 'RowHouses' && formatPrice(singlePageData[0].ltg_det_row_house_sale_price)}
                  {singlePageData[0].ltg_type === 'CommercialProperties' && formatPrice(singlePageData[0].ltg_det_comm_prop_sale_price)}
                  {singlePageData[0].ltg_type === 'Villaments' && formatPrice(singlePageData[0].ltg_det_villaments_sale_price)}
                  {singlePageData[0].ltg_type === 'PentHouses' && formatPrice(singlePageData[0].ltg_det_penthouses_sale_price)}
                </span>
              )}
            </div>
            <button className="flex items-center gap-2 mt-2 text-blue-600" onClick={scrollToCalculator}>
              Est. Mortgage Calculator <FaChevronCircleDown />
            </button>
          </div>
        </div>
      </div>


      {/* Property Details Section */}
      <PropertyDetails property={singlePageData} images={singlePageImgData} brochure={brochureData} />

      {/* Mortgage Calculator Section */}
      <section id="mortgage-calculator" className="mt-10">
        <MortgageCalculator />
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
