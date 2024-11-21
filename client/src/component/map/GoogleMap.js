import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FaDirections } from "react-icons/fa";

const cardStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "white",
    padding: "15px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    zIndex: "10",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    maxWidth: "400px",
    flexWrap: "wrap",
};

const addressStyle = {
    marginRight: "10px",
    flex: "1 1 70%",
    wordWrap: "break-word",
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
    flex: "1 1 25%",
    justifyContent: "center",
};

const containerStyle = {
    width: "100%",
    height: "400px",
    position: "relative",
};

const responsiveStyle = `
    @media (max-width: 768px) {
        .address-card {
            top: 5px;
            left: 5px;
            width: 95%;
            padding: 10px;
        }
    }
`;

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
            // onLoad={() => console.log('Google Maps API loaded successfully')}
            onError={(error) => console.error('Error loading Google Maps API', error)}
        >
            <div style={containerStyle}>
                {/* Address Card */}
                <div className="address-card" style={cardStyle}>
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
