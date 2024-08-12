import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark, FaBath, FaBed } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdRealEstateAgent } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import DialogProperty from "./DialogProperty";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import httpCommon from "../../http-common";
import { queryClient } from "../..";
import "./card.scss";

function Card({ key, item, onPropertyRemoved }) {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const navigate = useNavigate();

  const fetchSavedProperties = async () => {
    if (!currentUser) return [];
    const res = await httpCommon.get(`/saved-list/${currentUser.id}`);
    return res.data;
  };

  const { data: savedProperties } = useQuery({
    queryKey: ["savedProperties", currentUser?.id],
    queryFn: fetchSavedProperties,
    enabled: !!currentUser,
  });

  useEffect(() => {
    if (savedProperties) {
      setIsSaved(savedProperties.some((property) => property.property_id === item.RowID));
    }
  }, [savedProperties, item.RowID]);

  const handleClose = () => {
    setOpen(false);
  };

  const sendMessage = async (data) => {
    try {
      const res = await httpCommon.post(`/contact/enquiry`, data);
      return res.data;
    } catch (error) {
      toast.error("Internal error at Sending Message");
      console.error(error);
    }
  };

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: "messages" });
      handleClose();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Internal error at Sending Message");
    },
  });

  const saveToSavedList = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    try {
      const res = await httpCommon.post(`/saved-list/add`, {
        userId: currentUser.id,
        propertyId: item.RowID,
      });
      toast.success(res.data.message);
      setIsSaved(true);
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  const removeFromSavedList = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    try {
      await httpCommon.delete(`/saved-list/remove`, {
        data: {
          userId: currentUser.id,
          propertyId: item.RowID,
        },
      });
      toast.success("Property removed from saved list");
      setIsSaved(false);
      if (onPropertyRemoved) {
        onPropertyRemoved();
      }
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        toast.error("User ID and Property ID are required");
      } else if (status === 404) {
        toast.error("Property not found in saved list");
      } else {
        toast.error(data.message || "Internal error");
      }
    } else {
      toast.error("Internal error");
    }
  };

  const getImageAttachments = (attachments) => {
    if (!attachments) {
      return [];
    }
    return attachments.filter(att => att.type === "Main");
  };

  const imageAttachments = item ? getImageAttachments(item.attachments) : [];

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
  const formattedPrice = formatPrice(price != null ? price.toLocaleString('en-IN') : '0');

  const bedroomMapping = {
    Plots: item.ltg_det_pmts_bed_rom,
    Villas: item.ltg_det_pmts_bed_rom,
    Apartments: item.ltg_det_pmts_bed_rom,
    RowHouses: item.ltg_det_row_house_pmts_bed_rooms,
    Villaments: item.ltg_det_villaments_pmts_bed_rooms,
    PentHouses: item.ltg_det_penthouses_pmts_bed_rooms,
  };

  const bedrooms = bedroomMapping[item.ltg_type] || item.ltg_det_pmts_bed_rom;

  const bathroomMapping = {
    Plots: item.ltg_det_pmts_bth_rom,
    Villas: item.ltg_det_pmts_bth_rom,
    Apartments: item.ltg_det_pmts_bth_rom,
    RowHouses: item.ltg_det_row_house_pmts_bath_rooms,
    Villaments: item.ltg_det_villaments_pmts_bath_rooms,
    PentHouses: item.ltg_det_penthouses_pmts_bath_rooms,
  };

  const bathrooms = bathroomMapping[item.ltg_type] || item.ltg_det_pmts_bth_rom;

  const addressMapping = {
    Plots: item?.ltg_det_plot_address,
    Villas: item?.ltg_det_address,
    Apartments: item?.ltg_det_address,
    RowHouses: item?.ltg_det_row_house_address,
    Villaments: item?.ltg_det_villaments_address,
    PentHouses: item?.ltg_det_penthouses_address,
    CommercialProperties: item?.ltg_det_comm_prop_address,
  };

  const address = item ? addressMapping[item.ltg_type] || item.ltg_det_address : "Address not available";

  const areaMapping = {
    Plots: item?.ltg_det_plot_pmts_area_dts,
    Villas: item?.ltg_det_pmts_area_dts,
    Apartments: item?.ltg_det_pmts_area_dts,
    RowHouses: item?.ltg_det_row_house_pmts_area_dts,
    Villaments: item?.ltg_det_villaments_pmts_area_dts,
    PentHouses: item?.ltg_det_penthouses_pmts_area_dts,
    CommercialProperties: item?.ltg_det_comm_prop_pmts_area_dts,
  };

  const area = item ? areaMapping[item.ltg_type] || item.ltg_det_pmts_area_dts : "Area not available";

  const statusMapping = {
    Plots: item?.ltg_det_plot_pmts_status,
    Villas: item?.ltg_det_pmts_status,
    Apartments: item?.ltg_det_pmts_status,
    RowHouses: item?.ltg_det_row_house_pmts_status,
    Villaments: item?.ltg_det_villaments_pmts_status,
    PentHouses: item?.ltg_det_penthouses_pmts_status,
    CommercialProperties: item?.ltg_det_comm_prop_pmts_status,
  };

  const status = item ? statusMapping[item.ltg_type] || item.ltg_det_pmts_status : "Status not available";

  // function formatIndianNumber(num) {
  //   let str = num.toString();
  //   let [intPart, decimalPart] = str.split('.');
  //   intPart = intPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').replace(/(\d+),(\d{2})$/, '$1$2');
  //   return decimalPart ? `${intPart}.${decimalPart}` : intPart;
  // }

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
      return `${(numericPrice / 1000).toFixed(0)} Thousand`;
    } else if (numericPrice < 10000000) {
      return `${(numericPrice / 100000).toFixed(0)} Laksh`;
    } else {
      return `${(numericPrice / 10000000).toFixed(0)} Cr`;
    }
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
            <Link
              to={`/Property/details`}
              state={{ id: item.RowID, ltg_type: item.ltg_type }}
            >
              {item.ltg_title}
            </Link>
          </h2>
          <p className="cardAddress">
            <img src="/pin.png" alt="" />
            <span>{address}</span>
          </p>
          <p className="price">₹{formattedPrice}</p>
          <div className="bottom">
            <div className="features">
              {item.ltg_type === "Plots" || item.ltg_type === "CommercialProperties" ? (
                <span></span>
              ) : (
                <>
                  <div className="feature">
                    <FaBed />
                    <span>{bedrooms} bedroom</span>
                  </div>
                  <div className="feature">
                    <FaBath />
                    <span>{bathrooms} bathrooms</span>
                  </div>
                </>
              )}
              <div className="feature">
                <SlSizeFullscreen />
                <span>{area}</span>
              </div>
              <div className="feature">
                <MdRealEstateAgent />
                <span>{status}</span>
              </div>
            </div>
            <div className="icons">
              <div className="icon" onClick={isSaved ? removeFromSavedList : saveToSavedList}>
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              </div>
              <div className="icon" onClick={() => setOpen(true)}>
                <IoChatboxEllipsesOutline />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
