import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define the marker icon
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = ({ onPositionChange, initialPosition }) => {
  const [location, setLocation] = useState(initialPosition.location || "");
  const [address, setAddress] = useState(initialPosition.address || "");
  const [postalCode, setPostalCode] = useState(initialPosition.postalCode || "");
  const [latitude, setLatitude] = useState(initialPosition.latitude || 17.387140);
  const [longitude, setLongitude] = useState(initialPosition.longitude || 78.491684);
  const [markerPosition, setMarkerPosition] = useState({
    lat: initialPosition.latitude || 17.387140,
    lng: initialPosition.longitude || 78.491684,
  });

  useEffect(() => {
    if (initialPosition) {
      setLocation(initialPosition.location);
      setAddress(initialPosition.address);
      setPostalCode(initialPosition.postalCode);
      setLatitude(initialPosition.latitude);
      setLongitude(initialPosition.longitude);
      setMarkerPosition({
        lat: initialPosition.latitude,
        lng: initialPosition.longitude,
      });
    }
  }, [initialPosition]);

  useEffect(() => {
    if (markerPosition) {
      setLatitude(markerPosition.lat);
      setLongitude(markerPosition.lng);
      if (onPositionChange) {
        onPositionChange({
          location,
          address,
          postalCode,
          latitude: markerPosition.lat,
          longitude: markerPosition.lng,
        });
      }
    }
  }, [markerPosition]);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    if (onPositionChange) {
      onPositionChange({ location: value, address, postalCode, latitude, longitude });
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (onPositionChange) {
      onPositionChange({ location, address: value, postalCode, latitude, longitude });
    }
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;
    setPostalCode(value);
    if (onPositionChange) {
      onPositionChange({ location, address, postalCode: value, latitude, longitude });
    }
  };

  const handleLatitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    setLatitude(value);
    setMarkerPosition({ lat: value, lng: longitude });
    if (onPositionChange) {
      onPositionChange({ location, address, postalCode, latitude: value, longitude });
    }
  };

  const handleLongitudeChange = (e) => {
    const value = parseFloat(e.target.value);
    setLongitude(value);
    setMarkerPosition({ lat: latitude, lng: value });
    if (onPositionChange) {
      onPositionChange({ location, address, postalCode, latitude, longitude: value });
    }
  };

  const MapClickHandler = ({ setPosition }) => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return null;
  };

  return (
    <div>
      <hr className="my-8 border-gray-400" />
      <div className="flex flex-wrap items-start mt-4">
        {/* Location Details */}
        <div className="w-full pr-4 sm:w-1/2 lg:w-1/2">
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
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
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
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
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
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex w-full pr-4 mb-7">
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
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
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
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>
        {/* Map Container */}
        <div className="z-10 w-full pr-4 sm:w-1/2 lg:w-1/2">
          <div className="w-full mb-4 sm:mb-0">
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              style={{ width: "100%", height: "420px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {markerPosition && <Marker position={markerPosition} icon={icon}></Marker>}
              <MapClickHandler setPosition={setMarkerPosition} />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
