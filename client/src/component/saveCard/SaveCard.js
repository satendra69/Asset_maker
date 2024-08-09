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
        data: { userId: item.userId, propertyId: item.id }
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
        <Link to={`/${item.id}`} className="imageContainer">
          <img src={item.img} alt="" />
        </Link>
        <div className="textContainer">
          <h2 className="title">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h2>
          <p className="address">
            <img src="/pin.png" alt="" />
            <span>{item.address}</span>
          </p>
          <p className="price">$ {item.price}</p>
          <div className="bottom">
            <div className="features">
              <div className="feature">
                <img src="/bed.png" alt="" />
                <span>{item.bedroom} bedroom</span>
              </div>
              <div className="feature">
                <img src="/bath.png" alt="" />
                <span>{item.bathroom} bathroom</span>
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
