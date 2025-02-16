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

function NewListingPage({ action }) {
  const navigate = useNavigate();
  const { listingId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Define state for form inputs
  const [title, setTitle] = useState("");
  const [listingType, setListingType] = useState("");
  const [featured, setFeatured] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedRegions, setSelectedRegions] = useState("");
  const [CustomLabel, setCustomLabel] = useState([]);
  const [ApartmentData, setApartment] = useState([]);
  const [VillaData, setVilla] = useState([]);
  const [PlotsData, setPlots] = useState({});
  const [RowHouseData, setRowHouse] = useState({});
  const [CommercialData, setCommercial] = useState({});
  const [VillamentData, setVillament] = useState({});
  const [PentHouseData, setPentHouse] = useState({});
  const [errors, setErrors] = useState({});
  const [resultMessage, setResultMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!listingType) newErrors.listingType = "Property Type is required.";
    // if (!projectName) newErrors.projectName = "Project Name is required.";
    if (!title) newErrors.title = "Title is required.";
    if (!selectedOwner) newErrors.selectedOwner = "Property Owner is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join('\n');
      Swal.fire({
        icon: "warning",
        title: "Form Validation Error",
        text: errorMessages,
        confirmButtonText: "Ok",
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    const fetchRegionsAndCategories = async () => {
      try {
        const regionsResponse = await httpCommon.get('/regions');
        const categoriesResponse = await httpCommon.get('/categories');

        setRegions(regionsResponse.data);
        setCategories(categoriesResponse.data);

        if (listingId) {
          // Pass the fetched data directly to fetchProperty
          fetchProperty(listingId, regionsResponse.data, categoriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRegionsAndCategories();
  }, [listingId]);

  const fetchProperty = async (listingId, regionsData, categoriesData) => {
    try {
      const response = await httpCommon.get(`/list/listItem/${listingId}`);
      const listingData = response.data.data[0];

      setTitle(listingData.ltg_title);
      setProjectName(listingData.ltg_projectName);
      setListingType(listingData.ltg_type);
      setFeatured(listingData.ltg_mark_as_featured === "true");
      setSelectedOwner(listingData.ltg_owner);

      const region = regionsData.find(region => region.name === listingData.ltg_regions);
      const category = categoriesData.find(category => category.name === listingData.ltg_categories);

      if (region) {
        setSelectedRegions(region.name);
      }
      if (category) {
        setSelectedCategories(category.name);
      }

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

  const handleRegionChange = (event) => {
    setSelectedRegions(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const normalizeTitleForUrl = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const checkPropertyExists = async (propertyUrl, title) => {
    try {
      const response = await httpCommon.get(`/list/checkProperty`, {
        params: { propertyUrl },
      });

      if (response.data.exists) {
        // console.log('Property exists:', response.data);
        return { exists: true, message: response.data.message };
      } else {
        // console.log('Property does not exist:', response.data);
        return { exists: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Error checking property existence:', error.response?.data || error.message);
      return { exists: null, message: 'Error checking property existence' };
    }
  };

  const publishBtn = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // console.log("Form submitted successfully");
    formDataSubmit();
  };
  const cancelBtn = () =>{
    navigate('/admin');
  }

  const formDataSubmit = async (e) => {
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

    // Normalize the title for URL-safe version
    //const propertyUrl = normalizeTitleForUrl(title.trim());
    //const propertyUrl = `${normalizeTitleForUrl(title.trim())}_${Math.floor(Math.random() * 10000)}`;
    const propertyUrl = `${normalizeTitleForUrl(title.trim())}_${Math.floor(Math.random() * 9) + 1}`;


    const json_ListingInsert = {
      title: title.trim(),
      propertyUrl: propertyUrl,
      projectName: projectName.trim(),
      selectedOwner: selectedOwner,
      listingType: listingType,
      featured: featured,
      selectedRegions: selectedRegions,
      selectedCategories: selectedCategories,
      CustomLabel: JSON.stringify(CustomLabel),
      ListingData: listingData[listingType],
      auditUser: 'admin',
      update: Boolean(listingId && action !== 'clone'),
    };

    // console.log("json_ListingInsert_____", json_ListingInsert);
    // console.log("checkPropertyExists_____", json_ListingInsert.propertyUrl, json_ListingInsert.title);
    try {
      let result;
      if (action === 'clone' || !listingId) {
        result = await checkPropertyExists(json_ListingInsert?.propertyUrl);

        if (result.exists === true) {
          setResultMessage(`Property exists: ${result.message}`);
          Swal.fire({
            icon: 'error',
            title: 'Property already exists',
            text: result.message,
          });
          return;
        } else if (result.exists === false) {
          setResultMessage(`Property does not exist: ${result.message}`);
        } else {
          setResultMessage('An error occurred while checking the property.');
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while checking the property existence.',
          });
          return;
        }
      }

      let response;
      if (action === 'clone' && listingId) {
        // console.log("cloning listing");
        response = await httpCommon.post("/list", json_ListingInsert);
      } else if (listingId) {
        // console.log("updating listing");
        response = await httpCommon.patch(`/list/listItem/${listingId}`, json_ListingInsert);
      } else {
        // console.log("creating listing");
        response = await httpCommon.post("/list", json_ListingInsert);
      }
      const responseData = await response.data;

      if (responseData.status === "SUCCESS") {
        // console.log("SUCCESS_____insert__");
        const auditUser = "admin";
        const listingId = responseData.RowID;
        const update = json_ListingInsert.update;

        // Check file upload status
        const uploadSuccess = await uploadListingFiles(listingType, listingId, auditUser, listingData[listingType], update);

        if (!uploadSuccess) {
          console.error("File upload failed. Aborting success message.");
          Swal.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "File upload failed. Please try again.",
          });
          navigate('/admin');
          return;
        }

        await deleteImagesFromDatabase(json_ListingInsert.ListingData.deletedImages);
        await deletedFilesFromDatabase(json_ListingInsert.ListingData.deletedFiles);

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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while submitting the form.",
      });
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
      { key: 'combinedBrochure.brochure', type: 'Brochure' },
    ];

    // console.log(`Starting file upload for listingType: ${listingType}, listingID: ${listingID}, auditUser: ${auditUser}`);

    for (const fileType of fileTypes) {
      const files = getFileFromListingData(ListingData, fileType.key);
      if (files && files.length > 0) {
        // console.log(`Uploading ${files.length} files for ${fileType.type}`);
        const formData = new FormData();
        formData.append("type", fileType.type);
        formData.append("auditUser", auditUser);
        formData.append("update", update);

        for (let i = 0; i < files.length; i++) {
          formData.append("attachments", files[i]);
        }

        // console.log("formData", formData);

        try {
          const uploadResponse = await httpCommon.post(`/list/upload/${listingID}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          // console.log(`Upload Response (${fileType.type}):`, uploadResponse.data);

          // Check if the upload was unsuccessful
          if (uploadResponse.data.status !== "SUCCESS") {
            console.error(`Failed to upload ${fileType.type} files`);
            return false;
          }
        } catch (error) {
          console.error(`Error uploading ${fileType.type} files:`, error.response?.data || error.message);
          return false;
        }
      }
    }

    // console.log('File upload process completed.');
    return true;
  };

  const deleteImagesFromDatabase = async (deletedImages) => {
    try {
      for (const type in deletedImages) {
        const images = deletedImages[type];
        for (const RowID of images) {
          await httpCommon.delete(`/list/images/${RowID}`);
        }
      }
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  const deletedFilesFromDatabase = async (deletedFiles) => {
    try {
      for (const type in deletedFiles) {
        const files = deletedFiles[type];
        for (const RowID of files) {
          await httpCommon.delete(`/list/files/${RowID}`);
        }
      }
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };

  // Helper function to get nested listing from object
  function getFileFromListingData(data, key) {
    const keys = key.split('.');
    return keys.reduce((obj, k) => (obj && obj[k] !== 'undefined') ? obj[k] : undefined, data);
  }

  const handleApartmentDataUpdate = (data) => {
    // console.log("dataee___",data);
    setApartment(data);
  };

  const handleVillaDataUpdate = (data) => {
    // console.log("data_____",data);
    setVilla(data);
  };

  const handlePlotsDataUpdate = (data) => {
    setPlots(data);
  };

  const handleRowHouseDataUpdate = (data) => {
    setRowHouse(data);
  };

  const handleCommercialDataUpdate = (data) => {
    setCommercial(data);
  };

  const handleVillamentDataUpdate = (data) => {
    setVillament(data);
  };

  const handlePentHouseDataUpdate = (data) => {
    setPentHouse(data);
  };

  const listing = {
    button: (listingId && action !== 'clone') ? "Update" : "Create",
    title: (listingId && action !== 'clone') ? "Update Property" : "Create New Property",
    description: (listingId && action !== 'clone')
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
            <div className="flex space-x-2">
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
            <button
              className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
              onClick={cancelBtn} // Add your cancel button handler here
              >
              Cancel
            </button>
            </div>
          </div>
        </div>
        <div className="full-data">
          <h2 className="text-xl font-semibold">Property</h2>

          {/* Listing Type, Mark as Featured and Project Name */}
          <div className="flex flex-wrap mt-4 -mx-4">
            {/* Property Type */}
            <div className="w-full px-4 sm:w-1/2 lg:w-1/3">
              <label
                htmlFor="listingType"
                className="block text-sm font-semibold text-gray-900"
              >
                Property Type
              </label>
              <div className="mt-1">
                <select
                  id="listingType"
                  value={listingType}
                  onChange={(e) => setListingType(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
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
                {errors.listingType && <p className="mt-1 text-sm text-red-500">{errors.listingType}</p>}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center w-full px-4 mt-5 sm:w-1/2 lg:w-1/3">
              <Switch
                checked={featured}
                onChange={setFeatured}
                className={classNames(
                  featured ? "bg-indigo-600" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                )}
              >
                <span className="sr-only">Mark as featured</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    featured ? "translate-x-6" : "translate-x-1",
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  )}
                />
              </Switch>
              <label htmlFor="featured" className="ml-3 text-sm font-medium text-gray-900">
                Mark as Featured
              </label>
            </div>

            {/* Project Name */}
            <div className="w-full px-4 lg:w-1/3">
              <label
                htmlFor="projectName"
                className="block text-sm font-semibold text-gray-900"
              >
                Project Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  placeholder="Auto Draft"
                  onChange={(e) => setProjectName(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />

                {errors.projectName && <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>}
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-wrap mt-4 -mx-4">
            {/* Title */}
            <div className="w-full px-4 sm:w-2/3 lg:w-2/3">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-900"
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
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>
            </div>

            {/* Listing Owner */}
            <div className="w-full px-4 sm:w-1/3 lg:w-1/3">
              <label
                htmlFor="owner"
                className="block text-sm font-semibold text-gray-900"
              >
                Property Owner
              </label>
              <div className="mt-1">
                <select
                  id="owner"
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Property Owner
                  </option>
                  <option value="type1">Not Selected</option>
                  <option value="Master">Master</option>
                  <option value="AssetMakers">Asset Makers</option>
                </select>
                {errors.selectedOwner && <p className="mt-1 text-sm text-red-500">{errors.selectedOwner}</p>}
              </div>
            </div>
          </div>

          {/* Regions Section */}
          <div>
            <hr className="my-8 border-gray-400" />
            <h2 className="text-xl font-semibold">Regions</h2>
            <div className="flex items-center mt-4">
              <div className="flex flex-wrap items-center">
                {regions.map((region) => (
                  <label key={region.id} htmlFor={region.name} className="inline-flex items-center mb-2 mr-6">
                    <input
                      type="radio"
                      id={region.name}
                      name="region"
                      value={region.name}
                      className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-radio"
                      onChange={handleRegionChange}
                      checked={selectedRegions === region.name}
                    />
                    <span className="ml-2 text-sm leading-6 text-gray-900">{region.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <hr className="my-8 border-gray-400" />
            <h2 className="text-xl font-semibold">Categories</h2>
            <div className="flex items-center mt-4">
              <div className="flex flex-wrap items-center">
                {categories.map((category) => (
                  <label key={category.id} htmlFor={category.name} className="inline-flex items-center mb-2 mr-6">
                    <input
                      type="radio"
                      id={category.name}
                      name="category"
                      value={category.name}
                      className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-radio"
                      onChange={handleCategoryChange}
                      checked={selectedCategories === category.name}
                    />
                    <span className="ml-2 text-sm leading-6 text-gray-900">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Labels Section */}
          <AddCustomLabel
            initialLabels={CustomLabel}
            onRowClick={(newLabels) => setCustomLabel(newLabels)}
          />

          {/* Render different modules based on listing type */}
          <div>
            {listingType === 'Apartments' ? (
              <ApartmentModule action={action} onDataUpdate={handleApartmentDataUpdate} />
            ) : listingType === 'Villas' ? (
              <VillaModule action={action} onDataUpdate={handleVillaDataUpdate} />
            ) : listingType === 'Plots' ? (
              <PlotsModule action={action} onDataUpdate={handlePlotsDataUpdate} />
            ) : listingType === 'RowHouses' ? (
              <RowModule action={action} onDataUpdate={handleRowHouseDataUpdate} />
            ) : listingType === 'CommercialProperties' ? (
              <CommercialModule action={action} onDataUpdate={handleCommercialDataUpdate} />
            ) : listingType === 'Villaments' ? (
              <VillamentModule action={action} onDataUpdate={handleVillamentDataUpdate} />
            ) : listingType === 'PentHouses' ? (
              <PentModule action={action} onDataUpdate={handlePentHouseDataUpdate} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewListingPage;
