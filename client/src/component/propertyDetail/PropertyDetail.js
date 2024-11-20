import { useState, useEffect } from "react";
import httpCommon from "../../http-common";
import "./property.css";
import {
  EditRoadOutlined as ApproachingRoadWidthIcon,
  Verified as ApprovalAuthorityIcon,
  Verified as ApprovedByIcon,
  SquareFoot as AreaDetailsIcon,
  ContactlessOutlined as AvailableFromIcon,
  Balcony as BalconiesIcon,
  Shower as BathRoomsIcon,
  Bed as BedRoomsIcon,
  SignalWifi4BarLockOutlined as BoundaryWallMadeIcon,
  Construction as BuiltUpAreaIcon,
  DirectionsCar as CarParkingIcon,
  NightShelterOutlined as CornerPenthouseIcon,
  HouseOutlined as CornerPlotIcon,
  HouseOutlined as CornerPropertyIcon,
  HouseOutlined as CornerRowhouseIcon,
  LocationCityOutlined as CornerVillaIcon,
  SportsEsportsOutlined as DuplexIcon,
  Layers as FlatOnFloorIcon,
  SquareFoot as FlatSuperAreaIcon,
  RoomOutlined as FloorsAllowedIcon,
  Weekend as FurnishingIcon,
  CheckCircleOutline as IsInGatedCommunityIcon,
  AttachFileOutlined as LandUdsAreaIcon,
  Elevator as LiftsInTowerIcon,
  Explore as MainDoorFacingIcon,
  DirectionsWalkOutlined as NoOfOpenSidesIcon,
  ThumbUpAltOutlined as OtherAdvantagesIcon,
  WbSunnyOutlined as OverLookingIcon,
  NightShelterOutlined as PenthouseOnFloorIcon,
  NightShelterOutlined as PenthouseSuperAreaIcon,
  LocationCityOutlined as PlotApprovalAuthorityIcon,
  LandscapeOutlined as PlotAreaDetailsIcon,
  LandscapeOutlined as PlotAreaIcon,
  HomeOutlined as PlotDimensionsIcon,
  TrafficOutlined as PlotFacingIcon,
  WbSunnyOutlined as PrivateTerraceIcon,
  TrafficOutlined as PropertyFacingIcon,
  VerifiedUser as PropertyFlooringIcon,
  TrendingUpOutlined as RatePerSqFtYrdIcon,
  HouseOutlined as RowVillaBuiltAreaIcon,
  AttachMoney as StampDutyRegistrationChargesIcon,
  Construction as StatusIcon,
  VerifiedUser as TenantedIcon,
  SquareFoot as TotalBuiltUpAreaIcon,
  FilterHdrOutlined as ThisIsCornerRowhouseIcon,
  NaturePeopleOutlined as ThisIsCornerVillamentIcon,
  ViewArray as TotalBlocksIcon,
  FormatListNumbered as TotalFlatsInSocietyIcon,
  Business as TotalFloorsIcon,
  Timeline as TotalPhasesIcon,
  Map as TotalProjectExtentIcon,
  LayersOutlined as TotalTowersIcon,
  FormatListNumbered as TotalUnitsIcon,
  NaturePeopleOutlined as TotalVillamentsIcon,
  CurrencyExchangeOutlined as TransactionTypeIcon,
  SportsEsportsOutlined as TriplexIcon,
  HomeOutlined as VillaBuiltAreaIcon,
  NaturePeopleOutlined as VillamentBuiltAreaIcon,
  CalendarToday as YearBuiltIcon
} from "@mui/icons-material";
import ImageModal from '../../admin/Pages/Listing/Component/ImageModal';
import Map from "../map/GoogleMap";

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
  "Layout Basic Amenities": [
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

const getIcon = (label) => {
  switch (label) {
    case "APPROACHING ROAD WIDTH":
      return <ApproachingRoadWidthIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "APPROVAL AUTHORITY":
      return <ApprovalAuthorityIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "APPROVED BY":
      return <ApprovedByIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "AREA DETAILS":
      return <AreaDetailsIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "AVAILABLE FROM":
      return <AvailableFromIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "BALCONIES":
      return <BalconiesIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "BATH ROOMS":
      return <BathRoomsIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "BED ROOMS":
      return <BedRoomsIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "BOUNDARY WALL MADE":
      return <BoundaryWallMadeIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "BUILT UP AREA":
      return <BuiltUpAreaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "CAR PARKING":
      return <CarParkingIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "CORNER PENTHOUSE":
      return <CornerPenthouseIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "IS THIS CORNER PLOT":
      return <CornerPlotIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "CORNER PROPERTY":
      return <CornerPropertyIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "CORNER ROWHOUSE":
      return <CornerRowhouseIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "CORNER VILLA":
      return <CornerVillaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "DUPLEX":
      return <DuplexIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "FLAT ON FLOOR":
      return <FlatOnFloorIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "FLAT SUPER AREA":
      return <FlatSuperAreaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "FLOORS ALLOWED FOR CONSTRUCTION":
      return <FloorsAllowedIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "FURNISHING":
      return <FurnishingIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "IS IN GATED COMMUNITY":
      return <IsInGatedCommunityIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "LAND UDS AREA":
      return <LandUdsAreaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "LIFTS IN THE TOWER":
      return <LiftsInTowerIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "MAIN DOOR FACING":
      return <MainDoorFacingIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "NO OF OPEN SIDES":
      return <NoOfOpenSidesIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "OTHER ADVANTAGES":
      return <OtherAdvantagesIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "OVER LOOKING":
      return <OverLookingIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PENTHOUSE ON FLOOR":
      return <PenthouseOnFloorIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PENTHOUSE SUPER AREA":
      return <PenthouseSuperAreaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PLOT APPROVAL AUTHORITY":
      return <PlotApprovalAuthorityIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PLOT AREA DETAILS":
      return <PlotAreaDetailsIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PLOT AREA":
      return <PlotAreaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PLOT DIMENSIONS":
      return <PlotDimensionsIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PLOT FACING":
      return <PlotFacingIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PRIVATE TERRACE":
      return <PrivateTerraceIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PROPERTY FACING":
      return <PropertyFacingIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "PROPERTY FLOORING":
      return <PropertyFlooringIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "RATE PER SQ-FT":
      return <RatePerSqFtYrdIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "ROW VILLA BUILT AREA":
      return <RowVillaBuiltAreaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "STAMP DUTY & REGISTRATION CHARGES":
      return <StampDutyRegistrationChargesIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "STATUS":
      return <StatusIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TENANTED":
      return <TenantedIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TOTAL BUILT UP AREA":
      return <TotalBuiltUpAreaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "THIS IS CORNER ROWHOUSE":
      return <ThisIsCornerRowhouseIcon
        sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }}
      />
    case "THIS IS CORNER VILLAMENT":
      return <ThisIsCornerVillamentIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TOTAL BLOCKS":
      return <TotalBlocksIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TOTAL FLATS IN SOCIETY":
      return <TotalFlatsInSocietyIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TOTAL FLOORS":
      return <TotalFloorsIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TOTAL PHASES":
      return <TotalPhasesIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TOTAL PROJECT EXTENT":
      return <TotalProjectExtentIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TOTAL TOWERS IN SOCIETY":
      return <TotalTowersIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TOTAL UNITS":
      return <TotalUnitsIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TOTAL VILLAMENTS":
      return <TotalVillamentsIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TRANSACTION TYPE":
      return <TransactionTypeIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "TRIPLEX":
      return <TriplexIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "VILLA BUILT AREA":
      return <VillaBuiltAreaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "VILLAMENT BUILT AREA":
      return <VillamentBuiltAreaIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    case "YEAR BUILT":
      return <YearBuiltIcon sx={{ fontSize: "1.7rem", color: "#2196f3", marginRight: "0.5rem" }} />;
    default:
      return null;
  }
};

