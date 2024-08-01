import { Link, useNavigate, useLocation } from "react-router-dom";
import "./card.scss";
import { useState } from "react";
import DialogProperty from "./DialogProperty";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import axios from "axios";
import httpCommon from "../../http-common";
import { queryClient } from "../..";

function Card({ key, item }) {

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const sendMessage = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/message/add`,
        data
      );
      return res.data;
    } catch (error) {
      toast.error("Internal error at Sending Message");
      console.error(error);
    }
  };

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (success) => {
      toast.success(success);
      queryClient.invalidateQueries({ queryKey: "messages" });
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Internal error at Sending Message");
    },
  });

  const getImageAttachments = (attachments) => {
    if (!attachments) {
      return [];
    }
    return attachments?.filter(att => att.type === "Main");
  };

  // Filter attachments
  const imageAttachments = getImageAttachments(item.attachments);
  console.log(imageAttachments)

  const priceMapping = {
    Plots: item.ltg_det_plot_sale_price,
    Villas: item.ltg_det_sale_price,
    Apartments: item.ltg_det_sale_price,
    RowHouses: item.ltg_det_row_house_sale_price,
    CommercialProperties: item.ltg_det_comm_prop_sale_price,
    Villaments: item.ltg_det_villaments_sale_price,
    PentHouses: item.ltg_det_penthouses_sale_price,
  };

  const price = priceMapping[item.ltg_type] || item.ltg_det_sale_price;
  //const formattedPrice = price.toLocaleString('en-IN');
  const formattedPrice = formatIndianNumber(price != null ? price.toLocaleString('en-IN') : '0');

  const bedroomMapping = {
    Plots: item.ltg_det_pmts_bed_rom,
    Villas: item.ltg_det_pmts_bed_rom,
    Apartments: item.ltg_det_pmts_bed_rom,
    RowHouses: item.ltg_det_row_house_pmts_bed_rooms,
    Villaments: item.ltg_det_villaments_pmts_bed_rooms,
    PentHouses: item.ltg_det_penthouses_pmts_bed_rooms,

  };

  // Fallback to item.ltg_det_pmts_bed_rom if the type doesn't match any key in the mapping
  const bedrooms = bedroomMapping[item.ltg_type] || item.ltg_det_pmts_bed_rom;

  const bathroomMapping = {
    Plots: item.ltg_det_pmts_bth_rom,
    Villas: item.ltg_det_pmts_bth_rom,
    Apartments: item.ltg_det_pmts_bth_rom,
    RowHouses: item.ltg_det_row_house_pmts_bath_rooms,
    Villaments: item.ltg_det_villaments_pmts_bath_rooms,
    PentHouses: item.ltg_det_penthouses_pmts_bath_rooms,
  };

  // Fallback to item.ltg_det_pmts_bed_rom if the type doesn't match any key in the mapping
  const bathrooms = bathroomMapping[item.ltg_type] || item.ltg_det_pmts_bth_rom;

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

  return (
    <>
      <Toaster richColors />
      <DialogProperty
        open={open}
        setOpen={setOpen}
        item={item}
        handleClose={handleClose}
        mutation={mutation}
      />

      <div className="cardProperty">
        <div className="cardImageContainer">
          {/* <Link to={`/Property/property/${item.RowID}/${item.ltg_type}`}> */}
          <Link
            to={`/Property/details`}
            state={{ id: item.RowID, ltg_type: item.ltg_type }}
          >
            {imageAttachments.length > 0 ? (
              <img
                src={httpCommon.defaults.baseURL + imageAttachments[0].attachment}
                alt="attachment"
              />
            ) : (
              <p>No images available</p>
            )}
          </Link>
        </div>
        <div className="cardTextContainer">
          <h2 className="cardTitle">
            {/* <Link to={`/Property/property/${item.RowID}/${item.ltg_type}`}> */}
            <Link
              to={`/Property/details`}
              state={{ id: item.RowID, ltg_type: item.ltg_type }}
            >
              {item.ltg_title}
            </Link>
          </h2>
          <p className="cardAddress">
            <img src="/pin.png" alt="" />

            <span>
              {item.ltg_type === "Plots"
                ? item.ltg_det_plot_address
                : ["Villa", "Apartment"].includes(item.ltg_type)
                  ? item.ltg_det_address
                  : item.ltg_type === "RowHouses"
                    ? item.ltg_det_row_house_address
                    : item.ltg_type === "CommercialProperties"
                      ? item.ltg_det_comm_prop_address
                      : item.ltg_type === "Villaments"
                        ? item.ltg_det_villaments_address
                        : item.ltg_type === "PentHouses"
                          ? item.ltg_det_penthouses_address
                          : item.ltg_det_address}
            </span>
          </p>
          <p className="price">₹{formattedPrice}</p>
          <div className="bottom">
            {item.ltg_type === "Plots" || item.ltg_type === "CommercialProperties" ?
              <span></span> :
              (<>
                <div className="features">
                  <div className="feature">
                    <img src="/bed.png" alt="" />
                    <span>{bedrooms} bedroom</span>
                  </div>
                  <div className="feature">
                    <img src="/bath.png" alt="" />
                    <span>{bathrooms} bathrooms</span>
                  </div>
                </div>
              </>
              )}
            <div className="icons">
              <Link to={"/saved-list"} className="icon">
                <img src="/save.png" alt="" />
              </Link>
              <div className="icon" onClick={() => setOpen(true)}>
                <img src="/chat.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
