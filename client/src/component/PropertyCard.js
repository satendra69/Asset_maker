import React from "react";
import { Link } from "react-router-dom";
import { FaRupeeSign, FaCar, FaEye } from "react-icons/fa";
import { MdBathtub } from "react-icons/md";
import { LuScale3D } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";

function PropertyCard({ card }) {
  return (
    <div className="relative p-4 m-2 transition-shadow duration-300 bg-white border rounded-lg shadow-md hover:shadow-lg">
      <Link
        to={`/Property/details`}
        state={{ id: card.RowID, ltg_type: card.type }}
      >
        <div className="relative h-48 md:h-56">
          <img
            src={card.imgUrl}
            alt={card.title}
            className="object-cover w-full h-full rounded-t-lg"
          />
          <div className="absolute space-y-1 -left-2 top-2">
            <img src="/Tagline.png" className="object-contain w-16 shadow-md" />
            <img src="/sale.png" className="object-contain w-16 shadow-md" />
          </div>
        </div>
        <div className="absolute p-2 bg-white rounded-full opacity-90 top-4 right-4">
          <FaEye className="text-red-600" size={20} />
        </div>
        <div className="p-4 space-y-2">
          <p className="text-lg font-semibold truncate text-slate-900">
            {card.title}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CiLocationOn className="text-red-600" />
            <p className="truncate">{card.address}</p>
          </div>
          <div className="flex items-center gap-1 text-xl font-medium text-red-600">
            <FaRupeeSign />
            <p>{card.price}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FaCar className="text-[#727272]" size={16} />
              <p>Parking: {card.parking}</p>
            </div>
            <div className="flex items-center gap-1">
              <MdBathtub className="text-[#727272]" size={16} />
              <p>Bath: {card.bathroom}</p>
            </div>
            <div className="flex items-center gap-1">
              <LuScale3D className="text-[#727272]" size={16} />
              <p>Area: {card.area} sqft</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;
