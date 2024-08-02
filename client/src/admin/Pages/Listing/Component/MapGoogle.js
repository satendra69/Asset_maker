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
    const [address, setAddress] = useState(initialPosition.address);
    const [postalCode, setPostalCode] = useState(initialPosition.postalCode);
    const [isApiLoaded, setIsApiLoaded] = useState(false);
    const isFirstLoad = useRef(true);
    const updateTimeoutRef = useRef(null);

    useEffect(() => {
        setMarker({ lat: initialPosition.latitude, lng: initialPosition.longitude });
        setInputValue(initialPosition.location);
        setAddress(initialPosition.address);
        setPostalCode(initialPosition.postalCode);
    }, [initialPosition]);

    const handlePlaceChanged = useCallback(() => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry) {
            const location = place.geometry.location;
            const newMarker = { lat: location.lat(), lng: location.lng() };
            setMarker(newMarker);

            if (map) {
                map.panTo(location);
                map.setZoom(13);
            }

            const newPosition = {
                location: place.formatted_address,
                address: place.formatted_address,
                postalCode: getAddressComponent(place, 'postal_code'),
                latitude: newMarker.lat,
                longitude: newMarker.lng,
            };

            onPositionChange(newPosition);
            setInputValue(place.formatted_address);
            setAddress(place.formatted_address);
            setPostalCode(getAddressComponent(place, 'postal_code'));
        }
    }, [map, onPositionChange]);

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
        if (initialPosition.latitude && initialPosition.longitude) {
            const initialMarker = {
                lat: initialPosition.latitude,
                lng: initialPosition.longitude,
            };
            setMarker(initialMarker);
            mapInstance.setCenter(initialMarker);
            mapInstance.setZoom(13);
        }
        setIsApiLoaded(true);
    }, [initialPosition]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleMarkerDragEnd = useCallback((event) => {
        const newMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarker(newMarker);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newMarker }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const newPlace = results[0];
                setPlace(newPlace);
                setInputValue(newPlace.formatted_address);
                setAddress(newPlace.formatted_address);
                setPostalCode(getAddressComponent(newPlace, 'postal_code'));

                const newPosition = {
                    location: newPlace.formatted_address,
                    address: newPlace.formatted_address,
                    postalCode: getAddressComponent(newPlace, 'postal_code'),
                    latitude: newMarker.lat,
                    longitude: newMarker.lng,
                };
                onPositionChange(newPosition);
            }
        });
    }, [onPositionChange]);

    useEffect(() => {
        if (isApiLoaded && map && place && !isFirstLoad.current) {
            const updatedPosition = {
                location: inputValue,
                address: place.formatted_address,
                postalCode: getAddressComponent(place, 'postal_code'),
                latitude: marker.lat,
                longitude: marker.lng,
            };

            onPositionChange(updatedPosition);
            map.panTo(marker);
        } else {
            isFirstLoad.current = false;
        }
    }, [marker, place, onPositionChange, isApiLoaded, map, inputValue]);

    const handleIdle = useCallback(() => {
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = setTimeout(() => {
            const center = map.getCenter();
            const newMarker = {
                lat: center.lat(),
                lng: center.lng(),
            };
            setMarker(newMarker);

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: newMarker }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const newPlace = results[0];
                    setPlace(newPlace);
                    setInputValue(newPlace.formatted_address);
                    setAddress(newPlace.formatted_address);
                    setPostalCode(getAddressComponent(newPlace, 'postal_code'));

                    const newPosition = {
                        location: newPlace.formatted_address,
                        address: newPlace.formatted_address,
                        postalCode: getAddressComponent(newPlace, 'postal_code'),
                        latitude: newMarker.lat,
                        longitude: newMarker.lng,
                    };
                    onPositionChange(newPosition);
                }
            });
        }, 300);
    }, [map, onPositionChange]);

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
                        {isApiLoaded ? (
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
                        <LoadScript
                            googleMapsApiKey={googleMapsApiKey}
                            libraries={libraries}
                        >
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={marker}
                                zoom={13}
                                onLoad={onLoad}
                                onIdle={handleIdle}
                            >
                                {marker && (
                                    <Marker
                                        position={marker}
                                        draggable={true}
                                        onDragEnd={handleMarkerDragEnd}
                                    />
                                )}
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
    const addressComponents = place.address_components;
    for (let i = 0; i < addressComponents.length; i++) {
        const types = addressComponents[i].types;
        if (types.includes(component)) {
            return addressComponents[i].long_name;
        }
    }
    return '';
}
