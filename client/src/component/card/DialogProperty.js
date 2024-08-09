import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import httpCommon from "../../http-common";
import { useSelector } from "react-redux";
import { toast, Toaster } from "sonner";

function DialogProperty({ open, item, handleClose, mutation }) {
  const { currentUser } = useSelector((state) => state.user);
  const [enquiryPurpose, setPurpose] = React.useState("buy");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
    address: "",
    message: "",
  });

  const handleChange = (event) => {
    setPurpose(event.target.value);
  };

  const handleInput = (e) => {
    setForm((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const getImageAttachments = (attachments) => {
    if (!attachments) {
      return [];
    }
    return attachments.filter(att => att.type === "Main");
  };

  const imageAttachments = item ? getImageAttachments(item.attachments) : [];

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

  return (
    <div>
      <Dialog onClose={handleClose} open={open} className="space-y-5">
        <DialogTitle>{item ? item.ltg_title : "Loading..."}</DialogTitle>
        {imageAttachments.length > 0 ? (
          <img
            src={httpCommon.defaults.baseURL + imageAttachments[0].attachment}
            className="object-cover h-40 rounded-md shadow-md"
            alt={item?.name || "image"}
          />
        ) : (
          <div className="flex items-center justify-center h-40 bg-gray-200 rounded-md shadow-md">
            No image available
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            className="menuitem"
            name="name"
            onChange={handleInput}
          />

          <TextField
            id="outlined-basic"
            label="phone"
            name="phone"
            variant="outlined"
            onChange={handleInput}
          />
          <div className="w-full space-y-5">
            <TextField
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              sx={{ width: "100%" }}
              onChange={handleInput}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Purpose</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={enquiryPurpose}
                label="Purpose"
                onChange={handleChange}
                sx={{ width: "100%" }}
              >
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="lease">Lease</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            id="outlined-basic"
            label="Address"
            multiline
            name="address"
            variant="outlined"
            rows={4}
            onChange={handleInput}
          />
          <button
            className="border px-2 row-span-1 h-5 py-8 my-auto flex items-center justify-center rounded-md bg-slate-900 text-[#F5EA97]"
            onClick={() => {
              if (currentUser) {
                mutation.mutate({
                  ...form,
                  purpose: enquiryPurpose,
                  listingType: item?.ltg_type,
                  userId: `User: ${currentUser.username}, Email: ${currentUser.email}`,
                  propertyId: item?.ltg_det_mstRowID,
                  propertyDetails: `Title: ${item?.ltg_title || "Title not available"}, Address: ${address}`,
                });
              } else {
                toast.error("Please Sign Up");
              }
            }}
          >
            Contact to Owner
          </button>

          <TextField
            id="outlined-basic"
            label="Message"
            multiline
            name="message"
            variant="outlined"
            rows={4}
            onChange={handleInput}
          />
        </div>
        <Toaster />
      </Dialog>
    </div>
  );
}

export default DialogProperty;
