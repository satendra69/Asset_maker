import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import AddCustomLabel from "./Component/CustomLabel";
import AparmentModule from "./Component/AparmentModule";
import VillaModule from "./Component/VillaModule";
import PlotsModule from "./Component/PlotsModule";
import RowModule from "./Component/RowModule";
import CommercialModule from "./Component/CommercialModule";
import VillamentModule from "./Component/VillamentModule";
import PentModule from "./Component/PentModule";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import httpCommon from "../../../http-common";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NewListingPage() {
  // Define state for form inputs
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [listingType, setListingType] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState([]);
  

  // added by satya
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [CustomLabel, setCustomLabel] = useState([]); 
  const [ApartmentData, setApartment] = useState([]); 
  const [ApartmentGalleryData, setApartmentGalleryData] = useState([]); 

// Function to handle Regions checkbox change
  const handleRegionsCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      // Add to selected categories if checked
      setSelectedRegions([...selectedRegions, id]);
    } else {
      // Remove from selected categories if unchecked
      setSelectedRegions(selectedRegions.filter(category => category !== id));
    }
  };
    
  // Function to handle Categories checkbox change
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      // Add to selected categories if checked
      setSelectedCategories([...selectedCategories, id]);
    } else {
      // Remove from selected categories if unchecked
      setSelectedCategories(selectedCategories.filter(category => category !== id));
    }
  };

  const handleRowLabe = ( data) => {
    // Use the row data in the second component
    setCustomLabel(data);  
  };
