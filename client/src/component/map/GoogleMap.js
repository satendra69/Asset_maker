import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FaDirections } from "react-icons/fa";  // Icon for the "Get Directions" button

const containerStyle = {
    width: "100%",
    height: "400px",
    position: "relative", // Ensures the card is positioned relative to the map
};

const cardStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "white",
    padding: "15px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    zIndex: "10", // Ensures the card stays on top of the map
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "400px",
};

const addressStyle = {
    marginRight: "10px",
};

const buttonStyle = {
    backgroundColor: "#4285F4",
    color: "white",
    padding: "8px 12px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
};

function Map({ googleMapsApiKey, lat, lng, address }) {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    const center = {
        lat: parsedLat || 0,
        lng: parsedLng || 0,
    };

    const getDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${parsedLat},${parsedLng}`;

    return (
        <LoadScript
            googleMapsApiKey={googleMapsApiKey}
            onLoad={() => console.log('Google Maps API loaded successfully')}
            onError={(error) => console.error('Error loading Google Maps API', error)}
        >
            <div style={containerStyle}>
                {/* Address Card */}
                <div style={cardStyle}>
                    <div style={addressStyle}>
                        <strong>{address}</strong>
                    </div>
                    <a
                        href={getDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button style={buttonStyle}>
                            <FaDirections style={{ marginRight: "8px" }} />
                            Directions
                        </button>
                    </a>
                </div>

                {/* Google Map */}
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={center}
                    zoom={12}
                >
                    {lat && lng && <Marker position={center} />}
                </GoogleMap>
            </div>
        </LoadScript>
    );
}

export default Map;
