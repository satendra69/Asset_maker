import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const MapGoogle = ({ googleMapsApiKey, initialPosition, onPositionChange }) => {
    const mapContainerStyle = {
        height: '420px',
        width: '100%',
    };

    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState({ lat: initialPosition.latitude, lng: initialPosition.longitude });
    const [place, setPlace] = useState(null);
    const autocompleteRef = useRef(null);
    const [inputValue, setInputValue] = useState(initialPosition.location);
    const [postalCode, setPostalCode] = useState(initialPosition.postalCode || '');
    const [address, setAddress] = useState(initialPosition.address || '');
    const isApiLoaded = useRef(false);

    useEffect(() => {
        setMarker({ lat: initialPosition.latitude, lng: initialPosition.longitude });
        setInputValue(initialPosition.location);
        setPostalCode(initialPosition.postalCode || '');
        setAddress(initialPosition.address || '');
    }, [initialPosition]);

    const handlePlaceChanged = useCallback(() => {
        const selectedPlace = autocompleteRef.current?.getPlace();
        if (selectedPlace?.geometry) {
            const location = selectedPlace.geometry.location;
            const newMarker = { lat: location.lat(), lng: location.lng() };
            setMarker(newMarker);
            map.panTo(location);
            map.setZoom(13);
            updatePosition(newMarker, selectedPlace);
            setInputValue(selectedPlace.formatted_address);
        }
    }, [map]);

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
        const initialMarker = {
            lat: initialPosition.latitude,
            lng: initialPosition.longitude,
        };
        setMarker(initialMarker);
        mapInstance.setCenter(initialMarker);
        mapInstance.setZoom(13);
        isApiLoaded.current = true;
    }, [initialPosition]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (newValue) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: newValue }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const newMarker = results[0].geometry.location;
                    const updatedPlace = results[0];
                    setMarker({ lat: newMarker.lat(), lng: newMarker.lng() });
                    setPlace(updatedPlace);
                    updatePosition({ lat: newMarker.lat(), lng: newMarker.lng() }, updatedPlace);
                } else {
                    setPlace(null);
                }
            });
        } else {
            setPlace(null);
        }
    };

    const updatePosition = (newMarker, place) => {
        const newPosition = {
            location: place ? place.formatted_address : inputValue,
            address: place ? place.formatted_address : '',
            postalCode: getAddressComponent(place, 'postal_code'),
            latitude: newMarker.lat,
            longitude: newMarker.lng,
        };
        setPostalCode(newPosition.postalCode);
        setAddress(newPosition.address);
        onPositionChange(newPosition);
    };

    const handleMarkerDragEnd = (event) => {
        const newMarker = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        setMarker(newMarker);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newMarker }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const updatedPlace = results[0];
                updatePosition(newMarker, updatedPlace);
                setInputValue(updatedPlace.formatted_address);
            } else {
                console.error('Geocode was not successful for the following reason:', status);
            }
        });
    };

    return (
        <div>
            <hr className="my-8 border-gray-400" />
            <div className="flex flex-wrap items-start mt-4">
                <div className="w-full pr-4 sm:w-1/2 lg:w-1/2">
                    <h2 className="text-xl font-semibold mb-7">Location</h2>
                    <div className="w-full pr-4 mb-7">
                        <label htmlFor="location-input" className="block text-sm font-semibold leading-6 text-gray-900">
                            Location
                        </label>
                        {isApiLoaded.current ? (
                            <Autocomplete
                                onLoad={(ref) => (autocompleteRef.current = ref)}
                                onPlaceChanged={handlePlaceChanged}
                            >
                                <input
                                    id="location-input"
                                    type="text"
                                    placeholder="Enter Location"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                />
                            </Autocomplete>
                        ) : (
                            <div className="flex w-full h-full">
                                <p>Loading...</p>
                            </div>
                        )}
                    </div>
                    <div className="w-full pr-4 mb-7">
                        <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            readOnly
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="w-full pr-4 mb-7">
                        <label htmlFor="postal-code" className="block text-sm font-semibold leading-6 text-gray-900">
                            Postal Code
                        </label>
                        <input
                            id="postal-code"
                            type="text"
                            value={postalCode}
                            readOnly
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex w-full pr-4 mb-7">
                        <div className="w-full pr-2">
                            <label htmlFor="latitude" className="block text-sm font-semibold leading-6 text-gray-900">
                                Latitude
                            </label>
                            <input
                                id="latitude"
                                type="text"
                                value={marker.lat}
                                readOnly
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>
                        <div className="w-full pl-2">
                            <label htmlFor="longitude" className="block text-sm font-semibold leading-6 text-gray-900">
                                Longitude
                            </label>
                            <input
                                id="longitude"
                                type="text"
                                value={marker.lng}
                                readOnly
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="z-10 w-full pr-4 sm:w-1/2 lg:w-1/2">
                    <div className="w-full mb-4 sm:mb-0">
                        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={marker}
                                zoom={13}
                                onLoad={onLoad}
                            >
                                <Marker
                                    position={marker}
                                    draggable={true}
                                    onDragEnd={handleMarkerDragEnd}
                                />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapGoogle;

function getAddressComponent(place, component) {
    const addressComponents = place?.address_components || [];
    for (const componentItem of addressComponents) {
        if (componentItem.types.includes(component)) {
            return componentItem.long_name;
        }
    }
    return '';
}
