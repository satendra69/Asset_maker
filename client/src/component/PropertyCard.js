import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdBathtub } from "react-icons/md";
import { LuScale3D } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
function PropertyCard({ card }) {
  // console.log("card", card);
  return (
    <div className="relative p-5 space-y-2 overflow-hidden bg-white border rounded-md shadow-md md:ml-5 ">
      <div className="h-[200px] relative">
        <img
          src={card.imgUrl}
          className="object-cover w-full h-full rounded-s-md"
        />
        <div className="absolute space-y-1 -left-2 top-2">
          <img src="/Tagline.png" className="object-contain w-16 shadow-md" />
          <img src="/sale.png" className="object-contain w-16 shadow-md" />
        </div>
      </div>
      <div className="absolute p-2 bg-white rounded-lg opacity-75 eye top-8 right-8">
        <FaEye className="text-red-600" />
      </div>
      <p className="font-semibold text-slate-900">{card.title}</p>
      <div className="flex items-center gap-2 description">
        <CiLocationOn />
        <p>{card.address}</p>
      </div>
      <div className="flex items-center gap-1 ">
        <FaRupeeSign className="text-red-600" />
        <p className="font-medium text-red-600">{card.price}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <FaCar className="text-[#727272]" size={16} />
            <p className="text-sm">Parking</p>
          </div>

          <p className="text-sm">: {card.parking}</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <MdBathtub className="text-[#727272]" size={16} />

            <p className="text-sm">Bath</p>
          </div>
          <p className="text-sm">: {card.bathroom}</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <LuScale3D className="text-[#727272]" size={16} />
            <p className="text-sm">sqft</p>
          </div>
          <p className="text-sm">: {card.area}</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
