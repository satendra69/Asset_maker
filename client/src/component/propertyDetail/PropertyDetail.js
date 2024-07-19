import { useState } from "react";
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
import FileModal from '../../admin/Pages/Listing/Component/FileModal';

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

  console.log(images, "brochure");

  if (property === null || !Array.isArray(property) || property.length === 0) {
    console.log("no data found");
    return <div className="mt-10 text-xl text-center">Property not found</div>;
  }

  const transformedProperty = transformData(property[0]);

  return (
    <div className="container p-4 mx-auto">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-2xl font-bold">Other Facts</h2>
          {transformedProperty.details.otherFacts.map((fact, index) => (
            <div key={index} className="flex items-center mb-2">
              {getIcon(fact.label)}
              <span className="font-semibold">{fact.label}: </span>
              <span>{fact.value}</span>
            </div>
          ))}

          <h2 className="mt-4 mb-2 text-2xl font-bold">Other Advantages</h2>
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

          <h2 className="mt-4 mb-2 text-2xl font-bold">Amenities</h2>
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

          <MortgageCalculator />
        </div>

        <div>
          <h2 className="mt-4 mb-2 text-2xl font-bold md:mt-0">
            About Project/Builder
          </h2>
          <p className="mb-4">{transformedProperty.details.aboutProject}</p>

          <h2 className="mb-2 text-2xl font-bold">Property Video</h2>
          <video
            controls
            src={transformedProperty.details.propertyVideo}
            className="w-full mb-4 rounded-lg"
          ></video>

          <h2 className="mb-2 text-2xl font-bold">Master Plan</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {images.filter(image => image.type === 'MasterPlan').map((image, index) => (
              <img
                key={index}
                src={httpCommon.defaults.baseURL + image.attachment}
                alt={image.file_name}
                className="w-1/2 rounded-lg md:w-1/3 lg:w-1/4"
              />
            ))}
          </div>

          <h2 className="mb-2 text-2xl font-bold">Floor/Area Plan</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {images.filter(image => image.type === 'FloorAreaPlan').map((image, index) => (
              <img
                key={index}
                src={httpCommon.defaults.baseURL + image.attachment}
                alt={image.file_name}
                className="w-1/2 rounded-lg md:w-1/3 lg:w-1/4"
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {images.filter(image => image.type === 'FloorAreaPlan').map((image, index) => (
              <img
                key={index}
                src={httpCommon.defaults.baseURL + image.attachment}
                alt={image.file_name}
                className="w-1/2 rounded-lg md:w-1/3 lg:w-1/4"
              />
            ))}
          </div>

          <h2 className="mb-2 text-2xl font-bold">Brochure</h2>
          <div className="mt-4">
            {brochure.length > 0 && (
              <div className="flex flex-col">
                {brochure.map((file, index) => (
                  <a
                    key={index}
                    href={httpCommon.defaults.baseURL + file.attachment.replace('\\', '/')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {file.file_name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
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
