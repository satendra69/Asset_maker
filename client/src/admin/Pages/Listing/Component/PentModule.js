import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
//import { stateFromHTML } from 'draft-js-import-html';
import { toast } from 'sonner';
import MapComponent from "./MapComponent";
import inwords from './toIndianNumberingWords';
import ImageModal from './ImageModal';
import FileModal from './FileModal';
import httpCommon from "../../../../http-common";

function PentModule({ onDataUpdate }) {

  const { listingId } = useParams();
  const navigate = useNavigate();

  const [salePrice, setSalePrice] = useState("");
  const [displaySalePrice, setDisplaySalePrice] = useState("");
  const [salePriceWords, setSalePriceWords] = useState("");
  const [isSalePriceExceeded, setIsSalePriceExceeded] = useState(false);
  const [suffixPrice, setSuffixPrice] = useState("");
  const [displaySuffixPrice, setDisplaySuffixPrice] = useState("");
  const [suffixPriceWords, setSuffixPriceWords] = useState("");
  const [isSuffixPriceExceeded, setIsSuffixPriceExceeded] = useState(false);
  const [propertyAddressDetails, setPropertyAddressDetails] = useState("");
  const [areaDetails, setAreaDetails] = useState("");
  const [ratePerSqFt, setRatePerSqFt] = useState("");
  const [content, setContent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState("not_selected");
  const [selectedCarParking, setSelectedCarParking] = useState("not_selected");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [brochure, setBrochure] = useState([]);
  const [storedBrochure, setStoredBrochure] = useState([]);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(null);
  const [isStored, setIsStored] = useState(false);
  const [selectedBedRooms, setSelectedBedRooms] = useState("");
  const [selectedBathRooms, setSelectedBathRooms] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [mainDoorFacing, setMainDoorFacing] = useState("");
  const [isCornerPenthouse, setIsCornerPenthouse] = useState("");
  const [balconies, setBalconies] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [propertyFlooring, setPropertyFlooring] = useState("");
  const [approachingRoadWidth, setApproachingRoadWidth] = useState("");
  const [isInGatedCommunity, setIsInGatedCommunity] = useState("");
  const [selectedDuplex, setSelectedDuplex] = useState("");
  const [overLooking, setOverLooking] = useState("");
  const [otherAdvantages, setOtherAdvantages] = useState([]);
  const advantagesOptions = [
    { value: "pooja_room", label: "Pooja Room" },
    { value: "study_room", label: "Study Room" },
    { value: "store_room", label: "Store Room" },
    { value: "servant_room", label: "Servant Room" },
    { value: "drawing_room", label: "Drawing Room" },
    { value: "private_garden", label: "Private Garden" },
    { value: "terrace_garden", label: "Terrace Garden" },
    { value: "private_pool", label: "Private Pool" },
    { value: "private_jacuzzi", label: "Private Jacuzzi" },
    { value: "vaastu_compliant", label: "Vaastu Compliant" },
  ];
  const [transactionType, setTransactionType] = useState("");
  const [noOfOpenSides, setNoOfOpenSides] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [stampDutyAndRegistrationCharges, setStampDutyAndRegistrationCharges] =
    useState("");
  const [approvalAuthority, setApprovalAuthority] = useState("");
  const [totalProjectExtent, setTotalProjectExtent] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [totalPhases, setTotalPhases] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [projectBuilderDetails, setProjectBuilderDetails] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [storedGalleryImages, setStoredGalleryImages] = useState([]);
  const [masterPlanImages, setMasterPlanImages] = useState([]);
  const [storedMasterPlanImages, setStoredMasterPlanImages] = useState([]);
  const [floorAreaPlanImages, setFloorAreaPlanImages] = useState([]);
  const [storedFloorAreaPlanImages, setStoredFloorAreaPlanImages] = useState([]);
  const [selectedGalleryImageIndex, setSelectedGalleryImageIndex] = useState(null);
  const [selectedMasterPlanImageIndex, setSelectedMasterPlanImageIndex] = useState(null);
  const [selectedFloorAreaPlanImageIndex, setSelectedFloorAreaPlanImageIndex] = useState(null);
  const limit = 999999999999;

  const [initialPosition, setInitialPosition] = useState({
    location: "",
    address: "",
    postalCode: "",
    latitude: 17.387140,
    longitude: 78.491684,
  });
  const [locationData, setLocationData] = useState({});
  const [modalPdfUrl, setModalPdfUrl] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const propertyType = "PentHouses";

  // fetch property
  const fetchProperty = async (listingId) => {
    try {
      const response = await httpCommon.get(`/list/${listingId}/${propertyType}`);
      const listingData = response.data.data[0];
      console.log("listingData", listingData);

      // Fetch images and brochures
      try {
        const imgResponse = await httpCommon.get(`/list/singlePageImg/${listingId}`);
        if (imgResponse.data.status === "success") {
          const imageData = imgResponse.data.data;

          // Separate gallery and brochure data
          const galleryData = imageData.filter(item => item.type === "Gallery");
          const masterPlanData = imageData.filter(item => item.type === "MasterPlan");
          const floorAreaPlanData = imageData.filter(item => item.type === "FloorAreaPlan");
          const brochureData = imageData.filter(item => item.type === "Brochure");

          // Set images and brochures
          setStoredGalleryImages(galleryData);
          setStoredMasterPlanImages(masterPlanData);
          setStoredFloorAreaPlanImages(floorAreaPlanData);
          setStoredBrochure(brochureData);
        } else {
          console.error("Error fetching image data: Response status not successful");
          // Handle the non-success status appropriately here
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
        // Handle the error appropriately here
        // For example, you could set state to show an error message in your UI
      }

      // Update state with fetched data
      setDisplaySalePrice(listingData.ltg_det_penthouses_sale_price);
      setDisplaySuffixPrice(listingData.ltg_det_penthouses_suffix_price);

      // content update
      setContent(listingData.ltg_det_penthouses_desc);
      const blocksFromHTML = convertFromHTML(listingData.ltg_det_penthouses_desc || '');
      const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
      setEditorState(EditorState.createWithContent(contentState));

      setAreaDetails(listingData.ltg_det_penthouses_pmts_area_dts);
      setRatePerSqFt(listingData.ltg_det_penthouses_pmts_rate_per_sq);
      setSelectedStatus(listingData.ltg_det_penthouses_pmts_status);
      setSelectedBedRooms(listingData.ltg_det_penthouses_pmts_bed_rooms);
      setSelectedBathRooms(listingData.ltg_det_penthouses_pmts_bath_rooms);
      setSelectedCarParking(listingData.ltg_det_penthouses_pmts_car_parking);
      setYearBuilt(listingData.ltg_det_penthouses_pmts_year_built);
      // setTotalFloors(listingData.ltg_det_pmts_total_flrs);
      // setPlotDimensions(listingData.ltg_det_plot_dimensions);
      setNoOfOpenSides(listingData.ltg_det_penthouses_pmts_no_of_open_sides);
      setMainDoorFacing(listingData.ltg_det_penthouses_pmts_main_door_facing);
      setPropertyFlooring(listingData.ltg_det_penthouses_pmts_property_flooring);
      setBalconies(listingData.ltg_det_penthouses_pmts_balconies);
      setApproachingRoadWidth(listingData.ltg_det_penthouses_pmts_approaching_road_width);
      setFurnishing(listingData.ltg_det_penthouses_pmts_furnishing);
      setStampDutyAndRegistrationCharges(listingData.ltg_det_penthouses_pmts_stamp_duty_registration_charges);
      setTotalProjectExtent(listingData.ltg_det_penthouses_pmts_total_project_extent);
      setTransactionType(listingData.ltg_det_penthouses_pmts_transaction_type);
      setTotalPhases(listingData.ltg_det_penthouses_pmts_total_phases);
      setApprovalAuthority(listingData.ltg_det_penthouses_pmts_approval_authority);
      setTotalUnits(listingData.ltg_det_penthouses_pmts_total_units);
      setProjectBuilderDetails(listingData.ltg_det_penthouses_about_project_builder);
      setVideoUrl(listingData.ltg_det_penthouses_property_video_url);
      setOtherAdvantages(listingData.ltg_det_penthouses_pmts_other_advantages.split(", "));
      setSelectedAmenities(listingData.ltg_det_penthouses_amenities.split(", "));
      setOverLooking(listingData.ltg_det_penthouses_pmts_over_looking);
      setIsInGatedCommunity(listingData.ltg_det_penthouses_pmts_gated_community);
      setAvailableFrom(listingData.ltg_det_penthouses_pmts_available_form);
      setPropertyAddressDetails(listingData.ltg_det_penthouses_property_address_details);
      setSelectedDuplex(listingData.ltg_det_penthouses_pmts_duplex);
      setIsCornerPenthouse(listingData.ltg_det_penthouses_pmts_corner_penthouse);


      setInitialPosition({
        location: listingData.ltg_det_penthouses_location || "",
        address: listingData.ltg_det_penthouses_address || "",
        postalCode: listingData.ltg_det_penthouses_postal_code || "",
        latitude: listingData.ltg_det_penthouses_latitude || 17.387140,
        longitude: listingData.ltg_det_penthouses_longitude || 78.491684,
      });
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


  // format number to en-IN
  const formatNumber = (number) => {
    if (!number) return "";
    return new Intl.NumberFormat('en-IN').format(number);
  };

  const handleSalePriceChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    updateSalePrice(value);
  };

  const handleSuffixPriceChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    updateSuffixPrice(value);
  };

  const updateSalePrice = (value) => {
    if (value === "" || isNaN(value)) {
      setSalePrice("");
      setSalePriceWords("");
      setDisplaySalePrice("");
      setIsSalePriceExceeded(false);
    } else {
      const num = parseFloat(value);
      if (num <= limit && isFinite(num)) {
        setSalePrice(value);
        setDisplaySalePrice(formatNumber(value));
        setSalePriceWords(inwords(num));
        setIsSalePriceExceeded(false);
      } else {
        setSalePriceWords("");
        setIsSalePriceExceeded(true);
      }
    }
  };

  const updateSuffixPrice = (value) => {
    if (value === "" || isNaN(value)) {
      setSuffixPrice("");
      setSuffixPriceWords("");
      setDisplaySuffixPrice("");
      setIsSuffixPriceExceeded(false);
    } else {
      const num = parseFloat(value);
      if (num <= limit && isFinite(num)) {
        setSuffixPrice(value);
        setDisplaySuffixPrice(formatNumber(value));
        setSuffixPriceWords(inwords(num));
        setIsSuffixPriceExceeded(false);
      } else {
        setSuffixPriceWords("");
        setIsSuffixPriceExceeded(true);
      }
    }
  };

  // Function to handle image upload for each section
  const handleImageUpload = (event, setFunction) => {
    const files = Array.from(event.target.files);
    setFunction(prevImages => [...prevImages, ...files]);
  };

  const handleImageDelete = (index, images, setFunction) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setFunction(updatedImages);

    if (selectedGalleryImageIndex === index) {
      setSelectedGalleryImageIndex(null);
    } else if (selectedGalleryImageIndex > index) {
      setSelectedGalleryImageIndex(selectedGalleryImageIndex - 1);
    }

    if (selectedMasterPlanImageIndex === index) {
      setSelectedMasterPlanImageIndex(null);
    } else if (selectedMasterPlanImageIndex > index) {
      setSelectedMasterPlanImageIndex(selectedMasterPlanImageIndex - 1);
    }

    if (selectedFloorAreaPlanImageIndex === index) {
      setSelectedFloorAreaPlanImageIndex(null);
    } else if (selectedFloorAreaPlanImageIndex > index) {
      setSelectedFloorAreaPlanImageIndex(selectedFloorAreaPlanImageIndex - 1);
    }

  };

  const handleStoredImageDelete = async (RowID) => {
    try {
      const response = await httpCommon.delete(`/list/images/${RowID}`); // Adjust the endpoint as necessary
      if (response.data.status === "success") {
        setStoredGalleryImages(storedGalleryImages.filter(image => image.RowID !== RowID));
      } else {
        console.error("Error deleting gallery image:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting gallery image:", error);
    }
  };

  // Function to open modal with selected image index
  const openGalleryModal = (index) => {
    setSelectedGalleryImageIndex(index);
  };

  const openMasterPlanModal = (index) => {
    setSelectedMasterPlanImageIndex(index);
  };

  const openFloorAreaPlanModal = (index) => {
    setSelectedFloorAreaPlanImageIndex(index);
  };

  // Function to close modal
  const closeImageModal = () => {
    setSelectedGalleryImageIndex(null);
    setSelectedMasterPlanImageIndex(null);
    setSelectedFloorAreaPlanImageIndex(null);
  };

  // Function to handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop
  const handleDrop = (e, setFunction) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setFunction(prevImages => [...prevImages, ...files]);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setBrochure((prevBrochure) => [...prevBrochure, ...files]);
  };

  const handleFileDelete = (index) => {
    const updatedBrochure = brochure.filter((_, i) => i !== index);
    setBrochure(updatedBrochure);
  };

  const handleStoredFileDelete = async (RowID) => {
    try {
      const response = await httpCommon.delete(`/list/files/${RowID}`);
      if (response.data.status === "success") {
        setStoredBrochure(storedBrochure.filter(file => file.RowID !== RowID));

      } else {
        console.error("Error deleting brochure:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting brochure:", error);
    }
  };

  const handleFileClick = (index, pdfUrl = null, isStored = false) => {
    setSelectedDocumentIndex(index);
    setModalPdfUrl(pdfUrl);
    setIsStored(isStored);
    setModalIsOpen(true);
  };

  const closeDocumentModal = () => {
    setModalIsOpen(false);
    setModalPdfUrl('');
    setSelectedDocumentIndex(null);
    setIsStored(false);
  };

  const handleAdvantagesChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setOtherAdvantages(selectedOptions);
  };

  const removeAdvantage = (advantageToRemove) => {
    setOtherAdvantages((prevAdvantages) =>
      prevAdvantages.filter((advantage) => advantage !== advantageToRemove)
    );
  };

  const advantagesAsString = otherAdvantages.join(', ');

  // List of amenities
  const amenities = [
    "Acupressure walkway",
    "Amphi Theatre",
    "Basketball Court",
    "Basement",
    "Badminton Court",
    "Black top roads",
    "Billiards",
    "Bar/Lounge",
    "Cafeteria",
    "CCTV Surveillance",
    "Club House",
    "Children’s Play Area",
    "Clinic",
    "Concierge Services",
    "Concrete Roads",
    "Community Hall",
    "Creche",
    "Cricket Practice Pitch",
    "Domestic Help Room",
    "Drainage",
    "Elevator",
    "Foosball",
    "Footpaths",
    "Food Court",
    "Gazebo",
    "Guest Launch",
    "Golf Course",
    "Gym",
    "Gymnasium",
    "Garden",
    "Helipad",
    "Health Facilities",
    "Home Theatre",
    "24 Hrs Backup",
    "Intercom",
    "Indoor Games",
    "Jogging Track",
    "Kids Play Area",
    "Library",
    "Ladies Pool",
    "Laundry Service",
    "Maingate Arch",
    "Mini Soccer Ground",
    "Maze Garden",
    "Office Cubicles",
    "Outdoor Gym",
    "Piped Gas",
    "Pets Allowed",
    "Public Transport Available",
    "Party Hall",
    "Pharmacy",
    "Rain Water Harvesting",
    "Spa/ Saloon",
    "Supermarket",
    "Society Office",
    "Society Boundary Wall",
    "Steam / Jaccuzi",
    "Street Lights",
    "Swimming Pool",
    "Senior Citizen Seating Facilities",
    "Security",
    "Squash Court",
    "Table Tennis",
    "Toddlers Pool",
    "Temple",
    "Tennis court",
    "Under Ground Electricity",
    "Under Ground Water Supply",
    "Under Ground Drainage",
    "Volleyball Court",
    "Water Overhead Tank",
    "Yoga room",
  ];

  // Function to handle selection of amenities
  const handleAmenitySelection = (e) => {
    const amenity = e.target.value;
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const amenitiesAsString = selectedAmenities.join(', ');

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const rawContentState = convertToRaw(newEditorState.getCurrentContent());
    const html = draftToHtml(rawContentState);
    setContent(html);
  };

  const handleLocationChange = (updatedLocationData) => {
    if (updatedLocationData.latitude && updatedLocationData.longitude) {
      setLocationData(updatedLocationData);
      onDataUpdate(updatedLocationData);
    } else {
      console.error("Invalid location data:", updatedLocationData);
    }
  };

  const handleDataUpdate = () => {
    const combinedImages = {
      galleryImages,
      masterPlanImages,
      floorAreaPlanImages,
    };
    const data = {
      salePrice,
      suffixPrice,
      areaDetails,
      ratePerSqFt,
      locationData,
      content,
      propertyAddressDetails,
      selectedStatus,
      selectedCarParking,
      amenitiesAsString,
      videoUrl,
      brochure,
      selectedBedRooms,
      selectedBathRooms,
      yearBuilt,
      mainDoorFacing,
      isCornerPenthouse,
      balconies,
      furnishing,
      propertyFlooring,
      approachingRoadWidth,
      isInGatedCommunity,
      selectedDuplex,
      overLooking,
      advantagesAsString,
      transactionType,
      noOfOpenSides,
      availableFrom,
      stampDutyAndRegistrationCharges,
      approvalAuthority,
      totalProjectExtent,
      totalUnits,
      totalPhases,
      selectedOptions,
      projectBuilderDetails,
      combinedImages,
      type: propertyType,
    };
    onDataUpdate(data);
    console.log("Data to be passed to onDataUpdate:", data);
  };

  // fetch property
  useEffect(() => {
    if (listingId) {
      fetchProperty(listingId);
    }
  }, [listingId]);

  useEffect(() => {
    if (displaySalePrice) {
      const num = parseFloat(displaySalePrice.replace(/,/g, ''));
      if (!isNaN(num)) {
        updateSalePrice(num.toString());
      }
    }
  }, [displaySalePrice]);

  useEffect(() => {
    if (displaySuffixPrice) {
      const num = parseFloat(displaySuffixPrice.replace(/,/g, ''));
      if (!isNaN(num)) {
        updateSuffixPrice(num.toString());
      }
    }
  }, [displaySuffixPrice]);

  useEffect(() => {
    handleDataUpdate();
  }, [salePrice, suffixPrice, areaDetails, locationData, ratePerSqFt, content, propertyAddressDetails,
    selectedStatus, selectedCarParking, amenitiesAsString, videoUrl, brochure, selectedBedRooms,
    selectedBathRooms, yearBuilt, mainDoorFacing, isCornerPenthouse, balconies,
    furnishing, propertyFlooring, approachingRoadWidth, isInGatedCommunity, selectedDuplex,
    overLooking, advantagesAsString, transactionType, noOfOpenSides, availableFrom,
    stampDutyAndRegistrationCharges, approvalAuthority, totalProjectExtent, totalUnits, totalPhases,
    selectedOptions, projectBuilderDetails, brochure, galleryImages, masterPlanImages, floorAreaPlanImages,
    storedBrochure, storedGalleryImages, storedMasterPlanImages, storedFloorAreaPlanImages]);

  return (
    <div>
      <div>
        {/* Price Section */}
        <hr className="my-8 border-gray-400" />
        <h2 className="text-xl font-semibold">Price</h2>
        <div className="flex flex-wrap items-start mt-4"> {/* Use items-start to align items at the top */}
          {/* Sale Price */}
          <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label htmlFor="salePrice" className="block text-sm font-semibold leading-6 text-gray-900">
              Sale Price
            </label>
            <div className="mt-2.5 relative">
              {displaySalePrice && <span className="absolute text-gray-900 left-2 top-2">₹</span>}
              <input
                type="text"
                id="salePrice"
                value={displaySalePrice}
                placeholder="Enter Sale Price"
                onChange={handleSalePriceChange}
                onBlur={handleDataUpdate}
                className="block w-full py-2 pl-6 pr-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {/* Conditional rendering of limit exceeded or salePriceWords */}
              <div className="mt-1 text-sm text-blue-500">
                {isSalePriceExceeded ? "Limit exceeded" : (salePriceWords)}
              </div>
            </div>
          </div>

          {/* Suffix Price */}
          <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label htmlFor="suffixPrice" className="block text-sm font-semibold leading-6 text-gray-900">
              Suffix Price
            </label>
            <div className="mt-2.5 relative">
              {displaySuffixPrice && <span className="absolute text-gray-900 left-2 top-2">₹</span>}
              <input
                type="text"
                id="suffixPrice"
                value={displaySuffixPrice}
                placeholder="Enter Suffix Price"
                onChange={handleSuffixPriceChange}
                onBlur={handleDataUpdate}
                className="block w-full py-2 pl-6 pr-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {/* Conditional rendering of limit exceeded or suffixPriceWords */}
              <div className="mt-1 text-sm text-blue-500">
                {isSuffixPriceExceeded ? "Limit exceeded" : (suffixPriceWords)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <hr className="my-8 border-gray-400" />
      <h2 className="text-xl font-semibold">Description</h2>
      <div className="flex flex-wrap items-center mt-4">
        <div className="w-full p-4 border border-gray-450">
          <Editor
            placeholder="Enter Description"
            editorState={editorState}
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            onEditorStateChange={handleEditorChange}
            onBlur={handleDataUpdate}
            wrapperStyle={{ minHeight: "20em" }}
          />
        </div>
      </div>

      {/* Location Details */}
      <MapComponent onPositionChange={handleLocationChange} initialPosition={initialPosition} />


      {/* Property Address (If any more detailed) Section */}

      <hr className="my-8 border-gray-400" />
      <h2 className="text-xl font-semibold">
        Property Address (If any more detailed)
      </h2>
      <div className="flex flex-wrap items-center mt-4">
        <div className="w-full">
          <label
            htmlFor="propertyAddressDetails"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Property Address Details
          </label>
          <div className="mt-2.5">
            <textarea
              id="propertyAddressDetails"
              value={propertyAddressDetails}
              rows={7}
              placeholder="Enter more detailed property address if necessary"
              onChange={(e) => setPropertyAddressDetails(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Parameters Section */}

      <hr className="my-8 border-gray-400" />
      <h2 className="text-xl font-semibold">Parameters</h2>
      <div className="flex flex-wrap items-center mt-4">
        {/* Area Details */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="areaDetails"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Area Details
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="areaDetails"
              value={areaDetails}
              placeholder="Enter Area Details"
              onChange={(e) => setAreaDetails(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Rate Per Sq-Ft/Yrd */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="ratePerSqFt"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Rate Per Sq-Ft/Yrd
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="ratePerSqFt"
              value={ratePerSqFt}
              placeholder="Enter Rate per Sq-Ft/Yrd"
              onChange={(e) => setRatePerSqFt(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Status */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="status"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Status
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="ready_to_move">Ready to Move</option>
              <option value="under_construction">Under Construction</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        {/* Bed Rooms */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="bedRooms"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Bed Rooms
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="bedRooms"
              value={selectedBedRooms}
              onChange={(e) => setSelectedBedRooms(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              {[...Array(25).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bath Rooms */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="bathRooms"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Bath Rooms
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="bathRooms"
              value={selectedBathRooms}
              onChange={(e) => setSelectedBathRooms(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              {[...Array(25).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Car Parking */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="carParking"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Car Parking
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="carParking"
              value={selectedCarParking}
              onChange={(e) => setSelectedCarParking(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              {[...Array(25).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Year Built */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="yearBuilt"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Year Built
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="yearBuilt"
              value={yearBuilt}
              placeholder="Enter Year Built"
              onChange={(e) => setYearBuilt(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Duplex */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="duplex"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Duplex
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="duplex"
              value={selectedDuplex}
              onChange={(e) => setSelectedDuplex(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Main Door Facing */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="mainDoorFacing"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Main Door Facing
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="mainDoorFacing"
              value={mainDoorFacing}
              onChange={(e) => setMainDoorFacing(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="east">East</option>
              <option value="west">West</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="north-west">North-West</option>
              <option value="north-east">North-East</option>
              <option value="south-west">South-West</option>
              <option value="south-east">South-East</option>
            </select>
          </div>
        </div>

        {/* Is In Gated Community */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="isInGatedCommunity"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Is In Gated Community
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="isInGatedCommunity"
              value={isInGatedCommunity}
              onChange={(e) => setIsInGatedCommunity(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* This Is A Corner Penthouse */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="isCornerPenthouse"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            This Is A Corner Penthouse
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="isCornerPenthouse"
              value={isCornerPenthouse}
              onChange={(e) => setIsCornerPenthouse(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Balconies */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="balconies"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Balconies
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="balconies"
              value={balconies}
              onChange={(e) => setBalconies(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              {[...Array(10).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Furnishing */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="furnishing"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Furnishing
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="furnishing"
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="fully-furnished">Fully Furnished</option>
              <option value="semi-furnished">Semi Furnished</option>
              <option value="un-furnished">Un-Furnished</option>
            </select>
          </div>
        </div>

        {/* Over Looking */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="overLooking"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Over Looking
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="overLooking"
              value={overLooking}
              placeholder="Enter Over Looking"
              onChange={(e) => setOverLooking(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Transaction Type */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="transactionType"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Transaction Type
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="new_property">New Property</option>
              <option value="resale">Resale</option>
            </select>
          </div>
        </div>

        {/* Property Flooring */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="propertyFlooring"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Property Flooring
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="propertyFlooring"
              value={propertyFlooring}
              placeholder="Enter Property Flooring"
              onChange={(e) => setPropertyFlooring(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Other Advantages */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="otherAdvantages"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Other Advantages
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="otherAdvantages"
              value={otherAdvantages}
              onChange={handleAdvantagesChange}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              multiple
            >
              {advantagesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap items-center mt-2">
            {otherAdvantages.map((advantage) => (
              <div
                key={advantage}
                className="flex items-center px-2 py-1 mb-2 mr-2 bg-gray-100 rounded-md"
              >
                <span className="text-gray-800">{advantage}</span>
                <button
                  type="button"
                  className="ml-1 text-red-600 hover:text-red-800 focus:outline-none"
                  onClick={() => removeAdvantage(advantage)}
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* No Of Open Sides */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="noOfOpenSides"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            No Of Open Sides
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="noOfOpenSides"
              value={noOfOpenSides}
              onChange={(e) => setNoOfOpenSides(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              {[...Array(4).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Approaching Road Width */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="approachingRoadWidth"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Approaching Road Width
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="approachingRoadWidth"
              value={approachingRoadWidth}
              placeholder="Enter Approaching Road Width"
              onChange={(e) => setApproachingRoadWidth(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Available Form */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="availableFrom"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Available Form
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="availableFrom"
              value={availableFrom}
              placeholder="Enter Available From"
              onChange={(e) => setAvailableFrom(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Approval Authority */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="approvalAuthority"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Approval Authority
          </label>
          <div className="mt-1 mr-3 mb-7">
            <input
              type="text"
              id="approvalAuthority"
              value={approvalAuthority}
              placeholder="Enter Approval Authority"
              onChange={(e) => setApprovalAuthority(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Total Project Extent */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="totalProjectExtent"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Total Project Extent
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="totalProjectExtent"
              value={totalProjectExtent}
              placeholder="Enter Total Project Extent"
              onChange={(e) => setTotalProjectExtent(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Stamp Duty & Registration Charges */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="stampDutyAndRegistrationCharges"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Stamp Duty & Registration Charges
          </label>
          <div className="mt-2.5 mb-7">
            <select
              id="stampDutyAndRegistrationCharges"
              value={stampDutyAndRegistrationCharges}
              onChange={(e) =>
                setStampDutyAndRegistrationCharges(e.target.value)
              }
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="excluded">Excluded</option>
              <option value="included">Included</option>
            </select>
          </div>
        </div>

        {/* Total Phases */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="totalPhases"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Total Phases
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="totalPhases"
              value={totalPhases}
              placeholder="Enter Total Phases"
              onChange={(e) => setTotalPhases(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Total Units */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="totalUnits"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Total Units
          </label>
          <div className="mt-2.5 mr-3 mb-7">
            <input
              type="text"
              id="totalUnits"
              value={totalUnits}
              placeholder="Enter Total Units"
              onChange={(e) => setTotalUnits(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* Amenities Section */}

      <div>
        <hr className="my-8 border-gray-400" />
        <h2 className="text-xl font-semibold">Amenities</h2>
        <div className="flex flex-wrap mt-4">
          {/* Checkboxes for Amenities */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {amenities.map((amenity, index) => (
              <label
                key={index}
                htmlFor={amenity}
                className="inline-flex items-center"
              >
                <input
                  type="checkbox"
                  id={amenity}
                  value={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onChange={handleAmenitySelection}
                  onBlur={handleDataUpdate}
                  className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  {amenity}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* About Project/Builder Section */}

      <hr className="my-8 border-gray-400" />
      <h2 className="text-xl font-semibold">About Project/Builder</h2>
      <div className="flex flex-wrap items-center mt-4">
        <div className="w-full">
          <label
            htmlFor="projectBuilderDetails"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Project/Builder Details
          </label>
          <div className="mt-2.5">
            <textarea
              id="projectBuilderDetails"
              value={projectBuilderDetails}
              rows={7}
              onChange={(e) => setProjectBuilderDetails(e.target.value)}
              onBlur={handleDataUpdate}
              placeholder="Enter details about the project/builder"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Property Brochure Section */}
      <div>
        <hr className="my-8 border-gray-400" />
        <h2 className="text-xl font-semibold">Property Brochure</h2>
        <div className="flex flex-wrap items-center mt-4">
          <label htmlFor="brochure" className="mr-2">
            <span className="text-gray-700">Upload Brochure:</span>
            <input
              type="file"
              id="brochure"
              name="brochure"
              accept=".pdf,.doc,.docx"
              className="hidden"
              multiple
              onChange={handleFileUpload}
            />
          </label>
          <label
            htmlFor="brochure"
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600"
          >
            Browse
          </label>
        </div>

        {/* Stored Brochure Section */}
        {storedBrochure.length > 0 && (
          <div className="mt-4">
            {storedBrochure
              .filter(file =>
                file.file_name.endsWith('.pdf') ||
                file.file_name.endsWith('.doc') ||
                file.file_name.endsWith('.docx')
              ).map((file, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => handleStoredFileDelete(file.RowID)}
                    className="px-2 py-1 ml-2 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    X
                  </button>
                  <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    onClick={() => handleFileClick(index, httpCommon.defaults.baseURL + file.attachment, true)}
                  >
                    {file.file_name}
                  </span>
                </div>
              ))}
          </div>
        )}

        {brochure.length > 0 && (
          <div className="">
            {brochure.map((file, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => handleFileDelete(index)}
                  className="px-2 py-1 ml-2 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                >
                  X
                </button>
                <span
                  className="ml-2 text-blue-500 cursor-pointer"
                  onClick={() => handleFileClick(index, URL.createObjectURL(file), false)}
                >
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Modal for displaying documents */}
        {modalIsOpen && (
          <FileModal
            documents={isStored ? storedBrochure : brochure}
            currentIndex={selectedDocumentIndex}
            isStored={isStored}
            onClose={closeDocumentModal}
            modalPdfUrl={modalPdfUrl}
          />
        )}
      </div>

      {/* Gallery Section */}
      <div>
        <hr className="my-8 border-gray-400" />
        <h2 className="mb-2 text-xl font-semibold">Gallery</h2>
        <div className="items-center justify-center p-8 mb-4 bg-white rounded-lg shadow-md">
          <div
            className="relative w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
            id="dropzone"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, setGalleryImages)}
          >
            <input
              type="file"
              id="gallery-upload"
              name="gallery-upload"
              accept="image/*"
              multiple
              className="absolute inset-0 z-50 w-full h-full opacity-0"
              onChange={(e) => handleImageUpload(e, setGalleryImages)}
            />
            <div className="text-center">
              <img
                src="https://www.svgrepo.com/show/357902/image-upload.svg"
                alt="Upload"
                className="w-12 h-12 mx-auto"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label htmlFor="file-upload" className="relative">
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span> to upload</span>
                  {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" /> */}
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            {/* <img src="" className="hidden mx-auto mt-4 max-h-40" id="preview" /> */}
          </div>
        </div>


        <div className="flex flex-wrap mt-4">

          {/* Displaying Stored Gallery Images */}
          {storedGalleryImages.length > 0 && (
            <div className="flex flex-row">
              {storedGalleryImages.map((file, index) => (
                <div key={index} className="relative m-2">
                  <button
                    onClick={() => handleStoredImageDelete(file.RowID)} // Implement this function
                    className="absolute top-0 right-0 px-2 py-1 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    X
                  </button>
                  <img
                    src={httpCommon.defaults.baseURL + file.attachment} // Adjust URL for stored images
                    alt={`Stored Image ${file.file_name}`}
                    className="object-cover w-32 h-32 rounded cursor-pointer"
                    onClick={() => openGalleryModal(index)} // Implement modal opening for stored images
                  />
                </div>
              ))}
            </div>
          )}

          {galleryImages.map((image, index) => (
            <div key={index} className="relative m-2">
              <button
                onClick={() => handleImageDelete(index, galleryImages, setGalleryImages)}
                className="absolute top-0 right-0 px-2 py-1 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
              >
                X
              </button>
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded Image ${index + 1}`}
                className="object-cover w-32 h-32 rounded cursor-pointer"
                onClick={() => openGalleryModal(index)}
              />
            </div>
          ))}

        </div>

        {/* Modal for displaying images */}
        {selectedGalleryImageIndex !== null && (
          <ImageModal
            images={galleryImages}
            currentIndex={selectedGalleryImageIndex}
            onClose={closeImageModal}
          />
        )}
      </div>

      {/* Property Video Section */}
      <div>
        <hr className="my-8 border-gray-400" />
        <h2 className="text-xl font-semibold">Property Video</h2>
        <div className="flex flex-wrap items-center mt-4">
          <input
            id="videoUrl"
            type="text"
            placeholder="Enter the Property Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>

      {/* Master Plan Section */}
      <div>
        <hr className="my-8 border-gray-400" />
        <h2 className="mb-2 text-xl font-semibold">Master Plan</h2>
        <div className="items-center justify-center p-8 mb-4 bg-white rounded-lg shadow-md">
          <div
            className="relative w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
            id="dropzone"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, setMasterPlanImages)}
          >
            <input
              type="file"
              id="masterPlan-upload"
              name="masterPlan-upload"
              accept="image/*"
              multiple
              className="absolute inset-0 z-50 w-full h-full opacity-0"
              onChange={(e) => handleImageUpload(e, setMasterPlanImages)}
            />
            <div className="text-center">
              <img
                src="https://www.svgrepo.com/show/357902/image-upload.svg"
                alt="Upload"
                className="w-12 h-12 mx-auto"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label htmlFor="file-upload" className="relative">
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span> to upload</span>
                  {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" /> */}
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            {/* <img src="" className="hidden mx-auto mt-4 max-h-40" id="preview" /> */}
          </div>

          <div className="flex flex-wrap mt-4">

            {/* Displaying Stored Master Plan Images */}
            {storedMasterPlanImages.length > 0 && (
              <div className="flex flex-row">
                {storedMasterPlanImages.map((file, index) => (
                  <div key={index} className="relative m-2">
                    <button
                      onClick={() => handleStoredImageDelete(file.RowID)}
                      className="absolute top-0 right-0 px-2 py-1 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                    >
                      X
                    </button>
                    <img
                      src={httpCommon.defaults.baseURL + file.attachment}
                      alt={`Stored Image ${file.file_name}`}
                      className="object-cover w-32 h-32 rounded cursor-pointer"
                      onClick={() => openMasterPlanModal(index)}
                    />
                  </div>
                ))}
              </div>
            )}

            {masterPlanImages.map((image, index) => (
              <div key={index} className="relative m-2">
                <button
                  onClick={() => handleImageDelete(index, masterPlanImages, setMasterPlanImages)}
                  className="absolute top-0 right-0 px-2 py-1 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                >
                  X
                </button>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Image ${index + 1}`}
                  className="object-cover w-32 h-32 rounded cursor-pointer"
                  onClick={() => openMasterPlanModal(index)}
                />
              </div>
            ))}
          </div>

          {/* Modal for displaying images */}
          {selectedMasterPlanImageIndex !== null && (
            <ImageModal
              images={masterPlanImages}
              currentIndex={selectedMasterPlanImageIndex}
              onClose={closeImageModal}
            />
          )}
        </div>
      </div>

      {/* Floor/Area Plan Section */}
      <div>
        <hr className="my-8 border-gray-400" />
        <h2 className="mb-2 text-xl font-semibold">Floor/Area Plan</h2>
        <div className="items-center justify-center p-8 mb-4 bg-white rounded-lg shadow-md">
          <div
            className="relative w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
            id="dropzone"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, setFloorAreaPlanImages)}
          >
            <input
              type="file"
              id="floorAreaPlan-upload"
              name="floorAreaPlan-upload"
              accept="image/*"
              multiple
              className="absolute inset-0 z-50 w-full h-full opacity-0"
              onChange={(e) => handleImageUpload(e, setFloorAreaPlanImages)}
            />
            <div className="text-center">
              <img
                src="https://www.svgrepo.com/show/357902/image-upload.svg"
                alt="Upload"
                className="w-12 h-12 mx-auto"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label htmlFor="floorAreaPlan-upload" className="relative">
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span> to upload</span>
                  {/* <input id="floorAreaPlan-upload" name="floorAreaPlan-upload" type="file" className="sr-only" /> */}
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            {/* <img src="" className="hidden mx-auto mt-4 max-h-40" id="preview" /> */}
          </div>

          <div className="flex flex-wrap mt-4">

            {/* Displaying Stored Floor Area Plan Images */}
            {storedFloorAreaPlanImages.length > 0 && (
              <div className="flex flex-row">
                {storedFloorAreaPlanImages.map((file, index) => (
                  <div key={index} className="relative m-2">
                    <button
                      onClick={() => handleStoredImageDelete(file.RowID)}
                      className="absolute top-0 right-0 px-2 py-1 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                    >
                      X
                    </button>
                    <img
                      src={httpCommon.defaults.baseURL + file.attachment}
                      alt={`Stored Image ${file.file_name}`}
                      className="object-cover w-32 h-32 rounded cursor-pointer"
                      onClick={() => openFloorAreaPlanModal(index)}
                    />
                  </div>
                ))}
              </div>
            )}

            {floorAreaPlanImages.map((image, index) => (
              <div key={index} className="relative m-2">
                <button
                  onClick={() => handleImageDelete(index, floorAreaPlanImages, setFloorAreaPlanImages)}
                  className="absolute top-0 right-0 px-2 py-1 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                >
                  X
                </button>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Image ${index + 1}`}
                  className="object-cover w-32 h-32 rounded cursor-pointer"
                  onClick={() => openFloorAreaPlanModal(index)}
                />
              </div>
            ))}
          </div>

          {/* Modal for displaying images */}
          {selectedFloorAreaPlanImageIndex !== null && (
            <ImageModal
              images={floorAreaPlanImages}
              currentIndex={selectedFloorAreaPlanImageIndex}
              onClose={closeImageModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PentModule;
