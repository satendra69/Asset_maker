import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import httpCommon from "../../http-common";
import "./singlePage.scss";
import Slider from "../../component/slider/slider";
import Map from "../../component/map/map";

import { singlePostData, userData } from "../../dummy/dummy";
import Container from "../../component/Container";
import DialogProperty from "../../component/card/DialogProperty";
import Social from "../../component/Social";
import PropertyDetails from "../../component/propertyDetail/PropertyDetail";

function SinglePage() {
  const { id: RowID, type: TypeGet } = useParams();
  const [open, setOpen] = useState(false);

  const [singlePageData, setsinglePageData] = useState([]);
  const [singlePageImgData, setsinglePageImgData] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getSinglepropertiesData();
    singlePageImg();
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
      //  console.log("response____img", response);

      if (response.data.status === "success") {
        setsinglePageImgData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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

                  {singlePageData && singlePageData.length > 0 && singlePageData[0].ltg_title &&
                    <h1>{singlePageData[0].ltg_title}</h1>
                  }

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
                        {singlePageData[0].ltg_type === 'Plots' && singlePageData[0].ltg_det_plot_sale_price}
                        {singlePageData[0].ltg_type === 'Villas' && singlePageData[0].ltg_det_sale_price}
                        {singlePageData[0].ltg_type === 'Apartments' && singlePageData[0].ltg_det_sale_price}
                        {singlePageData[0].ltg_type === 'RowHouses' && singlePageData[0].ltg_det_row_house_sale_price}
                        {singlePageData[0].ltg_type === 'CommercialProperties' && singlePageData[0].ltg_det_comm_prop_sale_price}
                        {singlePageData[0].ltg_type === 'Villaments' && singlePageData[0].ltg_det_villaments_sale_price}
                        {singlePageData[0].ltg_type === 'PentHouses' && singlePageData[0].ltg_det_penthouses_sale_price}
                      </span>
                    )}

                  </div>
                </div>
                {/* <div className="user">
                  <img src={userData.img} alt="" />
                  <span>{userData.name}</span>
                </div> */}
              </div>
              <div className="bottom">
                {singlePageData && singlePageData.length > 0 && (
                  singlePageData[0].ltg_type === 'Plots' ? (
                    <>
                      {singlePageData[0].ltg_det_plot_desc &&
                        <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_plot_desc }} />
                      }
                    </>
                  ) : singlePageData[0].ltg_type === 'Villas' ? (
                    <>
                      {singlePageData[0].ltg_det_desc &&
                        <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_desc }} />
                      }
                    </>
                  ) : singlePageData[0].ltg_type === 'Apartments' ? (
                    <>
                      {singlePageData[0].ltg_det_desc &&
                        <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_desc }} />
                      }
                    </>
                  ) : singlePageData[0].ltg_type === 'RowHouses' ? (
                    <>
                      {singlePageData[0].ltg_det_row_house_desc &&
                        <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_row_house_desc }} />
                      }
                    </>
                  ) : singlePageData[0].ltg_type === 'CommercialProperties' ? (
                    <>
                      {singlePageData[0].ltg_det_comm_prop_desc &&
                        <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_comm_prop_desc }} />
                      }
                    </>
                  ) : singlePageData[0].ltg_type === 'Villaments' ? (
                    <>
                      {singlePageData[0].ltg_det_comm_prop_desc &&
                        <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_villaments_desc }} />
                      }
                    </>
                  ) : singlePageData[0].ltg_type === 'PentHouses' ? (
                    <>
                      {singlePageData[0].ltg_det_penthouses_desc &&
                        <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_penthouses_desc }} />
                      }
                    </>
                  ) : (
                    <>
                      {singlePageData[0].ltg_det_desc &&
                        <div dangerouslySetInnerHTML={{ __html: singlePageData[0].ltg_det_desc }} />
                      }
                    </>
                  )
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
      <PropertyDetails property={singlePageData} images={singlePageImgData} />
      <Social />
    </Container>
  );
}

export default SinglePage;
