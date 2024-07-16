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
  const [purpose, setPurpose] = React.useState("buy");
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    purpose: "",
    address: "",
    message: "",
  });

  const { loading, error, currentUser } = useSelector((state) => state.user);

  const handleChange = (event) => {
    setPurpose(event.target.value);
  };

  const handleInput = (e) => {
    setForm((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={open} className="space-y-5">
        <DialogTitle>{item.ltg_title}</DialogTitle>
        <img
          src={httpCommon.defaults.baseURL + item.attachment}
          className="h-40 object-cover rounded-md shadow-md"
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 p-5">
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
            label="Number"
            name="number"
            variant="outlined"
            onChange={handleInput}
          />
          <div className="space-y-5 w-full">
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
                value={purpose}
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
            onClick={(e) => {
              currentUser
                ? mutation.mutate({
                  ...form,
                  purpose,
                  userId: currentUser.id,
                  propertyId: item.id,
                })
                : toast.error("Please Sign Up");
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
