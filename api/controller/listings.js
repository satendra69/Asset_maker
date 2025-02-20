const db = require("../connect");
const moment = require("moment");
const path = require('path');

const addListings = async (req, res) => {
  if (!req.body || !req.body.ListingData) {
    console.error("ListingData is not provided.");
    return res.status(400).json({ error: "ListingData is required." });
  }

  const q =
    `INSERT INTO ltg_mst
    (ltg_title, propertyUrl, ltg_projectName, ltg_owner, ltg_type, ltg_mark_as_featured, ltg_regions, ltg_categories, ltg_labels, ltg_audit_user, ltg_create_date, ltg_update_date)
    VALUES
    ('${req.body.title}',
    '${req.body.propertyUrl}',
    '${req.body.projectName}',
    '${req.body.selectedOwner}', 
    '${req.body.listingType}', 
    '${req.body.featured}', 
    '${req.body.selectedRegions}',
    '${req.body.selectedCategories}',
    '${req.body.CustomLabel}', 
    '${req.body.auditUser}',
    '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}',
    '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}')`;

  try {
    const [results] = await db.query(q);
    const lastInsertId = results.insertId;
    if (req.body.listingType == "Apartments" || req.body.listingType == "Villas") {
      const q_det =
        `INSERT INTO ltg_det
	   SET
    ltg_det_mstRowID = '${lastInsertId}', 
    ltg_det_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_desc = '${req.body.ListingData.content}', 
    ltg_det_location = '${req.body.ListingData.locationData.location}',
    ltg_det_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_property_address_details = '${req.body.ListingData.propertyAddressDetails}', 
    ltg_det_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_pmts_bed_rom = '${req.body.ListingData.selectedBedRooms}', 
    ltg_det_pmts_bth_rom = '${req.body.ListingData.selectedBathRooms}', 
    ltg_det_pmts_car_park = '${req.body.ListingData.selectedCarParking}', 
    ltg_det_pmts_year_build = '${req.body.ListingData.yearBuilt}', 
    ltg_det_plot_dimensions = '${req.body.ListingData.plotDimensions}', 
    ltg_det_open_sides = '${req.body.ListingData.noOfOpenSides}', 
    ltg_det_corner_villa = '${req.body.ListingData.isCornerVilla}', 
    ltg_det_plot_area = '${req.body.ListingData.plotArea}', 
    ltg_det_gated_community = '${req.body.ListingData.isInGatedCommunity}', 
    ltg_det_over_looking = '${req.body.ListingData.overLooking}', 
    ltg_det_totl_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_pmts_total_flrs = '${req.body.ListingData.totalFloors}', 
    ltg_det_pmts_flat_on_flr = '${req.body.ListingData.flatOnFloor}', 
    ltg_det_pmts_lfts_in_tower = '${req.body.ListingData.liftsInTheTower}', 
    ltg_det_pmts_main_dor_facing = '${req.body.ListingData.mainDoorFacing}', 
    ltg_det_pmts_property_flrg = '${req.body.ListingData.propertyFlooring}', 
    ltg_det_pmts_balconies = '${req.body.ListingData.balconies}', 
    ltg_det_pmts_totalFlatsInSociety = '${req.body.ListingData.totalFlatsInSociety}',
    ltg_det_pmts_duplex = '${req.body.ListingData.isDuplex}',
    ltg_det_pmts_triplex = '${req.body.ListingData.isTriplex}',
    ltg_det_pmts_plot_facing = '${req.body.ListingData.plotFacing}',
    ltg_det_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_pmts_furnishing = '${req.body.ListingData.furnishing}', 
    ltg_det_pmts_stamp_duty = '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
    ltg_det_pmts_tproject_evnt = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_pmts_totl_block = '${req.body.ListingData.totalBlocks}', 
    ltg_det_pmts_transaction_typ = '${req.body.ListingData.transactionType}', 
    ltg_det_pmts_total_towrs = '${req.body.ListingData.totalTowers}', 
    ltg_det_pmts_total_phases = '${req.body.ListingData.totalPhases}', 
    ltg_det_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}', 
    ltg_det_pmts_totalunits = '${req.body.ListingData.totalUnits}', 
    ltg_det_pmts_other_advtages = '${req.body.ListingData.advantagesAsString}', 
    ltg_det_about_project_buder = '${req.body.ListingData.projectBuilderDetails}', 
    ltg_det_amenities = '${req.body.ListingData.amenitiesAsString}', 
    ltg_det_property_video_url = '${req.body.ListingData.videoUrl}', 
    ltg_det_available_from = '${req.body.ListingData.availableFrom}',
    ltg_det_audit_user = '${req.body.auditUser}',
    ltg_det_create_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}', 
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
`;
      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det successfully");
        res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
      } catch (error) {
        console.error("Error inserting into ltg_det:", error.stack);
        res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
      }
    }
    else if (req.body.listingType == "Plots") {
      console.log("plots____");
      const q_det =
        `INSERT INTO ltg_det_plots
SET
    ltg_det_mstRowID = '${lastInsertId}',
    ltg_det_plot_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_plot_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_plot_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_plot_desc = '${req.body.ListingData.content}', 
    ltg_det_plot_location = '${req.body.ListingData.locationData.location}', 
    ltg_det_plot_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_plot_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_plot_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_plot_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_plot_property_address_details = '${req.body.ListingData.propertyAddressDetails}', 
    ltg_det_plot_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_plot_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_plot_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_plot_pmts_plot_dimensions = '${req.body.ListingData.plotDimensions}', 
    ltg_det_plot_pmts_floors_allowed_for_construction = '${req.body.ListingData.floorsAllowedForConstruction}', 
    ltg_det_plot_pmts_no_of_open_sides = '${req.body.ListingData.noOfOpenSides}', 
    ltg_det_plot_pmts_plot_facing = '${req.body.ListingData.plotFacing}', 
    ltg_det_plot_pmts_corner_plot = '${req.body.ListingData.cornerPlot}', 
    ltg_det_plot_pmts_gated_community = '${req.body.ListingData.isInGatedCommunity}', 
    ltg_det_plot_pmts_boundary_wall_made = '${req.body.ListingData.boundaryWallMade}', 
    ltg_det_plot_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_plot_pmts_transaction_type = '${req.body.ListingData.transactionType}', 
    ltg_det_plot_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
    ltg_det_plot_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_plot_pmts_plot_approval_authority = '${req.body.ListingData.plotApprovalAuthority}', 
    ltg_det_plot_pmts_year_built = '${req.body.ListingData.yearBuilt}', 
    ltg_det_plot_pmts_total_units = '${req.body.ListingData.totalUnits}', 
    ltg_det_plot_pmts_total_phases = '${req.body.ListingData.totalPhases}', 
    ltg_det_plot_amenities = '${req.body.ListingData.amenitiesAsString}', 
    ltg_det_plot_about_project_builder = '${req.body.ListingData.projectBuilderDetails}', 
    ltg_det_plot_property_video_url = '${req.body.ListingData.videoUrl}', 
    ltg_det_audit_user = '${req.body.auditUser}', 
    ltg_det_create_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}', 
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
`;


      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det successfully");
        res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
      } catch (error) {
        console.error("Error inserting into ltg_det:", error.stack);
        res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
      }
    }
    else if (req.body.listingType == "RowHouses") {
      const q_det =
        `INSERT INTO ltg_det_row_houses
SET
    ltg_det_mstRowID = '${lastInsertId}',
    ltg_det_row_house_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_row_house_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_row_house_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_row_house_desc = '${req.body.ListingData.content}', 
    ltg_det_row_house_location = '${req.body.ListingData.locationData.location}', 
    ltg_det_row_house_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_row_house_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_row_house_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_row_house_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_row_house_property_address_details = '${req.body.ListingData.propertyAddressDetails}', 
    ltg_det_row_house_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_row_house_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_row_house_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_row_house_pmts_bed_rooms = '${req.body.ListingData.selectedBedRooms}', 
    ltg_det_row_house_pmts_bath_rooms = '${req.body.ListingData.selectedBathRooms}', 
    ltg_det_row_house_pmts_car_parking = '${req.body.ListingData.selectedCarParking}', 
    ltg_det_row_house_pmts_year_built = '${req.body.ListingData.yearBuilt}', 
    ltg_det_row_house_pmts_plot_dimensions = '${req.body.ListingData.plotDimensions}', 
    ltg_det_row_house_pmts_land_uds_area = '${req.body.ListingData.landUDSArea}', 
    ltg_det_row_house_pmts_over_looking = '${req.body.ListingData.overLooking}', 
    ltg_det_row_house_pmts_main_door_facing = '${req.body.ListingData.mainDoorFacing}', 
    ltg_det_row_house_pmts_corner_rowhouse = '${req.body.ListingData.isCornerRowhouse}', 
    ltg_det_row_house_pmts_gated_community = '${req.body.ListingData.isInGatedCommunity}', 
    ltg_det_row_house_pmts_balconies = '${req.body.ListingData.balconies}',
    ltg_det_row_house_pmts_duplex = '${req.body.ListingData.isDuplex}',
    ltg_det_row_house_pmts_triplex = '${req.body.ListingData.isTriplex}',
    ltg_det_row_house_pmts_total_floors = '${req.body.ListingData.totalFloors}',
    ltg_det_row_house_pmts_property_facing = '${req.body.ListingData.propertyFacing}', 
    ltg_det_row_house_pmts_other_advantages = '${req.body.ListingData.advantagesAsString}', 
    ltg_det_row_house_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_row_house_pmts_furnishing = '${req.body.ListingData.furnishing}', 
    ltg_det_row_house_pmts_property_flooring = '${req.body.ListingData.propertyFlooring}', 
    ltg_det_row_house_pmts_no_of_open_sides = '${req.body.ListingData.noOfOpenSides}', 
    ltg_det_row_house_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_row_house_pmts_available_from = '${req.body.ListingData.availableFrom}', 
    ltg_det_row_house_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
    ltg_det_row_house_pmts_transaction_type = '${req.body.ListingData.transactionType}', 
    ltg_det_row_house_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}', 
    ltg_det_row_house_pmts_total_units = '${req.body.ListingData.totalUnits}', 
    ltg_det_row_house_pmts_total_phases = '${req.body.ListingData.totalPhases}', 
    ltg_det_row_house_amenities = '${req.body.ListingData.amenitiesAsString}', 
    ltg_det_row_house_about_project_builder = '${req.body.ListingData.projectBuilderDetails}', 
    ltg_det_row_house_property_video_url = '${req.body.ListingData.videoUrl}', 
    ltg_det_audit_user = '${req.body.auditUser}', 
    ltg_det_create_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}', 
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
`;

      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det successfully");
        res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
      } catch (error) {
        console.error("Error inserting into ltg_det:", error.stack);
        res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
      }
    }
    else if (req.body.listingType == "CommercialProperties") {
      const q_det =
        `INSERT INTO ltg_det_commercial_properties
SET
    ltg_det_mstRowID = '${lastInsertId}',
    ltg_det_comm_prop_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_comm_prop_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_comm_prop_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_comm_prop_desc = '${req.body.ListingData.content}', 
    ltg_det_comm_prop_location = '${req.body.ListingData.locationData.location}', 
    ltg_det_comm_prop_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_comm_prop_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_comm_prop_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_comm_prop_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_comm_prop_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_comm_prop_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_comm_prop_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_comm_prop_pmts_year_built = '${req.body.ListingData.yearBuilt}', 
    ltg_det_comm_prop_pmts_balconies = '${req.body.ListingData.balconies}', 
    ltg_det_comm_prop_pmts_other_advantages = '${req.body.ListingData.advantagesAsString}', 
    ltg_det_comm_prop_pmts_furnishing = '${req.body.ListingData.furnishing}', 
    ltg_det_comm_prop_pmts_car_parking = '${req.body.ListingData.selectedCarParking}', 
    ltg_det_comm_prop_pmts_total_floors = '${req.body.ListingData.totalFloors}', 
    ltg_det_comm_prop_pmts_plot_area = '${req.body.ListingData.plotArea}',
    ltg_det_comm_prop_pmts_plot_facing = '${req.body.ListingData.plotFacing}',
    ltg_det_comm_prop_pmts_corner_property = '${req.body.ListingData.isCornerProperty}',
    ltg_det_comm_prop_pmts_plot_dimensions = '${req.body.ListingData.plotDimensions}',
    ltg_det_comm_prop_pmts_uds = '${req.body.ListingData.uds}',
    ltg_det_comm_prop_pmts_tenanted = '${req.body.ListingData.isTenanted}',
    ltg_det_comm_prop_pmts_total_built_up_area = '${req.body.ListingData.totalBuiltUpArea}',
    ltg_det_comm_prop_pmts_property_on_floor = '${req.body.ListingData.propertyOnFloor}', 
    ltg_det_comm_prop_pmts_total_units = '${req.body.ListingData.totalUnits}', 
    ltg_det_comm_prop_pmts_transaction_type = '${req.body.ListingData.transactionType}', 
    ltg_det_comm_prop_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_comm_prop_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}', 
    ltg_det_comm_prop_pmts_total_phases = '${req.body.ListingData.totalPhases}', 
    ltg_det_comm_prop_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_comm_prop_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
    ltg_det_comm_prop_pmts_property_flooring = '${req.body.ListingData.propertyFlooring}', 
    ltg_det_comm_prop_amenities = '${req.body.ListingData.amenitiesAsString}', 
    ltg_det_comm_prop_about_project_builder = '${req.body.ListingData.projectBuilderDetails}', 
    ltg_det_comm_prop_property_video_url = '${req.body.ListingData.videoUrl}',  
    ltg_det_audit_user = '${req.body.auditUser}', 
    ltg_det_create_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}', 
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
`;

      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det successfully");
        res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
      } catch (error) {
        console.error("Error inserting into ltg_det:", error.stack);
        res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
      }
    }
    else if (req.body.listingType == "Villaments") {
      const q_det =
        `INSERT INTO ltg_det_villaments
SET
    ltg_det_mstRowID = '${lastInsertId}',
    ltg_det_villaments_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_villaments_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_villaments_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_villaments_desc = '${req.body.ListingData.content}', 
    ltg_det_villaments_location = '${req.body.ListingData.locationData.location}', 
    ltg_det_villaments_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_villaments_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_villaments_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_villaments_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_villaments_property_address_details = '${req.body.ListingData.propertyAddressDetails}', 
    ltg_det_villaments_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_villaments_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_villaments_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_villaments_pmts_bed_rooms = '${req.body.ListingData.selectedBedRooms}', 
    ltg_det_villaments_pmts_bath_rooms = '${req.body.ListingData.selectedBathRooms}', 
    ltg_det_villaments_pmts_car_parking = '${req.body.ListingData.selectedCarParking}', 
    ltg_det_villaments_pmts_year_built = '${req.body.ListingData.yearBuilt}', 
    ltg_det_villaments_pmts_land_uds_area = '${req.body.ListingData.landUDSArea}', 
    ltg_det_villaments_pmts_duplex = '${req.body.ListingData.selectedDuplex}', 
    ltg_det_villaments_pmts_no_of_open_sides = '${req.body.ListingData.noOfOpenSides}', 
    ltg_det_villaments_pmts_main_door_facing = '${req.body.ListingData.mainDoorFacing}', 
    ltg_det_villaments_pmts_corner_villament = '${req.body.ListingData.isCornerVillament}', 
    ltg_det_villaments_pmts_gated_community = '${req.body.ListingData.isInGatedCommunity}', 
    ltg_det_villaments_pmts_balconies = '${req.body.ListingData.balconies}', 
    ltg_det_villaments_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_villaments_pmts_over_looking = '${req.body.ListingData.overLooking}', 
    ltg_det_villaments_pmts_furnishing = '${req.body.ListingData.furnishing}', 
    ltg_det_villaments_pmts_property_flooring = '${req.body.ListingData.propertyFlooring}', 
    ltg_det_villaments_pmts_other_advantages = '${req.body.ListingData.advantagesAsString}',
    ltg_det_villaments_pmts_triplex = '${req.body.ListingData.selectedTriplex}',
    ltg_det_villaments_pmts_total_floors = '${req.body.ListingData.totalFloors}',
    ltg_det_villaments_pmts_property_facing = '${req.body.ListingData.propertyFacing}',
    ltg_det_villaments_pmts_total_villaments = '${req.body.ListingData.totalVillaments}',
    ltg_det_villaments_pmts_available_from = '${req.body.ListingData.availableFrom}', 
    ltg_det_villaments_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_villaments_pmts_transaction_type = '${req.body.ListingData.transactionType}', 
    ltg_det_villaments_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
    ltg_det_villaments_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}', 
    ltg_det_villaments_pmts_total_units = '${req.body.ListingData.totalUnits}', 
    ltg_det_villaments_pmts_total_phases = '${req.body.ListingData.totalPhases}', 
    ltg_det_villaments_amenities = '${req.body.ListingData.amenitiesAsString}', 
    ltg_det_villaments_about_project_builder = '${req.body.ListingData.projectBuilderDetails}', 
    ltg_det_villaments_property_video_url = '${req.body.ListingData.videoUrl}', 
    ltg_det_audit_user = '${req.body.auditUser}', 
    ltg_det_create_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}', 
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
`;

      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det successfully");
        res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
      } catch (error) {
        console.error("Error inserting into ltg_det:", error.stack);
        res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
      }
    }
    else if (req.body.listingType == "PentHouses") {
      const q_det =
        `INSERT INTO ltg_det_penthouses
SET
    ltg_det_mstRowID = '${lastInsertId}',
    ltg_det_penthouses_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_penthouses_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_penthouses_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_penthouses_desc = '${req.body.ListingData.content}', 
    ltg_det_penthouses_location = '${req.body.ListingData.locationData.location}', 
    ltg_det_penthouses_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_penthouses_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_penthouses_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_penthouses_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_penthouses_property_address_details = '${req.body.ListingData.propertyAddressDetails}', 
    ltg_det_penthouses_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_penthouses_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_penthouses_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_penthouses_pmts_bed_rooms = '${req.body.ListingData.selectedBedRooms}', 
    ltg_det_penthouses_pmts_bath_rooms = '${req.body.ListingData.selectedBathRooms}', 
    ltg_det_penthouses_pmts_car_parking = '${req.body.ListingData.selectedCarParking}', 
    ltg_det_penthouses_pmts_year_built = '${req.body.ListingData.yearBuilt}', 
    ltg_det_penthouses_pmts_duplex = '${req.body.ListingData.selectedDuplex}', 
    ltg_det_penthouses_pmts_triplex = '${req.body.ListingData.selectedTriplex}',
    ltg_det_penthouses_pmts_total_floors = '${req.body.ListingData.totalFloors}',
    ltg_det_penthouses_pmts_penthouse_on_floor = '${req.body.ListingData.penthouseOnFloor}',
    ltg_det_penthouses_pmts_private_terrace = '${req.body.ListingData.isPrivateTerrace}',
    ltg_det_penthouses_pmts_lifts_in_tower = '${req.body.ListingData.liftsInTower}',
    ltg_det_penthouses_pmts_total_blocks = '${req.body.ListingData.totalBlocks}',
    ltg_det_penthouses_pmts_total_towers_in_society = '${req.body.ListingData.totalTowersInSociety}',
    ltg_det_penthouses_pmts_total_flats_in_society = '${req.body.ListingData.totalFlatsInSociety}',
    ltg_det_penthouses_pmts_main_door_facing = '${req.body.ListingData.mainDoorFacing}', 
    ltg_det_penthouses_pmts_gated_community = '${req.body.ListingData.isInGatedCommunity}', 
    ltg_det_penthouses_pmts_corner_penthouse = '${req.body.ListingData.isCornerPenthouse}', 
    ltg_det_penthouses_pmts_balconies = '${req.body.ListingData.balconies}', 
    ltg_det_penthouses_pmts_furnishing = '${req.body.ListingData.furnishing}', 
    ltg_det_penthouses_pmts_over_looking = '${req.body.ListingData.overLooking}', 
    ltg_det_penthouses_pmts_transaction_type = '${req.body.ListingData.transactionType}', 
    ltg_det_penthouses_pmts_property_flooring = '${req.body.ListingData.propertyFlooring}', 
    ltg_det_penthouses_pmts_other_advantages = '${req.body.ListingData.advantagesAsString}', 
    ltg_det_penthouses_pmts_no_of_open_sides = '${req.body.ListingData.noOfOpenSides}', 
    ltg_det_penthouses_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_penthouses_pmts_available_form = '${req.body.ListingData.availableFrom}', 
    ltg_det_penthouses_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}', 
    ltg_det_penthouses_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_penthouses_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
    ltg_det_penthouses_pmts_total_phases = '${req.body.ListingData.totalPhases}', 
    ltg_det_penthouses_pmts_total_units = '${req.body.ListingData.totalUnits}', 
    ltg_det_penthouses_amenities = '${req.body.ListingData.amenitiesAsString}', 
    ltg_det_penthouses_about_project_builder = '${req.body.ListingData.projectBuilderDetails}', 
    ltg_det_penthouses_property_video_url = '${req.body.ListingData.videoUrl}', 
    ltg_det_audit_user = '${req.body.auditUser}', 
    ltg_det_create_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}', 
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
`;

      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det successfully");
        res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
      } catch (error) {
        console.error("Error inserting into ltg_det:", error.stack);
        res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
      }
    }
  } catch (error) {
    console.error("Error inserting listing:", error.stack);
    res.status(500).json({ message: "Error inserting listing", status: "error" });
  }

};

