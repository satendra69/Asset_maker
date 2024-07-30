import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import httpCommon from "../../http-common";
import "./singlePage.scss";
import Slider from "../../component/slider/slider";
import Map from "../../component/map/map";
import Container from "../../component/Container";
import DialogProperty from "../../component/card/DialogProperty";
import Social from "../../component/Social";
import PropertyDetails from "../../component/propertyDetail/PropertyDetail";

function SinglePage() {
  const { id: RowID, type: TypeGet } = useParams();
  const [open, setOpen] = useState(false);

  const [singlePageData, setsinglePageData] = useState([]);
  const [singlePageImgData, setsinglePageImgData] = useState([]);
  const [brochureData, setBrochureData] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSinglepropertiesData();
    singlePageImg();
    getBrochureData();
  }, []);

  // get properties Listing data by id
  const getSinglepropertiesData = async () => {
    try {
      //const response = await httpCommon.get(`/list/${RowID}`);
      const response = await httpCommon.get(`/list/${RowID}/${TypeGet}`);
      // console.log("response____getLabel", response);

      if (response.data.status === "success") {
        setsinglePageData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(singlePageData);

  const singlePageImg = async () => {
    try {
      const response = await httpCommon.get(`/list/singlePageImg/${RowID}`);
      if (response.data.status === "success") {
        const filteredData = response.data.data.filter(item => item.type !== 'Brochure');
        setsinglePageImgData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getBrochureData = async () => {
    try {
      const response = await httpCommon.get(`/list/singlePageImg/${RowID}`);
      if (response.data.status === "success") {
        const brochureData = response.data.data.filter(item => item.type === 'Brochure');
        setBrochureData(brochureData);
      }
    } catch (error) {
      console.error("Error fetching brochure data:", error);
    }
  };

  function formatIndianNumber(num) {
    // Convert the number to a string
    let str = num.toString();
    // Split the number into integer and decimal parts (if any)
    let [intPart, decimalPart] = str.split('.');

    // Format the integer part using a regular expression
    intPart = intPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replace(/(\d+),(\d{2})$/, '$1$2');

    // Combine the formatted integer part and the decimal part (if any)
    return decimalPart ? `${intPart}.${decimalPart}` : intPart;
  }

  // console.log(singlePageImgData)
  return (
    <Container className={"py-20"}>
      <DialogProperty
        open={open}
        setOpen={setOpen}
        item={singlePageData}
        handleClose={handleClose}
      />
      <div className="singlePage">
        <div className="details">
          <div className="wrapper">
            <Slider images={singlePageImgData} />
            <div className="info">
              <div className="top">
                <div className="post">
                  {singlePageData && singlePageData.length > 0 && singlePageData[0].ltg_title && (
                    <h1>{singlePageData[0].ltg_title}</h1>
                  )}
                  <div className="address">
                    <img src="/pin.png" alt="" />
                    {singlePageData && singlePageData.length > 0 && (
                      <span>
                        {singlePageData[0].ltg_type === 'Plots' && singlePageData[0].ltg_det_plot_address}
                        {singlePageData[0].ltg_type === 'Villas' && singlePageData[0].ltg_det_address}
                        {singlePageData[0].ltg_type === 'Apartments' && singlePageData[0].ltg_det_address}
                        {singlePageData[0].ltg_type === 'RowHouses' && singlePageData[0].ltg_det_row_house_address}
                        {singlePageData[0].ltg_type === 'CommercialProperties' && singlePageData[0].ltg_det_comm_prop_address}
                        {singlePageData[0].ltg_type === 'Villaments' && singlePageData[0].ltg_det_villaments_address}
                        {singlePageData[0].ltg_type === 'PentHouses' && singlePageData[0].ltg_det_penthouses_address}
                      </span>
                    )}
                  </div>
                  <div className="price">
                    ₹
                    {singlePageData && singlePageData.length > 0 && (
                      <span>
                        {singlePageData[0].ltg_type === 'Plots' && formatIndianNumber(singlePageData[0].ltg_det_plot_sale_price)}
                        {singlePageData[0].ltg_type === 'Villas' && formatIndianNumber(singlePageData[0].ltg_det_sale_price)}
                        {singlePageData[0].ltg_type === 'Apartments' && formatIndianNumber(singlePageData[0].ltg_det_sale_price)}
                        {singlePageData[0].ltg_type === 'RowHouses' && formatIndianNumber(singlePageData[0].ltg_det_row_house_sale_price)}
                        {singlePageData[0].ltg_type === 'CommercialProperties' && formatIndianNumber(singlePageData[0].ltg_det_comm_prop_sale_price)}
                        {singlePageData[0].ltg_type === 'Villaments' && formatIndianNumber(singlePageData[0].ltg_det_villaments_sale_price)}
                        {singlePageData[0].ltg_type === 'PentHouses' && formatIndianNumber(singlePageData[0].ltg_det_penthouses_sale_price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mr-56 bottom">
                {singlePageData && singlePageData.length > 0 && (
                  <div className="description">
                    {singlePageData[0].ltg_type === 'Plots' ? (
                      <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_plot_desc }} />
                    ) : singlePageData[0].ltg_type === 'Villas' ? (
                      <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_desc }} />
                    ) : singlePageData[0].ltg_type === 'Apartments' ? (
                      <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_desc }} />
                    ) : singlePageData[0].ltg_type === 'RowHouses' ? (
                      <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_row_house_desc }} />
                    ) : singlePageData[0].ltg_type === 'CommercialProperties' ? (
                      <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_comm_prop_desc }} />
                    ) : singlePageData[0].ltg_type === 'Villaments' ? (
                      <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_villaments_desc }} />
                    ) : singlePageData[0].ltg_type === 'PentHouses' ? (
                      <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_penthouses_desc }} />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_desc }} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <p className="title">General</p>
            <div className="listVertical">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Utilities</span>
                  <p>Renter is responsible</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  <p>Pets Allowed</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Property Fees</span>
                  <p>Must have 3x the rent in total household income</p>
                </div>
              </div>
            </div>
            <p className="title">Sizes</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                {singlePageData && singlePageData.length > 0 && (
                  <span>
                    {singlePageData[0].ltg_type === 'Plots' && singlePageData[0].ltg_det_plot_pmts_rate_per_sq}
                    {singlePageData[0].ltg_type === 'Villas' && singlePageData[0].ltg_det_pmts_rate_per_sq}
                    {singlePageData[0].ltg_type === 'Apartments' && singlePageData[0].ltg_det_pmts_rate_per_sq}
                    {singlePageData[0].ltg_type === 'RowHouses' && singlePageData[0].ltg_det_row_house_pmts_rate_per_sq}
                    {singlePageData[0].ltg_type === 'CommercialProperties' && singlePageData[0].ltg_det_comm_prop_pmts_rate_per_sq}
                    {singlePageData[0].ltg_type === 'Villaments' && singlePageData[0].ltg_det_villaments_pmts_rate_per_sq}
                    {singlePageData[0].ltg_type === 'PentHouses' && singlePageData[0].ltg_det_penthouses_pmts_rate_per_sq}
                  </span>
                )}
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />

                {singlePageData && singlePageData.length > 0 && (
                  <span>

                    {singlePageData[0].ltg_type === 'Villas' && singlePageData[0].ltg_det_pmts_bed_rom}
                    {singlePageData[0].ltg_type === 'Apartments' && singlePageData[0].ltg_det_pmts_bed_rom}
                    {singlePageData[0].ltg_type === 'RowHouses' && singlePageData[0].ltg_det_row_house_pmts_bed_rooms}
                    {singlePageData[0].ltg_type === 'Villaments' && singlePageData[0].ltg_det_villaments_pmts_bed_rooms}
                    {singlePageData[0].ltg_type === 'PentHouses' && singlePageData[0].ltg_det_penthouses_pmts_bed_rooms}
                  </span>
                )}

              </div>
              <div className="size">
                <img src="/bath.png" alt="" />

                {singlePageData && singlePageData.length > 0 && (
                  <span>
                    {singlePageData[0].ltg_type === 'Villas' && singlePageData[0].ltg_det_pmts_bth_rom}
                    {singlePageData[0].ltg_type === 'Apartments' && singlePageData[0].ltg_det_pmts_bth_rom}
                    {singlePageData[0].ltg_type === 'RowHouses' && singlePageData[0].ltg_det_row_house_pmts_bath_rooms}
                    {singlePageData[0].ltg_type === 'Villaments' && singlePageData[0].ltg_det_villaments_pmts_bath_rooms}
                    {singlePageData[0].ltg_type === 'PentHouses' && singlePageData[0].ltg_det_penthouses_pmts_bath_rooms}
                  </span>
                )}
              </div>
            </div>
            <p className="title">Nearby Places</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>School</span>
                  <p>250m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>100m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>200m away</p>
                </div>
              </div>
            </div>
            <p className="title">Location</p>
            <div className="mapContainer">
              {singlePageData && singlePageData.length > 0 && (
                <Map
                  lat={
                    singlePageData[0].ltg_type === 'Plots' ? singlePageData[0].ltg_det_plot_latitude :
                      singlePageData[0].ltg_type === 'Villas' || singlePageData[0].ltg_type === 'Apartments' ? singlePageData[0].ltg_det_latitude :
                        singlePageData[0].ltg_type === 'RowHouses' ? singlePageData[0].ltg_det_row_house_latitude :
                          singlePageData[0].ltg_type === 'CommercialProperties' ? singlePageData[0].ltg_det_comm_prop_latitude :
                            singlePageData[0].ltg_type === 'Villaments' ? singlePageData[0].ltg_det_villaments_latitude :
                              singlePageData[0].ltg_type === 'PentHouses' ? singlePageData[0].ltg_det_penthouses_latitude :
                                null
                  }
                  lng={
                    singlePageData[0].ltg_type === 'Plots' ? singlePageData[0].ltg_det_plot_longitude :
                      singlePageData[0].ltg_type === 'Villas' || singlePageData[0].ltg_type === 'Apartments' ? singlePageData[0].ltg_det_longitude :
                        singlePageData[0].ltg_type === 'RowHouses' ? singlePageData[0].ltg_det_row_house_longitude :
                          singlePageData[0].ltg_type === 'CommercialProperties' ? singlePageData[0].ltg_det_comm_prop_longitude :
                            singlePageData[0].ltg_type === 'Villaments' ? singlePageData[0].ltg_det_villaments_longitude :
                              singlePageData[0].ltg_type === 'PentHouses' ? singlePageData[0].ltg_det_penthouses_longitude :
                                null
                  }
                />
              )}

            </div>
            <div className="buttons">
              <button onClick={() => setOpen(true)}>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
              <button>
                <img src="/save.png" alt="" />
                Save the Place
              </button>
            </div>
          </div>
        </div>
      </div>
      <PropertyDetails property={singlePageData} images={singlePageImgData} brochure={brochureData} />
      <Social />
    </Container>
  );
}

export default SinglePage;
