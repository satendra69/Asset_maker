import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "@headlessui/react";
import AddCustomLabel from "./Component/CustomLabel";
import ApartmentModule from "./Component/AparmentModule";
import VillaModule from "./Component/VillaModule";
import PlotsModule from "./Component/PlotsModule";
import RowModule from "./Component/RowModule";
import CommercialModule from "./Component/CommercialModule";
import VillamentModule from "./Component/VillamentModule";
import PentModule from "./Component/PentModule";
import httpCommon from "../../../http-common";
import Swal from "sweetalert2";
import { toast } from 'sonner';
import { Rings } from 'react-loader-spinner';
import LoadingOverlay from '../../Component/LoadingOverlay/LoadingOverlay';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NewListingPage() {
  const navigate = useNavigate();
  const { listingId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  // Define state for form inputs
  const [title, setTitle] = useState("");
  const [listingType, setListingType] = useState("");
  const [featured, setFeatured] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState("");

  // added by satya
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedRegions, setSelectedRegions] = useState("");
  const [CustomLabel, setCustomLabel] = useState([]);
  const [ApartmentData, setApartment] = useState([]);
  const [ApartmentGalleryData, setApartmentGalleryData] = useState([]);
  const [ApartmentBrochureData, setApartmentBrochureData] = useState([]);

  // for villa
  const [VillaData, setVilla] = useState([]);
  const [VillaGalleryData, setVillaGalleryData] = useState([]);
  const [VillaBrochureData, setVillaBrochureData] = useState([]);

  // for Plots
  const [PlotsData, setPlots] = useState({});
  const [PlotsGalleryData, setPlotsGalleryData] = useState([]);
  const [PlotsBrochureData, setPlotsBrochureData] = useState([]);

  // for Row House
  const [RowHouseData, setRowHouse] = useState({});
  const [RowHouseGalleryData, setRowHouseGalleryData] = useState([]);
  const [RowHouseBrochureData, setRowHouseBrochureData] = useState([]);

  // for Commercial Properties
  const [CommercialData, setCommercial] = useState({});
  const [CommercialGalleryData, setCommercialGalleryData] = useState([]);
  const [CommercialBrochureData, setCommercialBrochureData] = useState([]);

  // for Villament
  const [VillamentData, setVillament] = useState({});
  const [VillamentGalleryData, setVillamentGalleryData] = useState([]);
  const [VillamentBrochureData, setVillamentBrochureData] = useState([]);

  // for Pent House
  const [PentHouseData, setPentHouse] = useState({});
  const [PentHouseGalleryData, setPentHouseGalleryData] = useState([]);
  const [PentHouseBrochureData, setPentHouseBrochureData] = useState([]);

  // Fetch property details if in update mode
  useEffect(() => {
    if (listingId) {
      fetchProperty(listingId);
    }
  }, [listingId]);

  const fetchProperty = async (listingId) => {
    try {
      const response = await httpCommon.get(`/list/${listingId}`);
      const listingData = response.data.data[0];
      // console.log("listingData", listingData);

      // Update state with fetched data
      setTitle(listingData.ltg_title);
      setListingType(listingData.ltg_type);
      setFeatured(listingData.ltg_mark_as_featured === "true");
      setSelectedOwner(listingData.ltg_owner);
      setSelectedCategories(listingData.ltg_categories);
      setSelectedRegions(listingData.ltg_regions);
      // Clean up the JSON string if it has extra quotes
      const cleanedLabels = listingData.ltg_labels.replace(/^"|"$/g, '');
      setCustomLabel(JSON.parse(cleanedLabels));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Property not found');
        navigate('/admin/property/new');
      } else {
        console.error('Error fetching Property:', error);
        toast.error('An error occurred while fetching the property');
      }
    }
  };

  // Function to handle Region radio button change
  const handleRegionChange = (event) => {
    setSelectedRegions(event.target.value);
  };

  // Function to handle Category radio button change
  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const publishBtn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const listingData = {
      Apartments: ApartmentData,
      Villas: VillaData,
      Plots: PlotsData,
      RowHouses: RowHouseData,
      CommercialProperties: CommercialData,
      Villaments: VillamentData,
      PentHouses: PentHouseData,
    };

    const json_ListingInsert = {
      title: title.trim(),
      selectedOwner: selectedOwner,
      listingType: listingType,
      featured: featured,
      selectedRegions: selectedRegions,
      selectedCategories: selectedCategories,
      CustomLabel: JSON.stringify(CustomLabel),
      ListingData: listingData[listingType],
      auditUser: 'admin',
      update: Boolean(listingId),
    };

    console.log("json_ListingInsert_____", json_ListingInsert);

    try {
      let response;
      if (listingId) {
        response = await httpCommon.patch(`/list/${listingId}`, json_ListingInsert);
      } else {
        response = await httpCommon.post("/list", json_ListingInsert);
      }
      const responseData = await response.data;

      if (responseData.status === "SUCCESS") {
        console.log("SUCCESS_____insert__");
        const auditUser = "admin";
        const listingId = responseData.RowID;
        const update = json_ListingInsert.update;

        await uploadListingFiles(listingType, listingId, auditUser, listingData[listingType], update);

        Swal.close();
        Swal.fire({
          icon: "success",
          title: responseData.status,
          text: responseData.message,
        }).then(() => {
          navigate(`/admin`);
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
      console.error("Error publishing listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadListingFiles = async (listingType, listingID, auditUser, ListingData, update) => {
    const fileTypes = [
      { key: 'combinedImages.mainImage', type: 'Main' },
      { key: 'combinedImages.galleryImages', type: 'Gallery' },
      { key: 'combinedImages.masterPlanImages', type: 'MasterPlan' },
      { key: 'combinedImages.floorAreaPlanImages', type: 'FloorAreaPlan' },
      { key: 'brochure', type: 'Brochure' },
    ];

    console.log(`Starting file upload for listingType: ${listingType}, listingID: ${listingID}, auditUser: ${auditUser}`);

    for (const fileType of fileTypes) {
      const files = getFileFromListingData(ListingData, fileType.key);
      if (files && files.length > 0) {
        console.log(`Uploading ${files.length} files for ${fileType.type}`);
        const formData = new FormData();
        formData.append("type", fileType.type);
        formData.append("auditUser", auditUser);
        formData.append("update", update);

        for (let i = 0; i < files.length; i++) {
          formData.append("attachments", files[i]);
        }

        try {
          const uploadResponse = await httpCommon.post(`/list/upload/${listingID}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          console.log(`Upload Response (${fileType.type}):`, uploadResponse.data);
        } catch (error) {
          console.error(`Error uploading ${fileType.type} files:`, error);
        }
      }
    }

    console.log('File upload process completed.');
  };

  // Helper function to get nested listing from object
  function getFileFromListingData(data, key) {
    const keys = key.split('.');
    return keys.reduce((obj, k) => (obj && obj[k] !== 'undefined') ? obj[k] : undefined, data);
  }

  const handleApartmentDataUpdate = (data) => {
    // console.log("dataee___",data);
    setApartment(data);
    setApartmentGalleryData(data.combinedImages);
    setApartmentBrochureData(data.brochure);
  };

  const handleVillaDataUpdate = (data) => {
    // console.log("data_____",data);
    setVilla(data);
    setVillaGalleryData(data.combinedImages);
    setVillaBrochureData(data.brochure);
  };

  const handlePlotsDataUpdate = (data) => {
    setPlots(data);
    setPlotsGalleryData(data.combinedImages);
    setPlotsBrochureData(data.brochure);
  };

  const handleRowHouseDataUpdate = (data) => {
    setRowHouse(data);
    setRowHouseGalleryData(data.combinedImages);
    setRowHouseBrochureData(data.brochure);
  };

  const handleCommercialDataUpdate = (data) => {
    setCommercial(data);
    setCommercialGalleryData(data.combinedImages);
    setCommercialBrochureData(data.brochure);
  };

  const handleVillamentDataUpdate = (data) => {
    setVillament(data);
    setVillamentGalleryData(data.combinedImages);
    setVillamentBrochureData(data.brochure);
  };

  const handlePentHouseDataUpdate = (data) => {
    setPentHouse(data);
    setPentHouseGalleryData(data.combinedImages);
    setPentHouseBrochureData(data.brochure);
  };

  const listing = {
    button: listingId ? "Update" : "Create",
    title: listingId ? "Update Property" : "Create New Property",
    description: listingId
      ? "You can update your property here"
      : "You can add a new property here",
  };

  return (
    <div className="w-full bg-[#f5f3f3]">
      <div className="h-[98vh] overflow-y-scroll px-10">
        {isLoading && <LoadingOverlay />}
        <div className="py-2 sticky top-0 bg-[#f5f3f3] mb-5 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h2>{listing.title}</h2>
              <p>{listing.description}</p>
              <hr className="bg-[#FECE51] w-32 h-1" />
            </div>
            <button
              className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600"
              onClick={publishBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <Rings
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="loading"
                />
              ) : (
                listing.button
              )}
            </button>
          </div>
        </div>
        <div className="full-data">
          <h2 className="text-xl font-semibold">Property</h2>
          <div className="flex flex-wrap items-center">
            {/* Title */}
            <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-2/3 sm:mb-0">
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

            {/* Listing Owner select dropdown */}
            <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
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

          {/* Listing Type and Mark as Featured */}
          <div className="flex flex-wrap items-center mt-4">
            {/* Listing Type */}
            <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
              <label
                htmlFor="listingType"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Property Type
              </label>
              <div className="mt-1">
                <select
                  id="listingType"
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
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
                className="ml-2 text-sm leading-6 text-gray-600"
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
            <hr className="my-8 border-gray-400" />
            <h2 className="text-xl font-semibold">Regions</h2>
            <div className="flex items-center mt-4">
              {/* Radio buttons for regions */}
              <div className="flex flex-wrap items-center">

                {/* Bengaluru */}
                <label
                  htmlFor="bengaluru"
                  className="inline-flex items-center mb-2 mr-6"
                >
                  <input
                    type="radio"
                    id="bengaluru"
                    name="region"
                    value="bengaluru"
                    className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-radio"
                    onChange={handleRegionChange}
                    checked={selectedRegions === "bengaluru"}
                  />
                  <span className="ml-2 text-sm leading-6 text-gray-900">
                    Bengaluru
                  </span>
                </label>

                {/* Hyderabad */}
                <label
                  htmlFor="hyderabad"
                  className="inline-flex items-center mb-2 mr-6"
                >
                  <input
                    type="radio"
                    id="hyderabad"
                    name="region"
                    value="hyderabad"
                    className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-radio"
                    onChange={handleRegionChange}
                    checked={selectedRegions === "hyderabad"}
                  />
                  <span className="ml-2 text-sm leading-6 text-gray-900">
                    Hyderabad
                  </span>
                </label>

                {/* Tirupati */}
                <label
                  htmlFor="tirupati"
                  className="inline-flex items-center mb-2 mr-6"
                >
                  <input
                    type="radio"
                    id="tirupati"
                    name="region"
                    value="tirupati"
                    className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-radio"
                    onChange={handleRegionChange}
                    checked={selectedRegions === "tirupati"}
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
            <hr className="my-8 border-gray-400" />
            <h2 className="text-xl font-semibold">Categories</h2>
            <div className="flex items-center mt-4">
              {/* Radio buttons for categories */}
              <div className="flex flex-wrap items-center">
                <label htmlFor="buy" className="inline-flex items-center mb-2 mr-6">
                  <input
                    type="radio"
                    id="buy"
                    name="category"
                    value="buy"
                    className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-radio"
                    onChange={handleCategoryChange}
                    checked={selectedCategories === "buy"}
                  />
                  <span className="ml-2 text-sm leading-6 text-gray-900">
                    Buy
                  </span>
                </label>
                <label htmlFor="rent" className="inline-flex items-center mb-2">
                  <input
                    type="radio"
                    id="rent"
                    name="category"
                    value="rent"
                    className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-radio"
                    onChange={handleCategoryChange}
                    checked={selectedCategories === "rent"}
                  />
                  <span className="ml-2 text-sm leading-6 text-gray-900">
                    Rent
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Labels Section */}
          {/* <CustomLabel onRowClick={handleRowLabe} /> */}
          <AddCustomLabel
            initialLabels={CustomLabel}
            onRowClick={(newLabels) => setCustomLabel(newLabels)}
          />

          {/* Render different modules based on listing type */}
          <div>
            {listingType === 'Apartments' ? (
              <ApartmentModule onDataUpdate={handleApartmentDataUpdate} />
            ) : listingType === 'Villas' ? (
              <VillaModule onDataUpdate={handleVillaDataUpdate} />
            ) : listingType === 'Plots' ? (
              <PlotsModule onDataUpdate={handlePlotsDataUpdate} />
            ) : listingType === 'RowHouses' ? (
              <RowModule onDataUpdate={handleRowHouseDataUpdate} />
            ) : listingType === 'CommercialProperties' ? (
              <CommercialModule onDataUpdate={handleCommercialDataUpdate} />
            ) : listingType === 'Villaments' ? (
              <VillamentModule onDataUpdate={handleVillamentDataUpdate} />
            ) : listingType === 'PentHouses' ? (
              <PentModule onDataUpdate={handlePentHouseDataUpdate} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewListingPage;