// update List
const updateListItem = async (req, res) => {
  const listingID = req.params.listingID;
  const customLabels = JSON.stringify(req.body.CustomLabel);

  if (!req.body || !req.body.ListingData) {
    console.error("ListingData is not provided.");
    return res.status(400).json({ error: "ListingData is required." });
  }

  const q =
    `UPDATE ltg_mst 
    SET
      ltg_title = '${req.body.title}',
      propertyUrl = '${req.body.propertyUrl}',
      ltg_projectName = '${req.body.projectName}',
      ltg_owner = '${req.body.selectedOwner}',
      ltg_type = '${req.body.listingType}',
      ltg_mark_as_featured = '${req.body.featured}',
      ltg_regions = '${req.body.selectedRegions}',
      ltg_categories = '${req.body.selectedCategories}',
      ltg_labels = '${customLabels}',
      ltg_audit_user = '${req.body.auditUser}',
      ltg_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
    WHERE RowID = '${listingID}'`;

  try {
    await db.query(q);
    if (req.body.listingType == "Apartments" || req.body.listingType == "Villas") {
      const q_det =
        `UPDATE ltg_det 
        SET
          ltg_det_sale_price = '${req.body.ListingData.salePrice}',
          ltg_det_suffix_price = '${req.body.ListingData.suffixPrice}',
          ltg_det_call_for_price = '${req.body.ListingData.callForPrice}',
          ltg_det_desc = '${req.body.ListingData.content}',
          ltg_det_location = '${req.body.ListingData.locationData.location}',
          ltg_det_address = '${req.body.ListingData.locationData.address}',
          ltg_det_postal_code = '${req.body.ListingData.locationData.postalCode}',
          ltg_det_latitude = '${req.body.ListingData.locationData.latitude}',
          ltg_det_longitude = '${req.body.ListingData.locationData.longitude}',
          ltg_det_property_address_details = '${req.body.ListingData.propertyAddressDetails}',
          ltg_det_pmts_area_dts = '${req.body.ListingData.areaDetails}',
          ltg_det_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}',
          ltg_det_pmts_status = '${req.body.ListingData.selectedStatus}',
          ltg_det_pmts_bed_rom = '${req.body.ListingData.selectedBedRooms}',
          ltg_det_pmts_bth_rom = '${req.body.ListingData.selectedBathRooms}',
          ltg_det_pmts_car_park = '${req.body.ListingData.selectedCarParking}',
          ltg_det_pmts_year_build = '${req.body.ListingData.yearBuilt}',
          ltg_det_plot_dimensions = '${req.body.ListingData.plotDimensions}',
          ltg_det_open_sides = '${req.body.ListingData.noOfOpenSides}',
          ltg_det_corner_villa = '${req.body.ListingData.isCornerVilla}',
          ltg_det_plot_area = '${req.body.ListingData.plotArea}',
          ltg_det_gated_community = '${req.body.ListingData.isInGatedCommunity}',
          ltg_det_over_looking = '${req.body.ListingData.overLooking}',
          ltg_det_totl_project_extent = '${req.body.ListingData.totalProjectExtent}',
          ltg_det_pmts_total_flrs = '${req.body.ListingData.totalFloors}',
          ltg_det_pmts_flat_on_flr = '${req.body.ListingData.flatOnFloor}',
          ltg_det_pmts_lfts_in_tower = '${req.body.ListingData.liftsInTheTower}',
          ltg_det_pmts_main_dor_facing = '${req.body.ListingData.mainDoorFacing}',
          ltg_det_pmts_property_flrg = '${req.body.ListingData.propertyFlooring}',
          ltg_det_pmts_balconies = '${req.body.ListingData.balconies}',
          ltg_det_pmts_totalFlatsInSociety = '${req.body.ListingData.totalFlatsInSociety}',
          ltg_det_pmts_duplex = '${req.body.ListingData.isDuplex}',
          ltg_det_pmts_triplex = '${req.body.ListingData.isTriplex}',
          ltg_det_pmts_plot_facing = '${req.body.ListingData.plotFacing}',
          ltg_det_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}',
          ltg_det_pmts_furnishing = '${req.body.ListingData.furnishing}',
          ltg_det_pmts_stamp_duty = '${req.body.ListingData.stampDutyAndRegistrationCharges}',
          ltg_det_pmts_tproject_evnt = '${req.body.ListingData.totalProjectExtent}',
          ltg_det_pmts_totl_block = '${req.body.ListingData.totalBlocks}',
          ltg_det_pmts_transaction_typ = '${req.body.ListingData.transactionType}',
          ltg_det_pmts_total_towrs = '${req.body.ListingData.totalTowers}',
          ltg_det_pmts_total_phases = '${req.body.ListingData.totalPhases}',
          ltg_det_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}',
          ltg_det_pmts_totalunits = '${req.body.ListingData.totalUnits}',
          ltg_det_pmts_other_advtages = '${req.body.ListingData.advantagesAsString}',
          ltg_det_about_project_buder = '${req.body.ListingData.projectBuilderDetails}',
          ltg_det_amenities = '${req.body.ListingData.amenitiesAsString}',
          ltg_det_property_video_url = '${req.body.ListingData.videoUrl}',
          ltg_det_available_from = '${req.body.ListingData.availableFrom}',
          ltg_det_audit_user = '${req.body.auditUser}',
          ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
        WHERE ltg_det_mstRowID = '${listingID}'`;

      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det successfully");
        res.status(200).json({ message: "Listing updated successfully", status: "SUCCESS", RowID: listingID });
      } catch (error) {
        console.error("Error updating into ltg_det:", error.stack);
        res.status(500).json({ error: "Error updating into ltg_det", status: "error" });
      }
    } else if (req.body.listingType == "Plots") {
      const q_det =
        `UPDATE ltg_det_plots 
        SET
            ltg_det_plot_sale_price = '${req.body.ListingData.salePrice}', 
            ltg_det_plot_suffix_price = '${req.body.ListingData.suffixPrice}',
            ltg_det_plot_call_for_price = '${req.body.ListingData.callForPrice}',
            ltg_det_plot_desc = '${req.body.ListingData.content}', 
            ltg_det_plot_location = '${req.body.ListingData.locationData.location}', 
            ltg_det_plot_address = '${req.body.ListingData.locationData.address}', 
            ltg_det_plot_postal_code = '${req.body.ListingData.locationData.postalCode}',
            ltg_det_plot_latitude = '${req.body.ListingData.locationData.latitude}', 
            ltg_det_plot_longitude = '${req.body.ListingData.locationData.longitude}',
            ltg_det_plot_property_address_details = '${req.body.ListingData.propertyAddressDetails}',
            ltg_det_plot_pmts_area_dts = '${req.body.ListingData.areaDetails}',
            ltg_det_plot_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}',
            ltg_det_plot_pmts_status = '${req.body.ListingData.selectedStatus}',
            ltg_det_plot_pmts_plot_dimensions = '${req.body.ListingData.plotDimensions}',
            ltg_det_plot_pmts_floors_allowed_for_construction = '${req.body.ListingData.floorsAllowedForConstruction}',
            ltg_det_plot_pmts_no_of_open_sides = '${req.body.ListingData.noOfOpenSides}',
            ltg_det_plot_pmts_plot_facing = '${req.body.ListingData.plotFacing}',
            ltg_det_plot_pmts_corner_plot = '${req.body.ListingData.cornerPlot}',
            ltg_det_plot_pmts_gated_community = '${req.body.ListingData.isInGatedCommunity}',
            ltg_det_plot_pmts_boundary_wall_made = '${req.body.ListingData.boundaryWallMade}',
            ltg_det_plot_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}',
            ltg_det_plot_pmts_transaction_type = '${req.body.ListingData.transactionType}',
            ltg_det_plot_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}',
            ltg_det_plot_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}',
            ltg_det_plot_pmts_plot_approval_authority = '${req.body.ListingData.plotApprovalAuthority}',
            ltg_det_plot_pmts_year_built = '${req.body.ListingData.yearBuilt}',
            ltg_det_plot_pmts_total_units = '${req.body.ListingData.totalUnits}',
            ltg_det_plot_pmts_total_phases = '${req.body.ListingData.totalPhases}',
            ltg_det_plot_amenities = '${req.body.ListingData.amenitiesAsString}',
            ltg_det_plot_about_project_builder = '${req.body.ListingData.projectBuilderDetails}',
            ltg_det_plot_property_video_url = '${req.body.ListingData.videoUrl}',
            ltg_det_audit_user = '${req.body.auditUser}',
            ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
			WHERE ltg_det_mstRowID = '${listingID}'`;
      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det_plot successfully");
        res.status(200).json({ message: "Listing updated successfully", status: "SUCCESS", RowID: listingID });
      } catch (error) {
        console.error("Error updating into ltg_det_plot:", error.stack);
        res.status(500).json({ error: "Error updating into ltg_det_plot", status: "error" });
      }
    }

    else if (req.body.listingType == "RowHouses") {
      const q_det =
        `UPDATE ltg_det_row_houses
SET
    ltg_det_row_house_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_row_house_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_row_house_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_row_house_desc = '${req.body.ListingData.content}', 
    ltg_det_row_house_location = '${req.body.ListingData.locationData.location}', 
    ltg_det_row_house_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_row_house_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_row_house_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_row_house_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_row_house_property_address_details = '${req.body.ListingData.propertyAddressDetails}', 
    ltg_det_row_house_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_row_house_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_row_house_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_row_house_pmts_bed_rooms = '${req.body.ListingData.selectedBedRooms}', 
    ltg_det_row_house_pmts_bath_rooms = '${req.body.ListingData.selectedBathRooms}', 
    ltg_det_row_house_pmts_car_parking = '${req.body.ListingData.selectedCarParking}', 
    ltg_det_row_house_pmts_year_built = '${req.body.ListingData.yearBuilt}', 
    ltg_det_row_house_pmts_plot_dimensions = '${req.body.ListingData.plotDimensions}', 
    ltg_det_row_house_pmts_land_uds_area = '${req.body.ListingData.landUDSArea}', 
    ltg_det_row_house_pmts_over_looking = '${req.body.ListingData.overLooking}', 
    ltg_det_row_house_pmts_main_door_facing = '${req.body.ListingData.mainDoorFacing}', 
    ltg_det_row_house_pmts_corner_rowhouse = '${req.body.ListingData.isCornerRowhouse}', 
    ltg_det_row_house_pmts_gated_community = '${req.body.ListingData.isInGatedCommunity}', 
    ltg_det_row_house_pmts_balconies = '${req.body.ListingData.balconies}', 
    ltg_det_row_house_pmts_duplex = '${req.body.ListingData.isDuplex}',
    ltg_det_row_house_pmts_triplex = '${req.body.ListingData.isTriplex}',
    ltg_det_row_house_pmts_total_floors = '${req.body.ListingData.totalFloors}',
    ltg_det_row_house_pmts_property_facing = '${req.body.ListingData.propertyFacing}', 
    ltg_det_row_house_pmts_other_advantages = '${req.body.ListingData.advantagesAsString}', 
    ltg_det_row_house_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_row_house_pmts_furnishing = '${req.body.ListingData.furnishing}', 
    ltg_det_row_house_pmts_property_flooring = '${req.body.ListingData.propertyFlooring}', 
    ltg_det_row_house_pmts_no_of_open_sides = '${req.body.ListingData.noOfOpenSides}', 
    ltg_det_row_house_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_row_house_pmts_available_from = '${req.body.ListingData.availableFrom}', 
    ltg_det_row_house_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
    ltg_det_row_house_pmts_transaction_type = '${req.body.ListingData.transactionType}', 
    ltg_det_row_house_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}', 
    ltg_det_row_house_pmts_total_units = '${req.body.ListingData.totalUnits}', 
    ltg_det_row_house_pmts_total_phases = '${req.body.ListingData.totalPhases}', 
    ltg_det_row_house_amenities = '${req.body.ListingData.amenitiesAsString}', 
    ltg_det_row_house_about_project_builder = '${req.body.ListingData.projectBuilderDetails}', 
    ltg_det_row_house_property_video_url = '${req.body.ListingData.videoUrl}', 
    ltg_det_audit_user = '${req.body.auditUser}',  
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
	WHERE ltg_det_mstRowID = '${listingID}'`;

      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det_row_house successfully");
        res.status(200).json({ message: "Listing updated successfully", status: "SUCCESS", RowID: listingID });
      } catch (error) {
        console.error("Error updating into ltg_det_row_house:", error.stack);
        res.status(500).json({ error: "Error updating into ltg_det_row_house", status: "error" });
      }
    }
    else if (req.body.listingType == "CommercialProperties") {
      const q_det =
        `UPDATE ltg_det_commercial_properties
SET
    ltg_det_comm_prop_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_comm_prop_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_comm_prop_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_comm_prop_desc = '${req.body.ListingData.content}', 
    ltg_det_comm_prop_location = '${req.body.ListingData.locationData.location}', 
    ltg_det_comm_prop_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_comm_prop_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_comm_prop_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_comm_prop_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_comm_prop_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_comm_prop_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_comm_prop_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_comm_prop_pmts_year_built = '${req.body.ListingData.yearBuilt}', 
    ltg_det_comm_prop_pmts_balconies = '${req.body.ListingData.balconies}', 
    ltg_det_comm_prop_pmts_other_advantages = '${req.body.ListingData.advantagesAsString}', 
    ltg_det_comm_prop_pmts_furnishing = '${req.body.ListingData.furnishing}', 
    ltg_det_comm_prop_pmts_car_parking = '${req.body.ListingData.selectedCarParking}', 
    ltg_det_comm_prop_pmts_total_floors = '${req.body.ListingData.totalFloors}', 
    ltg_det_comm_prop_pmts_plot_area = '${req.body.ListingData.plotArea}',
    ltg_det_comm_prop_pmts_plot_facing = '${req.body.ListingData.plotFacing}',
    ltg_det_comm_prop_pmts_corner_property = '${req.body.ListingData.isCornerProperty}',
    ltg_det_comm_prop_pmts_plot_dimensions = '${req.body.ListingData.plotDimensions}',
    ltg_det_comm_prop_pmts_uds = '${req.body.ListingData.uds}',
    ltg_det_comm_prop_pmts_tenanted = '${req.body.ListingData.isTenanted}',
    ltg_det_comm_prop_pmts_total_built_up_area = '${req.body.ListingData.totalBuiltUpArea}',
    ltg_det_comm_prop_pmts_property_on_floor = '${req.body.ListingData.propertyOnFloor}', 
    ltg_det_comm_prop_pmts_total_units = '${req.body.ListingData.totalUnits}', 
    ltg_det_comm_prop_pmts_transaction_type = '${req.body.ListingData.transactionType}', 
    ltg_det_comm_prop_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_comm_prop_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}', 
    ltg_det_comm_prop_pmts_total_phases = '${req.body.ListingData.totalPhases}', 
    ltg_det_comm_prop_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_comm_prop_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
    ltg_det_comm_prop_pmts_property_flooring = '${req.body.ListingData.propertyFlooring}', 
    ltg_det_comm_prop_amenities = '${req.body.ListingData.amenitiesAsString}', 
    ltg_det_comm_prop_about_project_builder = '${req.body.ListingData.projectBuilderDetails}', 
    ltg_det_comm_prop_property_video_url = '${req.body.ListingData.videoUrl}',  
    ltg_det_audit_user = '${req.body.auditUser}',  
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
	WHERE ltg_det_mstRowID = '${listingID}'`;

      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det_comm_prop_property successfully");
        res.status(200).json({ message: "Listing updated successfully", status: "SUCCESS", RowID: listingID });
      } catch (error) {
        console.error("Error updating into ltg_det_comm_prop_property:", error.stack);
        res.status(500).json({ error: "Error updating into ltg_det_comm_prop_property", status: "error" });
      }
    }
    else if (req.body.listingType == "Villaments") {
      const q_det =
        `UPDATE ltg_det_villaments
SET 
    ltg_det_villaments_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_villaments_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_villaments_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_villaments_desc = '${req.body.ListingData.content}', 
    ltg_det_villaments_location = '${req.body.ListingData.locationData.location}', 
    ltg_det_villaments_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_villaments_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_villaments_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_villaments_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_villaments_property_address_details = '${req.body.ListingData.propertyAddressDetails}', 
    ltg_det_villaments_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_villaments_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_villaments_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_villaments_pmts_bed_rooms = '${req.body.ListingData.selectedBedRooms}', 
    ltg_det_villaments_pmts_bath_rooms = '${req.body.ListingData.selectedBathRooms}', 
    ltg_det_villaments_pmts_car_parking = '${req.body.ListingData.selectedCarParking}', 
    ltg_det_villaments_pmts_year_built = '${req.body.ListingData.yearBuilt}', 
    ltg_det_villaments_pmts_land_uds_area = '${req.body.ListingData.landUDSArea}', 
    ltg_det_villaments_pmts_duplex = '${req.body.ListingData.selectedDuplex}', 
    ltg_det_villaments_pmts_no_of_open_sides = '${req.body.ListingData.noOfOpenSides}', 
    ltg_det_villaments_pmts_main_door_facing = '${req.body.ListingData.mainDoorFacing}', 
    ltg_det_villaments_pmts_corner_villament = '${req.body.ListingData.isCornerVillament}', 
    ltg_det_villaments_pmts_gated_community = '${req.body.ListingData.isInGatedCommunity}', 
    ltg_det_villaments_pmts_balconies = '${req.body.ListingData.balconies}', 
    ltg_det_villaments_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_villaments_pmts_over_looking = '${req.body.ListingData.overLooking}', 
    ltg_det_villaments_pmts_furnishing = '${req.body.ListingData.furnishing}', 
    ltg_det_villaments_pmts_property_flooring = '${req.body.ListingData.propertyFlooring}', 
    ltg_det_villaments_pmts_other_advantages = '${req.body.ListingData.advantagesAsString}', 
    ltg_det_villaments_pmts_triplex = '${req.body.ListingData.selectedTriplex}',
    ltg_det_villaments_pmts_total_floors = '${req.body.ListingData.totalFloors}',
    ltg_det_villaments_pmts_property_facing = '${req.body.ListingData.propertyFacing}',
    ltg_det_villaments_pmts_total_villaments = '${req.body.ListingData.totalVillaments}',
    ltg_det_villaments_pmts_available_from = '${req.body.ListingData.availableFrom}', 
    ltg_det_villaments_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_villaments_pmts_transaction_type = '${req.body.ListingData.transactionType}', 
    ltg_det_villaments_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
    ltg_det_villaments_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}', 
    ltg_det_villaments_pmts_total_units = '${req.body.ListingData.totalUnits}', 
    ltg_det_villaments_pmts_total_phases = '${req.body.ListingData.totalPhases}', 
    ltg_det_villaments_amenities = '${req.body.ListingData.amenitiesAsString}', 
    ltg_det_villaments_about_project_builder = '${req.body.ListingData.projectBuilderDetails}', 
    ltg_det_villaments_property_video_url = '${req.body.ListingData.videoUrl}', 
    ltg_det_audit_user = '${req.body.auditUser}',
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
	WHERE ltg_det_mstRowID = '${listingID}'`;

      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det_villaments successfully");
        res.status(200).json({ message: "Listing updated successfully", status: "SUCCESS", RowID: listingID });
      } catch (error) {
        console.error("Error updating into ltg_det_villaments:", error.stack);
        res.status(500).json({ error: "Error updating into ltg_det_villaments", status: "error" });
      }
    }
    else if (req.body.listingType == "PentHouses") {
      const q_det =
        `UPDATE ltg_det_penthouses
SET
    ltg_det_penthouses_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_penthouses_suffix_price = '${req.body.ListingData.suffixPrice}', 
    ltg_det_penthouses_call_for_price = '${req.body.ListingData.callForPrice}',
    ltg_det_penthouses_desc = '${req.body.ListingData.content}', 
    ltg_det_penthouses_location = '${req.body.ListingData.locationData.location}', 
    ltg_det_penthouses_address = '${req.body.ListingData.locationData.address}', 
    ltg_det_penthouses_postal_code = '${req.body.ListingData.locationData.postalCode}', 
    ltg_det_penthouses_latitude = '${req.body.ListingData.locationData.latitude}', 
    ltg_det_penthouses_longitude = '${req.body.ListingData.locationData.longitude}', 
    ltg_det_penthouses_property_address_details = '${req.body.ListingData.propertyAddressDetails}', 
    ltg_det_penthouses_pmts_area_dts = '${req.body.ListingData.areaDetails}', 
    ltg_det_penthouses_pmts_rate_per_sq = '${req.body.ListingData.ratePerSqFt}', 
    ltg_det_penthouses_pmts_status = '${req.body.ListingData.selectedStatus}', 
    ltg_det_penthouses_pmts_bed_rooms = '${req.body.ListingData.selectedBedRooms}', 
    ltg_det_penthouses_pmts_bath_rooms = '${req.body.ListingData.selectedBathRooms}', 
    ltg_det_penthouses_pmts_car_parking = '${req.body.ListingData.selectedCarParking}', 
    ltg_det_penthouses_pmts_year_built = '${req.body.ListingData.yearBuilt}', 
    ltg_det_penthouses_pmts_duplex = '${req.body.ListingData.selectedDuplex}', 
    ltg_det_penthouses_pmts_triplex = '${req.body.ListingData.selectedTriplex}',
    ltg_det_penthouses_pmts_total_floors = '${req.body.ListingData.totalFloors}',
    ltg_det_penthouses_pmts_penthouse_on_floor = '${req.body.ListingData.penthouseOnFloor}',
    ltg_det_penthouses_pmts_private_terrace = '${req.body.ListingData.isPrivateTerrace}',
    ltg_det_penthouses_pmts_lifts_in_tower = '${req.body.ListingData.liftsInTower}',
    ltg_det_penthouses_pmts_total_blocks = '${req.body.ListingData.totalBlocks}',
    ltg_det_penthouses_pmts_total_towers_in_society = '${req.body.ListingData.totalTowersInSociety}',
    ltg_det_penthouses_pmts_total_flats_in_society = '${req.body.ListingData.totalFlatsInSociety}',
    ltg_det_penthouses_pmts_main_door_facing = '${req.body.ListingData.mainDoorFacing}', 
    ltg_det_penthouses_pmts_gated_community = '${req.body.ListingData.isInGatedCommunity}', 
    ltg_det_penthouses_pmts_corner_penthouse = '${req.body.ListingData.isCornerPenthouse}', 
    ltg_det_penthouses_pmts_balconies = '${req.body.ListingData.balconies}', 
    ltg_det_penthouses_pmts_furnishing = '${req.body.ListingData.furnishing}', 
    ltg_det_penthouses_pmts_over_looking = '${req.body.ListingData.overLooking}', 
    ltg_det_penthouses_pmts_transaction_type = '${req.body.ListingData.transactionType}', 
    ltg_det_penthouses_pmts_property_flooring = '${req.body.ListingData.propertyFlooring}', 
    ltg_det_penthouses_pmts_other_advantages = '${req.body.ListingData.advantagesAsString}', 
    ltg_det_penthouses_pmts_no_of_open_sides = '${req.body.ListingData.noOfOpenSides}', 
    ltg_det_penthouses_pmts_approaching_road_width = '${req.body.ListingData.approachingRoadWidth}', 
    ltg_det_penthouses_pmts_available_form = '${req.body.ListingData.availableFrom}', 
    ltg_det_penthouses_pmts_approval_authority = '${req.body.ListingData.approvalAuthority}', 
    ltg_det_penthouses_pmts_total_project_extent = '${req.body.ListingData.totalProjectExtent}', 
    ltg_det_penthouses_pmts_stamp_duty_registration_charges = '${req.body.ListingData.stampDutyAndRegistrationCharges}',
    ltg_det_penthouses_pmts_total_phases = '${req.body.ListingData.totalPhases}',
    ltg_det_penthouses_pmts_total_units = '${req.body.ListingData.totalUnits}',
    ltg_det_penthouses_amenities = '${req.body.ListingData.amenitiesAsString}',
    ltg_det_penthouses_about_project_builder = '${req.body.ListingData.projectBuilderDetails}',
    ltg_det_penthouses_property_video_url = '${req.body.ListingData.videoUrl}',
    ltg_det_audit_user = '${req.body.auditUser}',
    ltg_det_update_date = '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}'
	WHERE ltg_det_mstRowID = '${listingID}'`;

      try {
        const [results_det] = await db.query(q_det);
        console.log("Data inserted into ltg_det_penthouses successfully");
        res.status(200).json({ message: "Listing updated successfully", status: "SUCCESS", RowID: listingID });
      } catch (error) {
        console.error("Error updating into ltg_det_penthouses:", error.stack);
        res.status(500).json({ error: "Error updating into ltg_det_penthouses", status: "error" });
      }
    }
  } catch (error) {
    console.error("Error updating listing:", error.stack);
    res.status(500).json({ message: "Error updating listing", status: "error" });
  }
};

