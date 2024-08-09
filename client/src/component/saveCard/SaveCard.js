import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import DialogProperty from "../card/DialogProperty";
import { Tooltip } from "@mui/material";
import axios from "axios";

function SaveCard({ item }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete('/api/saved-list/remove', {
        data: { userId: item.user_id, propertyId: item.RowID }
      });
      // Optionally, remove the deleted item from UI or refetch saved properties
    } catch (error) {
      console.error("Failed to remove property from saved list", error);
    }
  };

  return (
    <>
      <DialogProperty
        open={open}
        setOpen={setOpen}
        item={item}
        handleClose={handleClose}
      />
      <div className="flex cardProperty gap-7">
        <Link to={`/${item.RowID}`} className="imageContainer">
          <img src={item.attachments?.[0]?.attachment || "/default-image.png"} alt="" />
        </Link>
        <div className="textContainer">
          <h2 className="title">
            <Link to={`/${item.RowID}`}>{item.ltg_title}</Link>
          </h2>
          <p className="address">
            <img src="/pin.png" alt="" />
            <span>{item.ltg_type === "Plots"
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
          <p className="price">$ {item.price}</p>
          <div className="bottom">
            <div className="features">
              <div className="feature">
                <img src="/bed.png" alt="" />
                <span>{item.bedrooms} bedroom</span>
              </div>
              <div className="feature">
                <img src="/bath.png" alt="" />
                <span>{item.bathrooms} bathroom</span>
              </div>
            </div>
            <div className="icons">
              <Tooltip title="chat">
                <div className="icon" onClick={() => setOpen(true)}>
                  <img src="/chat.png" alt="" />
                </div>
              </Tooltip>
              <Tooltip title="Delete">
                <div className="icon" onClick={handleDelete}>
                  <MdDelete size={22} className="text-red-600" />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SaveCard;
