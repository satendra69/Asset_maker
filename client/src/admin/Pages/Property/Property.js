import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "@headlessui/react";
import AddCustomLabel from "./Component/CustomLabel";
import AparmentModule from "./Component/AparmentModule";
import VillaModule from "./Component/VillaModule";
import PlotsModule from "./Component/PlotsModule";
import RowModule from "./Component/RowModule";
import CommercialModule from "./Component/CommercialModule";
import VillamentModule from "./Component/VillamentModule";
import PentModule from "./Component/PentModule";
import httpCommon from "../../../http-common";
import Swal from "sweetalert2";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NewProperty() {
  const navigate = useNavigate();
  const { propertyId } = useParams();

  // Define state for form inputs
  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState([]);

  // added by satya
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [CustomLabel, setCustomLabel] = useState([]);
  const [ApartmentData, setApartment] = useState([]);
  const [ApartmentGalleryData, setApartmentGalleryData] = useState([]);

  // for villa
  const [VillaData, setVilla] = useState([]);
  const [VillaGalleryData, setVillaGalleryData] = useState([]);

  // for Plots
  const [PlotsData, setPlots] = useState({});
  const [PlotsGalleryData, setPlotsGalleryData] = useState([]);

  // for Row House
  const [RowHouseData, setRowHouse] = useState({});
  const [RowHouseGalleryData, setRowHouseGalleryData] = useState([]);

  // for Commercial Properties
  const [CommercialData, setCommercial] = useState({});
  const [CommercialGalleryData, setCommercialGalleryData] = useState([]);

  // for Villament
  const [VillamentData, setVillament] = useState({});
  const [VillamentGalleryData, setVillamentGalleryData] = useState([]);

  // for Pent House
  const [PentHouseData, setPentHouse] = useState({});
  const [PentHouseGalleryData, setPentHouseGalleryData] = useState([]);

  // Fetch property details if in update mode
  useEffect(() => {
    if (propertyId) {
      fetchProperty(propertyId);
    }
  }, [propertyId]);

  const fetchProperty = async (propertyId) => {
    try {
      const response = await httpCommon.get(`/property/${propertyId}`);
      const propertyData = response.data;
      // Update state with fetched data
      setTitle(propertyData.title);
      setPropertyType(propertyData.propertyType);
      setFeatured(propertyData.featured);
      setSelectedOwner(propertyData.selectedOwner);
      setSelectedCategories(propertyData.selectedCategories);
      setSelectedRegions(propertyData.selectedRegions);
      setCustomLabel(propertyData.CustomLabel);
      // Update specific data based on propertyType
      switch (propertyData.propertyType) {
        case "Apartments":
          setApartment(propertyData.PropertyData);
          setApartmentGalleryData(propertyData.Property.combinedImages);
          break;
        case "Villas":
          setVilla(propertyData.PropertyData);
          setVillaGalleryData(propertyData.PropertyData.combinedImages);
          break;
        case "Plots":
          setPlots(propertyData.PropertyData);
          setPlotsGalleryData(propertyData.Property.combinedImages);
          break;
        case "RowHouses":
          setRowHouse(propertyData.PropertyData);
          setRowHouseGalleryData(propertyData.PropertyData.combinedImages);
          break;
        case "CommercialProperties":
          setCommercial(propertyData.PropertyData);
          setCommercialGalleryData(propertyData.PropertyData.combinedImages);
          break;
        case "Villaments":
          setVillament(propertyData.PropertyData);
          setVillamentGalleryData(propertyData.PropertyData.combinedImages);
          break;
        case "PentHouses":
          setPentHouse(propertyData.PropertyData);
          setPentHouseGalleryData(propertyData.PropertyData.combinedImages);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching Property:", error);
    }
  };

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

  const handleRowLabe = (data) => {
    // Use the row data in the second component
    setCustomLabel(data);
  };
  //console.log("PlotsGalleryData____",PlotsGalleryData);
  const publishBtn = async (e) => {

    e.preventDefault();

    const PropertyData = {
      Apartments: ApartmentData,
      Villas: VillaData,
      Plots: PlotsData,
      RowHouses: RowHouseData,
      CommercialProperties: CommercialData,
      Villaments: VillamentData,
      PentHouses: PentHouseData,
    };

    const json_PropertyInsert = {
      title: title.trim(),
      selectedOwner: selectedOwner,
      propertyType: propertyType,
      featured: featured,
      selectedRegions: selectedRegions,
      selectedCategories: selectedCategories,
      CustomLabel: CustomLabel,
      propertyData: PropertyData[propertyType],
      auditUser: 'admin',
    };

    console.log("json_PropertyInsert_____", json_PropertyInsert);

    try {
      let response;
      if (propertyId) {
        // Update existing property
        response = await httpCommon.put(`/property/${propertyId}`, json_PropertyInsert);
      } else {
        // Create new property
        response = await httpCommon.post("/property", json_PropertyInsert);
      }
      const responseData = await response.data;
      //  console.log("json_Asset Data___", responseData);

      if (responseData.status === "SUCCESS") {
        console.log("SUCCESS_____insert__");
        const auditUser = "admin";
        if (propertyType === "Apartments") {
          if (ApartmentGalleryData.galleryImages.length > 0) {
            const formData = new FormData();
            const type = "Gallery";
            for (let i = 0; i < ApartmentGalleryData.galleryImages.length; i++) {
              formData.append("images", ApartmentGalleryData.galleryImages[i]);
            }
            formData.append("type", type);
            formData.append("auditUser", auditUser);

            const uploadResponse = await httpCommon.post(`/property/upload/${responseData.RowID}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });

            console.log("Upload Response:", uploadResponse.data);
          }
        } else if (propertyType === "Villas") {
          if (VillaGalleryData.galleryImages.length > 0) {
            const formData = new FormData();
            const type = "Gallery";
            for (let i = 0; i < VillaGalleryData.galleryImages.length; i++) {
              formData.append("images", VillaGalleryData.galleryImages[i]);
            }
            formData.append("type", type);
            formData.append("auditUser", auditUser);

            const uploadResponse = await httpCommon.post(`/property/upload/${responseData.RowID}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log("Upload Response:", uploadResponse.data);
          }
        } else if (propertyType === "Plots") {
          if (PlotsGalleryData.galleryImages.length > 0) {
            const formData = new FormData();
            const type = "Gallery";
            for (let i = 0; i < PlotsGalleryData.galleryImages.length; i++) {
              formData.append("images", PlotsGalleryData.galleryImages[i]);
            }
            formData.append("type", type);
            formData.append("auditUser", auditUser);

            const uploadResponse = await httpCommon.post(`/property/upload/${responseData.RowID}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log("Upload Response:", uploadResponse.data);
          }
        } else if (propertyType === "RowHouses") {
          if (RowHouseGalleryData.galleryImages.length > 0) {
            const formData = new FormData();
            const type = "Gallery";
            for (let i = 0; i < RowHouseGalleryData.galleryImages.length; i++) {
              formData.append("images", RowHouseGalleryData.galleryImages[i]);
            }
            formData.append("type", type);
            formData.append("auditUser", auditUser);

            const uploadResponse = await httpCommon.post(`/property/upload/${responseData.RowID}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log("Upload Response:", uploadResponse.data);
          }
        } else if (propertyType === "CommercialProperties") {

          if (CommercialGalleryData.galleryImages.length > 0) {
            const formData = new FormData();
            const type = "Gallery";
            for (let i = 0; i < CommercialGalleryData.galleryImages.length; i++) {
              formData.append("images", CommercialGalleryData.galleryImages[i]);
            }
            formData.append("type", type);
            formData.append("auditUser", auditUser);

            const uploadResponse = await httpCommon.post(`/property/upload/${responseData.RowID}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log("Upload Response:", uploadResponse.data);
          }
        }
        else if (propertyType === "Villaments") {
          if (VillamentGalleryData.galleryImages.length > 0) {
            const formData = new FormData();
            const type = "Gallery";
            for (let i = 0; i < VillamentGalleryData.galleryImages.length; i++) {
              formData.append("images", VillamentGalleryData.galleryImages[i]);
            }
            formData.append("type", type);
            formData.append("auditUser", auditUser);

            const uploadResponse = await httpCommon.post(`/property/upload/${responseData.RowID}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log("Upload Response:", uploadResponse.data);
          }
        }
        else if (propertyType === "PentHouses") {

          if (PentHouseGalleryData.galleryImages.length > 0) {
            const formData = new FormData();
            const type = "Gallery";
            for (let i = 0; i < PentHouseGalleryData.galleryImages.length; i++) {
              formData.append("images", PentHouseGalleryData.galleryImages[i]);
            }
            formData.append("type", type);
            formData.append("auditUser", auditUser);

            const uploadResponse = await httpCommon.post(`/property/upload/${responseData.RowID}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log("Upload Response:", uploadResponse.data);
          }
        }
        Swal.close();
        Swal.fire({
          icon: "success",
          title: responseData.status,
          text: responseData.message,
        }).then(() => {
          navigate(`/admin/property/new`);
        });

      } else {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: responseData.message,
        });
      }
    } catch (error) {
      console.error("Error publishing property:", error);
    }
  };
  const handleApartmentDataUpdate = (data) => {
    setApartment(data);
    setApartmentGalleryData(data.combinedImages);

  };

  const handleVillaDataUpdate = (data) => {
    setVilla(data);
    setVillaGalleryData(data.combinedImages);
  };

  const handlePlotsDataUpdate = (data) => {
    setPlots(data);
    setPlotsGalleryData(data.combinedImages);
  };

  const handleRowHouseDataUpdate = (data) => {
    setRowHouse(data);
    setRowHouseGalleryData(data.combinedImages);
  };

  const handleCommercialDataUpdate = (data) => {
    setCommercial(data);
    setCommercialGalleryData(data.combinedImages);
  };

  const handleVillamentDataUpdate = (data) => {
    setVillament(data);
    setVillamentGalleryData(data.combinedImages);
  };

  const handlePentHouseDataUpdate = (data) => {
    setPentHouse(data);
    setPentHouseGalleryData(data.combinedImages);
  };

  const property = {
    button: propertyId ? "Update" : "Create",
    title: propertyId ? "Update Property" : "Create New Property",
    description: propertyId
      ? "You can update your property here"
      : "You can add a new property here",
  };


  return (
    <div className="w-full bg-[#f5f3f3]">
      <div className="h-[98vh] overflow-y-scroll px-10">
        <div className="py-2 sticky top-0 bg-[#f5f3f3] mb-5 z-40">
          <div className="flex justify-between items-center">
            <div>
              <h2>{property.title}</h2>
              <p>{property.description}</p>
              <hr className="bg-[#FECE51] w-32 h-1" />
            </div>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
              onClick={publishBtn}
            >
              {property.button}
            </button>
          </div>
        </div>
        <div className="full-data">
          <h2 className="text-xl font-semibold">Property</h2>
          <div className="flex flex-wrap items-center">
            {/* Title */}
            <div className="w-full sm:w-1/2 lg:w-2/3 mb-4 sm:mb-0 pr-4">
              <label
                htmlFor="title"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-1">
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

            {/* Property Owner select dropdown */}
            <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
              <label
                htmlFor="owner"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Property Owner
              </label>
              <div className="mt-1">
                <select
                  id="owner"
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>
                    Select Property Owner
                  </option>
                  <option value="type1">Not Selected</option>
                  <option value="Master">Master</option>
                  <option value="AssetMakers">Asset Makers</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Type and Mark as Featured */}
          <div className="flex flex-wrap items-center mt-4">
            {/* Property Type */}
            <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
              <label
                htmlFor="propertyType"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Property Type
              </label>
              <div className="mt-1">
                <select
                  id="propertyType"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>
                    Select Property Type
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
                <label htmlFor="buy" className="inline-flex items-center mr-6 mb-2">
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
          <AddCustomLabel onRowClick={handleRowLabe} />

          {/* Render different modules based on property type */}
          <div>
            {propertyType === 'Apartments' ? (
              <AparmentModule onDataUpdate={handleApartmentDataUpdate} />
            ) : propertyType === 'Villas' ? (
              <VillaModule onDataUpdate={handleVillaDataUpdate} />
            ) : propertyType === 'Plots' ? (
              <PlotsModule onDataUpdate={handlePlotsDataUpdate} />
            ) : propertyType === 'RowHouses' ? (
              <RowModule onDataUpdate={handleRowHouseDataUpdate} />
            ) : propertyType === 'CommercialProperties' ? (
              <CommercialModule onDataUpdate={handleCommercialDataUpdate} />
            ) : propertyType === 'Villaments' ? (
              <VillamentModule onDataUpdate={handleVillamentDataUpdate} />
            ) : propertyType === 'PentHouses' ? (
              <PentModule onDataUpdate={handlePentHouseDataUpdate} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProperty;