const getListItem = async (req, res) => {
  try {
    const mstQuery = `
      SELECT RowID, ltg_type
      FROM ltg_mst
      ORDER BY RowID DESC;
    `;
    const [mstResults] = await db.query(mstQuery);

    if (mstResults.length === 0) {
      return res.status(200).json({ message: 'No records found', status: 'success', data: [] });
    }

    const detailPromises = mstResults.map(async (record) => {
      const { RowID, ltg_type } = record;

      let detailsTable;
      switch (ltg_type) {
        case 'Plots':
          detailsTable = 'ltg_det_plots';
          break;
        case 'RowHouses':
          detailsTable = 'ltg_det_row_houses';
          break;
        case 'Villaments':
          detailsTable = 'ltg_det_villaments';
          break;
        case 'CommercialProperties':
          detailsTable = 'ltg_det_commercial_properties';
          break;
        case 'PentHouses':
          detailsTable = 'ltg_det_penthouses';
          break;
        case 'Apartment':
          detailsTable = 'ltg_det';
          break;
        default:
          detailsTable = 'ltg_det';
      }

      const detailQuery = `
        SELECT 
          mst.*, 
          det.*, 
          ref.file_name, 
          ref.attachment, 
          ref.type AS attachment_type
        FROM 
          ltg_mst mst
        JOIN 
          ${detailsTable} det ON mst.RowID = det.ltg_det_mstRowID
        LEFT JOIN 
          ltg_ref ref ON mst.RowID = ref.ltg_mstRowID
        WHERE 
          mst.RowID = ?;
      `;

      const [detailResults] = await db.query(detailQuery, [RowID]);

      if (detailResults.length > 0) {
        const detailResult = detailResults[0];
        const attachments = detailResults.map(item => ({
          file_name: item.file_name,
          attachment: item.attachment,
          type: item.attachment_type
        }));

        delete detailResult.file_name;
        delete detailResult.attachment;
        delete detailResult.attachment_type;
        detailResult.attachments = attachments;

        return detailResult;
      } else {
        return {};
      }
    });

    const detailedResults = await Promise.all(detailPromises);
    return res.status(200).json({ message: 'All listing records fetched successfully', status: 'success', data: detailedResults });
  } catch (error) {
    console.error('Error fetching all listing records:', error);
    return res.status(500).json({ message: 'Internal server error, Error fetching all listing records', status: 'error' });
  }
};

