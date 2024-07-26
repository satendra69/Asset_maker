import { useState, useEffect } from "react";
import httpCommon from "../../http-common";
import { useParams } from "react-router-dom";
import {
  CalendarToday as YearBuiltIcon,
  Business as TotalFloorsIcon,
  Layers as FlatOnFloorIcon,
  Elevator as LiftsInTowerIcon,
  Explore as MainDoorFacingIcon,
  Map as TotalProjectExtentIcon,
  Balcony as BalconiesIcon,
  Weekend as FurnishingIcon,
  VerifiedUser as PropertyFlooringIcon,
  AttachMoney as StampDutyRegistrationChargesIcon,
  FormatListNumbered as TotalUnitsIcon,
  Timeline as TotalPhasesIcon,
  Verified as ApprovalAuthorityIcon,
  EditRoadOutlined as ApproachingRoadWidthIcon,
  ViewArray as TotalBlocksIcon,
  CurrencyExchangeOutlined as TransactionTypeIcon,
  SquareFoot as AreaDetailsIcon,
  TrendingUpOutlined as RatePerSqFtYrdIcon,
  Construction as StatusIcon,
  Bed as BedRoomsIcon,
  Shower as BathRoomsIcon,
  DirectionsCar as CarParkingIcon,
  HomeOutlined as PlotDimensionsIcon,
  RoomOutlined as FloorsAllowedIcon,
  DirectionsWalkOutlined as NoOfOpenSidesIcon,
  TrafficOutlined as PlotFacingIcon,
  LocationCityOutlined as PlotApprovalAuthorityIcon,
  AttachFileOutlined as LandUdsAreaIcon,
  HouseOutlined as CornerPlotIcon,
  FilterHdrOutlined as ThisIsCornerRowhouseIcon,
  ContactlessOutlined as AvailableFromIcon,
  CheckCircleOutline as IsInGatedCommunityIcon,
  SignalWifi4BarLockOutlined as BoundaryWallMadeIcon,
  NaturePeopleOutlined as ThisIsCornerVillamentIcon,
  WbSunnyOutlined as OverLookingIcon,
  SportsEsportsOutlined as DuplexIcon,
  LayersOutlined as TotalTowersIcon,
  HouseOutlined as CornerRowhouseIcon,
  NightShelterOutlined as CornerPenthouseIcon,
  LocationCityOutlined as CornerVillaIcon,
  LandscapeOutlined as PlotAreaIcon,
} from "@mui/icons-material";
import Modal from 'react-modal';

