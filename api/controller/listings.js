const db = require("../connect");
const moment = require("moment");


const addListings = async (req, res) => {

  // const customLabels = JSON.stringify(req.body.CustomLabel);

  const q =
    `INSERT INTO ltg_mst
    (ltg_title, ltg_owner, ltg_type, ltg_mark_as_featured, ltg_regions, ltg_categories, ltg_labels, ltg_audit_user, ltg_create_date, ltg_update_date)
    VALUES
    ('${req.body.title}', 
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
    // Insert Data ltg_det
    if (req.body.listingType == "Apartments" || req.body.listingType == "Villas") {
      const q_det =
        `INSERT INTO ltg_det
	   SET
    ltg_det_mstRowID = '${lastInsertId}', 
    ltg_det_sale_price = '${req.body.ListingData.salePrice}', 
    ltg_det_suffix_price = '${req.body.ListingData.suffixPrice}', 
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

  const q =
    `UPDATE ltg_mst 
    SET
      ltg_title = '${req.body.title}',
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

    // Update Data ltg_det based on listingType
    if (req.body.listingType == "Apartments" || req.body.listingType == "Villas") {
      const q_det =
        `UPDATE ltg_det 
        SET
          ltg_det_sale_price = '${req.body.ListingData.salePrice}',
          ltg_det_suffix_price = '${req.body.ListingData.suffixPrice}',
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

  const query = `
    SELECT * FROM ltg_mst
    LEFT JOIN ltg_det ON ltg_mst.RowID = ltg_det.ltg_det_mstRowID
    LEFT JOIN ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID
  `;

  try {
    const [results, fields] = await db.query(query);
    res.json({ data: results, message: "Properties fetched successfully", status: "success" });
  } catch (error) {
    console.error("Error fetching properties: " + error.stack);
    res.status(500).json({ message: "Error fetching properties", status: "error" });
  }
};


// fetch All Tables
const getTableData = async (req, res) => {
  try {
    // Fetch all records from ltg_mst
    const mstQuery = `
      SELECT RowID, ltg_type
      FROM ltg_mst;
    `;
    const [mstResults] = await db.query(mstQuery);

    if (mstResults.length === 0) {
      return res.status(200).json({ message: 'No records found', status: 'success', data: [] });
    }

    const detailPromises = mstResults.map(async (record) => {
      const { RowID, ltg_type } = record;

      // Determine the details table based on type
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
        default:
          detailsTable = 'ltg_det'; // Default to the generic table if type is not matched
      }

      // Construct the query to fetch detailed data
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
      const [detailResults] = await db.query(detailQuery, [RowID]);
      // console.log('detailQuery:', detailQuery, 'RowID:', RowID);
      return detailResults[0];
    });

    // Await all detail promises
    const detailedRecords = await Promise.all(detailPromises);

    res.json({ data: detailedRecords, message: "All tables fetched successfully", status: "success" });
  } catch (error) {
    console.error("Error fetching all tables: " + error.stack);
    res.status(500).json({ message: "Error fetching all tables", status: "error" });
  }
};


// get Property by type
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

  // Replace the placeholder with the actual table name
  query = query.replace(/detailsTable/g, detailsTable);
  // console.log(query);

  try {
    const [results, fields] = await db.query(query, [type]);
    res.json({ data: results, message: "Properties fetched successfully", status: "success" });
  } catch (error) {
    console.error("Error fetching properties: " + error.stack);
    res.status(500).json({ message: "Error fetching properties", status: "error" });
  }
};