const checkPropertyExists = async (req, res) => {
  const { propertyUrl, title } = req.query;

  if (!propertyUrl && !title) {
    return res.status(400).json({
      message: "Either 'propertyUrl' or 'title' must be provided.",
      status: 'error'
    });
  }

  try {
    const checkQuery = `
      SELECT 1 
      FROM ltg_mst 
      WHERE propertyUrl = ? OR ltg_title = ? 
      LIMIT 1;
    `;
    const [results] = await db.query(checkQuery, [propertyUrl, title]);
    const exists = results.length > 0;

    return res.status(200).json({
      exists,
      message: exists ? 'Property exists' : 'Property does not exist',
      status: 'success'
    });
  } catch (error) {
    console.error('Error checking property existence:', error);
    return res.status(500).json({
      message: 'Internal server error, unable to check property existence',
      status: 'error'
    });
  }
};

const getListingbyType = async (req, res) => {
  const { type } = req.params;

  const baseQuery = `
    SELECT 
      ltg_mst.*, 
      detailsTable.*, 
      IFNULL(ltg_ref.file_names, '') AS file_names, 
      IFNULL(ltg_ref.attachments, '') AS attachments 
    FROM 
      ltg_mst 
    LEFT JOIN 
      detailsTable ON ltg_mst.RowID = detailsTable.ltg_det_mstRowID 
    LEFT JOIN 
      (SELECT 
           ltg_mstRowID, 
           GROUP_CONCAT(file_name) AS file_names, 
           GROUP_CONCAT(attachment) AS attachments 
       FROM 
           ltg_ref 
       GROUP BY 
           ltg_mstRowID) AS ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID 
    WHERE 
      ltg_mst.ltg_type = ? 
    ORDER BY 
      ltg_mst.ltg_create_date DESC;
  `;

  let query = baseQuery;
  let detailsTable = '';

  if (type === "Plots") {
    detailsTable = "ltg_det_plots";
  } else if (type === "RowHouses") {
    detailsTable = "ltg_det_row_houses";
  } else if (type === "Villaments") {
    detailsTable = "ltg_det_villaments";
  } else if (type === "CommercialProperties") {
    detailsTable = "ltg_det_commercial_properties";
  } else if (type === "PentHouses") {
    detailsTable = "ltg_det_penthouses";
  } else {
    detailsTable = "ltg_det";
  }

  query = query.replace(/detailsTable/g, detailsTable);

  try {
    const [results, fields] = await db.query(query, [type]);
    res.json({ data: results, message: "Properties fetched successfully", status: "success" });
  } catch (error) {
    console.error("Error fetching properties: " + error.stack);
    res.status(500).json({ message: "Error fetching properties", status: "error" });
  }
};

