import React from "react";
import { BsMicrosoftTeams } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { TextField } from "@mui/material";
function EnquiryForm() {
  return (
    <div className="flex items-start ">
      <div className="bg-[#F0F4F7] w-1/2 p-8 flex flex-col gap-14 px-24">
        <h2>Real Estate Enquiry Form</h2>
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <TextField id="outlined-basic" label="Phone No" variant="outlined" />
        <TextField id="outlined-basic" label="Email ID" variant="outlined" />
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          className="hover:border-blue-200 hover:border"
        />
        <button className="border bg-violet-500 py-3 rounded-md text-white">
          Submit
        </button>
      </div>
      <div className="Wy-choose w-1/2 p-8  space-y-10 pay-10">
        <h2>Why Choose Us</h2>
        <p>
          When buying a property with Asset Makers, you can be assured to get
          the best service only. Customer satisfaction is of utmost importance
          to us.
        </p>
        <div className="flex items-center gap-5">
          <BsMicrosoftTeams size={150} className="w-1/4 text-[#578FF1]" />
          <div className="text w-2/3 ">
            <h2> Team of Experts</h2>
            <p>
              Our proactive team will help you in selecting the property that
              best fits you. It doesn't end there, we help you throughout the
              entire process.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <GiTakeMyMoney size={150} className="w-1/4 text-[#578FF1]" />
          <div className="text w-2/3">
            <h2>Financing Made Easy</h2>
            <p>
              Our proactive team will help you in selecting the property that
              best fits you. It doesn't end there, we help you throughout the
              entire process.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <FaHandshake size={150} className="w-1/4 text-[#578FF1]" />
          <div className="text w-2/3">
            <h2>Trusted by Thousands</h2>
            <p>
              1108 clients have been served so far and we are keen on serving
              thousands more. Putting a smile on our client's face is our
              priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryForm;
