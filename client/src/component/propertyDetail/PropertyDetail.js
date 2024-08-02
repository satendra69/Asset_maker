import { useState, useEffect } from "react";
import httpCommon from "../../http-common";
import "./property.css";
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
import ImageModal from '../../admin/Pages/Listing/Component/ImageModal';
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
    case "STAMP & REG. CHARGES":
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
  if (!propertyData) return {};
  if (!propertyImages || !Array.isArray(propertyImages)) propertyImages = [];

  console.log("propertyData", propertyData);

  const mapCommonFields = (data) => ({
    id: data.RowID,
    type: data.ltg_type,
    price: data.ltg_det_sale_price,
    title: data.ltg_title,
    description: data.ltg_det_desc,
  });

  const mapApartmentFields = (data) => ({
    ...mapCommonFields(data),
    details: {
      otherFacts: [
        { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_pmts_approaching_road_width },
        { icon: 'approval-authority-icon', label: 'APPROVAL AUTHORITY', value: data.ltg_det_pmts_approval_authority },
        { icon: 'area-dts-icon', label: 'AREA DETAILS', value: data.ltg_det_pmts_area_dts },
        { icon: 'available-from-icon', label: 'AVAILABLE FROM', value: data.ltg_det_available_from },
        { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_pmts_balconies },
        { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_pmts_bth_rom },
        { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_pmts_bed_rom },
        { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_pmts_car_park },
        { icon: 'total-flrs-icon', label: 'TOTAL FLOORS', value: data.ltg_det_pmts_total_flrs },
        { icon: 'flat-on-floor-icon', label: 'FLAT ON FLOOR', value: data.ltg_det_pmts_flat_on_flr },
        { icon: 'lfts-in-tower-icon', label: 'LIFTS IN THE TOWER', value: data.ltg_det_pmts_lfts_in_tower },
        { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_pmts_furnishing },
        { icon: 'main-door-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_pmts_main_dor_facing },
        { icon: 'overlooking-icon', label: 'OVER LOOKING', value: data.ltg_det_over_looking },
        { icon: 'property-flrg-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_pmts_property_flrg },
        { icon: 'rate-icon', label: 'RATE PER SQ-FT/YRD', value: data.ltg_det_pmts_rate_per_sq },
        { icon: 'stamp-duty-icon', label: 'STAMP & REG. CHARGES', value: data.ltg_det_pmts_stamp_duty },
        { icon: 'project-extent-icon', label: 'TOTAL PROJECT EXTENT', value: data.ltg_det_pmts_tproject_evnt },
        { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_pmts_status },
        { icon: 'total-phases-icon', label: 'TOTAL PHASES', value: data.ltg_det_pmts_total_phases },
        { icon: 'totl_block-icon', label: 'TOTAL BLOCKS', value: data.ltg_det_pmts_totl_block },
        { icon: 'total_towrs-icon', label: 'TOTAL TOWERS', value: data.ltg_det_pmts_total_towrs },
        { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_pmts_totalunits },
        { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_pmts_transaction_typ },
        { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_pmts_year_build },
      ],
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
    },
  });

  const mapPlotFields = (data) => ({
    ...mapCommonFields(data),
    details: {
      otherFacts: [
        { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_plot_pmts_approaching_road_width },
        { icon: 'area-dts-icon', label: 'AREA DETAILS', value: data.ltg_det_pmts_area_dts },
        { icon: 'boundary-wall-icon', label: 'BOUNDARY WALL MADE', value: data.ltg_det_plot_pmts_boundary_wall_made },
        { icon: 'corner-plot-icon', label: 'CORNER PLOT', value: data.ltg_det_plot_pmts_corner_plot },
        { icon: 'floors-allowed-icon', label: 'FLOORS ALLOWED FOR CONSTRUCTION', value: data.ltg_det_plot_pmts_floors_allowed_for_construction },
        { icon: 'gated-community-icon', label: 'IS IN GATED COMMUNITY', value: data.ltg_det_plot_pmts_gated_community },
        { icon: 'open-sides-icon', label: 'NO OF OPEN SIDES', value: data.ltg_det_plot_pmts_no_of_open_sides },
        { icon: 'approval-authority-icon', label: 'PLOT APPROVAL AUTHORITY', value: data.ltg_det_plot_pmts_plot_approval_authority },
        { icon: 'dimensions-icon', label: 'PLOT DIMENSIONS', value: data.ltg_det_plot_pmts_plot_dimensions },
        { icon: 'facing-icon', label: 'PLOT FACING', value: data.ltg_det_plot_pmts_plot_facing },
        { icon: 'rate-icon', label: 'RATE PER SQ-FT/YRD', value: data.ltg_det_plot_pmts_rate_per_sq },
        { icon: 'stamp-duty-icon', label: 'STAMP & REG. CHARGES', value: data.ltg_det_plot_pmts_stamp_duty_registration_charges },
        { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_plot_pmts_status },
        { icon: 'total-phases-icon', label: 'TOTAL PHASES', value: data.ltg_det_plot_pmts_total_phases },
        { icon: 'project-extent-icon', label: 'TOTAL PROJECT EXTENT', value: data.ltg_det_plot_pmts_total_project_extent },
        { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_plot_pmts_total_units },
        { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_plot_pmts_transaction_type },
        { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_plot_pmts_year_built },
      ],
      amenities: data.ltg_det_plot_amenities ? data.ltg_det_plot_amenities.split(',').map(amenity => ({
        icon: 'tickmark-icon',
        label: amenity.trim(),
      })) : [],
      otherAdvantages: data.ltg_det_plot_pmts_other_advtages ? data.ltg_det_plot_pmts_other_advtages.split(',').map(advantage => ({
        icon: 'tickmark-icon',
        label: advantage.trim(),
      })) : [],
      aboutProject: data.ltg_det_plot_about_project_builder,
      propertyVideo: data.ltg_det_plot_property_video_url,
    },
  });

  const mapVillaFields = (data) => ({
    ...mapCommonFields(data),
    details: {
      otherFacts: [
        { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_pmts_approaching_road_width },
        { icon: 'approval-authority-icon', label: 'APPROVAL AUTHORITY', value: data.ltg_det_pmts_approval_authority },
        { icon: 'area-dts-icon', label: 'AREA DETAILS', value: data.ltg_det_pmts_area_dts },
        { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_pmts_balconies },
        { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_pmts_bed_rom },
        { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_pmts_bth_rom },
        { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_pmts_car_park },
        { icon: 'flat-floor-icon', label: 'FLAT ON FLOOR', value: data.ltg_det_pmts_flat_on_flr },
        { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_pmts_furnishing },
        { icon: 'property-flrg-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_pmts_property_flrg },
        { icon: 'main-door-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_pmts_main_dor_facing },
        { icon: 'corner-villa-icon', label: 'THIS IS CORNER VILLA', value: data.ltg_det_corner_villa },
        { icon: 'open-sides-icon', label: 'NO OF OPEN SIDES', value: data.ltg_det_open_sides },
        { icon: 'gated-community-icon', label: 'IS IN GATED COMMUNITY', value: data.ltg_det_gated_community },
        { icon: 'overlooking-icon', label: 'OVER LOOKING', value: data.ltg_det_over_looking },
        { icon: 'plot-area-icon', label: 'PLOT AREA', value: data.ltg_det_plot_area },
        { icon: 'plot-dimensions-icon', label: 'PLOT DIMENSIONS', value: data.ltg_det_plot_dimensions },
        { icon: 'rate-icon', label: 'RATE PER SQ-FT/YRD', value: data.ltg_det_pmts_rate_per_sq },
        { icon: 'available-from-icon', label: 'AVAILABLE FROM', value: data.ltg_det_available_from },
        { icon: 'stamp-duty-icon', label: 'STAMP & REG. CHARGES', value: data.ltg_det_pmts_stamp_duty },
        { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_pmts_status },
        { icon: 'total-floors-icon', label: 'TOTAL FLOORS', value: data.ltg_det_pmts_total_flrs },
        { icon: 'total-phases-icon', label: 'TOTAL PHASES', value: data.ltg_det_pmts_total_phases },
        { icon: 'project-extent-icon', label: 'TOTAL PROJECT EXTENT', value: data.ltg_det_pmts_tproject_evnt },
        { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_pmts_totalunits },
        { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_pmts_transaction_typ },
        { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_pmts_year_build },
      ],
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
    },
  });

  const mapRowHouseFields = (data) => ({
    ...mapCommonFields(data),
    details: {
      otherFacts: [
        { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_row_house_pmts_approaching_road_width },
        { icon: 'approval-authority-icon', label: 'APPROVAL AUTHORITY', value: data.ltg_det_row_house_pmts_approval_authority },
        { icon: 'area-dts-icon', label: 'AREA DETAILS', value: data.ltg_det_row_house_pmts_area_dts },
        { icon: 'available-from-icon', label: 'AVAILABLE FROM', value: data.ltg_det_row_house_pmts_available_from },
        { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_row_house_pmts_balconies },
        { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_row_house_pmts_bath_rooms },
        { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_row_house_pmts_bed_rooms },
        { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_row_house_pmts_car_parking },
        { icon: 'corner-rowhouse-icon', label: 'THIS IS A CORNER ROWHOUSE', value: data.ltg_det_row_house_pmts_corner_rowhouse },
        { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_row_house_pmts_furnishing },
        { icon: 'gated-community-icon', label: 'IS IN GATED COMMUNITY', value: data.ltg_det_row_house_pmts_gated_community },
        { icon: 'land-uds-area-icon', label: 'LAND UDS AREA', value: data.ltg_det_row_house_pmts_land_uds_area },
        { icon: 'main-door-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_row_house_pmts_main_door_facing },
        { icon: 'open-sides-icon', label: 'NO OF OPEN SIDES', value: data.ltg_det_row_house_pmts_no_of_open_sides },
        { icon: 'overlooking-icon', label: 'OVER LOOKING', value: data.ltg_det_row_house_pmts_over_looking },
        { icon: 'plot-dimensions-icon', label: 'PLOT DIMENSIONS', value: data.ltg_det_row_house_pmts_plot_dimensions },
        { icon: 'property-flrg-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_row_house_pmts_property_flooring },
        { icon: 'rate-icon', label: 'RATE PER SQ-FT/YRD', value: data.ltg_det_row_house_pmts_rate_per_sq },
        { icon: 'stamp-duty-icon', label: 'STAMP & REG. CHARGES', value: data.ltg_det_row_house_pmts_stamp_duty_registration_charges },
        { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_row_house_pmts_status },
        { icon: 'total-phases-icon', label: 'TOTAL PHASES', value: data.ltg_det_row_house_pmts_total_phases },
        { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_row_house_pmts_total_units },
        { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_row_house_pmts_transaction_type },
        { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_row_house_pmts_year_built },
      ],
      amenities: data.ltg_det_row_house_amenities ? data.ltg_det_row_house_amenities.split(',').map(amenity => ({
        icon: 'tickmark-icon',
        label: amenity.trim(),
      })) : [],
      otherAdvantages: data.ltg_det_row_house_pmts_other_advantages ? data.ltg_det_row_house_pmts_other_advantages.split(',').map(advantage => ({
        icon: 'tickmark-icon',
        label: advantage.trim(),
      })) : [],
      aboutProject: data.ltg_det_row_house_about_project_builder,
      propertyVideo: data.ltg_det_row_house_property_video_url,
    },
  });

  const mapVillamentFields = (data) => ({
    ...mapCommonFields(data),
    details: {
      otherFacts: [
        { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_villaments_pmts_approaching_road_width },
        { icon: 'approval-authority-icon', label: 'APPROVAL AUTHORITY', value: data.ltg_det_villaments_pmts_approval_authority },
        { icon: 'area-dts-icon', label: 'AREA DETAILS', value: data.ltg_det_villaments_pmts_area_dts },
        { icon: 'available-from-icon', label: 'AVAILABLE FROM', value: data.ltg_det_villaments_pmts_available_from },
        { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_villaments_pmts_balconies },
        { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_villaments_pmts_bath_rooms },
        { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_villaments_pmts_bed_rooms },
        { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_villaments_pmts_car_parking },
        { icon: 'corner-villament-icon', label: 'THIS IS CORNER VILLAMENT', value: data.ltg_det_villaments_pmts_corner_villament },
        { icon: 'duplex-icon', label: 'DUPLEX', value: data.ltg_det_villaments_pmts_duplex },
        { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_villaments_pmts_furnishing },
        { icon: 'gated-community-icon', label: 'IS IN GATED COMMUNITY', value: data.ltg_det_villaments_pmts_gated_community },
        { icon: 'land-uds-area-icon', label: 'LAND UDS AREA', value: data.ltg_det_villaments_pmts_land_uds_area },
        { icon: 'main-door-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_villaments_pmts_main_door_facing },
        { icon: 'open-sides-icon', label: 'NO OF OPEN SIDES', value: data.ltg_det_villaments_pmts_no_of_open_sides },
        { icon: 'overlooking-icon', label: 'OVER LOOKING', value: data.ltg_det_villaments_pmts_over_looking },
        { icon: 'property-flrg-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_villaments_pmts_property_flooring },
        { icon: 'rate-icon', label: 'RATE PER SQ-FT/YRD', value: data.ltg_det_villaments_pmts_rate_per_sq },
        { icon: 'stamp-duty-icon', label: 'STAMP & REG. CHARGES', value: data.ltg_det_villaments_pmts_stamp_duty_registration_charges },
        { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_villaments_pmts_status },
        { icon: 'total-phases-icon', label: 'TOTAL PHASES', value: data.ltg_det_villaments_pmts_total_phases },
        { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_villaments_pmts_total_units },
        { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_villaments_pmts_transaction_type },
        { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_villaments_pmts_year_built },
      ],
      amenities: data.ltg_det_villaments_amenities ? data.ltg_det_villaments_amenities.split(',').map(amenity => ({
        icon: 'tickmark-icon',
        label: amenity.trim(),
      })) : [],
      otherAdvantages: data.ltg_det_villaments_pmts_other_advantages ? data.ltg_det_villaments_pmts_other_advantages.split(',').map(advantage => ({
        icon: 'tickmark-icon',
        label: advantage.trim(),
      })) : [],
      aboutProject: data.ltg_det_villaments_about_project_builder,
      propertyVideo: data.ltg_det_villaments_property_video_url,
    },
  });

  const mapCommercialPropertyFields = (data) => ({
    ...mapCommonFields(data),
    details: {
      otherFacts: [
        { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_comm_prop_pmts_approaching_road_width },
        { icon: 'approval-authority-icon', label: 'APPROVAL AUTHORITY', value: data.ltg_det_comm_prop_pmts_approval_authority },
        { icon: 'area-dts-icon', label: 'AREA DETAILS', value: data.ltg_det_comm_prop_pmts_area_dts },
        { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_comm_prop_pmts_balconies },
        { icon: 'car-parking-icon', label: 'CAR PARKING', value: data.ltg_det_comm_prop_pmts_car_parking },
        { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_comm_prop_pmts_furnishing },
        { icon: 'property-flooring-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_comm_prop_pmts_property_flooring },
        { icon: 'property-on-floor-icon', label: 'PROPERTY ON FLOOR', value: data.ltg_det_comm_prop_pmts_property_on_floor },
        { icon: 'rate-icon', label: 'RATE PER SQ-FT/YRD', value: data.ltg_det_comm_prop_pmts_rate_per_sq },
        { icon: 'stamp-duty-icon', label: 'STAMP & REG. CHARGES', value: data.ltg_det_comm_prop_pmts_stamp_duty_registration_charges },
        { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_comm_prop_pmts_status },
        { icon: 'total-floors-icon', label: 'TOTAL FLOORS', value: data.ltg_det_comm_prop_pmts_total_floors },
        { icon: 'total-phases-icon', label: 'TOTAL PHASES', value: data.ltg_det_comm_prop_pmts_total_phases },
        { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_comm_prop_pmts_total_units },
        { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_comm_prop_pmts_transaction_type },
        { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_comm_prop_pmts_year_built },
      ],
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
    },
  });

  const mapPentHouseFields = (data) => ({
    ...mapCommonFields(data),
    details: {
      otherFacts: [
        { icon: 'road-width-icon', label: 'APPROACHING ROAD WIDTH', value: data.ltg_det_penthouses_pmts_approaching_road_width },
        { icon: 'approval-authority-icon', label: 'APPROVAL AUTHORITY', value: data.ltg_det_penthouses_pmts_approval_authority },
        { icon: 'area-dts-icon', label: 'AREA DETAILS', value: data.ltg_det_penthouses_pmts_area_dts },
        { icon: 'available-from-icon', label: 'AVAILABLE FROM', value: data.ltg_det_penthouses_pmts_available_form },
        { icon: 'balconies-icon', label: 'BALCONIES', value: data.ltg_det_penthouses_pmts_balconies },
        { icon: 'bathroom-icon', label: 'BATH ROOMS', value: data.ltg_det_penthouses_pmts_bath_rooms },
        { icon: 'bedroom-icon', label: 'BED ROOMS', value: data.ltg_det_penthouses_pmts_bed_rooms },
        { icon: 'car-park-icon', label: 'CAR PARKING', value: data.ltg_det_penthouses_pmts_car_parking },
        { icon: 'corner-penthouse-icon', label: 'THIS IS A CORNER PENTHOUSE', value: data.ltg_det_penthouses_pmts_corner_penthouse },
        { icon: 'duplex-icon', label: 'DUPLEX', value: data.ltg_det_penthouses_pmts_duplex },
        { icon: 'furnishing-icon', label: 'FURNISHING', value: data.ltg_det_penthouses_pmts_furnishing },
        { icon: 'gated-community-icon', label: 'IS IN GATED COMMUNITY', value: data.ltg_det_penthouses_pmts_gated_community },
        { icon: 'main-door-icon', label: 'MAIN DOOR FACING', value: data.ltg_det_penthouses_pmts_main_door_facing },
        { icon: 'open-sides-icon', label: 'NO OF OPEN SIDES', value: data.ltg_det_penthouses_pmts_no_of_open_sides },
        { icon: 'overlooking-icon', label: 'OVER LOOKING', value: data.ltg_det_penthouses_pmts_over_looking },
        { icon: 'property-flrg-icon', label: 'PROPERTY FLOORING', value: data.ltg_det_penthouses_pmts_property_flooring },
        { icon: 'rate-icon', label: 'RATE PER SQ-FT/YRD', value: data.ltg_det_penthouses_pmts_rate_per_sq },
        { icon: 'stamp-duty-icon', label: 'STAMP & REG. CHARGES', value: data.ltg_det_penthouses_pmts_stamp_duty_registration_charges },
        { icon: 'status-icon', label: 'STATUS', value: data.ltg_det_penthouses_pmts_status },
        { icon: 'total-phases-icon', label: 'TOTAL PHASES', value: data.ltg_det_penthouses_pmts_total_phases },
        { icon: 'total-units-icon', label: 'TOTAL UNITS', value: data.ltg_det_penthouses_pmts_total_units },
        { icon: 'transaction-type-icon', label: 'TRANSACTION TYPE', value: data.ltg_det_penthouses_pmts_transaction_type },
        { icon: 'year-built-icon', label: 'YEAR BUILT', value: data.ltg_det_penthouses_pmts_year_built },
      ],
      amenities: data.ltg_det_penthouses_amenities ? data.ltg_det_penthouses_amenities.split(',').map(amenity => ({
        icon: 'tickmark-icon',
        label: amenity.trim(),
      })) : [],
      otherAdvantages: data.ltg_det_penthouses_pmts_other_advantages ? data.ltg_det_penthouses_pmts_other_advantages.split(',').map(advantage => ({
        icon: 'tickmark-icon',
        label: advantage.trim(),
      })) : [],
      aboutProject: data.ltg_det_penthouses_about_project_builder,
      propertyVideo: data.ltg_det_penthouses_property_video_url,
    },
  });

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
    alt: `Image for ${transformedData.title}`,
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
  const thumbnailFiles = brochureFiles?.filter(file => file.file_name.endsWith('-thumbnail.png'));

  return (
    <div className="container p-4 mx-auto">
      <div className="-mt-6 space-y-16">
        <div className="">
          {/* Conditionally render "Other Facts" section */}
          {transformedProperty?.details?.otherFacts.some(fact => fact.value) && (
            <section>
              <h2 className="mb-4 text-xl font-bold">Other Facts</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {transformedProperty?.details?.otherFacts.map((fact, index) => (
                  fact.value && (
                    <div key={index} className="flex items-center p-2 border border-gray-200 rounded shadow-sm">
                      {getIcon(fact.label)}
                      <span className="ml-1 text-sm font-semibold long-label">{fact.label}:</span>
                      <span className="ml-1 text-sm text-gray-700">{fact.value}</span>
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
          {images?.some(image => image.type === 'MasterPlan') && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Master Plan</h2>
              <div className="flex flex-wrap gap-10">
                {images?.filter(image => image.type === 'MasterPlan').map((image, index) => (
                  <img
                    key={index}
                    src={httpCommon.defaults.baseURL + image.attachment}
                    alt={image.file_name}
                    className="object-cover w-64 h-48 rounded cursor-pointer"
                    onClick={() => openMasterPlanModal(index)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-16">
          {/* Conditionally render "Floor/Area Plan" section */}
          {images?.some(image => image.type === 'FloorAreaPlan') && (
            <section>
              <h2 className="mb-4 text-2xl font-bold">Floor/Area Plan</h2>
              <div className="flex flex-wrap gap-10">
                {images?.filter(image => image.type === 'FloorAreaPlan').map((image, index) => (
                  <img
                    key={index}
                    src={httpCommon.defaults.baseURL + image.attachment}
                    alt={image.file_name}
                    className="object-cover w-64 h-48 rounded cursor-pointer"
                    onClick={() => openFloorAreaPlanModal(index)}
                  />
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
              <div className="flex flex-wrap gap-4">
                {pdfFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative"
                    onClick={() => handleThumbnailClick(httpCommon.defaults.baseURL + file.attachment)}
                  >
                    <img
                      src={httpCommon.defaults.baseURL + (thumbnailFiles.find(thumbnail => thumbnail.file_name === file.file_name.replace('.pdf', '-thumbnail.png'))?.attachment || '/images/defaultasset.jpeg')}
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

        {/* PDF Modal */}
        {modalIsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-4xl p-4 bg-white rounded-lg modal-content" style={{ height: '75%', marginTop: '100px' }}>
              <button
                onClick={closeModal}
                className="absolute p-2 text-white bg-red-600 rounded-full shadow-md top-2 right-2"
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

        {/* Image Modals */}
        {selectedMasterPlanImageIndex !== null && (
          <ImageModal
            images={images.filter(image => image.type === 'MasterPlan')}
            currentIndex={selectedMasterPlanImageIndex}
            onClose={closeModal}
          />
        )}

        {selectedFloorAreaPlanImageIndex !== null && (
          <ImageModal
            images={images.filter(image => image.type === 'FloorAreaPlan')}
            currentIndex={selectedFloorAreaPlanImageIndex}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