//
const getPropertyItemId = async (req, res) => {
  const propertyId = req.params.id;

  try {
    const mstQuery = `
      SELECT RowID, ltg_type
      FROM ltg_mst
      WHERE RowID = ?;
    `;
    const [mstResults] = await db.query(mstQuery, [propertyId]);

    if (mstResults.length === 0) {
      return res.status(404).json({ message: 'Property not found', status: 'error' });
    }

    const { RowID, ltg_type } = mstResults[0];

    let detailsTable;
    switch (ltg_type) {
      case 'Plots':
        detailsTable = 'ltg_det_plots';
        break;
      case 'RowHouses':
        detailsTable = 'ltg_det_row_houses';
        break;
      case 'Villaments':
        detailsTable = 'ltg_det_villaments';
        break;
      case 'CommercialProperties':
        detailsTable = 'ltg_det_commercial_properties';
        break;
      case 'PentHouses':
        detailsTable = 'ltg_det_penthouses';
        break;
      case 'Apartment':
        detailsTable = 'ltg_det';
        break;
      default:
        detailsTable = 'ltg_det';
    }

    const detailQuery = `
      SELECT 
          mst.*,
          det.*,
          ref_agg.file_names,
          ref_agg.attachments,
          ref_agg.attachment_types
      FROM 
          ltg_mst mst
      JOIN 
          ${detailsTable} det ON mst.RowID = det.ltg_det_mstRowID
      LEFT JOIN (
          SELECT 
              ltg_mstRowID,
              GROUP_CONCAT(file_name SEPARATOR ', ') AS file_names,
              GROUP_CONCAT(attachment SEPARATOR ', ') AS attachments,
              GROUP_CONCAT(type SEPARATOR ', ') AS attachment_types
          FROM 
              ltg_ref
          GROUP BY 
              ltg_mstRowID
      ) ref_agg ON mst.RowID = ref_agg.ltg_mstRowID
      WHERE 
          mst.RowID = ?;
    `;

    const [detailResults] = await db.query(detailQuery, [RowID]);

    if (detailResults.length > 0) {
      const detailResult = detailResults[0];

      if (detailResult.attachments) {
        const attachmentsArray = detailResult.attachments.split(', ');
        const attachmentTypesArray = detailResult.attachment_types.split(', ');
        detailResult.attachments = attachmentsArray.map((attachment, index) => ({
          file_name: detailResult.file_names.split(', ')[index],
          attachment: attachment,
          type: attachmentTypesArray[index]
        }));

        delete detailResult.attachment_types;
        delete detailResult.file_names;
      } else {
        detailResult.attachments = [];
      }

      return res.status(200).json({ message: 'Property fetched successfully', status: 'success', data: detailResult });
    } else {
      return res.status(404).json({ message: 'Property details not found', status: 'error' });
    }
  } catch (error) {
    console.error('Error fetching property details:', error);
    return res.status(500).json({ message: 'Internal server error, Error fetching property details', status: 'error' });
  }
};

