import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
//import { stateFromHTML } from 'draft-js-import-html';
import { toast } from 'sonner';
import MapGoogle from "./MapGoogle";
import inwords from './toIndianNumberingWords';
import ImageModal from './ImageModal';
import FileModal from './FileModal';
import httpCommon from "../../../../http-common";
import Select from "react-select";

function VillamentModule({ action, onDataUpdate }) {

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
  const [areaDetails, setAreaDetails] = useState("");
  const [propertyAddressDetails, setPropertyAddressDetails] = useState("");
  const [ratePerSqFt, setRatePerSqFt] = useState("");
  const [content, setContent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState("not_selected");
  const [selectedCarParking, setSelectedCarParking] = useState("not_selected");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [brochure, setBrochure] = useState([]);
  const [storedBrochure, setStoredBrochure] = useState([]);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(null);
  const [isStored, setIsStored] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedBedRooms, setSelectedBedRooms] = useState("");
  const [selectedBathRooms, setSelectedBathRooms] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [noOfOpenSides, setNoOfOpenSides] = useState("");
  const [mainDoorFacing, setMainDoorFacing] = useState("");
  const [isCornerVillament, setIsCornerVillament] = useState("");
  const [landUDSArea, setLandUDSArea] = useState("");
  const [selectedDuplex, setSelectedDuplex] = useState("");
  const [balconies, setBalconies] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [propertyFlooring, setPropertyFlooring] = useState("");
  const [approachingRoadWidth, setApproachingRoadWidth] = useState("");
  const [isInGatedCommunity, setIsInGatedCommunity] = useState("");
  const [overLooking, setOverLooking] = useState("");
  const [otherAdvantages, setOtherAdvantages] = useState([]);
  const advantagesOptions = [
    { value: "Pooja Room", label: "Pooja Room" },
    { value: "Study Room", label: "Study Room" },
    { value: "Store Room", label: "Store Room" },
    { value: "Servant Room", label: "Servant Room" },
    { value: "Drawing Room", label: "Drawing Room" },
    { value: "Private Garden", label: "Private Garden" },
    { value: "Terrace Garden", label: "Terrace Garden" },
    { value: "Private Pool", label: "Private Pool" },
    { value: "Private Jacuzzi", label: "Private Jacuzzi" },
    { value: "Vaastu Compliant", label: "Vaastu Compliant" },
  ];
  const [transactionType, setTransactionType] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [stampDutyAndRegistrationCharges, setStampDutyAndRegistrationCharges] =
    useState("");
  const [approvalAuthority, setApprovalAuthority] = useState("");
  const [totalProjectExtent, setTotalProjectExtent] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [totalPhases, setTotalPhases] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [projectBuilderDetails, setProjectBuilderDetails] = useState("");
  const [mainImage, setMainImage] = useState([]);
  const [storedMainImage, setStoredMainImage] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [storedGalleryImages, setStoredGalleryImages] = useState([]);
  const [masterPlanImages, setMasterPlanImages] = useState([]);
  const [storedMasterPlanImages, setStoredMasterPlanImages] = useState([]);
  const [floorAreaPlanImages, setFloorAreaPlanImages] = useState([]);
  const [storedFloorAreaPlanImages, setStoredFloorAreaPlanImages] = useState([]);
  const [selectedMainImageIndex, setSelectedMainImageIndex] = useState(null);
  const [selectedGalleryImageIndex, setSelectedGalleryImageIndex] = useState(null);
  const [selectedMasterPlanImageIndex, setSelectedMasterPlanImageIndex] = useState(null);
  const [selectedFloorAreaPlanImageIndex, setSelectedFloorAreaPlanImageIndex] = useState(null);
  const limit = 999999999999;
  const [locationData, setLocationData] = useState({
    location: "",
    address: "",
    postalCode: "",
    latitude: 17.387140,
    longitude: 78.491684,
  });
  const [modalPdfUrl, setModalPdfUrl] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const propertyType = "Villaments";
  const [deletedImages, setDeletedImages] = useState({
    main: [],
    gallery: [],
    masterPlan: [],
    floorAreaPlan: []
  });
  const [deletedFiles, setDeletedFiles] = useState({
    brochure: [],
  });

  // fetch property
  const fetchProperty = async (listingId, action) => {
    try {
      const response = await httpCommon.get(`/list/${listingId}/${propertyType}`);
      const listingData = response.data.data[0];
      console.log("listingData", listingData);

      // Fetch images and brochures
      if (response.data.status === "success" && action !== 'clone') {
        // console.log("cloning");
        try {
          const imgResponse = await httpCommon.get(`/list/singlePageImg/${listingId}`);
          if (imgResponse.data.status === "success") {
            const imageData = imgResponse.data.data;

            // Separate gallery and brochure data
            const mainImageData = imageData.filter(item => item.type === "Main");
            const galleryData = imageData.filter(item => item.type === "Gallery");
            const masterPlanData = imageData.filter(item => item.type === "MasterPlan");
            const floorAreaPlanData = imageData.filter(item => item.type === "FloorAreaPlan");
            const brochureData = imageData.filter(item => item.type === "Brochure");

            // Set images and brochures
            setStoredMainImage(mainImageData);
            setStoredGalleryImages(galleryData);
            setStoredMasterPlanImages(masterPlanData);
            setStoredFloorAreaPlanImages(floorAreaPlanData);
            setStoredBrochure(brochureData);
          } else {
            console.error("Error fetching image data: Response status not successful");
          }
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
      }

      if (response.data.status === "success") {
        // Update state with fetched data
        setDisplaySalePrice(listingData.ltg_det_villaments_sale_price);
        setDisplaySuffixPrice(listingData.ltg_det_villaments_suffix_price);

        // content update
        setContent(listingData.ltg_det_villaments_desc);
        const blocksFromHTML = convertFromHTML(listingData.ltg_det_villaments_desc || '');
        const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        setEditorState(EditorState.createWithContent(contentState));

        setAreaDetails(listingData.ltg_det_villaments_pmts_area_dts);
        setRatePerSqFt(listingData.ltg_det_villaments_pmts_rate_per_sq);
        setSelectedStatus(listingData.ltg_det_villaments_pmts_status);
        setSelectedBedRooms(listingData.ltg_det_villaments_pmts_bed_rooms);
        setSelectedBathRooms(listingData.ltg_det_villaments_pmts_bath_rooms);
        setSelectedCarParking(listingData.ltg_det_villaments_pmts_car_parking);
        setYearBuilt(listingData.ltg_det_villaments_pmts_year_built);
        // setTotalFloors(listingData.ltg_det_pmts_total_flrs);
        // setPlotDimensions(listingData.ltg_det_plot_dimensions);
        setNoOfOpenSides(listingData.ltg_det_villaments_pmts_no_of_open_sides);
        setMainDoorFacing(listingData.ltg_det_villaments_pmts_main_door_facing);
        setPropertyFlooring(listingData.ltg_det_villaments_pmts_property_flooring);
        setBalconies(listingData.ltg_det_villaments_pmts_balconies);
        setApproachingRoadWidth(listingData.ltg_det_villaments_pmts_approaching_road_width);
        setFurnishing(listingData.ltg_det_villaments_pmts_furnishing);
        setStampDutyAndRegistrationCharges(listingData.ltg_det_villaments_pmts_stamp_duty_registration_charges);
        setTotalProjectExtent(listingData.ltg_det_villaments_pmts_total_project_extent);
        // setIsCornerVilla(listingData.ltg_det_corner_villa);
        setTransactionType(listingData.ltg_det_villaments_pmts_transaction_type);
        // setPlotArea(listingData.ltg_det_plot_area);
        setTotalPhases(listingData.ltg_det_villaments_pmts_total_phases);
        setApprovalAuthority(listingData.ltg_det_villaments_pmts_approval_authority);
        setTotalUnits(listingData.ltg_det_villaments_pmts_total_units);
        setProjectBuilderDetails(listingData.ltg_det_villaments_about_project_builder);
        setVideoUrl(listingData.ltg_det_villaments_property_video_url);
        setOtherAdvantages(listingData.ltg_det_villaments_pmts_other_advantages.split(", "));
        setSelectedAmenities(listingData.ltg_det_villaments_amenities.split(", "));
        setOverLooking(listingData.ltg_det_villaments_pmts_over_looking);
        setIsInGatedCommunity(listingData.ltg_det_villaments_pmts_gated_community);
        setAvailableFrom(listingData.ltg_det_villaments_pmts_available_from);
        setPropertyAddressDetails(listingData.ltg_det_villaments_property_address_details);
        setLandUDSArea(listingData.ltg_det_villaments_pmts_land_uds_area);
        setSelectedDuplex(listingData.ltg_det_villaments_pmts_duplex);
        setIsCornerVillament(listingData.ltg_det_villaments_pmts_corner_villament);

        setLocationData({
          location: listingData.ltg_det_villaments_location || "",
          address: listingData.ltg_det_villaments_address || "",
          postalCode: listingData.ltg_det_villaments_postal_code || "",
          latitude: parseFloat(listingData.ltg_villaments_det_latitude) || 17.387140,
          longitude: parseFloat(listingData.ltg_det_villaments_longitude) || 78.491684,
        });
      }

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

  const handleMainImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage([file]);
    }
    if (storedMainImage.length > 0) {
      handleStoredImageDelete(storedMainImage[0].RowID, 'Main');
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

    if (selectedMainImageIndex === index) {
      setSelectedMainImageIndex(null);
    } else if (selectedMainImageIndex > index) {
      setSelectedMainImageIndex(selectedMainImageIndex - 1);
    }

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

  const handleStoredImageDelete = (RowID, type) => {
    switch (type) {
      case 'Main':
        setStoredMainImage(storedMainImage?.filter(image => image.RowID !== RowID));
        setDeletedImages(prevState => ({
          ...prevState,
          main: [...prevState.main, RowID]
        }));
        break;
      case 'gallery':
        setStoredGalleryImages(storedGalleryImages?.filter(image => image.RowID !== RowID));
        setDeletedImages(prevState => ({
          ...prevState,
          gallery: [...prevState.gallery, RowID]
        }));
        break;
      case 'masterPlan':
        setStoredMasterPlanImages(storedMasterPlanImages?.filter(image => image.RowID !== RowID));
        setDeletedImages(prevState => ({
          ...prevState,
          masterPlan: [...prevState.masterPlan, RowID]
        }));
        break;
      case 'floorAreaPlan':
        setStoredFloorAreaPlanImages(storedFloorAreaPlanImages?.filter(image => image.RowID !== RowID));
        setDeletedImages(prevState => ({
          ...prevState,
          floorAreaPlan: [...prevState.floorAreaPlan, RowID]
        }));
        break;
      default:
        console.error('Invalid type provided');
    }
  };

  // Function to open modal with selected image index
  const openMainImageModal = (index) => {
    setSelectedMainImageIndex(index);
  };

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
    setSelectedMainImageIndex(null);
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
    setStoredBrochure(storedBrochure?.filter(file => file.RowID !== RowID));
    setDeletedFiles(prevState => ({
      ...prevState,
      brochure: [...prevState.brochure, RowID]
    }));
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

  const handleAdvantagesChange = (selectedOptions) => {
    setOtherAdvantages(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const advantagesAsString = otherAdvantages?.join(', ');

  // List of amenities
  const amenityCategories = {
    "Basic Amenities": [
      "CCTV Surveillance",
      "Children’s Play Area",
      "Community Hall",
      "24 Hrs Backup",
      "Intercom",
      "Walking/Jogging Track",
    ],
    "Amenities": [
      "Amphie Theatre",
      "Acupressure Walkway",
      "Basketball Court",
      "Basement",
      "Badminton Court",
      "Billiards",
      "Bar/Lounge",
      "Cafeteria",
      "Club House",
      "Clinic",
      "Concrete Roads",
      "Creche",
      "Cricket Practice Pitch",
      "Gazebo",
      "Golf Course",
      "Gym",
      "Garden",
      "Home Theatre",
      "Library",
      "Laundry Service",
      "Mini Soccer Ground",
      "Co-Working Space",
      "Outdoor Gym",
      "Piped Gas",
      "Pets Allowed",
      "Public Transport Available",
      "Pharmacy",
      "Spa/ Saloon",
      "Supermarket",
      "Steam / Jaccuzi",
      "Swimming Pool",
      "Senior Citizen Seating Facilities",
      "Security Guards",
      "Squash Court",
      "Table Tennis",
      "Toddlers Pool",
      "Temple",
      "Tennis court",
      "Volleyball Court",
      "Yoga room",
      "Black Top roads",
      "Children’s Play Area",
      "CCTV Surveillance",
      "Community Hall",
      "Footpaths",
      "Walking/Jogging Track",
      "Rain Water Harvesting",
      "Society Boundary Wall",
      "Street Lights",
      "Under Ground Electricity",
      "Under Ground Water Supply",
      "Under Ground Drainage",
      "Water Overhead Tank",
      "24 Hrs Backup",
      "Intercom",
    ],
  };

  // Function to handle selection of amenities
  const handleAmenitySelection = (e) => {
    const amenity = e.target.value;
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  // Check if all basic amenities are selected
  const areAllBasicAmenitiesSelected = amenityCategories[
    "Basic Amenities"
  ].every((amenity) => selectedAmenities.includes(amenity));

  // Handle "Select All" for Basic Amenities
  const toggleBasicAmenities = (e) => {
    const basicAmenities = amenityCategories["Basic Amenities"];
    if (e.target.checked) {
      // Select all basic amenities if not already selected
      setSelectedAmenities((prev) => [...new Set([...prev, ...basicAmenities])]);
    } else {
      // Remove all basic amenities from the selection
      setSelectedAmenities((prev) =>
        prev.filter((item) => !basicAmenities.includes(item))
      );
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

  const handlePositionChange = (position) => {
    setLocationData(position);
    // console.log('Initial Position:', position);
  };

  const handleDataUpdate = () => {
    const combinedImages = {
      mainImage,
      galleryImages,
      masterPlanImages,
      floorAreaPlanImages,
      storedMainImage,
      storedGalleryImages,
      storedMasterPlanImages,
      storedFloorAreaPlanImages,
    };
    const combinedBrochure = {
      brochure,
      storedBrochure,
    }
    const data = {
      salePrice,
      suffixPrice,
      areaDetails,
      ratePerSqFt,
      content,
      locationData,
      propertyAddressDetails,
      selectedStatus,
      selectedCarParking,
      amenitiesAsString,
      videoUrl,
      selectedBedRooms,
      selectedBathRooms,
      yearBuilt,
      noOfOpenSides,
      mainDoorFacing,
      isCornerVillament,
      landUDSArea,
      selectedDuplex,
      balconies,
      furnishing,
      propertyFlooring,
      approachingRoadWidth,
      isInGatedCommunity,
      overLooking,
      advantagesAsString,
      transactionType,
      availableFrom,
      stampDutyAndRegistrationCharges,
      approvalAuthority,
      totalProjectExtent,
      totalUnits,
      totalPhases,
      selectedOptions,
      projectBuilderDetails,
      combinedBrochure,
      combinedImages,
      deletedImages,
      deletedFiles,
      type: propertyType,
    };
    onDataUpdate(data);
    console.log("Data to be passed to onDataUpdate:", data);
  };

  // fetch property
  useEffect(() => {
    if (listingId) {
      if (action !== 'clone') {
        fetchProperty(listingId);
      } else if (action === 'clone') {
        fetchProperty(listingId, action);
      }
    }
  }, [listingId, action]);

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
  }, [salePrice, suffixPrice, areaDetails, ratePerSqFt, content, locationData,
    propertyAddressDetails, selectedStatus, selectedCarParking, amenitiesAsString,
    videoUrl, selectedBedRooms, selectedBathRooms, yearBuilt, noOfOpenSides, deletedFiles,
    mainDoorFacing, isCornerVillament, landUDSArea, selectedDuplex, balconies, furnishing,
    propertyFlooring, approachingRoadWidth, isInGatedCommunity, overLooking, advantagesAsString,
    transactionType, availableFrom, stampDutyAndRegistrationCharges, approvalAuthority,
    totalProjectExtent, totalUnits, totalPhases, selectedOptions, projectBuilderDetails,
    brochure, mainImage, galleryImages, masterPlanImages, floorAreaPlanImages, deletedImages,
    storedBrochure, storedMainImage, storedGalleryImages, storedMasterPlanImages, storedFloorAreaPlanImages]);

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
      {/* <MapComponent onPositionChange={handleLocationChange} initialPosition={initialPosition} /> */}
      <MapGoogle
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        initialPosition={locationData}
        onPositionChange={handlePositionChange}
      />

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
              onChange={(e) => setPropertyAddressDetails(e.target.value)}
              onBlur={handleDataUpdate}
              placeholder="Enter more detailed property address if necessary"
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
            Villament Built Area
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
              {[...Array(25).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
              <option value="">More than 25</option>
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

        {/* This Is Corner Villament */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="isCornerVillament"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Corner Property
          </label>
          <div className="mt-1 mr-3 mb-7">
            <select
              id="isCornerVillament"
              value={isCornerVillament}
              onChange={(e) => setIsCornerVillament(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">Not Selected</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="North-West">North-West</option>
              <option value="North-East">North-East</option>
              <option value="South-West">South-West</option>
              <option value="South-East">South-East</option>
            </select>
          </div>
        </div>

        {/* Land UDS Area */}
        <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="landUDSArea"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Land UDS Area
          </label>
          <div className="mt-2.5 mb-7">
            <input
              type="text"
              id="landUDSArea"
              value={landUDSArea}
              placeholder="Enter Land UDS Area"
              onChange={(e) => setLandUDSArea(e.target.value)}
              onBlur={handleDataUpdate}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
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
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi Furnished">Semi Furnished</option>
              <option value="Un-Furnished">Un-Furnished</option>
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
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
              <option value="New Property">New Property</option>
              <option value="Resale">Resale</option>
            </select>
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
              <option value="Ready to Move">Ready to Move</option>
              <option value="Under Construction">Under Construction</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        {/* No Of Open Sides */}
        {/* <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
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
        </div> */}

        {/* Other Advantages */}
        <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="otherAdvantages"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Other Advantages
          </label>
          <div className="mt-1 mr-3 mb-7">
            <Select
              id="otherAdvantages"
              options={advantagesOptions}
              isMulti
              value={advantagesOptions.filter(option => otherAdvantages.includes(option.value))}
              onChange={handleAdvantagesChange}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>

        {/* Available From */}
        {/* <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
          <label
            htmlFor="availableFrom"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Available From
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
        </div> */}

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
              <option value="Excluded">Excluded</option>
              <option value="Included">Included</option>
            </select>
          </div>
        </div>

        {/* Total Units */}
        {/* <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
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
        </div> */}

        {/* Total Phases */}
        {/* <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
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
        </div> */}
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

      {/* Amenities Section */}
      <div>
        <hr className="my-8 border-gray-400" />
        <h2 className="text-xl font-semibold">Amenities</h2>

        {Object.entries(amenityCategories).map(([category, amenities]) => (
          <div key={category} className="mt-2">
            <h3 className="text-lg font-semibold">{category}</h3>

            {/* Select All for Basic Amenities */}
            {category === "Basic Amenities" && (
              <label className="inline-flex items-center mt-4 mb-4">
                <input
                  type="checkbox"
                  checked={areAllBasicAmenitiesSelected}
                  onChange={toggleBasicAmenities}
                  className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                />
                <span className="ml-2 text-sm leading-6 text-gray-900">
                  Select All
                </span>
              </label>
            )}

            <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4">
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
                    disabled={category === "Basic Amenities"}
                    className="w-5 h-5 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                  />
                  <span className="ml-2 text-sm leading-6 text-gray-900">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
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

      {/* Main Image Section */}
      <div>
        <hr className="my-8 border-gray-400" />
        <h2 className="mb-2 text-xl font-semibold">Main Image</h2>
        <div className="items-center justify-center p-8 mb-4 bg-white rounded-lg shadow-md">
          <div
            className="relative w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
            id="dropzone"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, setMainImage)}
          >
            <input
              type="file"
              id="MainImage-upload"
              name="MainImage-upload"
              accept=".jpg,.jpeg,.png"
              className="absolute inset-0 z-50 w-full h-full opacity-0"
              onChange={(e) => handleMainImageUpload(e, setMainImage)}
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
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mt-4">
          {/* Displaying Stored Main Images */}
          {storedMainImage.length > 0 && (
            <div className="flex flex-row">
              {storedMainImage.map((file) => (
                <div key={file.RowID} className="relative m-2">
                  <button
                    onClick={() => handleStoredImageDelete(file.RowID, 'Main')}
                    className="absolute top-0 right-0 px-2 py-1 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    X
                  </button>
                  <img
                    src={httpCommon.defaults.baseURL + file.attachment}
                    alt={`Stored Image ${file.file_name}`}
                    className="object-cover w-32 h-32 rounded cursor-pointer"
                    onClick={() => openMainImageModal(file.RowID)}
                  />
                </div>
              ))}
            </div>
          )}

          {mainImage.length > 0 && (
            <>
              {mainImage.map((image, index) => (
                <div key={index} className="relative m-2">
                  <button
                    onClick={() => handleImageDelete(0, mainImage, setMainImage)}
                    className="absolute top-0 right-0 px-2 py-1 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    X
                  </button>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded Image ${index + 1}`}
                    className="object-cover w-32 h-32 rounded cursor-pointer"
                    onClick={() => openMainImageModal(index)}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {/* Modal for displaying main image */}
        {selectedMainImageIndex !== null && (
          <ImageModal
            images={[...storedMainImage, ...mainImage]}
            currentIndex={selectedMainImageIndex}
            onClose={closeImageModal}
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
              accept=".jpg,.jpeg,.png"
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
                    onClick={() => handleStoredImageDelete(file.RowID, 'gallery')}
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
            images={[...storedGalleryImages, ...galleryImages]}
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
              accept=".jpg,.jpeg,.png"
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
                      onClick={() => handleStoredImageDelete(file.RowID, 'masterPlan')}
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
              images={[...storedMasterPlanImages, ...masterPlanImages]}
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
              accept=".jpg,.jpeg,.png"
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
                      onClick={() => handleStoredImageDelete(file.RowID, 'floorAreaPlan')}
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
              images={[...storedFloorAreaPlanImages, ...floorAreaPlanImages]}
              currentIndex={selectedFloorAreaPlanImageIndex}
              onClose={closeImageModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default VillamentModule;
