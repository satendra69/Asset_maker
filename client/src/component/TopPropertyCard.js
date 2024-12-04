import React from "react";

function TopPropertyCard({ card }) {
  return (
    <div className="relative overflow-hidden border rounded-md shadow-md h-80 md:ml-3 ">
      <img
        src={card.imgUrl}
        className="object-cover w-full h-full"
        alt="Property"
        style={{
          minHeight: "100%",
        }}
      />
    </div>
  );
}

export default TopPropertyCard;