const getListItemId = async (req, res) => {
  const { listingID } = req.params;

  try {
    const typeQuery = `
      SELECT ltg_type
      FROM ltg_mst
      WHERE RowID = ?;
    `;
    const [typeResults] = await db.query(typeQuery, [listingID]);

    if (typeResults.length === 0) {
      return res.status(404).json({ message: 'Table ID not found', status: 'error' });
    }

    const type = typeResults[0].ltg_type;
    let detailsTable;
    switch (type) {
      case 'Plots':
        detailsTable = 'ltg_det_plots';
        break;
      case 'RowHouses':
        detailsTable = 'ltg_det_row_houses';
        break;
      case 'Villaments':
        detailsTable = 'ltg_det_villaments';
        break;
      case 'CommercialProperties':
        detailsTable = 'ltg_det_commercial_properties';
        break;
      case 'PentHouses':
        detailsTable = 'ltg_det_penthouses';
        break;
      default:
        detailsTable = 'ltg_det';
    }

    const detailQuery = `
      SELECT
        ltg_mst.*,
        ltg_det.*,
        ltg_ref.file_names,
        ltg_ref.audit_user,
        ltg_ref.audit_date
      FROM
        ltg_mst
      LEFT JOIN
        ${detailsTable} AS ltg_det ON ltg_mst.RowID = ltg_det.ltg_det_mstRowID
      LEFT JOIN (
        SELECT
          ltg_mstRowID,
          GROUP_CONCAT(file_name ORDER BY file_name ASC SEPARATOR ', ') AS file_names,
          audit_user,
          MAX(audit_date) AS audit_date
        FROM
          asset_makers.ltg_ref
        GROUP BY
          ltg_mstRowID, audit_user
      ) AS ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID
      WHERE
        ltg_mst.RowID = ?;
    `;
    const [detailResults] = await db.query(detailQuery, [listingID]);

    if (detailResults.length > 0) {
      res.json({ data: detailResults, message: "Table By ID fetched successfully", status: "success" });
    } else {
      res.status(404).json({ message: 'Table ID not found', status: 'error' });
    }
  } catch (error) {
    console.error("Error fetching Table ID: " + error.stack);
    res.status(500).json({ message: "Error fetching Table ID", status: "error" });
  }
};

