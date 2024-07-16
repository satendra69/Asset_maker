import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdBathtub } from "react-icons/md";
import { LuScale3D } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
function PropertyCard({ card }) {
  console.log("card", card);
  return (
    <div className="border space-y-2 rounded-md shadow-md relative overflow-hidden md:ml-5 bg-white p-5   ">
      <div className="h-[200px] relative">
        <img
          src={card.imgUrl}
          className="object-cover h-full w-full rounded-s-md"
        />
        <div className="space-y-1 absolute -left-2 top-2">
          <img src="/Tagline.png" className="w-16 object-contain shadow-md" />
          <img src="/sale.png" className="w-16 object-contain shadow-md" />
        </div>
      </div>
      <div className="eye absolute top-8 right-8 bg-white p-2 rounded-lg opacity-75">
        <FaEye className="text-red-600" />
      </div>
      <p className="text-slate-900 font-semibold">{card.title}</p>
      <div className="description flex items-center gap-2">
        <CiLocationOn />
        <p>{card.description}</p>
      </div>
      <div className="flex gap-1 items-center ">
        <FaRupeeSign className="text-red-600" />
        <p className="text-red-600 font-medium">{card.price}</p>
      </div>
      <div className="flex items-center  gap-4">
        <div className="flex gap-1 items-center">
          <div className="flex items-center gap-1">
            <FaCar className="text-[#727272]" size={16} />
            <p className="text-sm">Parking</p>
          </div>

          <p className="text-sm">: 2</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex items-center gap-1">
            <MdBathtub className="text-[#727272]" size={16} />

            <p className="text-sm">Bath</p>
          </div>
          <p className="text-sm">: 2</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex items-center gap-1">
            <LuScale3D className="text-[#727272]" size={16} />
            <p className="text-sm">sqft</p>
          </div>
          <p className="text-sm">: 1150</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
