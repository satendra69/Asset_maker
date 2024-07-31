import { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const MapGoogle = ({ googleMapsApiKey }) => {
    const mapContainerStyle = {
        height: '420px',
        width: '100%',
    };

    const center = {
        lat: 20.5937,
        lng: 78.9629,
    };

    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [place, setPlace] = useState(null);
    const autocompleteRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry) {
            const location = place.geometry.location;
            setPlace(place);
            setMarker({ lat: location.lat(), lng: location.lng() });
            map.panTo(location);
            map.setZoom(13);
        }
    };

    const onLoad = () => {
        console.log('Google Maps API loaded');
    };

    return (
        <div>
            <hr className="my-8 border-gray-400" />
            <div className="flex flex-wrap items-start mt-4">
                {/* Location Details */}
                <div className="w-full pr-4 sm:w-1/2 lg:w-1/2">
                    <h2 className="text-xl font-semibold mb-7">Location</h2>
                    <div className="w-full pr-4 mb-7">
                        <label htmlFor="location-input" className="block text-sm font-semibold leading-6 text-gray-900">
                            Location
                        </label>
                        <Autocomplete
                            onLoad={(ref) => (autocompleteRef.current = ref)}
                            onPlaceChanged={handlePlaceChanged}
                        >
                            <input
                                id="location-input"
                                type="text"
                                placeholder="Enter Location"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </Autocomplete>
                    </div>
                    <div className="w-full pr-4 mb-7">
                        <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={place ? place.formatted_address : ''}
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
                            value={place ? getAddressComponent(place, 'postal_code') : ''}
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
                                value={marker ? marker.lat : ''}
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
                                value={marker ? marker.lng : ''}
                                readOnly
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
                {/* Map Container */}
                <div className="z-10 w-full pr-4 sm:w-1/2 lg:w-1/2">
                    <div className="w-full mb-4 sm:mb-0">
                        <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries} onLoad={onLoad}>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={marker || center}
                                zoom={marker ? 13 : 5}
                                onLoad={(map) => setMap(map)}
                            >
                                {marker && <Marker position={marker} />}
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getAddressComponent = (place, type) => {
    for (const component of place.address_components) {
        if (component.types.includes(type)) {
            return component.long_name;
        }
    }
    return '';
};

export default MapGoogle;