const getAllImages = async (req, res) => {

  const query = `SELECT * FROM ltg_ref`;

  try {
    const [results] = await db.query(query);

    if (results.length === 0) {
      res.status(404).json({ message: "No properties found", status: "not_found" });
      return;
    }
    res.json({ data: results, message: "Properties Image fetched successfully", status: "success" });
  } catch (error) {
    console.error("Error fetching properties:", error.stack);
    res.status(500).json({ message: "Error fetching properties", status: "error" });
  }
};

const getsinglePageImg = async (req, res) => {
  const { propertyUrl } = req.params;

  try {
    const fetchRowIDQuery = `
      SELECT RowID FROM ltg_mst WHERE propertyUrl = ?
    `;
    const [rowIDResults] = await db.query(fetchRowIDQuery, [propertyUrl]);

    if (rowIDResults.length === 0) {
      return res.status(404).json({
        message: "Property URL not found",
        status: "not_found"
      });
    }

    console.log("rowIDResults", rowIDResults);
    const { RowID: listingID } = rowIDResults[0];
    const fetchImagesQuery = `
      SELECT * FROM ltg_ref WHERE ltg_mstRowID = ?
    `;
    const [imageResults] = await db.query(fetchImagesQuery, [listingID]);

    if (imageResults.length === 0) {
      return res.status(404).json({
        message: "No properties found",
        status: "not_found"
      });
    }

    res.json({
      data: imageResults,
      message: "Properties Image fetched successfully",
      status: "success"
    });
  } catch (error) {
    console.error("Error fetching properties:", error.stack);
    res.status(500).json({
      message: "Error fetching properties",
      status: "error"
    });
  }
};

const deleteImagesByRowID = async (req, res) => {
  const { RowID } = req.params;
  const findQuery = `
    SELECT file_name FROM ltg_ref WHERE RowID = ?
  `;
  const deleteQuery = `
    DELETE FROM ltg_ref WHERE RowID = ?
  `;

  try {
    const [findResults] = await db.query(findQuery, [RowID]);
    if (findResults.length === 0) {
      res.status(404).json({ message: "No image found to delete", status: "not_found" });
      return;
    }

    const fileName = findResults[0].file_name;
    const [deleteResults] = await db.query(deleteQuery, [RowID]);

    if (deleteResults.affectedRows === 0) {
      res.status(404).json({ message: "No image found to delete", status: "not_found" });
      return;
    }

    res.json({ message: `Image deleted successfully for RowID ${RowID}`, status: "success" });
  } catch (error) {
    console.error("Error deleting image:", error.stack);
    res.status(500).json({ message: "Error deleting image", status: "error" });
  }
};

