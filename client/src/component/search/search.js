import React, { useState, useRef } from "react";

function SearchForm({ onFilterChange, defaultProperty }) {
  const initialState = {
    search: "",
    location: "",
    type: "any",
    property: defaultProperty || "any",
    price: {
      min: "",
      max: "",
    },
    area: {
      min: "",
      max: "",
    },
    bedRooms: "",
    bathRooms: "",
    status: "",
    amenities: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [showFields, setShowFields] = useState(false);
  const formRef = useRef(null);

  // console.log(formData, defaultProperty, "formdata");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newAmenities = checked
        ? [...formData.amenities, value]
        : formData.amenities.filter((amenity) => amenity !== value);
      setFormData({
        ...formData,
        amenities: newAmenities,
      });
    } else if (name === "minArea" || name === "maxArea") {
      setFormData({
        ...formData,
        area: {
          ...formData.area,
          [name === "minArea" ? "min" : "max"]: value !== "" ? parseInt(value, 10) : "",
        },
      });
    } else if (name === "minPrice" || name === "maxPrice") {
      setFormData({
        ...formData,
        price: {
          ...formData.price,
          [name === "minPrice" ? "min" : "max"]: value !== "" ? parseInt(value, 10) : "",
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    onFilterChange(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(formData);
    setShowFields(false);
  };

  const handleFocus = () => {
    setShowFields(true);
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setShowFields(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    onFilterChange(formData);
    // console.log(formData);
  }, [formData]);

  return (
    <div className="w-full mt-5 mb-5">
      <div className="flex flex-col">
        <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="relative flex flex-col items-center w-full rounded-md sm:flex-row sm:justify-between">
              <div className="relative flex items-center w-full mr-0 sm:mr-4">
                <svg
                  className="absolute block w-5 h-5 text-gray-400 left-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  name="search"
                  value={formData.search}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  className="w-full h-12 py-4 pl-12 pr-40 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none cursor-text focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Search by name, type, manufacturer, etc"
                />
              </div>
              {!showFields && (
                <div className="flex flex-row items-center justify-center gap-4 mt-4 sm:gap-2 sm:mt-0">
                  <button className="px-8 py-3 font-medium text-gray-700 bg-gray-200 rounded-lg outline-none hover:opacity-80 focus:ring">
                    Reset
                  </button>
                  <button className="px-8 py-3 font-medium text-white bg-blue-600 rounded-lg outline-none hover:opacity-80 focus:ring">
                    Search
                  </button>
                </div>
              )}
            </div>


            {showFields && (
              <div className="grid grid-cols-1 gap-6 mt-5">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="city"
                      className="text-sm font-medium text-stone-600"
                    >
                      City
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="block w-full px-2 py-2 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="">Not Selected</option>
                      <option value="Bangaluru">Bangaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Tirupati">Tirupati</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="type"
                      className="text-sm font-medium text-stone-600"
                    >
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="block w-full px-2 py-2 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="any">Any</option>
                      <option value="buy">Buy</option>
                      <option value="rent">Rent</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="property"
                      className="text-sm font-medium text-stone-600"
                    >
                      Property
                    </label>
                    <select
                      id="property"
                      name="property"
                      value={formData.property}
                      onChange={handleChange}
                      className="block w-full px-2 py-2 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="any">Any</option>
                      <option value="Apartments">Apartment</option>
                      <option value="CommercialProperties">Commercial Property</option>
                      <option value="PentHouses">Pent House</option>
                      <option value="RowHouses">Row House</option>
                      <option value="Plots">Plot</option>
                      <option value="Villas">Villa</option>
                      <option value="Villaments">Villament</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-stone-600">
                      Price
                    </label>
                    <div className="flex mt-2 space-x-2">
                      <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        value={formData.price.min}
                        onChange={handleChange}
                        placeholder="Min"
                        className="flex-1 block w-full px-2 py-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        value={formData.price.max}
                        onChange={handleChange}
                        placeholder="Max"
                        className="flex-1 block w-full px-2 py-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-stone-600">
                      Area (Sq-Ft/Sq-Yrd)
                    </label>
                    <div className="flex mt-2 space-x-2">
                      <input
                        type="number"
                        id="minArea"
                        name="minArea"
                        value={formData.area.min}
                        onChange={handleChange}
                        placeholder="Min"
                        className="flex-1 block w-full px-2 py-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <input
                        type="number"
                        id="maxArea"
                        name="maxArea"
                        value={formData.area.max}
                        onChange={handleChange}
                        placeholder="Max"
                        className="flex-1 block w-full px-2 py-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="bedRooms"
                      className="text-sm font-medium text-stone-600"
                    >
                      Bed Rooms
                    </label>
                    <select
                      id="bedRooms"
                      name="bedRooms"
                      value={formData.bedRooms}
                      onChange={handleChange}
                      className="block w-full px-2 py-2 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="">Not Selected</option>
                      {[...Array(25).keys()].map((value) => (
                        <option key={value} value={value + 1}>
                          {value + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="bathRooms"
                      className="text-sm font-medium text-stone-600"
                    >
                      Bath Rooms
                    </label>
                    <select
                      id="bathRooms"
                      name="bathRooms"
                      value={formData.bathRooms}
                      onChange={handleChange}
                      className="block w-full px-2 py-2 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="">Not Selected</option>
                      {[...Array(25).keys()].map((value) => (
                        <option key={value} value={value + 1}>
                          {value + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="status"
                      className="text-sm font-medium text-stone-600"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="block w-full px-2 py-2 mt-2 bg-gray-100 border border-gray-100 rounded-md shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value="">Not Selected</option>
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Under Construction">
                        Under Construction
                      </option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col space-y-6">
                  <label className="text-sm font-medium text-stone-600">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                      "24 Hrs Backup",
                      "CCTV Surveillance",
                      "Children’s Play Area",
                      "Community Hall",
                      "Elevator",
                      "Garden",
                      "Gym",
                      "Indoor Games",
                      "Intercom",
                      "Jogging Track",
                      "Kids Play Area",
                      "Maingate Arch",
                      "Party Hall",
                      "Pets Allowed",
                      "Pharmacy",
                      "Rain Water Harvesting",
                      "Security",
                      "Society Boundary Wall",
                      "Swimming Pool",
                      "Under Ground Drainage",
                      "Under Ground Electricity",
                      "Under Ground Water Supply",
                      "Water Overhead Tank",
                    ].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          name="amenities"
                          value={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-600 transition duration-150 ease-in-out form-checkbox"
                        />
                        <span className="ml-2 text-stone-600">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showFields && (
              <div className="grid justify-end w-full grid-cols-2 mt-6 space-x-4 md:flex">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg outline-none hover:opacity-80 focus:ring"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-8 py-2 font-medium text-white bg-blue-600 rounded-lg outline-none hover:opacity-80 focus:ring"
                >
                  Search
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