// fetch Table By Id
const getTableById = async (req, res) => {
  const { listingID } = req.params;

  try {
    // Step 1: Fetch the ltg_type from ltg_mst
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

    // Determine the details table based on type
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
        detailsTable = 'ltg_det'; // Default to the generic table if type is not matched
    }

    // Step 2: Construct the query to fetch detailed data
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



// get SingleLsit Item
const getListItemId = async (req, res) => {
  const { listingID, type } = req.params;
  // console.log(type, listingID);
  let query = '';

  if (type === "Plots") {
    query = `
      SELECT * FROM ltg_mst
      LEFT JOIN ltg_det_plots ON ltg_mst.RowID = ltg_det_plots.ltg_det_mstRowID
      WHERE ltg_mst.RowID = ?`;
  } else if (type === "RowHouses") {
    query = `
      SELECT * FROM ltg_mst
      LEFT JOIN ltg_det_row_houses ON ltg_mst.RowID = ltg_det_row_houses.ltg_det_mstRowID
      WHERE ltg_mst.RowID = ?`;
  } else if (type === "CommercialProperties") {
    query = `
      SELECT * FROM ltg_mst
      LEFT JOIN ltg_det_commercial_properties ON ltg_mst.RowID = ltg_det_commercial_properties.ltg_det_mstRowID
      WHERE ltg_mst.RowID = ?`;
  } else if (type === "Villaments") {
    query = `
      SELECT * FROM ltg_mst
      LEFT JOIN ltg_det_villaments ON ltg_mst.RowID = ltg_det_villaments.ltg_det_mstRowID
      WHERE ltg_mst.RowID = ?`;
  } else if (type === "PentHouses") {
    query = `
      SELECT * FROM ltg_mst
      LEFT JOIN ltg_det_penthouses ON ltg_mst.RowID = ltg_det_penthouses.ltg_det_mstRowID
      WHERE ltg_mst.RowID = ?`;
  } else {
    query = `
      SELECT * FROM ltg_mst
      LEFT JOIN ltg_det ON ltg_mst.RowID = ltg_det.ltg_det_mstRowID
      WHERE ltg_mst.RowID = ?`;
  }

  try {
    const [results, fields] = await db.query(query, [listingID]);
    if (results.length > 0) {
      res.json({ data: results, message: "Properties fetched successfully", status: "success" });
    } else {
      res.status(404).json({ message: 'Listing not found' });
    }
  } catch (error) {
    console.error("Error fetching properties: " + error.stack);
    res.status(500).json({ message: "Error fetching properties", status: "error" });
  }
};
// get Single page img 

const getsinglePageImg = async (req, res) => {
  const { listingID } = req.params;

  const query = `
    SELECT * FROM ltg_ref WHERE ltg_mstRowID = ?
  `;

  try {
    const [results] = await db.query(query, [listingID]);

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

const deleteImagesByRowID = async (req, res) => {
  const { RowID } = req.params;

  // Query to find the file_name for the given RowID
  const findQuery = `
    SELECT file_name FROM ltg_ref WHERE RowID = ?
  `;

  // Query to delete the image for the given RowID
  const deleteQuery = `
    DELETE FROM ltg_ref WHERE RowID = ?
  `;

  try {
    // Find the file_name for the given RowID
    const [findResults] = await db.query(findQuery, [RowID]);
    if (findResults.length === 0) {
      res.status(404).json({ message: "No image found to delete", status: "not_found" });
      return;
    }

    const fileName = findResults[0].file_name;

    // Delete the image
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


/* delete image by RowID */
const deleteBrochureFile = async (req, res) => {
  const { RowID } = req.params;

  // Query to find the file_name for the given RowID
  const findQuery = `
    SELECT file_name FROM ltg_ref WHERE RowID = ?
  `;

  // Query to delete both the PDF and its corresponding thumbnail
  const deleteQuery = `
    DELETE FROM ltg_ref WHERE RowID = ? OR (file_name = ? OR file_name = ?)
  `;

  try {
    // Find the file_name for the given RowID
    const [findResults] = await db.query(findQuery, [RowID]);
    if (findResults.length === 0) {
      res.status(404).json({ message: "No brochure found to delete", status: "not_found" });
      return;
    }

    const fileName = findResults[0].file_name;
    const thumbnailFileName = fileName.replace('.pdf', '-thumbnail.png');

    // Delete both the PDF and its corresponding thumbnail
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

  // console.log("ID: ", listingID);
  // console.log("Type: ", type);

  let connection;

  try {
    // Determine the details table based on type
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

    // Get a connection from the pool
    connection = await db.getConnection();

    // Start a transaction
    await connection.beginTransaction();

    // Delete from the details table
    const deleteDetailQuery = `
      DELETE FROM ${detailsTable}
      WHERE ltg_det_mstRowID = ?;
    `;
    await connection.query(deleteDetailQuery, [listingID]);

    // Delete from the master table
    const deleteMasterQuery = `
      DELETE FROM ltg_mst
      WHERE RowID = ?;
    `;
    await connection.query(deleteMasterQuery, [listingID]);

    // Delete all rows from the reference table with the same ltg_mstRowID
    const deleteRefQuery = `
      DELETE FROM ltg_ref
      WHERE ltg_mstRowID = ?;
    `;
    await connection.query(deleteRefQuery, [listingID]);

    // Commit the transaction
    await connection.commit();

    res.status(200).json({ message: 'Property deleted successfully', status: 'success' });
  } catch (error) {
    // Rollback the transaction in case of an error
    if (connection) await connection.rollback();
    console.error("Error deleting property: " + error.stack);
    res.status(500).json({ message: "Error deleting property", status: "error" });
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
};

// upload files
const uploadListItem = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { listingID } = req.params;
    const { type, auditUser } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ status: 'FAILURE', message: 'No files uploaded' });
    }

    await connection.beginTransaction();

    const insertQuery = `
      INSERT INTO ltg_ref (ltg_mstRowID, file_name, attachment, type, audit_user, audit_date)
      VALUES ?
    `;

    // Get current timestamp for unique file naming
    const timestamp = Date.now();

    const values = files.map(file => {
      const url = file.path.replace('public', '');
      const originalName = file.originalname;
      const extension = path.extname(originalName);
      const baseName = path.basename(originalName, extension);
      const uniqueFileName = `${baseName}-${timestamp}${extension}`; // Append timestamp to filename

      // Update file path with the new unique filename
      const newPath = path.join(path.dirname(file.path), uniqueFileName);
      fs.renameSync(file.path, newPath); // Rename the file on disk
      file.path = newPath; // Update the file object with the new path

      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);

      return [listingID, uniqueFileName, url, type, auditUser, formattedDate];
    });

    // Attempt to insert the files into the database
    await connection.query(insertQuery, [values]);

    // Handle thumbnails if present
    const thumbnailValues = files
      .filter(file => file.thumbnail)
      .map(file => {
        const originalName = file.originalname.replace(/\.pdf$/, '-thumbnail.png');
        return [
          listingID,
          originalName,
          file.thumbnail,
          type,
          auditUser,
          new Date().toISOString().slice(0, 10),
        ];
      });

    if (thumbnailValues.length > 0) {
      const thumbnailInsertQuery = `
        INSERT INTO ltg_ref (ltg_mstRowID, file_name, attachment, type, audit_user, audit_date)
        VALUES ?
      `;
      await connection.query(thumbnailInsertQuery, [thumbnailValues]);
    }

    await connection.commit();

    res.status(200).json({
      message: 'Files uploaded successfully',
      status: 'SUCCESS',
      listingID: listingID,
      type: type,
      auditUser: auditUser
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error uploading files:', error);
    res.status(500).json({ status: 'FAILURE', message: 'Error uploading files', error: error.message });
  } finally {
    connection.release();
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

module.exports = {
  addListings,
  getListItem,
  getTableData,
  getListingbyType,
  updateListItem,
  deleteListItem,
  uploadListItem,
  deleteListImage,
  updateListImage,
  getListItemId,
  getTableById,
  getsinglePageImg,
  deleteImagesByRowID,
  deleteBrochureFile,
};
