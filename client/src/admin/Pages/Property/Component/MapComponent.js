import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

function MapComponent({ onRowClick }) {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (onRowClick) {
      onRowClick({ location: value, address, postalCode, latitude, longitude });
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (onRowClick) {
      onRowClick({ location, address: value, postalCode, latitude, longitude });
    }
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    setPostalCode(value);
    if (onRowClick) {
      onRowClick({ location, address, postalCode: value, latitude, longitude });
    }
  };

  const handleLatitudeChange = (e) => {
    const value = e.target.value;
    setLatitude(value); // Update latitude state
    if (onRowClick) {
      onRowClick({ location, address, postalCode, latitude: value, longitude });
    }
  };

  const handleLongitudeChange = (e) => {
    const value = e.target.value;
    setLongitude(value); // Update longitude state
    if (onRowClick) {
      onRowClick({ location, address, postalCode, latitude, longitude: value });
    }
  };

  return (
    <div>
      <hr className="border-gray-400 my-8" />
      <div className="flex flex-wrap items-start mt-4">
        {/* Location Details */}
        <div className="w-full sm:w-1/2 lg:w-1/2 pr-4">
          {/* Location */}
          <h2 className="text-xl font-semibold mb-7">Location</h2>
          <div className="w-full pr-4 mb-7">
            <label htmlFor="location" className="block text-sm font-semibold leading-6 text-gray-900">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter Location"
              className="w-full mt-1 p-2 border rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          {/* Address */}
          <div className="w-full pr-4 mb-7">
            <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter Address"
              className="w-full mt-1 p-2 border rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          {/* Postal Code */}
          <div className="w-full pr-4 mb-7">
            <label htmlFor="postalCode" className="block text-sm font-semibold leading-6 text-gray-900">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={handlePostalCodeChange}
              placeholder="Enter Postal Code"
              className="w-full mt-1 p-2 border rounded-md border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          {/* Latitude and Longitude */}
          <div className="w-full pr-4 mb-7 flex">
            {/* Latitude */}
            <div className="w-full pr-2">
              <label htmlFor="latitude" className="block text-sm font-semibold leading-6 text-gray-900">
                Latitude
              </label>
              <input
                type="text"
                id="latitude"
                value={latitude}
                onChange={handleLatitudeChange}
                placeholder="Enter Latitude"
                className="w-full mt-1 p-2 border rounded-md border-gray-300 focus:outline-none"
              />
            </div>
            {/* Longitude */}
            <div className="w-full pl-2">
              <label htmlFor="longitude" className="block text-sm font-semibold leading-6 text-gray-900">
                Longitude
              </label>
              <input
                type="text"
                id="longitude"
                value={longitude}
                onChange={handleLongitudeChange}
                placeholder="Enter Longitude"
                className="w-full mt-1 p-2 border rounded-md border-gray-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
        {/* Map Container */}
        <div className="w-full sm:w-1/2 lg:w-1/2 pr-4 z-10">
          <div className="w-full mb-4 sm:mb-0">
            <MapContainer
              center={[parseFloat(latitude) || 0, parseFloat(longitude) || 0]}
              zoom={13}
              style={{ width: "100%", height: "420px" }}
            // onClick={handleClick} // Remove if not needed for now
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapComponent;
