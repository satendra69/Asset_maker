import React from "react";

function TopPropertyCard({ card }) {
 // console.log(card, "cafrd");
  return (
    <div className="border h-80 rounded-md shadow-md relative overflow-hidden md:ml-3 ">
      <img src={card.imgUrl} className="object-cover h-full w-full " />
    </div>
  );
}

export default TopPropertyCard;
