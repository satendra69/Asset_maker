import { useEffect, useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MapComponent from "./MapComponent";
import draftToHtml from 'draftjs-to-html';
import { toWords } from 'number-to-words';

function VillaModule({ onDataUpdate }) {
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
  const [MapRow, setMapRow] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("not_selected");
  const [selectedCarParking, setSelectedCarParking] = useState("not_selected");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedBedRooms, setSelectedBedRooms] = useState("");
  const [selectedBathRooms, setSelectedBathRooms] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [plotDimensions, setPlotDimensions] = useState("");
  const [noOfOpenSides, setNoOfOpenSides] = useState("");
  const [mainDoorFacing, setMainDoorFacing] = useState("");
  const [isCornerVilla, setIsCornerVilla] = useState("");
  const [plotArea, setPlotArea] = useState("");
  const [balconies, setBalconies] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [propertyFlooring, setPropertyFlooring] = useState("");
  const [approachingRoadWidth, setApproachingRoadWidth] = useState("");
  const [isInGatedCommunity, setIsInGatedCommunity] = useState("");
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
  const [totalFloors, setTotalFloors] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [availableForm, setAvailableForm] = useState("");
  const [stampDutyAndRegistrationCharges, setStampDutyAndRegistrationCharges] =
    useState("");
  const [approvalAuthority, setApprovalAuthority] = useState("");
  const [totalProjectExtent, setTotalProjectExtent] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [totalPhases, setTotalPhases] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [projectBuilderDetails, setProjectBuilderDetails] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [masterPlanImages, setMasterPlanImages] = useState([]);
  const [floorAreaPlanImages, setFloorAreaPlanImages] = useState([]);
  const limit = 999999999999;

  // format number to en-IN
  const formatNumber = (number) => {
    if (!number) return "";
    return new Intl.NumberFormat('en-IN').format(number);
  };

  const handleSalePriceChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
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
        setSalePriceWords(toWords(num) + ' Only');
        setIsSalePriceExceeded(false);
      } else {
        setSalePriceWords("");
        setIsSalePriceExceeded(true);
      }
    }
  };

  const handleSuffixPriceChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
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
        setSuffixPriceWords(toWords(num) + ' Only');
        setIsSuffixPriceExceeded(false);
      } else {
        setSuffixPriceWords("");
        setIsSuffixPriceExceeded(true);
      }
    }
  };

  const toSentenceCase = (str) => {
    if (!str) return ''; // Handle empty or undefined case
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    handleDataUpdate();
  }, [galleryImages, masterPlanImages, masterPlanImages]);

  // Function to handle image upload for each section
  const handleImageUpload = (event, setImageFunction) => {
    const files = Array.from(event.target.files);
    setImageFunction((prevImages) => [...prevImages, ...files]);
    //setGalleryImages((prevImages) => [...prevImages, ...files]);

  };

  const handleImageUpload2 = (event, setMasterPlanImages) => {
    const files = Array.from(event.target.files);
    setMasterPlanImages((prevImages) => [...prevImages, ...files]);
    //setMasterPlanImages((prevImages) => [...prevImages, ...files]);
  };
  const handleImageUpload3 = (event, setFloorAreaPlanImages) => {
    const files = Array.from(event.target.files);
    setFloorAreaPlanImages((prevImages) => [...prevImages, ...files]);
    //setFloorAreaPlanImages((prevImages) => [...prevImages, ...files]);
  };

  // Function to handle image deletion for each section
  const handleImageDelete = (index, imageArray, setImageFunction) => {
    setImageFunction((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageDelete2 = (index, imageArray, setMasterPlanImages) => {
    setMasterPlanImages((prevImages) => prevImages.filter((_, i) => i !== index));
    // setMasterPlanImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleImageDelete3 = (index, imageArray, setFloorAreaPlanImages) => {
    setFloorAreaPlanImages((prevImages) => prevImages.filter((_, i) => i !== index));
    // setFloorAreaPlanImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

  const handleSelectChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  const handleRemoveOption = (value) => {
    const updatedOptions = selectedOptions.filter((option) => option !== value);
    setSelectedOptions(updatedOptions);
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

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

  const handleRowMap = (dataMap) => {
    // Use the row data in the second component
    setMapRow(dataMap);
    const data = {
      MapRow,
    };
    onDataUpdate(data);
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
      propertyAddressDetails,
      content,
      MapRow,
      selectedStatus,
      selectedCarParking,
      amenitiesAsString,
      videoUrl,
      selectedBedRooms,
      selectedBathRooms,
      yearBuilt,
      plotDimensions,
      noOfOpenSides,
      mainDoorFacing,
      isCornerVilla,
      plotArea,
      balconies,
      furnishing,
      propertyFlooring,
      approachingRoadWidth,
      isInGatedCommunity,
      overLooking,
      advantagesAsString,
      totalFloors,
      transactionType,
      availableForm,
      stampDutyAndRegistrationCharges,
      approvalAuthority,
      totalProjectExtent,
      totalUnits,
      totalPhases,
      selectedOptions,
      projectBuilderDetails,
      combinedImages,
    };
    onDataUpdate(data);
  };


  return (
    <div>
      <div>
        {/* Price Section */}
        <hr className="border-gray-400 my-8" />
        <h2 className="text-xl font-semibold">Price</h2>
        <div className="flex flex-wrap items-start mt-4"> {/* Use items-start to align items at the top */}
          {/* Sale Price */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
            <label htmlFor="salePrice" className="block text-sm font-semibold leading-6 text-gray-900">
              Sale Price
            </label>
            <div className="mt-2.5 relative">
              {displaySalePrice && <span className="absolute left-2 top-2 text-gray-900">₹</span>}
              <input
                type="text"
                id="salePrice"
                value={displaySalePrice}
                placeholder="Enter Sale Price"
                onChange={handleSalePriceChange}
                onBlur={handleDataUpdate}
                className="block w-full rounded-md border-0 pl-6 pr-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {/* Conditional rendering of limit exceeded or salePriceWords */}
              <div className="mt-1 text-sm text-blue-500">
                {isSalePriceExceeded ? "Limit exceeded" : toSentenceCase(salePriceWords)}
              </div>
            </div>
          </div>

          {/* Suffix Price */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
            <label htmlFor="suffixPrice" className="block text-sm font-semibold leading-6 text-gray-900">
              Suffix Price
            </label>
            <div className="mt-2.5 relative">
              {displaySuffixPrice && <span className="absolute left-2 top-2 text-gray-900">₹</span>}
              <input
                type="text"
                id="suffixPrice"
                value={displaySuffixPrice}
                placeholder="Enter Suffix Price"
                onChange={handleSuffixPriceChange}
                onBlur={handleDataUpdate}
                className="block w-full rounded-md border-0 pl-6 pr-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {/* Conditional rendering of limit exceeded or suffixPriceWords */}
              <div className="mt-1 text-sm text-blue-500">
                {isSuffixPriceExceeded ? "Limit exceeded" : toSentenceCase(suffixPriceWords)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <hr className="border-gray-400 my-8" />
      <h2 className="text-xl font-semibold">Description</h2>
      <div className="flex flex-wrap items-center mt-4">
        <div className="w-full border border-gray-450 p-4">
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

      {/* Location Section */}
      <MapComponent onRowClick={handleRowMap} />

      {/* Property Address (If any more detailed) Section */}

      <hr className="border-gray-400 my-8" />
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

      <hr className="border-gray-400 my-8" />
      <h2 className="text-xl font-semibold">Parameters</h2>
      <div className="flex flex-wrap items-center mt-4">
        {/* Area Details */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
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
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
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
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
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

        {/* Plot Dimensions */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
          <label
            htmlFor="plotDimensions"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Plot Dimensions
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="plotDimensions"
              value={plotDimensions}
              placeholder="Enter Plot Dimensions"
              onChange={(e) => setPlotDimensions(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* No Of Open Sides */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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

        {/* Main Door Facing */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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

        {/* This Is Corner Villa */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
          <label
            htmlFor="isCornerVilla"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            This Is Corner Villa
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="isCornerVilla"
              value={isCornerVilla}
              onChange={(e) => setIsCornerVilla(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* Plot Area */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
          <label
            htmlFor="plotArea"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Plot Area
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="plotArea"
              value={plotArea}
              placeholder="Enter Plot Area"
              onChange={(e) => setPlotArea(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Balconies */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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

        {/* Property Flooring */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
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

        {/* Approaching Road Width */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
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

        {/* Is In Gated Community */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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

        {/* Over Looking */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
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

        {/* Other Advantages */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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
          <div className="mt-2 flex flex-wrap items-center">
            {otherAdvantages.map((advantage) => (
              <div
                key={advantage}
                className="flex items-center mr-2 mb-2 bg-gray-100 rounded-md px-2 py-1"
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

        {/* Total Floors */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
          <label
            htmlFor="totalFloors"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Total Floors
          </label>
          <div className="mt-2.5 mr-3 mb-7">
            <input
              type="text"
              id="totalFloors"
              value={totalFloors}
              placeholder="Enter Total Floors"
              onChange={(e) => setTotalFloors(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Transaction Type */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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

        {/* Available From */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
          <label
            htmlFor="availableForm"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Available From
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="availableForm"
              value={availableForm}
              placeholder="Enter Available From"
              onChange={(e) => setAvailableForm(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Stamp Duty & Registration Charges */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
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

        {/* Approval Authority */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
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

        {/* Total Units */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
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

        {/* Total Phases */}
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 pr-4">
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
      </div>

      {/* Amenities Section */}

      <div>
        <hr className="border-gray-400 my-8" />
        <h2 className="text-xl font-semibold">Amenities</h2>
        <div className="flex flex-wrap mt-4">
          {/* Checkboxes for Amenities */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
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

      <hr className="border-gray-400 my-8" />
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
      <hr className="border-gray-400 my-8" />
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
          // Add onChange handler if you need to capture file selection
          />
        </label>
        <label
          htmlFor="brochure"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Browse
        </label>
      </div>

      {/* Gallery Section */}
      <div>
        <hr className="border-gray-400 my-8" />
        <h2 className="text-xl font-semibold">Gallery</h2>
        <div className="flex items-center mt-4">
          {/* Upload Button */}
          <label
            htmlFor="gallery-upload"
            className="cursor-pointer bg-transparent border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-3 px-6 rounded-full mr-4"
          >
            + Add Images
          </label>
          <input
            type="file"
            id="gallery-upload"
            name="gallery-upload"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageUpload(e, setGalleryImages)}
            onBlur={handleDataUpdate}
          />
        </div>
        {/* Display Uploaded Images */}
        <div className="flex flex-wrap mt-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="m-2 relative">
              <button
                onClick={() =>
                  handleImageDelete(index, galleryImages, setGalleryImages)
                }
                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-full"
              >
                X
              </button>
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Property Video Section */}

      <hr className="border-gray-400 my-8" />
      <h2 className="text-xl font-semibold">Property Video</h2>
      <div className="flex flex-wrap items-center mt-4">
        {/* Input field for video URL */}
        <input
          type="text"
          placeholder="Enter the Property Video URL"
          value={videoUrl}
          onChange={handleInputChange}
          onBlur={handleDataUpdate}
          className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Master Plan Section */}

      <div>
        <hr className="border-gray-400 my-8" />
        <h2 className="text-xl font-semibold">Master Plan</h2>
        <div className="flex flex-wrap items-center mt-4">
          {/* Upload Button */}
          <label
            htmlFor="masterPlan-upload"
            className="cursor-pointer bg-transparent border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-3 px-6 rounded-full mr-4"
          >
            + Add Images
          </label>
          <input
            type="file"
            id="masterPlan-upload"
            name="masterPlan-upload"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageUpload2(e, setMasterPlanImages)}
            onBlur={handleDataUpdate}
          />
        </div>
        {/* Display Uploaded Images */}
        <div className="flex flex-wrap mt-4">
          {masterPlanImages.map((image, index) => (
            <div key={index} className="m-2 relative">
              <button
                onClick={() =>
                  handleImageDelete2(
                    index,
                    masterPlanImages,
                    setMasterPlanImages
                  )
                }
                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-full"
              >
                X
              </button>
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floor/Area Plan Section */}

      <div>
        <hr className="border-gray-400 my-8" />
        <h2 className="text-xl font-semibold">Floor/Area Plan</h2>
        <div className="flex flex-wrap items-center mt-4">
          {/* Upload Button */}
          <label
            htmlFor="floorAreaPlan-upload"
            className="cursor-pointer bg-transparent border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-3 px-6 rounded-full mr-4"
          >
            + Add Images
          </label>
          <input
            type="file"
            id="floorAreaPlan-upload"
            name="floorAreaPlan-upload"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleImageUpload3(e, setFloorAreaPlanImages)}
            onBlur={handleDataUpdate}
          />
        </div>
        {/* Display Uploaded Images */}
        <div className="flex flex-wrap mt-4">
          {floorAreaPlanImages.map((image, index) => (
            <div key={index} className="m-2 relative">
              <button
                onClick={() =>
                  handleImageDelete3(
                    index,
                    floorAreaPlanImages,
                    setFloorAreaPlanImages
                  )
                }
                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-full"
              >
                X
              </button>
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VillaModule;