const deleteBrochureFile = async (req, res) => {
  const { RowID } = req.params;
  const findQuery = `
    SELECT file_name FROM ltg_ref WHERE RowID = ?
  `;
  const deleteQuery = `
    DELETE FROM ltg_ref WHERE RowID = ? OR (file_name = ? OR file_name = ?)
  `;

  try {
    const [findResults] = await db.query(findQuery, [RowID]);
    if (findResults.length === 0) {
      res.status(404).json({ message: "No brochure found to delete", status: "not_found" });
      return;
    }

    const fileName = findResults[0].file_name;
    const thumbnailFileName = fileName.replace('.pdf', '-thumbnail.png');
    const [deleteResults] = await db.query(deleteQuery, [RowID, fileName, thumbnailFileName]);

    if (deleteResults.affectedRows === 0) {
      res.status(404).json({ message: "No brochure found to delete", status: "not_found" });
      return;
    }

    res.json({ message: `File and thumbnail deleted successfully for RowID ${RowID}`, status: "success" });
  } catch (error) {
    console.error("Error deleting brochure:", error.stack);
    res.status(500).json({ message: "Error deleting brochure", status: "error" });
  }
};


const deleteListItem = async (req, res) => {
  const listingID = req.params.listingID;
  const { type } = req.body;

  let connection;

  try {
    let detailsTable;
    switch (type) {
      case 'Plots':
        detailsTable = 'ltg_det_plots';
        break;
      case 'RowHouses':
        detailsTable = 'ltg_det_row_houses';
        break;
      case 'Villaments':
        detailsTable = 'ltg_det_villaments';
        break;
      case 'CommercialProperties':
        detailsTable = 'ltg_det_commercial_properties';
        break;
      case 'PentHouses':
        detailsTable = 'ltg_det_penthouses';
        break;
      default:
        detailsTable = 'ltg_det';
    }

    connection = await db.getConnection();
    await connection.beginTransaction();

    const deleteDetailQuery = `
      DELETE FROM ${detailsTable}
      WHERE ltg_det_mstRowID = ?;
    `;
    await connection.query(deleteDetailQuery, [listingID]);

    const deleteMasterQuery = `
      DELETE FROM ltg_mst
      WHERE RowID = ?;
    `;
    await connection.query(deleteMasterQuery, [listingID]);

    const deleteRefQuery = `
      DELETE FROM ltg_ref
      WHERE ltg_mstRowID = ?;
    `;
    await connection.query(deleteRefQuery, [listingID]);
    await connection.commit();

    res.status(200).json({ message: 'Property deleted successfully', status: 'success' });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Error deleting property: " + error.stack);
    res.status(500).json({ message: "Error deleting property", status: "error" });
  } finally {
    if (connection) connection.release();
  }
};

const uploadListItem = async (req, res) => {
  console.log("uploadListItem function started");
  console.log("Attempting to get database connection...");
  const connection = await db.getConnection();
  console.log("Database connection established");

  try {
    const { listingID } = req.params;
    const { type, auditUser } = req.body;
    const files = req.files;

    console.log(`Received listingID: ${listingID}`);
    console.log(`Received type: ${type}`);
    console.log(`Received auditUser: ${auditUser}`);
    console.log(`Received ${files ? files.length : 0} files`);

    if (!files || files.length === 0) {
      console.log("No files uploaded");
      return res.status(400).json({ status: 'FAILURE', message: 'No files uploaded or watermarking failed.' });
    }

    if (!listingID || !type || !auditUser) {
      console.log("Missing required fields: listingID, type, or auditUser");
      return res.status(400).json({ status: 'FAILURE', message: 'Missing required fields' });
    }

    await connection.beginTransaction();
    console.log("Transaction started");

    const insertQuery = `
      INSERT INTO ltg_ref (ltg_mstRowID, file_name, attachment, type, audit_user, audit_date)
      VALUES ?
    `;

    const values = files.map(file => {
      const originalName = file.originalname;
      const url = `\\images\\${path.basename(file.path)}`;
      const formattedDate = new Date().toISOString().slice(0, 10);

      console.log(`Preparing to insert file: ${originalName}, URL: ${url}`);

      return [listingID, originalName, url, type, auditUser, formattedDate];
    });

    console.log("Prepared values for insertion:", values);
    await connection.query(insertQuery, [values]);
    console.log("Files inserted into the database");
    await connection.commit();
    console.log("Transaction committed");
    res.status(200).json({
      message: 'Files uploaded successfully',
      status: 'SUCCESS',
      listingID: listingID,
      type: type,
      auditUser: auditUser
    });
    console.log("Response sent: Files uploaded successfully");

  } catch (error) {
    console.error("Error during file upload:", error.message);

    try {
      await connection.rollback();
      console.log("Transaction rolled back");
    } catch (rollbackError) {
      console.error("Error during rollback:", rollbackError.message);
    }

    res.status(500).json({ status: 'FAILURE', message: 'Error uploading files', error: error.message });
  } finally {
    connection.release();
    console.log("Database connection released");
  }
};


// Delete Images
const deleteListImage = (req, res) => {
  const listingID = req.params.listingID;
  const deleteQuery = "DELETE FROM listingimages WHERE id = ?";

  db.query(deleteQuery, [listingID], (err, results) => {
    if (err) {
      console.error("Error deleting images from database:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send("Images deleted successfully");
  });
};

// Update List Image
const updateListImage = (req, res) => {
  const imageId = req.params.listingID;
  const updateQuery = "UPDATE listingimages SET `imageUrl` = ? WHERE id = ?";
  const imageUrl = `${process.env.apiUrl}${req.file.path.replace(
    "public",
    ""
  )}`;

  db.query(updateQuery, [imageUrl, imageId], (err, results) => {
    if (err) {
      console.error("Error updating image in database:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send("Image updated successfully");
  });
};

// Get SingleList Item by Property URL
const getListItemByPropertyUrl = async (req, res) => {
  console.log("url started");
  const { propertyUrl } = req.params;
  console.log("Received propertyUrl:", propertyUrl);

  try {
    const typeQuery = `
      SELECT ltg_type, RowID
      FROM ltg_mst
      WHERE propertyurl = ?;
    `;
    const [typeResults] = await db.query(typeQuery, [propertyUrl]);

    if (typeResults.length === 0) {
      return res.status(404).json({ message: 'Property URL not found', status: 'error' });
    }

    const { ltg_type: type, RowID: listingID } = typeResults[0];
    let detailsTable;
    switch (type) {
      case 'Plots':
        detailsTable = 'ltg_det_plots';
        break;
      case 'RowHouses':
        detailsTable = 'ltg_det_row_houses';
        break;
      case 'Villaments':
        detailsTable = 'ltg_det_villaments';
        break;
      case 'CommercialProperties':
        detailsTable = 'ltg_det_commercial_properties';
        break;
      case 'PentHouses':
        detailsTable = 'ltg_det_penthouses';
        break;
      default:
        detailsTable = 'ltg_det';
    }

    const detailQuery = `
      SELECT
        ltg_mst.*,
        ltg_det.*,
        ltg_ref.file_names,
        ltg_ref.audit_user,
        ltg_ref.audit_date
      FROM
        ltg_mst
      LEFT JOIN
        ${detailsTable} AS ltg_det ON ltg_mst.RowID = ltg_det.ltg_det_mstRowID
      LEFT JOIN (
        SELECT
          ltg_mstRowID,
          GROUP_CONCAT(file_name ORDER BY file_name ASC SEPARATOR ', ') AS file_names,
          audit_user,
          MAX(audit_date) AS audit_date
        FROM
          asset_makers.ltg_ref
        GROUP BY
          ltg_mstRowID, audit_user
      ) AS ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID
      WHERE
        ltg_mst.RowID = ?;
    `;
    const [detailResults] = await db.query(detailQuery, [listingID]);

    if (detailResults.length > 0) {
      res.json({ data: detailResults, message: "Data fetched successfully", status: "success" });
    } else {
      res.status(404).json({ message: 'Details not found for the provided Property URL', status: 'error' });
    }
  } catch (error) {
    console.error("Error fetching data by Property URL: " + error.stack);
    res.status(500).json({ message: "Error fetching data", status: "error" });
  }
};

module.exports = {
  addListings,
  getListItem,
  checkPropertyExists,
  getListingbyType,
  getListItemByPropertyUrl,
  updateListItem,
  deleteListItem,
  uploadListItem,
  deleteListImage,
  updateListImage,
  getListItemId,
  getPropertyItemId,
  getAllImages,
  getsinglePageImg,
  deleteImagesByRowID,
  deleteBrochureFile,
};
