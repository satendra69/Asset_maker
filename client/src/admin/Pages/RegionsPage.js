import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaMapMarkedAlt, FaEdit, FaTrashAlt } from "react-icons/fa";
import httpCommon from "../../http-common";
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const RegionsPage = () => {
    const [regions, setRegions] = useState([]);
    const [regionForm, setRegionForm] = useState({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        location: "",
    });
    const [editingRegion, setEditingRegion] = useState(null);
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const defaultLocation = { lat: 17.40649800, lng: 78.47724390 };
    const mapContainerStyle = {
        height: '100%',
        width: '100%',
    };

    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(defaultLocation);
    const autocompleteRef = useRef(null);
    const [isApiLoaded, setIsApiLoaded] = useState(false);

    useEffect(() => {
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        try {
            const response = await httpCommon.get("/regions");
            setRegions(response.data);
        } catch (error) {
            console.error("Error fetching regions", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegionForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!regionForm.name) {
            alert("Name is required.");
            return;
        }

        if (!regionForm.latitude || !regionForm.longitude) {
            alert("Latitude and Longitude are required.");
            return;
        }

        const token = localStorage.getItem("token");
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            if (editingRegion) {
                await httpCommon.patch(`/regions/${editingRegion.id}`, regionForm, config);
            } else {
                await httpCommon.post("/regions", regionForm, config);
            }
            fetchRegions();
            resetForm();
        } catch (error) {
            console.error("Error saving region", error);
        }
    };

    const resetForm = () => {
        setRegionForm({ name: "", description: "", latitude: "", longitude: "", location: "" });
        setEditingRegion(null);
        setMarker({ lat: 0, lng: 0 });
    };

    const handleEdit = (region) => {
        setRegionForm({
            name: region.name,
            description: region.description,
            latitude: region.latitude,
            longitude: region.longitude,
            location: region.location,
        });
        setEditingRegion(region);
        setMarker({ lat: region.latitude, lng: region.longitude });
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await httpCommon.delete(`/regions/${id}`, config);
            fetchRegions();
        } catch (error) {
            console.error("Error deleting region", error);
        }
    };

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
        if (marker.lat && marker.lng && !isNaN(marker.lat) && !isNaN(marker.lng)) {
            mapInstance.setCenter(marker);
        }
    }, [marker]);

    const handlePlaceChanged = useCallback(() => {
        try {
            const selectedPlace = autocompleteRef.current?.getPlace();
            if (selectedPlace?.geometry) {
                const location = selectedPlace.geometry.location;
                const newMarker = { lat: location.lat(), lng: location.lng() };
                setMarker(newMarker);
                setRegionForm((prevForm) => ({
                    ...prevForm,
                    location: selectedPlace.formatted_address,
                    latitude: newMarker.lat,
                    longitude: newMarker.lng,
                }));
                if (map) {
                    map.panTo(location);
                    map.setZoom(13);
                }
            } else {
                console.error("No geometry found for the selected place");
            }
        } catch (error) {
            console.error("Error in handlePlaceChanged:", error);
        }
    }, [map]);

    const handleMarkerDragEnd = (event) => {
        const newMarker = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        setMarker(newMarker);
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: newMarker }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const updatedPlace = results[0];
                setRegionForm((prevForm) => ({
                    ...prevForm,
                    location: updatedPlace.formatted_address,
                    latitude: newMarker.lat,
                    longitude: newMarker.lng,
                }));
            } else {
                console.error('Geocode was not successful for the following reason:', status);
            }
        });
    };

    useEffect(() => {
        if (map && marker.lat && marker.lng) {
            map.setCenter(marker);
        }
    }, [map, marker]);

    return (
        <div className="flex flex-col p-6 mx-auto bg-gray-100">
            <div className="h-[90vh] overflow-y-scroll px-10">
                <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
                    <FaMapMarkedAlt className="mr-2" /> Regions
                </h2>

                <ul className="p-4 mb-6 bg-white rounded-lg shadow-lg">
                    {regions.map((region) => (
                        <li key={region.id} className="flex items-center justify-between py-3 transition duration-200 border-b last:border-b-0 hover:bg-gray-100">
                            <span className="text-lg font-medium text-gray-700">{region.name}</span>
                            <div className="flex space-x-2">
                                <button
                                    className="text-blue-600 transition duration-200 hover:text-blue-800"
                                    onClick={() => handleEdit(region)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-600 transition duration-200 hover:text-red-800"
                                    onClick={() => handleDelete(region.id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="w-full max-h-[60vh] lg:max-h-full p-4 mb-4 overflow-auto bg-white rounded-lg shadow-lg lg:w-2/5 lg:mb-0">
                        <h3 className="mb-4 text-xl font-bold">Region Form</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={regionForm.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={regionForm.description}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    rows="4"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700">Location</label>
                                {isApiLoaded && (
                                    <Autocomplete
                                        onLoad={(ref) => (autocompleteRef.current = ref)}
                                        onPlaceChanged={handlePlaceChanged}
                                    >
                                        <input
                                            type="text"
                                            value={regionForm.location}
                                            onChange={(e) => setRegionForm({ ...regionForm, location: e.target.value })}
                                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Search for a location"
                                            required
                                        />
                                    </Autocomplete>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 text-gray-700">Latitude</label>
                                    <input
                                        type="text"
                                        name="latitude"
                                        value={regionForm.latitude}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-gray-700">Longitude</label>
                                    <input
                                        type="text"
                                        name="longitude"
                                        value={regionForm.longitude}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
                            >
                                {editingRegion ? "Update Region" : "Add Region"}
                            </button>
                        </form>
                    </div>
                    <div className="w-full max-h-[60vh] lg:max-h-full p-4 overflow-hidden bg-white rounded-lg shadow-lg lg:w-3/5">
                        <h3 className="mb-4 text-xl font-bold">Map</h3>
                        <div className="w-full h-full">
                            <LoadScript
                                googleMapsApiKey={googleMapsApiKey}
                                libraries={libraries}
                                onLoad={() => setIsApiLoaded(true)}
                            >
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={marker}
                                    zoom={13}
                                    onLoad={onLoad}
                                    className="w-full h-full"
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
        </div>
    );
};

export default RegionsPage;