const getIcon = (label) => {
  switch (label) {
    case "YEAR BUILT":
      return (
        <YearBuiltIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "TOTAL FLOORS":
      return (
        <TotalFloorsIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "FLAT ON FLOOR":
      return (
        <FlatOnFloorIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "LIFTS IN THE TOWER":
      return (
        <LiftsInTowerIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "MAIN DOOR FACING":
      return (
        <MainDoorFacingIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "TOTAL PROJECT EXTENT":
      return (
        <TotalProjectExtentIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "BALCONIES":
      return (
        <BalconiesIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "FURNISHING":
      return (
        <FurnishingIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "PROPERTY FLOORING":
      return (
        <PropertyFlooringIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "STAMP DUTY & REGISTRATION CHARGES":
      return (
        <StampDutyRegistrationChargesIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "TOTAL UNITS":
      return (
        <TotalUnitsIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "TOTAL PHASES":
      return (
        <TotalPhasesIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "APPROVAL AUTHORITY":
      return (
        <ApprovalAuthorityIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "APPROACHING ROAD WIDTH":
      return (
        <ApproachingRoadWidthIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "TOTAL BLOCKS":
      return (
        <TotalBlocksIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "TRANSACTION TYPE":
      return (
        <TransactionTypeIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "AREA DETAILS":
      return (
        <AreaDetailsIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "RATE PER SQ-FT/YRD":
      return (
        <RatePerSqFtYrdIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "STATUS":
      return (
        <StatusIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "BED ROOMS":
      return (
        <BedRoomsIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "BATH ROOMS":
      return (
        <BathRoomsIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "CAR PARKING":
      return (
        <CarParkingIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "PLOT DIMENSIONS":
      return (
        <PlotDimensionsIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "FLOORS ALLOWED FOR CONSTRUCTION":
      return (
        <FloorsAllowedIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "NO OF OPEN SIDES":
      return (
        <NoOfOpenSidesIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "PLOT FACING":
      return (
        <PlotFacingIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "PLOT APPROVAL AUTHORITY":
      return (
        <PlotApprovalAuthorityIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "LAND UDS AREA":
      return (
        <LandUdsAreaIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "CORNER PLOT":
      return (
        <CornerPlotIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "THIS IS CORNER ROWHOUSE":
      return (
        <ThisIsCornerRowhouseIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "AVAILABLE FROM":
      return (
        <AvailableFromIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "PROPERTY ON FLOOR":
      return (
        <FlatOnFloorIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "DUPLEX":
      return (
        <DuplexIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "THIS IS CORNER VILLAMENT":
      return (
        <ThisIsCornerVillamentIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "OVER LOOKING":
      return (
        <OverLookingIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "IS IN GATED COMMUNITY":
      return (
        <IsInGatedCommunityIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "BOUNDARY WALL MADE":
      return (
        <BoundaryWallMadeIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "TOTAL TOWERS":
      return (
        <TotalTowersIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "THIS IS A CORNER ROWHOUSE":
      return (
        <CornerRowhouseIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "THIS IS A CORNER PENTHOUSE":
      return (
        <CornerPenthouseIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "THIS IS CORNER VILLA":
      return (
        <CornerVillaIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    case "PLOT AREA":
      return (
        <PlotAreaIcon
          sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
        />
      );
    default:
      return null;
  }
};

const transformData = (propertyData, propertyImages) => {
  if (!propertyData) return {}; // Handle if propertyData is undefined
  if (!propertyImages || !Array.isArray(propertyImages)) propertyImages = []; // Ensure propertyImages is an array

  const amenities = propertyData.ltg_det_amenities ?
    propertyData.ltg_det_amenities.split(',').map(amenity => ({
      icon: 'tickmark-icon',
      label: amenity.trim(),
    })) : [];

  const otherAdvantages = propertyData.ltg_det_pmts_other_advtages ?
    propertyData.ltg_det_pmts_other_advtages.split(',').map(advantage => ({
      icon: 'tickmark-icon',
      label: advantage.trim(),
    })) : [];

  const mappedProperty = {
    id: propertyData.RowID,
    type: propertyData.ltg_type,
    price: propertyData.ltg_det_sale_price,
    title: propertyData.ltg_title,
    description: propertyData.ltg_det_desc,
    details: {
      otherFacts: [
        { icon: 'year-built-icon', label: 'YEAR BUILT', value: propertyData.ltg_det_pmts_year_build },
        { icon: 'total-floors-icon', label: 'TOTAL FLOORS', value: propertyData.ltg_det_pmts_total_flrs },
        { icon: 'flat-on-floor-icon', label: 'FLAT ON FLOOR', value: propertyData.ltg_det_pmts_flat_on_flr },
        { icon: 'lifts-icon', label: 'LIFTS IN THE TOWER', value: propertyData.ltg_det_pmts_lfts_in_tower },
        { icon: 'door-facing-icon', label: 'MAIN DOOR FACING', value: propertyData.ltg_det_pmts_main_dor_facing },
        { icon: 'furnishing-icon', label: 'FURNISHING', value: propertyData.ltg_det_pmts_furnishing },
        { icon: 'flooring-icon', label: 'PROPERTY FLOORING', value: propertyData.ltg_det_pmts_property_flrg },
        { icon: 'stamp-duty-icon', label: 'STAMP DUTY & REGISTRATION CHARGES', value: propertyData.ltg_det_pmts_stamp_duty },
        { icon: 'total-units-icon', label: 'TOTAL UNITS', value: propertyData.ltg_det_pmts_totalunits },
        { icon: 'approval-authority-icon', label: 'APPROVAL AUTHORITY', value: propertyData.ltg_det_pmts_approval_authority },
        { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: propertyData.ltg_det_pmts_approaching_road_width },
        { icon: 'total-phases-icon', label: 'TOTAL PHASES', value: propertyData.ltg_det_pmts_total_phases },
        { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: propertyData.ltg_det_pmts_transaction_typ },
      ],
      otherAdvantages: otherAdvantages,
      amenities: amenities,
      aboutProject: propertyData.ltg_det_about_project_buder,
      propertyVideo: propertyData.ltg_det_property_video_url,
    },
  };

  return mappedProperty;
};

const PropertyDetails = ({ property, images, brochure }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPdfUrl, setModalPdfUrl] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalIsOpen && !event.target.closest('.modal-content')) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalIsOpen]);

  if (property === null || !Array.isArray(property) || property.length === 0) {
    console.log("no data found");
    return <div className="mt-10 text-xl text-center">Property not found</div>;
  }

  const transformedProperty = transformData(property[0]);

  const handleThumbnailClick = (pdfUrl) => {
    setModalPdfUrl(pdfUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalPdfUrl('');
  };

  const brochureFiles = brochure.filter(file => file.type === 'Brochure');
  const pdfFiles = brochureFiles.filter(file => file.file_name.endsWith('.pdf'));
  const thumbnailFiles = brochureFiles.filter(file => file.file_name.endsWith('-thumbnail.png'));

  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="flex flex-col space-y-6">
          {/* Conditionally render "Other Facts" section */}
          {transformedProperty.details.otherFacts.some(fact => fact.value) && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Other Facts</h2>
              {transformedProperty.details.otherFacts.map((fact, index) => (
                fact.value && (
                  <div key={index} className="flex items-center mb-2">
                    {getIcon(fact.label)}
                    <span className="font-semibold">{fact.label}:</span>
                    <span className="ml-2">{fact.value}</span>
                  </div>
                )
              ))}
            </section>
          )}

          {/* Conditionally render "Other Advantages" section */}
          {transformedProperty.details.otherAdvantages.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Other Advantages</h2>
              {transformedProperty.details.otherAdvantages.map((advantage, index) => (
                <div key={index} className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.7rem"
                    height="1.7rem"
                    viewBox="0 0 24 24"
                    className="mr-2 text-blue-700"
                  >
                    <path
                      fill="currentColor"
                      d="M18 20.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25h8.86a.75.75 0 0 1 0 1.5H6A1.25 1.25 0 0 0 4.75 6v12A1.25 1.25 0 0 0 6 19.25h12A1.25 1.25 0 0 0 19.25 18v-7.71a.75.75 0 0 1 1.5 0V18A2.75 2.75 0 0 1 18 20.75"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M10.5 15.25A.74.74 0 0 1 10 15l-3-3a.75.75 0 0 1 1-1l2.47 2.47L19 5a.75.75 0 0 1 1 1l-9 9a.74.74 0 0 1-.5.25"
                    ></path>
                  </svg>
                  <span>{advantage.label}</span>
                </div>
              ))}
            </section>
          )}

          {/* Conditionally render "Amenities" section */}
          {transformedProperty.details.amenities.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Amenities</h2>
              {transformedProperty.details.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.7rem"
                    height="1.7rem"
                    viewBox="0 0 24 24"
                    className="mr-2 text-blue-700"
                  >
                    <path
                      fill="currentColor"
                      d="M18 20.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25h8.86a.75.75 0 0 1 0 1.5H6A1.25 1.25 0 0 0 4.75 6v12A1.25 1.25 0 0 0 6 19.25h12A1.25 1.25 0 0 0 19.25 18v-7.71a.75.75 0 0 1 1.5 0V18A2.75 2.75 0 0 1 18 20.75"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M10.5 15.25A.74.74 0 0 1 10 15l-3-3a.75.75 0 0 1 1-1l2.47 2.47L19 5a.75.75 0 0 1 1 1l-9 9a.74.74 0 0 1-.5.25"
                    ></path>
                  </svg>
                  <span>{amenity.label}</span>
                </div>
              ))}
            </section>
          )}

          <MortgageCalculator />
        </div>

        <div className="flex flex-col space-y-6">
          {/* Conditionally render "About Project/Builder" section */}
          {transformedProperty.details.aboutProject && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">About Project/Builder</h2>
              <p>{transformedProperty.details.aboutProject}</p>
            </section>
          )}

          {/* Conditionally render "Property Video" section */}
          {transformedProperty.details.propertyVideo && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Property Video</h2>
              <div className="max-w-full mx-auto mb-4">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${transformedProperty.details.propertyVideo.split('v=')[1]}`}
                  title="Property Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </section>
          )}

          {/* Conditionally render "Master Plan" section */}
          {images.some(image => image.type === 'MasterPlan') && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Master Plan</h2>
              <div className="flex flex-wrap gap-2">
                {images.filter(image => image.type === 'MasterPlan').map((image, index) => (
                  <img
                    key={index}
                    src={httpCommon.defaults.baseURL + image.attachment}
                    alt={image.file_name}
                    className="w-full rounded-lg md:w-1/2"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Conditionally render "Floor/Area Plan" section */}
          {images.some(image => image.type === 'FloorAreaPlan') && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Floor/Area Plan</h2>
              <div className="flex flex-wrap gap-2">
                {images.filter(image => image.type === 'FloorAreaPlan').map((image, index) => (
                  <img
                    key={index}
                    src={httpCommon.defaults.baseURL + image.attachment}
                    alt={image.file_name}
                    className="w-full rounded-lg md:w-1/2"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Conditionally render "Brochure" section */}
          {pdfFiles.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Brochure</h2>
              <div className="flex flex-wrap gap-4">
                {pdfFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative"
                    onClick={() => handleThumbnailClick(httpCommon.defaults.baseURL + file.attachment)}
                  >
                    <img
                      src={httpCommon.defaults.baseURL + (thumbnailFiles.find(thumbnail => thumbnail.file_name === file.file_name.replace('.pdf', '-thumbnail.png'))?.attachment || '/path/to/default-thumbnail.png')}
                      alt={file.file_name}
                      className="object-cover w-32 h-48 rounded-lg cursor-pointer"
                    />
                    <p className="mt-2 text-center">{file.file_name}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>


      {/* PDF Modal */}
      {modalIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content w-full max-w-4xl p-4 bg-white rounded-lg" style={{ height: '75%', marginTop: '150px' }}>
            <button
              onClick={closeModal}
              className="absolute p-2 text-white bg-red-600 rounded-full top-2 right-2 shadow-md"
            >
              ×
            </button>
            <iframe
              src={modalPdfUrl}
              width="100%"
              height="100%"
              title="PDF Viewer"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}


    </div>
  );
};

const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(12);
  const [years, setYears] = useState(10);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateMortgage = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const payment =
      (principal * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    setMonthlyPayment(payment.toFixed(2));
  };

  return (
    <div className="p-4 mt-4 border rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Mortgage Calculator</h2>

      <div className="relative mb-2">
        {principal && <span className="absolute left-2 top-2">₹</span>}
        <input
          type="number"
          placeholder="Principal"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full p-2 pl-6 border rounded"
        />
      </div>

      <div className="relative mb-2">
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full p-2 pr-10 border rounded"
        />
        {interestRate && <span className="absolute right-2 top-2">%</span>}
      </div>

      <div className="relative mb-2">
        <input
          type="number"
          placeholder="Years"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full p-2 pr-16 border rounded"
        />
        {years && <span className="absolute right-2 top-2">year(s)</span>}
      </div>

      <button
        onClick={calculateMortgage}
        className="w-full p-2 text-white bg-blue-500 rounded"
      >
        Calculate
      </button>

      <h3 className="mt-4 text-xl font-bold text-black">
        Monthly Payment: ₹{monthlyPayment}
      </h3>
    </div>
  );
};

export default PropertyDetails;