//console.log("ApartmentData____",ApartmentData);
//console.log("ApartmentGalleryData____",ApartmentGalleryData);
  const publishBtn = async(e) => {

    e.preventDefault();
    var json_ListingInsert = {
      title: title.trim(),
      selectedOwner: selectedOwner,
      listingType: listingType,
      featured: featured,
      selectedRegions: selectedRegions,
      selectedCategories: selectedCategories,
      CustomLabel: CustomLabel,
      ApartmentData: ApartmentData,
      auditUser:"admin",

    }
    //console.log("json_ListingInsert_____",json_ListingInsert);
    try {

      const response = await httpCommon.post("/list", json_ListingInsert);

      const responseData = await response.data;

      if (responseData.status === "SUCCESS") {
        console.log("SUCCESS_____insert__");
        const auditUser = "admin";
        if (ApartmentGalleryData.length > 0) {
          const formData = new FormData();
          const type = "Gallery";
          for (let i = 0; i < ApartmentGalleryData.length; i++) {
            formData.append("images", ApartmentGalleryData[i]);
          }
          formData.append("type", type);
          formData.append("auditUser", auditUser);

        //   const uploadResponse  = await fetch(`http://localhost:8000/list/upload/${responseData.RowID}`, {
        //    method: "POST",
        //    body: formData,
           
        // });
        const uploadResponse = await httpCommon.post(`/list/upload/${responseData.RowID}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("Upload Response:", uploadResponse.data);
      
         
        }
        Swal.close();
        Swal.fire({
          icon: "success",
          title: responseData.status,
          text: responseData.message,
        }).then(() => {
          navigate(`/admin/listing/new`);
        });

      }else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: responseData.message,
        });
      }
    } catch (error) {
      console.log("error",error);
    }
  };
  const handleApartmentDataUpdate = (dataee) => {
     console.log("dataee___",dataee);
    setApartment(dataee);
    setApartmentGalleryData(dataee.GallryImg)

  };
  return (
    <div className="mx-auto p-4">
      <div
        
        className="mx-auto mt-8 h-[87.79vh] overflow-y-scroll py-2 "
      >
        <div className="sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold mb-4">
              Listing &gt; New Listing
            </h1>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
              onClick={publishBtn}
            >
              Publish
            </button>
          </div>
        </div>
        <hr className="border-gray-400 my-8" />
        <h2 className="text-xl font-semibold">Listing</h2>
        <div className="flex flex-wrap items-center">
          {/* Title */}
          <div className="w-full sm:w-1/2 lg:w-2/3 mb-4 sm:mb-0 pr-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Auto Draft"
                onChange={(e) => setTitle(e.target.value)}  
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Listing Owner select dropdown */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
            <label
              htmlFor="owner"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Listing Owner
            </label>
            <div className="mt-1">
              <select
                id="owner"
                value={selectedOwner}
                onChange={(e) => setSelectedOwner(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  Select Listing Owner
                </option>
                <option value="type1">Not Selected</option>
                <option value="Master">Master</option>
                <option value="AssetMakers">Asset Makers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listing Type and Mark as Featured */}
        <div className="flex flex-wrap items-center mt-4">
          {/* Listing Type */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
            <label
              htmlFor="listingType"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Listing Type
            </label>
            <select
              id="listingType"
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled>
                Select Listing Type
              </option>
             
              <option value="Apartments">Apartments</option>
              <option value="Villas">Villas</option>
              <option value="Plots">Plots</option>
              <option value="RowHouses">Row Houses</option>
              <option value="CommercialProperties">Commercial Properties</option>
              <option value="Villaments">Villaments</option>
              <option value="PentHouses">Pent Houses</option>
            </select>
          </div>

          {/* Mark as Featured toggle button */}
          <div className="flex items-center">
            {" "}
            <Switch
              checked={featured}
              onChange={setFeatured}
              className={classNames(
                featured ? "bg-indigo-600" : "bg-gray-200",
                "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              )}
            >
              <span className="sr-only">Mark as featured</span>
              <span
                aria-hidden="true"
                className={classNames(
                  featured ? "translate-x-3.5" : "translate-x-0",
                  "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
            <label
              htmlFor="featured"
              className="text-sm leading-6 text-gray-600 ml-2"
            >
              {" "}
              <a href="#" className="font-semibold text-indigo-600">
                Mark as Featured
              </a>
            </label>
          </div>
        </div>

        {/* Regions Section */}
        <div>
          <hr className="border-gray-400 my-8" />
          <h2 className="text-xl font-semibold">Regions</h2>
          <div className="flex items-center mt-4">
            {/* Checkboxes for regions */}
            <div className="flex flex-wrap items-center">
              {/* Andhra Pradesh */}
              <label
                htmlFor="andraPradesh"
                className="inline-flex items-center mr-6 mb-2"
              >
                <input
                  type="checkbox"
                  id="andraPradesh"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleRegionsCheckboxChange}
                  checked={selectedRegions.includes("andraPradesh")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Andhra Pradesh
                </span>
              </label>

              {/* Tirupati */}
              <label
                htmlFor="tirupati"
                className="inline-flex items-center mr-6 mb-2"
              >
                <input
                  type="checkbox"
                  id="tirupati"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleRegionsCheckboxChange}
                  checked={selectedRegions.includes("tirupati")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Tirupati
                </span>
              </label>

              {/* Karnataka */}
              <label
                htmlFor="karnataka"
                className="inline-flex items-center mr-6 mb-2"
              >
                <input
                  type="checkbox"
                  id="karnataka"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleRegionsCheckboxChange}
                  checked={selectedRegions.includes("karnataka")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Karnataka
                </span>
              </label>

              {/* Bangalore */}
              <label
                htmlFor="bangalore"
                className="inline-flex items-center mr-6 mb-2"
              >
                <input
                  type="checkbox"
                  id="bangalore"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleRegionsCheckboxChange}
                  checked={selectedRegions.includes("bangalore")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Bangalore
                </span>
              </label>

              {/* Telangana */}
              <label
                htmlFor="telangana"
                className="inline-flex items-center mr-6 mb-2"
              >
                <input
                  type="checkbox"
                  id="telangana"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleRegionsCheckboxChange}
                  checked={selectedRegions.includes("telangana")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Telangana
                </span>
              </label>

              {/* Hyderabad */}
              <label
                htmlFor="hyderabad"
                className="inline-flex items-center mr-6 mb-2"
              >
                <input
                  type="checkbox"
                  id="hyderabad"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleRegionsCheckboxChange}
                  checked={selectedRegions.includes("hyderabad")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Hyderabad
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <hr className="border-gray-400 my-8" />
          <h2 className="text-xl font-semibold">Categories</h2>
          <div className="flex items-center mt-4">
            {/* Checkboxes for categories */}
            <div className="flex flex-wrap items-center">
              <label
                htmlFor="buy"
                className="inline-flex items-center mr-6 mb-2"
              >
                <input
                  type="checkbox"
                  id="buy"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleCheckboxChange}
                  checked={selectedCategories.includes("buy")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Buy
                </span>
              </label>
              <label
                htmlFor="featured"
                className="inline-flex items-center mr-6 mb-2"
              >
                <input
                  type="checkbox"
                  id="featured"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleCheckboxChange}
                  checked={selectedCategories.includes("featured")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Featured
                </span>
              </label>
              <label
                htmlFor="lease"
                className="inline-flex items-center mr-6 mb-2"
              >
                <input
                  type="checkbox"
                  id="lease"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleCheckboxChange}
                  checked={selectedCategories.includes("lease")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Lease
                </span>
              </label>
              <label htmlFor="rent" className="inline-flex items-center mb-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  onChange={handleCheckboxChange}
                  checked={selectedCategories.includes("rent")}
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Rent
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Labels Section */}
        <AddCustomLabel onRowClick={handleRowLabe}/>
   
        {/* Render different modules based on listing type */}
        <div> 
            {listingType === "Apartments" ? (
              <AparmentModule onDataUpdate={handleApartmentDataUpdate}/>
            ) : listingType === "Villas" ? (
              <VillaModule onDataUpdate={handleApartmentDataUpdate} />
            ) : listingType === "Plots" ? (
              <PlotsModule />
            ) : listingType === "RowHouses" ? (
              <RowModule />
            ) : listingType === "CommercialProperties" ? (
              <CommercialModule />
            ) : listingType === "Villaments" ? (
              <VillamentModule />
            ) : listingType === "PentHouses" ? (
              <PentModule />
            ) : null}
        </div>
        
      </div>
    </div>
  );
}

export default NewListingPage;