const transformData = (propertyData, propertyImages) => {
  if (!propertyData) return {};
  if (!propertyImages || !Array.isArray(propertyImages)) propertyImages = [];

  const mapCommonFields = (data) => ({
    id: data.RowID,
    type: data.ltg_type,
    title: data.ltg_title,
  });

  const mapApartmentFields = (data) => {
    const otherFacts = [
      { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_pmts_approaching_road_width },
      { icon: 'approved-by-icon', label: 'APPROVED BY', value: data.ltg_det_pmts_approval_authority },
      { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_pmts_balconies },
      { icon: 'flat-on-floor-icon', label: 'FLAT ON FLOOR', value: data.ltg_det_pmts_flat_on_flr },
      { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_pmts_furnishing },
      { icon: 'lfts-in-tower-icon', label: 'LIFTS IN THE TOWER', value: data.ltg_det_pmts_lfts_in_tower },
      { icon: 'main-door-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_pmts_main_dor_facing },
      // { icon: 'tickmark-icon', label: 'OTHER ADVANTAGES', value: data.ltg_det_pmts_other_advtages ? data.ltg_det_pmts_other_advtages.split(',').map(advantage => advantage.trim()).join(', ') : '' },
      { icon: 'property-flrg-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_pmts_property_flrg },
      { icon: 'stamp-duty-icon', label: 'STAMP DUTY & REGISTRATION CHARGES', value: data.ltg_det_pmts_stamp_duty },
      { icon: 'totl_block-icon', label: 'TOTAL BLOCKS', value: data.ltg_det_pmts_totl_block },
      { icon: 'total-flats-icon', label: 'TOTAL FLATS IN SOCIETY', value: data.ltg_det_pmts_total_flats_in_society },
      { icon: 'total-flrs-icon', label: 'TOTAL FLOORS', value: data.ltg_det_pmts_total_flrs },
      { icon: 'project-extent-icon', label: 'TOTAL PROJECT EXTENT', value: data.ltg_det_pmts_tproject_evnt },
      { icon: 'total_towrs-icon', label: 'TOTAL TOWERS IN SOCIETY', value: data.ltg_det_pmts_total_towrs },
      { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_pmts_transaction_typ },
      { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_pmts_year_build },
    ];

    const filteredOtherFacts = otherFacts.filter(fact => fact.value !== undefined && fact.value !== "undefined" && fact.value !== '');

    const rawAmenities = data.ltg_det_amenities ? data.ltg_det_amenities.split(',').map(amenity => amenity.trim()) : [];

    const categorizedAmenities = {
      "Basic Amenities": [],
      "Layout Basic Amenities": [],
      "Amenities": [],
    };

    // Populate the categorized amenities
    rawAmenities.forEach((amenity) => {
      if (amenityCategories["Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (data.ltg_type === 'Plots' && amenityCategories["Layout Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Layout Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (amenityCategories["Amenities"].includes(amenity)) {
        categorizedAmenities["Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      }
    });

    return {
      ...mapCommonFields(data),
      details: {
        properties: [
          {
            icon: 'area-dts-icon', label: 'FLAT SUPER AREA', value: data.ltg_det_pmts_area_dts
              ? `${data.ltg_det_pmts_area_dts} Sq Ft`
              : ''
          },
          { icon: 'rate-icon', label: 'RATE PER SQ-FT', value: data.ltg_det_pmts_rate_per_sq },
          { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_pmts_bed_rom },
          { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_pmts_bth_rom },
          { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_pmts_status },
          { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_pmts_car_park },
        ],
        otherFacts: filteredOtherFacts,
        // amenities: categorizedAmenities,
        amenities: data.ltg_det_amenities ? data.ltg_det_amenities.split(',').map(amenity => ({
          icon: 'tickmark-icon',
          label: amenity.trim(),
        })) : [],
        otherAdvantages: data.ltg_det_pmts_other_advtages ? data.ltg_det_pmts_other_advtages.split(',').map(advantage => ({
          icon: 'tickmark-icon',
          label: advantage.trim(),
        })) : [],
        aboutProject: data.ltg_det_about_project_buder,
        propertyVideo: data.ltg_det_property_video_url,
        description: data.ltg_det_desc,
      },
    };
  };

  const mapPlotFields = (data) => {
    const otherFacts = [
      { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_plot_pmts_approaching_road_width },
      { icon: 'approved-by-icon', label: 'APPROVED BY', value: data.ltg_det_plot_pmts_plot_approval_authority },
      { icon: 'floors-allowed-icon', label: 'FLOORS ALLOWED FOR CONSTRUCTION', value: data.ltg_det_plot_pmts_floors_allowed_for_construction },
      { icon: 'gated-community-icon', label: 'IS IN GATED COMMUNITY', value: data.ltg_det_plot_pmts_gated_community },
      { icon: 'corner-plot-icon', label: 'IS THIS CORNER PLOT', value: data.ltg_det_plot_pmts_corner_plot },
      { icon: 'open-sides-icon', label: 'NO OF OPEN SIDES', value: data.ltg_det_plot_pmts_no_of_open_sides },
      { icon: 'plot-dimensions-icon', label: 'PLOT DIMENSIONS', value: data.ltg_det_plot_pmts_plot_dimensions },
      { icon: 'plot-facing-icon', label: 'PLOT FACING', value: data.ltg_det_plot_pmts_plot_facing },
      { icon: 'stamp-duty-icon', label: 'STAMP DUTY & REGISTRATION CHARGES', value: data.ltg_det_plot_pmts_stamp_duty_registration_charges },
      { icon: 'total-project-extent-icon', label: 'TOTAL PROJECT EXTENT', value: data.ltg_det_plot_pmts_total_project_extent },
      { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_plot_pmts_transaction_type },
      { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_plot_pmts_year_built },
    ];

    const filteredOtherFacts = otherFacts.filter(fact => fact.value !== undefined && fact.value !== "undefined" && fact.value !== '');

    const rawAmenities = data.ltg_det_plot_amenities ? data.ltg_det_plot_amenities.split(',').map(amenity => amenity.trim()) : [];

    const categorizedAmenities = {
      "Basic Amenities": [],
      "Layout Basic Amenities": [],
      "Amenities": [],
    };

    // Populate the categorized amenities
    rawAmenities.forEach((amenity) => {
      if (amenityCategories["Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (data.ltg_type === 'Plots' && amenityCategories["Layout Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Layout Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (amenityCategories["Amenities"].includes(amenity)) {
        categorizedAmenities["Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      }
    });

    return {
      ...mapCommonFields(data),
      details: {
        properties: [
          {
            icon: 'area-dts-icon', label: 'PLOT AREA DETAILS', value: data.ltg_det_plot_pmts_area_dts
              ? `${data.ltg_det_plot_pmts_area_dts} Sq Ft`
              : ''
          },
          { icon: 'rate-icon', label: 'RATE PER SQ-FT', value: data.ltg_det_plot_pmts_rate_per_sq },
          { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_plot_pmts_status },
          { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_plot_pmts_total_units },
        ],
        otherFacts: filteredOtherFacts,
        // amenities: categorizedAmenities,
        amenities: data.ltg_det_plot_amenities ? data.ltg_det_plot_amenities.split(',').map(amenity => ({
          icon: 'tickmark-icon',
          label: amenity.trim(),
        })) : [],
        otherAdvantages: data.ltg_det_plot_pmts_other_advtages ? data.ltg_det_plot_pmts_other_advtages.split(',').map(advantage => ({
          icon: 'tickmark-icon',
          label: advantage.trim(),
        })) : [],
        aboutProject: data.ltg_det_plot_about_project_builder,
        propertyAddress: data.ltg_det_plot_property_address_details,
        propertyVideo: data.ltg_det_plot_property_video_url,
        description: data.ltg_det_plot_desc,
      },
    };
  };

  const mapVillaFields = (data) => {
    const otherFacts = [
      { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_pmts_approaching_road_width },
      { icon: 'approved-by-icon', label: 'APPROVED BY', value: data.ltg_det_pmts_approval_authority },
      { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_pmts_balconies },
      { icon: 'corner-villa-icon', label: 'CORNER VILLA', value: data.ltg_det_corner_villa },
      { icon: 'duplex-icon', label: 'DUPLEX', value: data.ltg_det_pmts_duplex },
      { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_pmts_furnishing },
      { icon: 'gated-community-icon', label: 'IS IN GATED COMMUNITY', value: data.ltg_det_gated_community },
      { icon: 'main-door-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_pmts_main_dor_facing },
      // { icon: 'tickmark-icon', label: 'OTHER ADVANTAGES', value: data.ltg_det_pmts_other_advtages ? data.ltg_det_pmts_other_advtages.split(',').map(advantage => advantage.trim()).join(', ') : '' },
      { icon: 'overlooking-icon', label: 'OVER LOOKING', value: data.ltg_det_over_looking },
      { icon: 'plot-area-icon', label: 'PLOT AREA', value: data.ltg_det_plot_area },
      { icon: 'plot-dimensions-icon', label: 'PLOT DIMENSIONS', value: data.ltg_det_plot_dimensions },
      { icon: 'plot-facing-icon', label: 'PLOT FACING', value: data.ltg_det_pmts_plot_facing },
      { icon: 'property-flrg-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_pmts_property_flrg },
      { icon: 'stamp-duty-icon', label: 'STAMP DUTY & REGISTRATION CHARGES', value: data.ltg_det_pmts_stamp_duty },
      { icon: 'total-flrs-icon', label: 'TOTAL FLOORS', value: data.ltg_det_pmts_total_flrs },
      { icon: 'project-extent-icon', label: 'TOTAL PROJECT EXTENT', value: data.ltg_det_pmts_tproject_evnt },
      { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_pmts_totalunits },
      { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_pmts_transaction_typ },
      { icon: 'triplex-icon', label: 'TRIPLEX', value: data.ltg_det_pmts_triplex },
      { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_pmts_year_build },
    ];

    const filteredOtherFacts = otherFacts.filter(fact => fact.value !== undefined && fact.value !== "undefined" && fact.value !== '');

    const rawAmenities = data.ltg_det_amenities ? data.ltg_det_amenities.split(',').map(amenity => amenity.trim()) : [];

    const categorizedAmenities = {
      "Basic Amenities": [],
      "Layout Basic Amenities": [],
      "Amenities": [],
    };

    // Populate the categorized amenities
    rawAmenities.forEach((amenity) => {
      if (amenityCategories["Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (data.ltg_type === 'Plots' && amenityCategories["Layout Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Layout Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (amenityCategories["Amenities"].includes(amenity)) {
        categorizedAmenities["Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      }
    });

    return {
      ...mapCommonFields(data),
      details: {
        properties: [
          {
            icon: 'area-dts-icon', label: 'VILLA BUILT AREA', value: data.ltg_det_pmts_area_dts
              ? `${data.ltg_det_pmts_area_dts} Sq Ft`
              : ''
          },
          { icon: 'rate-icon', label: 'RATE PER SQ-FT', value: data.ltg_det_pmts_rate_per_sq },
          { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_pmts_bed_rom },
          { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_pmts_bth_rom },
          { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_pmts_status },
          { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_pmts_car_park },
        ],
        otherFacts: filteredOtherFacts,
        // amenities: categorizedAmenities,
        amenities: data.ltg_det_amenities ? data.ltg_det_amenities.split(',').map(amenity => ({
          icon: 'tickmark-icon',
          label: amenity.trim(),
        })) : [],
        otherAdvantages: data.ltg_det_pmts_other_advtages ? data.ltg_det_pmts_other_advtages.split(',').map(advantage => ({
          icon: 'tickmark-icon',
          label: advantage.trim(),
        })) : [],
        aboutProject: data.ltg_det_about_project_buder,
        propertyAddress: data.ltg_det_property_address_details,
        propertyVideo: data.ltg_det_property_video_url,
        description: data.ltg_det_desc,
      },
    };
  };

  const mapRowHouseFields = (data) => {
    const otherFacts = [
      { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_row_house_pmts_balconies },
      { icon: 'duplex-icon', label: 'DUPLEX', value: data.ltg_det_row_house_pmts_duplex },
      { icon: 'triplex-icon', label: 'TRIPLEX', value: data.ltg_det_row_house_pmts_triplex },
      { icon: 'total-floors-icon', label: 'TOTAL FLOORS', value: data.ltg_det_row_house_pmts_total_floors },
      { icon: 'corner-property-icon', label: 'CORNER PROPERTY', value: data.ltg_det_row_house_pmts_corner_rowhouse },
      { icon: 'property-facing-icon', label: 'PROPERTY FACING', value: data.ltg_det_row_house_pmts_property_facing },
      { icon: 'main-door-facing-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_row_house_pmts_main_door_facing },
      { icon: 'land-uds-area-icon', label: 'LAND UDS AREA', value: data.ltg_det_row_house_pmts_land_uds_area },
      { icon: 'plot-dimensions-icon', label: 'PLOT DIMENSIONS', value: data.ltg_det_row_house_pmts_plot_dimensions },
      { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_row_house_pmts_furnishing },
      { icon: 'property-flooring-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_row_house_pmts_property_flooring },
      { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_row_house_pmts_approaching_road_width },
      { icon: 'gated-community-icon', label: 'IS IN GATED COMMUNITY', value: data.ltg_det_row_house_pmts_gated_community },
      { icon: 'over-looking-icon', label: 'OVER LOOKING', value: data.ltg_det_row_house_pmts_over_looking },
      { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_row_house_pmts_year_built },
      { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_row_house_pmts_transaction_type },
      // { icon: 'other-advantages-icon', label: 'OTHER ADVANTAGES', value: data.ltg_det_row_house_pmts_other_advantages },
      { icon: 'total-project-extent-icon', label: 'TOTAL PROJECT EXTENT', value: data.ltg_det_row_house_pmts_total_project_extent },
      { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_row_house_pmts_total_units },
      { icon: 'approved-by-icon', label: 'APPROVED BY', value: data.ltg_det_row_house_pmts_approval_authority },
      { icon: 'stamp-duty-icon', label: 'STAMP DUTY & REGISTRATION CHARGES', value: data.ltg_det_row_house_pmts_stamp_duty_registration_charges },
    ];

    const filteredOtherFacts = otherFacts.filter(fact => fact.value !== undefined && fact.value !== "undefined" && fact.value !== '');

    const rawAmenities = data.ltg_det_row_house_amenities ? data.ltg_det_row_house_amenities.split(',').map(amenity => amenity.trim()) : [];

    const categorizedAmenities = {
      "Basic Amenities": [],
      "Layout Basic Amenities": [],
      "Amenities": [],
    };

    // Populate the categorized amenities
    rawAmenities.forEach((amenity) => {
      if (amenityCategories["Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (data.ltg_type === 'Plots' && amenityCategories["Layout Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Layout Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (amenityCategories["Amenities"].includes(amenity)) {
        categorizedAmenities["Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      }
    });

    return {
      ...mapCommonFields(data),
      details: {
        properties: [
          {
            icon: 'area-dts-icon', label: 'ROW VILLA BUILT AREA', value: data.ltg_det_row_house_pmts_area_dts
              ? `${data.ltg_det_row_house_pmts_area_dts} Sq Ft`
              : ''
          },
          { icon: 'rate-icon', label: 'RATE PER SQ-FT', value: data.ltg_det_row_house_pmts_rate_per_sq },
          { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_row_house_pmts_bed_rooms },
          { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_row_house_pmts_bath_rooms },
          { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_row_house_pmts_status },
          { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_row_house_pmts_car_parking },
        ],
        otherFacts: filteredOtherFacts,
        // amenities: categorizedAmenities,
        amenities: data.ltg_det_row_house_amenities ? data.ltg_det_row_house_amenities.split(',').map(amenity => ({
          icon: 'tickmark-icon',
          label: amenity.trim(),
        })) : [],
        otherAdvantages: data.ltg_det_row_house_pmts_other_advantages ? data.ltg_det_row_house_pmts_other_advantages.split(',').map(advantage => ({
          icon: 'tickmark-icon',
          label: advantage.trim(),
        })) : [],
        aboutProject: data.ltg_det_row_house_about_project_builder,
        propertyAddress: data.ltg_det_row_house_property_address_details,
        propertyVideo: data.ltg_det_row_house_property_video_url,
        description: data.ltg_det_row_house_desc,
      },
    };
  };

  const mapVillamentFields = (data) => {
    const otherFacts = [
      { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_villaments_pmts_approaching_road_width },
      { icon: 'approved-by-icon', label: 'APPROVED BY', value: data.ltg_det_villaments_pmts_approval_authority },
      { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_villaments_pmts_balconies },
      { icon: 'corner-property-icon', label: 'CORNER PROPERTY', value: data.ltg_det_villaments_pmts_corner_villament },
      { icon: 'duplex-icon', label: 'DUPLEX', value: data.ltg_det_villaments_pmts_duplex },
      { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_villaments_pmts_furnishing },
      { icon: 'gated-community-icon', label: 'IS IN GATED COMMUNITY', value: data.ltg_det_villaments_pmts_gated_community },
      { icon: 'land-uds-icon', label: 'LAND UDS AREA', value: data.ltg_det_villaments_pmts_land_uds_area },
      { icon: 'main-door-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_villaments_pmts_main_door_facing },
      // { icon: 'other-advantages-icon', label: 'OTHER ADVANTAGES', value: data.ltg_det_villaments_pmts_other_advantages },
      { icon: 'overlooking-icon', label: 'OVER LOOKING', value: data.ltg_det_villaments_pmts_over_looking },
      { icon: 'property-facing-icon', label: 'PROPERTY FACING', value: data.ltg_det_villaments_pmts_property_facing },
      { icon: 'property-flooring-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_villaments_pmts_property_flooring },
      { icon: 'stamp-duty-icon', label: 'STAMP DUTY & REGISTRATION CHARGES', value: data.ltg_det_villaments_pmts_stamp_duty_registration_charges },
      { icon: 'total-floors-icon', label: 'TOTAL FLOORS', value: data.ltg_det_villaments_pmts_total_floors },
      { icon: 'total-project-extent-icon', label: 'TOTAL PROJECT EXTENT', value: data.ltg_det_villaments_pmts_total_project_extent },
      { icon: 'total-villaments-icon', label: 'TOTAL VILLAMENTS', value: data.ltg_det_villaments_pmts_total_villaments },
      { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_villaments_pmts_transaction_type },
      { icon: 'triplex-icon', label: 'TRIPLEX', value: data.ltg_det_villaments_pmts_triplex },
      { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_villaments_pmts_year_built },
    ];

    const filteredOtherFacts = otherFacts.filter(fact => fact.value !== undefined && fact.value !== "undefined" && fact.value !== '');

    const rawAmenities = data.ltg_det_villaments_amenities ? data.ltg_det_villaments_amenities.split(',').map(amenity => amenity.trim()) : [];

    const categorizedAmenities = {
      "Basic Amenities": [],
      "Layout Basic Amenities": [],
      "Amenities": [],
    };

    // Populate the categorized amenities
    rawAmenities.forEach((amenity) => {
      if (amenityCategories["Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (data.ltg_type === 'Plots' && amenityCategories["Layout Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Layout Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (amenityCategories["Amenities"].includes(amenity)) {
        categorizedAmenities["Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      }
    });

    return {
      ...mapCommonFields(data),
      details: {
        properties: [
          {
            icon: 'area-dts-icon', label: 'VILLAMENT BUILT AREA', value: data.ltg_det_villaments_pmts_area_dts
              ? `${data.ltg_det_villaments_pmts_area_dts} Sq Ft`
              : ''
          },
          { icon: 'rate-icon', label: 'RATE PER SQ-FT', value: data.ltg_det_villaments_pmts_rate_per_sq },
          { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_villaments_pmts_bed_rooms },
          { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_villaments_pmts_bath_rooms },
          { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_villaments_pmts_status },
          { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_villaments_pmts_car_parking },
        ],
        otherFacts: filteredOtherFacts,
        // amenities: categorizedAmenities,
        amenities: data.ltg_det_villaments_amenities ? data.ltg_det_villaments_amenities.split(',').map(amenity => ({
          icon: 'tickmark-icon',
          label: amenity.trim(),
        })) : [],
        otherAdvantages: data.ltg_det_villaments_pmts_other_advantages ? data.ltg_det_villaments_pmts_other_advantages.split(',').map(advantage => ({
          icon: 'tickmark-icon',
          label: advantage.trim(),
        })) : [],
        aboutProject: data.ltg_det_villaments_about_project_builder,
        propertyAddress: data.ltg_det_villaments_property_address_details,
        propertyVideo: data.ltg_det_villaments_property_video_url,
        description: data.ltg_det_villaments_desc,
      },
    };
  };

  const mapCommercialPropertyFields = (data) => {
    const otherFacts = [
      { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_comm_prop_pmts_approaching_road_width },
      { icon: 'approved-by-icon', label: 'APPROVED BY', value: data.ltg_det_comm_prop_pmts_approval_authority },
      { icon: 'corner-property-icon', label: 'CORNER PROPERTY', value: data.ltg_det_comm_prop_pmts_corner_property },
      { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_comm_prop_pmts_furnishing },
      { icon: 'plot-area-icon', label: 'PLOT AREA', value: data.ltg_det_comm_prop_pmts_plot_area },
      { icon: 'plot-dimensions-icon', label: 'PLOT DIMENSIONS', value: data.ltg_det_comm_prop_pmts_plot_dimensions },
      { icon: 'plot-facing-icon', label: 'PLOT FACING', value: data.ltg_det_comm_prop_pmts_plot_facing },
      { icon: 'stamp-duty-icon', label: 'STAMP DUTY & REGISTRATION CHARGES', value: data.ltg_det_comm_prop_pmts_stamp_duty_registration_charges },
      { icon: 'tenanted-icon', label: 'TENANTED', value: data.ltg_det_comm_prop_pmts_tenanted },
      { icon: 'total-built-up-area-icon', label: 'TOTAL BUILT UP AREA', value: data.ltg_det_comm_prop_pmts_total_built_up_area },
      { icon: 'total-floors-icon', label: 'TOTAL FLOORS', value: data.ltg_det_comm_prop_pmts_total_floors },
      { icon: 'uds-icon', label: 'LAND UDS AREA', value: data.ltg_det_comm_prop_pmts_uds },
      { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_comm_prop_pmts_year_built },
    ];

    const filteredOtherFacts = otherFacts.filter(fact => fact.value !== undefined && fact.value !== "undefined" && fact.value !== '');

    const rawAmenities = data.ltg_det_comm_prop_amenities ? data.ltg_det_comm_prop_amenities.split(',').map(amenity => amenity.trim()) : [];

    const categorizedAmenities = {
      "Basic Amenities": [],
      "Layout Basic Amenities": [],
      "Amenities": [],
    };

    // Populate the categorized amenities
    rawAmenities.forEach((amenity) => {
      if (amenityCategories["Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (data.ltg_type === 'Plots' && amenityCategories["Layout Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Layout Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (amenityCategories["Amenities"].includes(amenity)) {
        categorizedAmenities["Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      }
    });

    return {
      ...mapCommonFields(data),
      details: {
        properties: [
          {
            icon: 'area-dts-icon', label: 'BUILT UP AREA', value: data.ltg_det_comm_prop_pmts_area_dts
              ? `${data.ltg_det_comm_prop_pmts_area_dts} Sq Ft`
              : ''
          },
          { icon: 'rate-icon', label: 'RATE PER SQ-FT', value: data.ltg_det_comm_prop_pmts_rate_per_sq },
          { icon: 'car-parking-icon', label: 'CAR PARKING', value: data.ltg_det_comm_prop_pmts_car_parking },
          { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_comm_prop_pmts_status },
        ],
        otherFacts: filteredOtherFacts,
        // amenities: categorizedAmenities,
        amenities: data.ltg_det_comm_prop_amenities ? data.ltg_det_comm_prop_amenities.split(',').map(amenity => ({
          icon: 'tickmark-icon',
          label: amenity.trim(),
        })) : [],
        otherAdvantages: data.ltg_det_comm_prop_pmts_other_advantages ? data.ltg_det_comm_prop_pmts_other_advantages.split(',').map(advantage => ({
          icon: 'tickmark-icon',
          label: advantage.trim(),
        })) : [],
        aboutProject: data.ltg_det_comm_prop_about_project_builder,
        propertyVideo: data.ltg_det_comm_prop_property_video_url,
        description: data.ltg_det_comm_prop_desc,
      },
    };
  };

  const mapPentHouseFields = (data) => {
    const otherFacts = [
      { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_penthouses_pmts_approaching_road_width },
      { icon: 'approved-by-icon', label: 'APPROVED BY', value: data.ltg_det_penthouses_pmts_approval_authority },
      { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_penthouses_pmts_balconies },
      { icon: 'duplex-icon', label: 'DUPLEX', value: data.ltg_det_penthouses_pmts_duplex },
      { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_penthouses_pmts_furnishing },
      { icon: 'lifts-icon', label: 'LIFTS IN THE TOWER', value: data.ltg_det_penthouses_pmts_lifts_in_tower },
      { icon: 'main-door-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_penthouses_pmts_main_door_facing },
      // { icon: 'other-advantages-icon', label: 'OTHER ADVANTAGES', value: data.ltg_det_penthouses_pmts_other_advantages },
      { icon: 'penthouse-floor-icon', label: 'PENTHOUSE ON FLOOR', value: data.ltg_det_penthouses_pmts_penthouse_on_floor },
      { icon: 'private-terrace-icon', label: 'PRIVATE TERRACE', value: data.ltg_det_penthouses_pmts_private_terrace },
      { icon: 'property-flooring-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_penthouses_pmts_property_flooring },
      { icon: 'stamp-duty-icon', label: 'STAMP DUTY & REGISTRATION CHARGES', value: data.ltg_det_penthouses_pmts_stamp_duty_registration_charges },
      { icon: 'total-blocks-icon', label: 'TOTAL BLOCKS', value: data.ltg_det_penthouses_pmts_total_blocks },
      { icon: 'total-flats-icon', label: 'TOTAL FLATS IN SOCIETY', value: data.ltg_det_penthouses_pmts_total_flats_in_society },
      { icon: 'total-floors-icon', label: 'TOTAL FLOORS', value: data.ltg_det_penthouses_pmts_total_floors },
      { icon: 'total-project-extent-icon', label: 'TOTAL PROJECT EXTENT', value: data.ltg_det_penthouses_pmts_total_project_extent },
      { icon: 'total-towers-icon', label: 'TOTAL TOWERS IN SOCIETY', value: data.ltg_det_penthouses_pmts_total_towers_in_society },
      { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_penthouses_pmts_transaction_type },
      { icon: 'triplex-icon', label: 'TRIPLEX', value: data.ltg_det_penthouses_pmts_triplex },
      { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_penthouses_pmts_year_built },
    ];

    const filteredOtherFacts = otherFacts.filter(fact => fact.value !== undefined && fact.value !== "undefined" && fact.value !== '');

    const rawAmenities = data.ltg_det_penthouses_amenities ? data.ltg_det_penthouses_amenities.split(',').map(amenity => amenity.trim()) : [];

    const categorizedAmenities = {
      "Basic Amenities": [],
      "Layout Basic Amenities": [],
      "Amenities": [],
    };

    // Populate the categorized amenities
    rawAmenities.forEach((amenity) => {
      if (amenityCategories["Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (data.ltg_type === 'Plots' && amenityCategories["Layout Basic Amenities"].includes(amenity)) {
        categorizedAmenities["Layout Basic Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      } else if (amenityCategories["Amenities"].includes(amenity)) {
        categorizedAmenities["Amenities"].push({
          icon: 'tickmark-icon',
          label: amenity,
        });
      }
    });

    return {
      ...mapCommonFields(data),
      details: {
        properties: [
          {
            icon: 'area-dts-icon', label: 'PENTHOUSE SUPER AREA', value: data.ltg_det_penthouses_pmts_area_dts
              ? `${data.ltg_det_penthouses_pmts_area_dts} Sq Ft`
              : ''
          },
          { icon: 'rate-icon', label: 'RATE PER SQ-FT', value: data.ltg_det_penthouses_pmts_rate_per_sq },
          { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_penthouses_pmts_bed_rooms },
          { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_penthouses_pmts_bath_rooms },
          { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_penthouses_pmts_status },
          { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_penthouses_pmts_car_parking },
        ],
        otherFacts: filteredOtherFacts,
        // amenities: categorizedAmenities,
        amenities: data.ltg_det_penthouses_amenities ? data.ltg_det_penthouses_amenities.split(',').map(amenity => ({
          icon: 'tickmark-icon',
          label: amenity.trim(),
        })) : [],
        otherAdvantages: data.ltg_det_penthouses_pmts_other_advantages ? data.ltg_det_penthouses_pmts_other_advantages.split(',').map(advantage => ({
          icon: 'tickmark-icon',
          label: advantage.trim(),
        })) : [],
        aboutProject: data.ltg_det_penthouses_about_project_builder,
        propertyAddress: data.ltg_det_penthouses_property_address_details,
        propertyVideo: data.ltg_det_penthouses_property_video_url,
        description: data.ltg_det_penthouses_desc,
      },
    };
  };

  let transformedData;

  switch (propertyData.ltg_type) {
    case 'Plots':
      transformedData = mapPlotFields(propertyData);
      break;
    case 'Apartments':
      transformedData = mapApartmentFields(propertyData);
      break;
    case 'Villas':
      transformedData = mapVillaFields(propertyData);
      break;
    case 'RowHouses':
      transformedData = mapRowHouseFields(propertyData);
      break;
    case 'Villaments':
      transformedData = mapVillamentFields(propertyData);
      break;
    case 'CommercialProperties':
      transformedData = mapCommercialPropertyFields(propertyData);
      break;
    case 'PentHouses':
      transformedData = mapPentHouseFields(propertyData);
      break;
    default:
      transformedData = mapCommonFields(propertyData);
      break;
  }

  transformedData.propertyImages = propertyImages.map(image => ({
    src: image,
    alt: `Image for ${transformedData?.title}`,
  }));

  return transformedData;
};

const PropertyDetails = ({ property, images, brochure }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPdfUrl, setModalPdfUrl] = useState('');

  const [selectedMasterPlanImageIndex, setSelectedMasterPlanImageIndex] = useState(null);
  const [selectedFloorAreaPlanImageIndex, setSelectedFloorAreaPlanImageIndex] = useState(null);

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
    return <div className="mt-10 text-xl text-center">Property not found</div>;
  }

  const transformedProperty = transformData(property[0]);

  const locationMapping = {
    Plots: {
      lat: property[0]?.ltg_det_plot_latitude,
      lng: property[0]?.ltg_det_plot_longitude,
      address: property[0]?.ltg_det_plot_location
    },
    Villas: {
      lat: property[0]?.ltg_det_latitude,
      lng: property[0]?.ltg_det_longitude,
      address: property[0]?.ltg_det_location
    },
    Apartments: {
      lat: property[0]?.ltg_det_latitude,
      lng: property[0]?.ltg_det_longitude,
      address: property[0]?.ltg_det_location
    },
    RowHouses: {
      lat: property[0]?.ltg_det_row_house_latitude,
      lng: property[0]?.ltg_det_row_house_longitude
      ,
      address: property[0]?.ltg_det_row_house_location
    },
    CommercialProperties: {
      lat: property[0]?.ltg_det_comm_prop_latitude,
      lng: property[0]?.ltg_det_comm_prop_longitude,
      address: property[0]?.ltg_det_comm_prop_location
    },
    Villaments: {
      lat: property[0]?.ltg_det_villaments_latitude,
      lng: property[0]?.ltg_det_villaments_longitude,
      address: property[0]?.ltg_det_villaments_location
    },
    PentHouses: {
      lat: property[0]?.ltg_det_penthouses_latitude,
      lng: property[0]?.ltg_det_penthouses_longitude,
      address: property[0]?.ltg_det_penthouses_location
    },
  };

  const location = property[0] ? locationMapping[property[0].ltg_type] || { lat: property[0]?.ltg_det_latitude, lng: property[0]?.ltg_det_longitude } : { lat: null, lng: null };

  // const handleFileClick = (pdfUrl) => {
  //   setModalPdfUrl(pdfUrl);
  //   setModalIsOpen(true);
  // };

  const handleFileClick = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };


  const closeModal = () => {
    setModalIsOpen(false);
    setModalPdfUrl('');
    setSelectedMasterPlanImageIndex(null);
    setSelectedFloorAreaPlanImageIndex(null);
  };

  const openMasterPlanModal = (index) => {
    setSelectedMasterPlanImageIndex(index);
  };

  const openFloorAreaPlanModal = (index) => {
    setSelectedFloorAreaPlanImageIndex(index);
  };


  const brochureFiles = brochure?.filter(file => file.type === 'Brochure');
  const pdfFiles = brochureFiles?.filter(file => file.file_name.endsWith('.pdf'));

  const capitalizeLabel = (label) => {
    return label
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="-mt-24 space-y-16">
        <div className="">
          {/* Conditionally render "Details Properties" section */}
          {transformedProperty?.details?.properties.some(fact => fact.value) && (
            <section>
              <div className="grid grid-cols-1 gap-4 mb-5 sm:grid-cols-2 md:grid-cols-3">
                {transformedProperty?.details?.properties
                  .filter(fact => fact.value !== undefined && fact.value !== '' && fact.value !== null && fact.value !== 'undefined')
                  .map((fact, index) => (
                    fact.value && (
                      <div key={index} className="flex items-center p-4 border border-gray-200 rounded shadow-sm">
                        {getIcon(fact.label)}
                        <span className="ml-2 text-gray-700">{capitalizeLabel(fact.label)}:</span>
                        <span className="ml-2 font-semibold">{fact.value}</span>
                      </div>
                    )
                  ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-16">
          {/* Conditionally render "Other Advantages" section */}
          {transformedProperty?.details?.otherAdvantages?.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-bold">Other Advantages</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {transformedProperty.details.otherAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-center p-2 border border-gray-200 rounded shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
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
                    <span className="text-sm font-semibold">{advantage.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="">
          {/* Conditionally render "Details Other Facts" section */}
          {transformedProperty?.details?.otherFacts.some(fact => fact.value) && (
            <section>
              <h2 className="mb-4 text-xl font-bold">Other Facts</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {transformedProperty.details.otherFacts
                  .filter(fact => fact.value !== undefined && fact.value !== '' && fact.value !== null && fact.value !== 'undefined')
                  .map((fact, index) => (
                    <div key={index} className="flex flex-col items-start p-2 border border-gray-200 rounded shadow-sm">
                      {getIcon(fact.label)}
                      <span className="text-sm text-gray-700">{capitalizeLabel(fact.label)}:</span>
                      <span className="text-sm font-semibold">{fact.value}</span>
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>

        {/* Conditionally render "Description" section */}
        {transformedProperty?.details?.description && (
          <div>
            <h2 className="mb-4 text-xl font-bold">Description</h2>
            <div className="p-4 text-gray-700 rounded shadow" dangerouslySetInnerHTML={{ __html: transformedProperty?.details?.description }} />
          </div>
        )}

        {/* "Location" section */}
        {location && (
          <div>
            <h2 className="mb-4 text-xl font-bold">Location</h2>
            <div className="mapContainer">
              <Map
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                lat={location?.lat}
                lng={location?.lng}
                address={location?.address}
              />
            </div>
          </div>
        )}

        <div className="mt-16">
          {/* Conditionally render "Amenities" section */}
          {transformedProperty?.details?.amenities?.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-bold">Amenities</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {transformedProperty?.details.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-2 border border-gray-200 rounded shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5rem"
                      height="1.5rem"
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
                    <span className="text-sm font-semibold">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-16">
          {/* Conditionally render "About Project/Builder" section */}
          {transformedProperty?.details?.aboutProject && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">About Project/Builder</h2>
              <p className="p-4 border border-gray-200 rounded-md shadow-sm">{transformedProperty?.details.aboutProject}</p>
            </section>
          )}
        </div>

        <div className="mt-16">
          {/* Conditionally render "About Project/Builder" section */}
          {transformedProperty?.details?.propertyAddress && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Property Address</h2>
              <p className="p-4 border border-gray-200 rounded-md shadow-sm">{transformedProperty?.details.propertyAddress}</p>
            </section>
          )}
        </div>

        <div className="mt-16">
          {/* Conditionally render "Property Video" section */}
          {transformedProperty?.details?.propertyVideo && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Property Video</h2>
              <div className="max-w-full mx-auto mb-4">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${transformedProperty?.details.propertyVideo.split('v=')[1]}`}
                  title="Property Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </section>
          )}
        </div>

        <div className="mt-16">
          {/* Conditionally render "Master Plan" section */}
          {images?.some((image) => image.type === "MasterPlan") && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Master Plan</h2>
              <div className="flex flex-wrap gap-6">
                {images
                  ?.filter((image) => image.type === "MasterPlan")
                  .map((image, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center w-48 h-48"
                    >
                      {image?.file_name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                        <img
                          src={
                            image?.attachment
                              ? `${httpCommon.defaults.baseURL}${image?.attachment}`
                              : `${httpCommon.defaults.baseURL}\\images\\defaultasset.jpg`
                          }
                          alt={image?.file_name || "Master Plan"}
                          className="object-contain w-48 h-48 rounded cursor-pointer"
                          onClick={() => openMasterPlanModal(index)}
                        />
                      ) : image?.file_name.match(/\.pdf$/i) ? (
                        <div
                          className="flex flex-col items-center justify-center w-48 h-48 p-2 border-2 border-gray-300 rounded-lg cursor-pointer"
                          onClick={() =>
                            window.open(
                              `${httpCommon.defaults.baseURL}${image?.attachment}`,
                              "_blank"
                            )
                          }
                        >
                          <img
                            src="/pdf-file.svg"
                            alt={`PDF ${image.file_name}`}
                            className="w-32 h-32 mb-1"
                          />
                          <span className="font-serif text-sm text-center text-indigo-600 truncate">
                            {image.file_name}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-16">
          {/* Conditionally render "Floor/Area Plan" section */}
          {images?.some((image) => image.type === "FloorAreaPlan") && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Floor/Area Plan</h2>
              <div className="flex flex-wrap gap-6">
                {images
                  ?.filter((image) => image.type === "FloorAreaPlan")
                  .map((image, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col items-center w-48 h-48"
                    >
                      {image?.file_name.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                        <img
                          src={
                            image?.attachment
                              ? `${httpCommon.defaults.baseURL}${image?.attachment}`
                              : `${httpCommon.defaults.baseURL}\\images\\defaultasset.jpg`
                          }
                          alt={image?.file_name || "Floor/Area Plan"}
                          className="object-contain w-48 h-48 rounded cursor-pointer"
                          onClick={() => openFloorAreaPlanModal(index)}
                        />
                      ) : image?.file_name.match(/\.pdf$/i) ? (
                        <div
                          className="flex flex-col items-center justify-center w-48 h-48 p-2 border-2 border-gray-300 rounded-lg cursor-pointer"
                          onClick={() =>
                            window.open(
                              `${httpCommon.defaults.baseURL}${image?.attachment}`,
                              "_blank"
                            )
                          }
                        >
                          <img
                            src="/pdf-file.svg"
                            alt={`PDF ${image.file_name}`}
                            className="w-32 h-32 mb-1"
                          />
                          <span className="font-serif text-sm text-center text-indigo-600 truncate">
                            {image.file_name}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-16">
          {/* Conditionally render "Brochure" section */}
          {pdfFiles?.length > 0 && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Brochure</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {pdfFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center mb-2 overflow-hidden transition duration-300 transform border rounded-lg shadow-lg cursor-pointer hover:scale-105"
                    onClick={() =>
                      file?.attachment &&
                      handleFileClick(`${httpCommon.defaults.baseURL}${file?.attachment}`)
                    }
                  >
                    {/* <p className="text-center text-black">{file?.file_name || 'Unnamed Brochure'}</p> */}
                    <img
                      src="/pdf-file.svg"
                      alt={`PDF ${file?.file_name || 'Unnamed Brochure'}`}
                      className="w-32 h-32 mt-2 mb-2"
                    />
                    <span className="mb-2 text-base text-indigo-600 font-base">
                      {file?.file_name || 'Unnamed Brochure'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Image Modals */}
        {selectedMasterPlanImageIndex !== null && (
          <ImageModal
            images={images.filter(
              (image) =>
                image.type === 'MasterPlan' &&
                image.file_name.match(/\.(jpg|jpeg|png|gif)$/i)
            )}
            currentIndex={selectedMasterPlanImageIndex}
            onClose={closeModal}
          />
        )}

        {selectedFloorAreaPlanImageIndex !== null && (
          <ImageModal
            images={images.filter(
              (image) =>
                image.type === "FloorAreaPlan" &&
                image.file_name.match(/\.(jpg|jpeg|png|gif)$/i)
            )}
            currentIndex={selectedFloorAreaPlanImageIndex}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
