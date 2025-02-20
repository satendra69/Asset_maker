
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { toast } from 'sonner';
import MapGoogle from "./MapGoogle";
import inwords from './toIndianNumberingWords';
import ImageModal from './ImageModal';
import FileModal from './FileModal';
import httpCommon from "../../../../http-common";
import Select from "react-select";

function ApartmentModule({ action, onDataUpdate }) {
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
  const [callForPrice, setCallForPrice] = useState("");
  const [areaDetails, setAreaDetails] = useState("");
  const [ratePerSqFt, setRatePerSqFt] = useState("");
  const [content, setContent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState("not_selected");
  const [selectedCarParking, setSelectedCarParking] = useState("not_selected");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedBedRooms, setSelectedBedRooms] = useState("");
  const [selectedBathRooms, setSelectedBathRooms] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [mainDoorFacing, setMainDoorFacing] = useState("");
  const [balconies, setBalconies] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [propertyFlooring, setPropertyFlooring] = useState("");
  const [approachingRoadWidth, setApproachingRoadWidth] = useState("");
  const [totalFlatsInSociety, setTotalFlatsInSociety] = useState("");
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
  const [totalFloors, setTotalFloors] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [stampDutyAndRegistrationCharges, setStampDutyAndRegistrationCharges] = useState("");
  const [approvalAuthority, setApprovalAuthority] = useState("");
  const [totalProjectExtent, setTotalProjectExtent] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [totalPhases, setTotalPhases] = useState("");
  const [flatOnFloor, setFlatOnFloor] = useState("");
  const [liftsInTheTower, setLiftsInTheTower] = useState("");
  const [totalBlocks, setTotalBlocks] = useState("");
  const [totalTowers, setTotalTowers] = useState("");
  const [brochure, setBrochure] = useState([]);
  const [storedBrochure, setStoredBrochure] = useState([]);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(null);
  const [isStored, setIsStored] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
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
  const [projectBuilderDetails, setProjectBuilderDetails] = useState("");
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
  const propertyType = "Apartments";
  const [deletedImages, setDeletedImages] = useState({
    main: [],
    gallery: [],
    masterPlan: [],
    floorAreaPlan: []
  });
  const [deletedFiles, setDeletedFiles] = useState({
    brochure: [],
  });

  const fetchProperty = async (listingId, action) => {
    try {
      const response = await httpCommon.get(`/list/listItem/${listingId}`);
      const listingData = response.data.data[0];

      if (response.data.status === "success" && action !== 'clone') {
        try {
          const imgResponse = await httpCommon.get(`/list/singlePageImg/${listingData.propertyUrl}`);
          if (imgResponse.data.status === "success") {
            const imageData = imgResponse.data.data;
            const mainImageData = imageData?.filter(item => item.type === "Main");
            const galleryData = imageData?.filter(item => item.type === "Gallery");
            const masterPlanData = imageData?.filter(item => item.type === "MasterPlan");
            const floorAreaPlanData = imageData?.filter(item => item.type === "FloorAreaPlan");
            const brochureData = imageData?.filter(item => item.type === "Brochure");

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
        setDisplaySalePrice(listingData.ltg_det_sale_price);
        setDisplaySuffixPrice(listingData.ltg_det_suffix_price);
        setCallForPrice(listingData.ltg_det_call_for_price);
        setContent(listingData.ltg_det_desc);
        const blocksFromHTML = convertFromHTML(listingData.ltg_det_desc || '');
        const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        setEditorState(EditorState.createWithContent(contentState));
        setAreaDetails(listingData.ltg_det_pmts_area_dts);
        setRatePerSqFt(listingData.ltg_det_pmts_rate_per_sq);
        setSelectedStatus(listingData.ltg_det_pmts_status);
        setSelectedBedRooms(listingData.ltg_det_pmts_bed_rom);
        setSelectedBathRooms(listingData.ltg_det_pmts_bth_rom);
        setSelectedCarParking(listingData.ltg_det_pmts_car_park);
        setYearBuilt(listingData.ltg_det_pmts_year_build);
        setTotalFloors(listingData.ltg_det_pmts_total_flrs);
        setFlatOnFloor(listingData.ltg_det_pmts_flat_on_flr);
        setLiftsInTheTower(listingData.ltg_det_pmts_lfts_in_tower);
        setMainDoorFacing(listingData.ltg_det_pmts_main_dor_facing);
        setPropertyFlooring(listingData.ltg_det_pmts_property_flrg);
        setBalconies(listingData.ltg_det_pmts_balconies);
        setApproachingRoadWidth(listingData.ltg_det_pmts_approaching_road_width);
        setFurnishing(listingData.ltg_det_pmts_furnishing);
        setStampDutyAndRegistrationCharges(listingData.ltg_det_pmts_stamp_duty);
        setTotalProjectExtent(listingData.ltg_det_pmts_tproject_evnt);
        setTotalBlocks(listingData.ltg_det_pmts_totl_block);
        setTransactionType(listingData.ltg_det_pmts_transaction_typ);
        setTotalTowers(listingData.ltg_det_pmts_total_towrs);
        setTotalPhases(listingData.ltg_det_pmts_total_phases);
        setTotalFlatsInSociety(listingData.ltg_det_pmts_totalFlatsInSociety);
        setApprovalAuthority(listingData.ltg_det_pmts_approval_authority);
        setTotalUnits(listingData.ltg_det_pmts_totalunits);
        setProjectBuilderDetails(listingData.ltg_det_about_project_buder);
        setVideoUrl(listingData.ltg_det_property_video_url);
        setOtherAdvantages(listingData.ltg_det_pmts_other_advtages.split(", "));
        setSelectedAmenities(listingData.ltg_det_amenities.split(", "));

        setLocationData({
          location: listingData.ltg_det_location || "",
          address: listingData.ltg_det_address || "",
          postalCode: listingData.ltg_det_postal_code || "",
          latitude: parseFloat(listingData.ltg_det_latitude) || 17.387140,
          longitude: parseFloat(listingData.ltg_det_longitude) || 78.491684,
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

  const handleImageUpload = (event, setFunction) => {
    const files = Array.from(event.target.files);
    setFunction(prevImages => [...prevImages, ...files]);
  };

  const handleImageDelete = (index, images, setFunction) => {
    const updatedImages = images?.filter((_, i) => i !== index);
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

  const closeImageModal = () => {
    setSelectedMainImageIndex(null);
    setSelectedGalleryImageIndex(null);
    setSelectedMasterPlanImageIndex(null);
    setSelectedFloorAreaPlanImageIndex(null);
  };

  const confirmDeletion = (type) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete all ${type} images?`);
    if (isConfirmed) {
      if (type === 'stored') {
        handleDeleteStoredGalleryImages();
      } else {
        handleDeleteUploadedGalleryImages();
      }
    }
  };

  const handleDeleteStoredGalleryImages = () => {
    setStoredGalleryImages([]);
    setDeletedImages(prevState => ({
      ...prevState,
      gallery: [...prevState.gallery, ...storedGalleryImages.map(image => image.RowID)]
    }));
  };

  const handleDeleteUploadedGalleryImages = () => {
    setGalleryImages([]);
    setDeletedImages(prevState => ({
      ...prevState,
      gallery: [...prevState.gallery, ...galleryImages.map((_, index) => index)]
    }));
  };

  const confirmMasterPlanDeletion = (type) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete all ${type} master plan images?`);
    if (isConfirmed) {
      if (type === 'stored') {
        handleDeleteStoredMasterPlanImages();
      } else {
        handleDeleteUploadedMasterPlanImages();
      }
    }
  };

  const handleDeleteStoredMasterPlanImages = () => {
    setStoredMasterPlanImages([]);
    setDeletedImages(prevState => ({
      ...prevState,
      masterPlan: [...prevState.masterPlan, ...storedMasterPlanImages.map(image => image.RowID)]
    }));
  };

  const handleDeleteUploadedMasterPlanImages = () => {
    setMasterPlanImages([]);
    setDeletedImages(prevState => ({
      ...prevState,
      masterPlan: [...prevState.masterPlan, ...masterPlanImages.map((_, index) => index)]
    }));
  };

  const confirmFloorAreaPlanDeletion = (type) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete all ${type} floor plan images?`);
    if (isConfirmed) {
      if (type === 'stored') {
        handleDeleteStoredFloorAreaPlanImages();
      } else {
        handleDeleteUploadedFloorAreaPlanImages();
      }
    }
  };

  const handleDeleteStoredFloorAreaPlanImages = () => {
    setStoredFloorAreaPlanImages([]);
    setDeletedImages(prevState => ({
      ...prevState,
      floorAreaPlan: [...prevState.floorAreaPlan, ...storedFloorAreaPlanImages.map(image => image.RowID)]
    }));
  };

  const handleDeleteUploadedFloorAreaPlanImages = () => {
    setFloorAreaPlanImages([]);
    setDeletedImages(prevState => ({
      ...prevState,
      floorAreaPlan: [...prevState.floorAreaPlan, ...floorAreaPlanImages.map((_, index) => index)]
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
    const updatedBrochure = brochure?.filter((_, i) => i !== index);
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

  const amenityCategories = {
    "Basic Amenities": [
      "24 Hrs Backup",
      "CCTV Surveillance",
      "Children’s Play Area",
      "Community Hall",
      "Intercom",
      "Walking/Jogging Track",
    ],
    "Amenities": [
      "24 Hrs Backup",
      "Amphie Theatre",
      "Acupressure Walkway",
      "Badminton Court",
      "Bar/Lounge",
      "Basement",
      "Basketball Court",
      "Billiards",
      "Black Top roads",
      "Cafeteria",
      "CCTV Surveillance",
      "Children’s Play Area",
      "Clinic",
      "Club House",
      "Community Hall",
      "Concrete Roads",
      "Co-Working Space",
      "Creche",
      "Cricket Practice Pitch",
      "Footpaths",
      "Garden",
      "Gazebo",
      "Golf Course",
      "Gym",
      "Home Theatre",
      "Intercom",
      "Laundry Service",
      "Library",
      "Mini Soccer Ground",
      "Outdoor Gym",
      "Pets Allowed",
      "Pharmacy",
      "Piped Gas",
      "Public Transport Available",
      "Rain Water Harvesting",
      "Security Guards",
      "Senior Citizen Seating Facilities",
      "Society Boundary Wall",
      "Spa/ Saloon",
      "Squash Court",
      "Steam / Jaccuzi",
      "Street Lights",
      "Supermarket",
      "Swimming Pool",
      "Table Tennis",
      "Temple",
      "Tennis court",
      "Toddlers Pool",
      "Under Ground Drainage",
      "Under Ground Electricity",
      "Under Ground Water Supply",
      "Volleyball Court",
      "Walking/Jogging Track",
      "Water Overhead Tank",
      "Yoga room",
    ],
  };

  const handleAmenitySelection = (e) => {
    const amenity = e.target.value;
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const areAllBasicAmenitiesSelected = amenityCategories[
    "Basic Amenities"
  ].every((amenity) => selectedAmenities.includes(amenity));

  const toggleBasicAmenities = (e) => {
    const basicAmenities = amenityCategories["Basic Amenities"];
    if (e.target.checked) {
      setSelectedAmenities((prev) => [...new Set([...prev, ...basicAmenities])]);
    } else {
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
      callForPrice,
      content,
      locationData,
      areaDetails,
      ratePerSqFt,
      selectedStatus,
      selectedBedRooms,
      selectedBathRooms,
      selectedCarParking,
      yearBuilt,
      totalFloors,
      flatOnFloor,
      liftsInTheTower,
      mainDoorFacing,
      propertyFlooring,
      balconies,
      approachingRoadWidth,
      furnishing,
      stampDutyAndRegistrationCharges,
      totalProjectExtent,
      totalBlocks,
      transactionType,
      totalTowers,
      totalPhases,
      totalFlatsInSociety,
      approvalAuthority,
      totalUnits,
      advantagesAsString,
      projectBuilderDetails,
      amenitiesAsString,
      videoUrl,
      combinedBrochure,
      combinedImages,
      deletedImages,
      deletedFiles,
      type: propertyType,
    };
    onDataUpdate(data);
  };

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
  }, [salePrice, suffixPrice, callForPrice, content, locationData, areaDetails, deletedImages, deletedFiles,
    ratePerSqFt, selectedStatus, selectedBedRooms, selectedBathRooms, selectedCarParking,
    yearBuilt, totalFloors, flatOnFloor, liftsInTheTower, mainDoorFacing, propertyFlooring,
    balconies, approachingRoadWidth, furnishing, stampDutyAndRegistrationCharges,
    totalProjectExtent, totalBlocks, transactionType, totalTowers, totalPhases, approvalAuthority, totalFlatsInSociety,
    totalUnits, advantagesAsString, projectBuilderDetails, amenitiesAsString, videoUrl,
    brochure, mainImage, galleryImages, masterPlanImages, floorAreaPlanImages,
    storedBrochure, storedMainImage, storedGalleryImages, storedMasterPlanImages, storedFloorAreaPlanImages]);

  return (
    <div>
      <div>
        {/* Price Section */}
        <hr className="my-8 border-gray-400" />
        <h2 className="text-xl font-semibold">Price</h2>
        <div className="flex flex-wrap items-start mt-4">
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
              <div className="mt-1 text-sm text-blue-500">
                {isSalePriceExceeded ? "Limit exceeded" : salePriceWords}
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
              <div className="mt-1 text-sm text-blue-500">
                {isSuffixPriceExceeded ? "Limit exceeded" : suffixPriceWords}
              </div>
            </div>
          </div>

          {/* Call For Price */}
          <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label htmlFor="callForPrice" className="block text-sm font-semibold leading-6 text-gray-900">
              Call For Price
            </label>
            <div className="mt-2.5 relative">
              <input
                type="text"
                id="callForPrice"
                value={callForPrice}
                placeholder="Enter Call For Price"
                onChange={(e) => setCallForPrice(e.target.value)}
                onBlur={handleDataUpdate}
                className="block w-full py-2 pl-2 pr-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div>
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
      </div>

      {/* Location Details */}
      <MapGoogle
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        initialPosition={locationData}
        onPositionChange={handlePositionChange}
      />

      {/* Parameters Section */}
      <div>
        <hr className="my-8 border-gray-400" />
        <h2 className="text-xl font-semibold">Parameters</h2>
        <div className="flex flex-wrap items-center mt-4">
          {/* Area Details */}
          <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label
              htmlFor="areaDetails"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Flat Super Area
            </label>
            <div className="mt-2.5 mb-7">
              <input
                type="text"
                id="areaDetails"
                value={areaDetails}
                placeholder="Enter Flat Super Area"
                onChange={(e) => setAreaDetails(e.target.value)}
                onBlur={handleDataUpdate}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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

          {/* Flat On Floor */}
          <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label
              htmlFor="flatOnFloor"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Flat On Floor
            </label>
            <div className="mt-2.5 mb-7">
              <input
                type="text"
                id="flatOnFloor"
                value={flatOnFloor}
                placeholder="Enter Flat On Floor"
                onChange={(e) => setFlatOnFloor(e.target.value)}
                onBlur={handleDataUpdate}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Total Floors */}
          <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label
              htmlFor="totalFloors"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Total Floors
            </label>
            <div className="mt-2.5 mb-7">
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

          {/* Rate Per Sq-Ft */}
          <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label
              htmlFor="ratePerSqFt"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Rate Per Sq-Ft
            </label>
            <div className="mt-2.5 mb-7">
              <input
                type="text"
                id="ratePerSqFt"
                value={ratePerSqFt}
                placeholder="Enter Rate per Sq-Ft"
                onChange={(e) => setRatePerSqFt(e.target.value)}
                onBlur={handleDataUpdate}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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

          {/* Lifts In The Tower */}
          <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label
              htmlFor="liftsInTheTower"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Lifts In The Tower
            </label>
            <div className="mt-1 mr-3 mb-7">
              <select
                id="liftsInTheTower"
                value={liftsInTheTower}
                onChange={(e) => setLiftsInTheTower(e.target.value)}
                onBlur={handleDataUpdate}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Not Selected</option>
                {[...Array(7).keys()].map((value) => (
                  <option key={value} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
                <option value="">More than 7</option>
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

          {/* Total Blocks */}
          <div className="w-full mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label
              htmlFor="totalBlocks"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Total Blocks
            </label>
            <div className="mt-2.5 mr-3 mb-7">
              <input
                type="text"
                id="totalBlocks"
                value={totalBlocks}
                placeholder="Enter Total Blocks"
                onChange={(e) => setTotalBlocks(e.target.value)}
                onBlur={handleDataUpdate}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Total Towers */}
          <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label
              htmlFor="totalTowers"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Total Towers in Society
            </label>
            <div className="mt-2.5 mb-7">
              <input
                type="text"
                id="totalTowers"
                value={totalTowers}
                placeholder="Enter Total Towers"
                onChange={(e) => setTotalTowers(e.target.value)}
                onBlur={handleDataUpdate}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

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

          {/* Total Flats in Society */}
          <div className="w-full pr-4 mb-4 sm:w-1/2 lg:w-1/3 sm:mb-0">
            <label
              htmlFor="totalFlatsInSociety"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Total Flats in Society
            </label>
            <div className="mt-2.5 mb-7">
              <input
                type="text"
                id="totalFlatsInSociety"
                value={totalFlatsInSociety}
                placeholder="Enter Total Flats in Society"
                onChange={(e) => setTotalFlatsInSociety(e.target.value)}
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
                value={advantagesOptions?.filter(option => otherAdvantages.includes(option.value))}
                onChange={handleAdvantagesChange}
                className="basic-multi-select"
                classNamePrefix="select"
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
                <option value="New Property">New Property</option>
                <option value="Resale">Resale</option>
              </select>
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

        </div>
      </div>

      {/* About Project/Builder Section */}
      <div>
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
                rows={7}
                value={projectBuilderDetails}
                onChange={(e) => setProjectBuilderDetails(e.target.value)}
                onBlur={handleDataUpdate}
                placeholder="Enter details about the project/builder"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
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
              ?.filter(file =>
                file.file_name.endsWith('.pdf') ||
                file.file_name.endsWith('.doc') ||
                file.file_name.endsWith('.docx')
              ).map((file) => (
                <div key={file.RowID} className="flex items-center">
                  <button
                    onClick={() => handleStoredFileDelete(file.RowID)}
                    className="px-2 py-1 ml-2 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    X
                  </button>
                  <span
                    className="ml-2 text-blue-500 cursor-pointer"
                    onClick={() => handleFileClick(file.RowID, httpCommon.defaults.baseURL + file.attachment, true)}
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
                src="/image-upload.svg"
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
              <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mt-4">
          {/* Displaying Stored Main Images */}
          {storedMainImage.length > 0 && (
            <div className="flex flex-row">
              {storedMainImage.map((file, index) => (
                <div key={file.RowID} className="relative m-2">
                  <button
                    onClick={() => handleStoredImageDelete(file.RowID, 'Main')}
                    className="absolute top-0 right-0 px-2 py-1 font-semibold text-white bg-red-500 rounded-full hover:bg-red-600"
                  >
                    X
                  </button>
                  <img
                    src={httpCommon.defaults.baseURL + file.attachment}
                    alt={`Stored Main ${file.file_name}`}
                    className="object-cover w-32 h-32 rounded cursor-pointer"
                    onClick={() => openMainImageModal(index)}
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
                    alt={`Uploaded Main ${index + 1}`}
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
        <hr className="my-8 border-gray-300" />
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Gallery</h2>
        <div className="items-center justify-center p-8 mb-4 bg-white rounded-lg shadow-lg">
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
                src="/image-upload.svg"
                alt="Upload"
                className="w-16 h-16 mx-auto"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label htmlFor="file-upload" className="relative">
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span> to upload</span>
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Gallery Images Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {/* Displaying Stored Gallery Images */}
          {storedGalleryImages.length > 0 &&
            storedGalleryImages.map((file, index) => (
              <div key={file.RowID} className="relative flex flex-col items-center">
                <button
                  onClick={() => handleStoredImageDelete(file.RowID, 'gallery')}
                  className="absolute top-0 right-0 z-10 p-1 text-white bg-red-600 rounded-full"
                >
                  <span className="text-lg font-bold">X</span>
                </button>
                <img
                  src={httpCommon.defaults.baseURL + file.attachment}
                  alt={`Stored Gallery ${file.file_name}`}
                  className="object-cover w-full h-32 transition-transform duration-300 rounded-lg shadow-md hover:scale-105"
                  onClick={() => openGalleryModal(index)}
                />
              </div>
            ))}

          {/* Displaying Uploaded Gallery Images */}
          {galleryImages.map((image, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <button
                onClick={() => handleImageDelete(index, galleryImages, setGalleryImages)}
                className="absolute top-0 right-0 z-10 p-1 text-white bg-red-600 rounded-full"
              >
                <span className="text-lg font-bold">X</span>
              </button>
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded Gallery ${index + 1}`}
                className="object-cover w-full h-32 transition-transform duration-300 rounded-lg shadow-md hover:scale-105"
                onClick={() => openGalleryModal(index)}
              />
            </div>
          ))}
        </div>

        {/* Delete All Button for Gallery */}
        <div className="mt-4 text-center">
          {/* Delete Stored Gallery Images Button */}
          {(storedGalleryImages.length > 0) && (
            <button
              onClick={() => confirmDeletion('stored')}
              className="px-6 py-2 mr-4 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete Stored Gallery Images
            </button>
          )}

          {/* Delete Uploaded Gallery Images Button */}
          {(galleryImages.length > 0) && (
            <button
              onClick={() => confirmDeletion('uploaded')}
              className="px-6 py-2 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete Uploaded Gallery Images
            </button>
          )}
        </div>

        {/* Image Modal */}
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
        <hr className="my-8 border-gray-300" />
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Master Plan</h2>
        <div className="items-center justify-center p-8 mb-4 bg-white rounded-lg shadow-lg">
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
              accept=".jpg,.jpeg,.png,.pdf"
              multiple
              className="absolute inset-0 z-50 w-full h-full opacity-0"
              onChange={(e) => handleImageUpload(e, setMasterPlanImages)}
            />
            <div className="text-center">
              <img
                src="/image-upload.svg"
                alt="Upload"
                className="w-16 h-16 mx-auto"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label htmlFor="file-upload" className="relative">
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span> to upload</span>
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Master Plan Images Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {/* Displaying Stored Master Plan Images */}
          {storedMasterPlanImages.length > 0 &&
            storedMasterPlanImages.map((file, index) => (
              <div key={file.RowID} className="relative flex flex-col items-center">
                {/* Delete Button */}
                <button
                  onClick={() => handleStoredImageDelete(file.RowID, 'masterPlan')}
                  className="absolute top-0 right-0 z-10 p-1 text-white bg-red-600 rounded-full"
                >
                  <span className="text-lg font-bold">X</span>
                </button>
                {file.file_name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img
                    src={httpCommon.defaults.baseURL + file.attachment}
                    alt={`Stored Master Plan ${file.file_name}`}
                    className="object-cover w-full h-32 transition-transform duration-300 rounded-lg shadow-md hover:scale-105"
                    onClick={() => openMasterPlanModal(index)}
                  />
                ) : file.file_name.match(/\.pdf$/i) ? (
                  <div
                    className="flex flex-col items-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer"
                    onClick={() => window.open(httpCommon.defaults.baseURL + file.attachment, '_blank')}
                  >
                    <img
                      src="/pdf-file.svg"
                      alt={`PDF ${file.file_name}`}
                      className="w-16 h-20 mb-2"
                    />
                    <span className="text-sm font-medium text-indigo-600">
                      {file.file_name}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}

          {/* Displaying Uploaded Master Plan Images */}
          {masterPlanImages.map((image, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Delete Button */}
              <button
                onClick={() => handleImageDelete(index, masterPlanImages, setMasterPlanImages)}
                className="absolute top-0 right-0 z-10 p-1 text-white bg-red-600 rounded-full"
              >
                <span className="text-lg font-bold">X</span>
              </button>
              {image.type.match(/image\/*/) ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Master Plan ${index + 1}`}
                  className="object-cover w-full h-32 transition-transform duration-300 rounded-lg shadow-md hover:scale-105"
                  onClick={() => openMasterPlanModal(index)}
                />
              ) : image.type.match(/application\/pdf/) ? (
                <div
                  className="flex flex-col items-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer"
                  onClick={() => {
                    const pdfUrl = URL.createObjectURL(image);
                    window.open(pdfUrl, '_blank');
                  }}
                >
                  <img
                    src="/pdf-file.svg"
                    alt={`Uploaded PDF ${index + 1}`}
                    className="w-16 h-20 mb-2"
                  />
                  <span className="text-sm font-medium text-indigo-600">
                    Uploaded PDF {index + 1}
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Delete All Button for Master Plan */}
        <div className="mt-4 text-center">
          {/* Delete Stored Master Plan Images Button */}
          {(storedMasterPlanImages.length > 0) && (
            <button
              onClick={() => confirmMasterPlanDeletion('stored')}
              className="px-6 py-2 mr-4 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete Stored Master Plan Images
            </button>
          )}

          {/* Delete Uploaded Master Plan Images Button */}
          {(masterPlanImages.length > 0) && (
            <button
              onClick={() => confirmMasterPlanDeletion('uploaded')}
              className="px-6 py-2 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete Uploaded Master Plan Images
            </button>
          )}
        </div>

        {/* Image Modal */}
        {selectedMasterPlanImageIndex !== null && (
          <ImageModal
            images={[...storedMasterPlanImages, ...masterPlanImages]}
            currentIndex={selectedMasterPlanImageIndex}
            onClose={closeImageModal}
          />
        )}
      </div>

      {/* Floor/Area Plan Section */}
      <div>
        <hr className="my-8 border-gray-300" />
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Floor/Area Plan</h2>
        <div className="items-center justify-center p-8 mb-4 bg-white rounded-lg shadow-lg">
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
              accept=".jpg,.jpeg,.png,.pdf"
              multiple
              className="absolute inset-0 z-50 w-full h-full opacity-0"
              onChange={(e) => handleImageUpload(e, setFloorAreaPlanImages)}
            />
            <div className="text-center">
              <img
                src="/image-upload.svg"
                alt="Upload"
                className="w-16 h-16 mx-auto"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label htmlFor="floorAreaPlan-upload" className="relative">
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span> to upload</span>
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Floor/Area Plan Images Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {/* Displaying Stored Floor Area Plan Images */}
          {storedFloorAreaPlanImages.length > 0 &&
            storedFloorAreaPlanImages.map((file, index) => (
              <div key={file.RowID} className="relative flex flex-col items-center">
                <button
                  onClick={() => handleStoredImageDelete(file.RowID, 'floorAreaPlan')}
                  className="absolute top-0 right-0 z-10 p-1 text-white bg-red-600 rounded-full"
                >
                  <span className="text-lg font-bold">X</span>
                </button>
                {file.file_name.match(/\.(jpg|jpeg|png)$/i) ? (
                  <img
                    src={httpCommon.defaults.baseURL + file.attachment}
                    alt={`Stored Floor/Area Plan ${file.file_name}`}
                    className="object-cover w-full h-32 transition-transform duration-300 rounded-lg shadow-md hover:scale-105"
                    onClick={() => openFloorAreaPlanModal(index)}
                  />
                ) : file.file_name.match(/\.pdf$/i) ? (
                  <div
                    className="flex flex-col items-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer"
                    onClick={() => window.open(httpCommon.defaults.baseURL + file.attachment, '_blank')}
                  >
                    <img
                      src="/pdf-file.svg"
                      alt={`PDF ${file.file_name}`}
                      className="w-16 h-20 mb-2"
                    />
                    <span className="text-sm font-medium text-indigo-600">
                      {file.file_name}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}

          {/* Displaying Uploaded Floor/Area Plan Images */}
          {floorAreaPlanImages.map((image, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <button
                onClick={() => handleImageDelete(index, floorAreaPlanImages, setFloorAreaPlanImages)}
                className="absolute top-0 right-0 z-10 p-1 text-white bg-red-600 rounded-full"
              >
                <span className="text-lg font-bold">X</span>
              </button>
              {image.type.match(/image\/*/) ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Floor/Area Plan ${index + 1}`}
                  className="object-cover w-full h-32 transition-transform duration-300 rounded-lg shadow-md hover:scale-105"
                  onClick={() => openFloorAreaPlanModal(index)}
                />
              ) : image.type.match(/application\/pdf/) ? (
                <div
                  className="flex flex-col items-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer"
                  onClick={() => {
                    const pdfUrl = URL.createObjectURL(image);
                    window.open(pdfUrl, '_blank');
                  }}
                >
                  <img
                    src="/pdf-file.svg"
                    alt={`Uploaded PDF ${index + 1}`}
                    className="w-16 h-20 mb-2"
                  />
                  <span className="text-sm font-medium text-indigo-600">
                    Uploaded PDF {index + 1}
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Delete All Button for Floor Plan */}
        <div className="mt-4 text-center">
          {/* Delete Stored Floor Plan Images Button */}
          {(storedFloorAreaPlanImages.length > 0) && (
            <button
              onClick={() => confirmFloorAreaPlanDeletion('stored')}
              className="px-6 py-2 mr-4 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete Stored Floor Plan Images
            </button>
          )}

          {/* Delete Uploaded Floor Plan Images Button */}
          {(floorAreaPlanImages.length > 0) && (
            <button
              onClick={() => confirmFloorAreaPlanDeletion('uploaded')}
              className="px-6 py-2 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Delete Uploaded Floor Plan Images
            </button>
          )}
        </div>

        {/* Image Modal */}
        {selectedFloorAreaPlanImageIndex !== null && (
          <ImageModal
            images={[...storedFloorAreaPlanImages, ...floorAreaPlanImages]}
            currentIndex={selectedFloorAreaPlanImageIndex}
            onClose={closeImageModal}
          />
        )}
      </div>

      {/* Footer Section for Copyright */}
      <div className="py-4 mt-8 text-center text-gray-800 bg-white shadow-md">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Asset Makers. All rights reserved.
        </p>
        <p className="text-xs">
          Images and files used on this site are provided by the respective creators.
        </p>
      </div>

    </div>
  );
}

export default ApartmentModule;
