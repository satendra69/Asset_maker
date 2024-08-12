import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

function Map({ googleMapsApiKey, lat, lng }) {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    const center = {
        lat: parsedLat || 0,
        lng: parsedLng || 0,
    };

    console.log("center", center);

    return (
        <LoadScript
            googleMapsApiKey={googleMapsApiKey}
            onLoad={() => console.log('Google Maps API loaded successfully')}
            onError={(error) => console.error('Error loading Google Maps API', error)}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
                {lat && lng && <Marker position={center} />}
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;
