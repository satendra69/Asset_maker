const db = require("../connect");
const moment = require("moment");

const addProperty = (req, res) => {
  //console.log("req_____22",req.body);
  const q =
    `INSERT INTO prty_mst
    (prty_title, prty_owner, prty_type, prty_mark_as_featured, prty_regions, prty_categories, prty_labels, prty_audit_user, prty_create_date, prty_update_date)
    VALUES
    ('${req.body.title}',
    '${req.body.selectedOwner}',
    '${req.body.propertyType}',
    '${req.body.featured}',
    '${req.body.selectedRegions}',
    '${req.body.selectedCategories}',
    '${req.body.CustomLabel}',
    '${req.body.auditUser}',
    '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}',
    '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}')`;

  db.query(q, (error, results, fields) => {
    if (error) {
      console.error("Error inserting property: " + error);
      // return res.status(400).send(error);
      return res.status(500).json({ error: "Something is wrong" });
    }
    const lastInsertId = results.insertId;

    // Insert Data prty_det_apartment
    if (req.body.propertyType == "Apartments") {
      const q_det =
        `INSERT INTO asset_makers.prty_det_apartment
(prty_det_mstRowID, prty_det_sale_price, prty_det_suffix_price, prty_det_desc, prty_det_location, prty_det_address, prty_det_postal_code, prty_det_latitude, prty_det_longitude, prty_det_pmts_area_dts, prty_det_pmts_rate_per_sq, prty_det_pmts_status, prty_det_pmts_bed_rom, prty_det_pmts_bth_rom, prty_det_pmts_car_park, prty_det_pmts_year_build, prty_det_pmts_total_flrs, prty_det_pmts_flat_on_flr, prty_det_pmts_lfts_in_tower, prty_det_pmts_main_dor_facing, prty_det_pmts_property_flrg, prty_det_pmts_balconies, prty_det_pmts_approaching_road_width, prty_det_pmts_furnishing, prty_det_pmts_stamp_duty, prty_det_pmts_total_project_exnt, prty_det_pmts_total_blocks, prty_det_pmts_transaction_type, prty_det_pmts_total_towers, prty_det_pmts_total_phases, prty_det_pmts_approval_authority, prty_det_pmts_totalunits, prty_det_pmts_other_advtages, prty_det_about_project_builder, prty_det_amenities, prty_det_property_video_url, prty_det_audit_user)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        lastInsertId,
        req.body.propertyData.salePrice,
        req.body.propertyData.suffixPrice,
        req.body.propertyData.content,
        req.body.propertyData.MapRow.location,
        req.body.propertyData.MapRow.address,
        req.body.propertyData.MapRow.postalCode,
        req.body.propertyData.MapRow.latitude,
        req.body.propertyData.MapRow.longitude,
        req.body.propertyData.areaDetails,
        req.body.propertyData.ratePerSqFt,
        req.body.propertyData.selectedStatus,
        req.body.propertyData.selectedBedRooms,
        req.body.propertyData.selectedBathRooms,
        req.body.propertyData.selectedCarParking,
        req.body.propertyData.yearBuilt,
        req.body.propertyData.totalFloors,
        req.body.propertyData.flatOnFloor,
        req.body.propertyData.liftsInTheTower,
        req.body.propertyData.mainDoorFacing,
        req.body.propertyData.propertyFlooring,
        req.body.propertyData.balconies,
        req.body.propertyData.approachingRoadWidth,
        req.body.propertyData.furnishing,
        req.body.propertyData.stampDutyAndRegistrationCharges,
        req.body.propertyData.totalProjectExtent,
        req.body.propertyData.totalBlocks,
        req.body.propertyData.transactionType,
        req.body.propertyData.totalTowers,
        req.body.propertyData.totalPhases,
        req.body.propertyData.approvalAuthority,
        req.body.propertyData.totalUnits,
        req.body.propertyData.advantagesAsString,
        req.body.propertyData.projectBuilderDetails,
        req.body.propertyData.amenitiesAsString,
        req.body.propertyData.videoUrl,
        req.body.auditUser,
      ];



      db.query(q_det, values, (error2, results2, fields2) => {
        if (error2) {
          console.error("Error inserting into prty_det_apartment:", error2);
          return res.status(500).json({ error: "Something went wrong" });
        }
        console.log("Data inserted successfully");
        // console.log(q_det, values)
        res.status(200).json({ message: "Property created successfully", status: "SUCCESS", RowID: results2.insertId });
      });
    }

    else if (req.body.propertyType == "Villas") {
      console.log("villas____");
      const q_det =
        `INSERT INTO asset_makers.prty_det_villas
(prty_det_mstRowID, prty_det_sale_price, prty_det_suffix_price, prty_det_desc, prty_det_location, prty_det_address, prty_det_postal_code, prty_det_latitude, prty_det_longitude, prty_det_property_address_details, prty_det_pmts_area_dts, prty_det_pmts_rate_per_sq, prty_det_pmts_status, prty_det_pmts_bed_rooms, prty_det_pmts_bath_rooms, prty_det_pmts_car_parking, prty_det_pmts_year_built, prty_det_pmts_plot_dimensions, prty_det_pmts_no_of_open_sides, prty_det_pmts_main_door_facing, prty_det_pmts_corner_villa, prty_det_pmts_plot_area, prty_det_pmts_balconies, prty_det_pmts_furnishing, prty_det_pmts_property_flooring, prty_det_pmts_approaching_road_width, prty_det_pmts_gated_community, prty_det_pmts_over_looking, prty_det_pmts_other_advantages, prty_det_pmts_total_floors, prty_det_pmts_transaction_type, prty_det_pmts_available_from, prty_det_pmts_stamp_duty_registration_charges, prty_det_pmts_approval_authority, prty_det_pmts_total_project_extent, prty_det_pmts_total_units, prty_det_pmts_total_phases, prty_det_about_project_builder, prty_det_amenities, prty_det_property_video_url, prty_det_audit_user)
VALUES (
            '${lastInsertId}',
            '${req.body.propertyData.salePrice}',
            '${req.body.propertyData.suffixPrice}',
            '${req.body.propertyData.content}',
            '${req.body.propertyData.MapRow.location}',
            '${req.body.propertyData.MapRow.address}',
            '${req.body.propertyData.MapRow.postalCode}',
            '${req.body.propertyData.MapRow.latitude}',
            '${req.body.propertyData.MapRow.longitude}',
            '${req.body.propertyData.propertyAddressDetails}',
            '${req.body.propertyData.areaDetails}',
            '${req.body.propertyData.ratePerSqFt}',
            '${req.body.propertyData.selectedStatus}',
			      '${req.body.propertyData.selectedBedRooms}',
            '${req.body.propertyData.selectedBathRooms}',
            '${req.body.propertyData.selectedCarParking}',
            '${req.body.propertyData.yearBuilt}',
            '${req.body.propertyData.plotDimensions}',
            '${req.body.propertyData.noOfOpenSides}',
			      '${req.body.propertyData.mainDoorFacing}',
            '${req.body.propertyData.isCornerVilla}',
            '${req.body.propertyData.plotArea}',
            '${req.body.propertyData.balconies}',
            '${req.body.propertyData.furnishing}',
            '${req.body.propertyData.propertyFlooring}',
            '${req.body.propertyData.approachingRoadWidth}',
            '${req.body.propertyData.isInGatedCommunity}',
            '${req.body.propertyData.overLooking}',
            '${req.body.propertyData.otherAdvantages}',
            '${req.body.propertyData.totalFloors}',
            '${req.body.propertyData.transactionType}',
            '${req.body.propertyData.availableForm}',
            '${req.body.propertyData.stampDutyAndRegistrationCharges}',
		      	'${req.body.propertyData.approvalAuthority}',
            '${req.body.propertyData.totalProjectExtent}',
            '${req.body.propertyData.totalUnits}',
            '${req.body.propertyData.totalPhases}',
		      	'${req.body.propertyData.projectBuilderDetails}',
            '${req.body.propertyData.selectedAmenities}',
            '${req.body.propertyData.videoUrl}',
            '${req.body.auditUser}')`;

      db.query(q_det, (error2, results2, fields2) => {
        if (error2) {
          console.error("Error inserting into another_table2: " + error2);
          return res.status(500).json({ error: "Something is wrong" });
        }
        // Insert img


        // console.log("Inserted property with id " + results.insertId);
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Property create successfully", status: "SUCCESS", RowID: lastInsertId });
      });
    }
    else if (req.body.propertyType == "Plots") {
      console.log("plots____");
      const q_det =
        `INSERT INTO prty_det_plots
            (prty_det_mstRowID, 
            prty_det_sale_price, 
            prty_det_suffix_price,
            prty_det_desc, 
            prty_det_location, 
            prty_det_address, 
            prty_det_postal_code,
            prty_det_latitude, 
            prty_det_longitude,
            prty_det_property_address_details,
            prty_det_pmts_area_dts,
            prty_det_pmts_rate_per_sq,
            prty_det_pmts_status,
            prty_det_pmts_plot_dimensions,
            prty_det_pmts_floors_allowed_for_construction,
            prty_det_pmts_no_of_open_sides,
            prty_det_pmts_plot_facing,
            prty_det_pmts_corner_plot,
            prty_det_pmts_gated_community,
            prty_det_pmts_boundary_wall_made,
            prty_det_pmts_approaching_road_width,
            prty_det_pmts_transaction_type,
            prty_det_pmts_stamp_duty_registration_charges,
            prty_det_pmts_total_project_extent,
            prty_det_pmts_plot_approval_authority,
            prty_det_pmts_year_built,
            prty_det_pmts_total_units,
            prty_det_pmts_total_phases,
            prty_det_amenities,
            prty_det_about_project_builder,
            prty_det_property_video_url,
            prty_det_audit_user
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.propertyData.salePrice}', 
            '${req.body.propertyData.suffixPrice}', 
            '${req.body.propertyData.content}',
            '${req.body.propertyData.MapRow.location}',
            '${req.body.propertyData.MapRow.address}',
            '${req.body.propertyData.MapRow.postalCode}',
            '${req.body.propertyData.MapRow.latitude}',
            '${req.body.propertyData.MapRow.longitude}',
            '${req.body.propertyData.propertyAddressDetails}', 
            '${req.body.propertyData.areaDetails}', 
            '${req.body.propertyData.ratePerSqFt}', 
            '${req.body.propertyData.selectedStatus}', 
            '${req.body.propertyData.plotDimensions}', 
            '${req.body.propertyData.floorsAllowedForConstruction}', 
            '${req.body.propertyData.noOfOpenSides}', 
            '${req.body.propertyData.plotFacing}', 
            '${req.body.propertyData.cornerPlot}', 
            '${req.body.propertyData.isInGatedCommunity}', 
            '${req.body.propertyData.boundaryWallMade}', 
            '${req.body.propertyData.approachingRoadWidth}',
            '${req.body.propertyData.transactionType}',
            '${req.body.propertyData.stampDutyAndRegistrationCharges}',
            '${req.body.propertyData.totalProjectExtent}',
            '${req.body.propertyData.plotApprovalAuthority}', 
            '${req.body.propertyData.yearBuilt}', 
            '${req.body.propertyData.totalUnits}', 
            '${req.body.propertyData.totalPhases}', 
            '${req.body.propertyData.selectedAmenities}', 
            '${req.body.propertyData.projectBuilderDetails}', 
            '${req.body.propertyData.videoUrl}', 
            '${req.body.auditUser}')`;

      db.query(q_det, (error2, results2, fields2) => {
        if (error2) {
          console.error("Error inserting into another_table2: " + error2);
          return res.status(500).json({ error: "Something is wrong" });
        }
        // Insert img


        // console.log("Inserted property with id " + results.insertId);
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Property create successfully", status: "SUCCESS", RowID: lastInsertId });
      });
    }
    else if (req.body.propertyType == "RowHouses") {
      const q_det =
        `INSERT INTO prty_det_row_houses
            (prty_det_mstRowID, 
              prty_det_sale_price, 
              prty_det_suffix_price,
              prty_det_desc, 
              prty_det_location, 
              prty_det_address, 
              prty_det_postal_code,
              prty_det_latitude, 
              prty_det_longitude,
            	prty_det_property_address_details,
              prty_det_pmts_area_dts,
            	prty_det_pmts_rate_per_sq,
              prty_det_pmts_status,
              prty_det_pmts_bed_rooms,
            	prty_det_pmts_bath_rooms,
              prty_det_pmts_car_parking,
              prty_det_pmts_year_built,
              prty_det_pmts_plot_dimensions,
              prty_det_pmts_land_uds_area,
              prty_det_pmts_over_looking,
              prty_det_pmts_main_door_facing,
            	prty_det_pmts_corner_rowhouse,
              prty_det_pmts_gated_community,
              prty_det_pmts_balconies,
              prty_det_pmts_other_advantages,
              prty_det_pmts_approaching_road_width,
              prty_det_pmts_furnishing,
              prty_det_pmts_property_flooring,
              prty_det_pmts_no_of_open_sides,
              prty_det_pmts_total_project_extent,
            	prty_det_pmts_available_from,
              prty_det_pmts_stamp_duty_registration_charges,
              prty_det_pmts_transaction_type,
              prty_det_pmts_approval_authority,
              prty_det_pmts_total_units,
              prty_det_pmts_total_phases,
              prty_det_amenities,
              prty_det_about_project_builder,
              prty_det_property_video_url,
              prty_det_audit_user
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.propertyData.salePrice}', 
            '${req.body.propertyData.suffixPrice}', 
            '${req.body.propertyData.content}',
            '${req.body.propertyData.MapRow.location}',
            '${req.body.propertyData.MapRow.address}',
            '${req.body.propertyData.MapRow.postalCode}',
            '${req.body.propertyData.MapRow.latitude}',
            '${req.body.propertyData.MapRow.longitude}',
            '${req.body.propertyData.propertyAddressDetails}', 
            '${req.body.propertyData.areaDetails}', 
            '${req.body.propertyData.ratePerSqFt}', 
            '${req.body.propertyData.selectedStatus}',
            '${req.body.propertyData.selectedBedRooms}',
            '${req.body.propertyData.selectedBathRooms}',
            '${req.body.propertyData.selectedCarParking}',
            '${req.body.propertyData.yearBuilt}', 
            '${req.body.propertyData.plotDimensions}',
            '${req.body.propertyData.landUDSArea}',
            '${req.body.propertyData.overLooking}',
            '${req.body.propertyData.mainDoorFacing}',
            '${req.body.propertyData.isCornerRowhouse}',
            '${req.body.propertyData.isInGatedCommunity}', 
            '${req.body.propertyData.balconies}',
            '${req.body.propertyData.otherAdvantages}',
            '${req.body.propertyData.approachingRoadWidth}',
            '${req.body.propertyData.furnishing}',
            '${req.body.propertyData.propertyFlooring}',
            '${req.body.propertyData.noOfOpenSides}', 
            '${req.body.propertyData.totalProjectExtent}',
            '${req.body.propertyData.availableFrom}',
            '${req.body.propertyData.stampDutyAndRegistrationCharges}',
            '${req.body.propertyData.transactionType}',
            '${req.body.propertyData.approvalAuthority}',
            '${req.body.propertyData.totalUnits}', 
            '${req.body.propertyData.totalPhases}', 
            '${req.body.propertyData.selectedAmenities}', 
            '${req.body.propertyData.projectBuilderDetails}', 
            '${req.body.propertyData.videoUrl}', 
            '${req.body.auditUser}')`;

      db.query(q_det, (error2, results2, fields2) => {
        if (error2) {
          console.error("Error inserting into another_table2: " + error2);
          return res.status(500).json({ error: "Something is wrong" });
        }
        // Insert img


        // console.log("Inserted property with id " + results.insertId);
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Property create successfully", status: "SUCCESS", RowID: lastInsertId });
      });
    }
    else if (req.body.propertyType == "CommercialProperties") {
      const q_det =
        `INSERT INTO prty_det_commercial_properties
            (prty_det_mstRowID, 
              prty_det_sale_price, 
              prty_det_suffix_price,
              prty_det_desc, 
              prty_det_location, 
              prty_det_address, 
              prty_det_postal_code,
              prty_det_latitude, 
              prty_det_longitude,
              prty_det_pmts_area_dts,
              prty_det_pmts_rate_per_sq,
            	prty_det_pmts_status,
              prty_det_pmts_year_built,
              prty_det_pmts_balconies,
              prty_det_pmts_other_advantages,
              prty_det_pmts_furnishing,
              prty_det_pmts_car_parking,
              prty_det_pmts_total_floors,
              prty_det_pmts_property_on_floor,
              prty_det_pmts_total_units,
              prty_det_pmts_transaction_type,
              prty_det_pmts_approaching_road_width,
              prty_det_pmts_approval_authority,
              prty_det_pmts_total_phases,
              prty_det_pmts_total_project_extent,
              prty_det_pmts_stamp_duty_registration_charges,
              prty_det_pmts_property_flooring,
              prty_det_amenities,
              prty_det_about_project_builder,
              prty_det_property_video_url,
            	prty_det_audit_user
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.propertyData.salePrice}', 
            '${req.body.propertyData.suffixPrice}', 
            '${req.body.propertyData.content}',
            '${req.body.propertyData.MapRow.location}',
            '${req.body.propertyData.MapRow.address}',
            '${req.body.propertyData.MapRow.postalCode}',
            '${req.body.propertyData.MapRow.latitude}',
            '${req.body.propertyData.MapRow.longitude}',
            '${req.body.propertyData.areaDetails}', 
            '${req.body.propertyData.ratePerSqFt}', 
            '${req.body.propertyData.selectedStatus}',
            '${req.body.propertyData.yearBuilt}',
            '${req.body.propertyData.balconies}',
            '${req.body.propertyData.otherAdvantages}',
            '${req.body.propertyData.furnishing}',
            '${req.body.propertyData.selectedCarParking}',
            '${req.body.propertyData.totalFloors}',
            '${req.body.propertyData.propertyOnFloor}',
            '${req.body.propertyData.totalUnits}', 
            '${req.body.propertyData.transactionType}',
            '${req.body.propertyData.approachingRoadWidth}',
            '${req.body.propertyData.approvalAuthority}',
            '${req.body.propertyData.totalPhases}', 
            '${req.body.propertyData.totalProjectExtent}',
            '${req.body.propertyData.stampDutyAndRegistrationCharges}',
            '${req.body.propertyData.propertyFlooring}',
            '${req.body.propertyData.selectedAmenities}', 
            '${req.body.propertyData.projectBuilderDetails}',
            '${req.body.propertyData.videoUrl}',  
            '${req.body.auditUser}')`;

      db.query(q_det, (error2, results2, fields2) => {
        if (error2) {
          console.error("Error inserting into another_table2: " + error2);
          return res.status(500).json({ error: "Something is wrong" });
        }
        // Insert img


        // console.log("Inserted property with id " + results.insertId);
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Property create successfully", status: "SUCCESS", RowID: lastInsertId });
      });
    }
    else if (req.body.propertyType == "Villaments") {
      const q_det =
        `INSERT INTO prty_det_villaments
            (	prty_det_mstRowID, 
              prty_det_sale_price, 
              prty_det_suffix_price,
              prty_det_desc, 
              prty_det_location, 
              prty_det_address, 
              prty_det_postal_code,
              prty_det_latitude, 
              prty_det_longitude,
              prty_det_property_address_details,
              prty_det_pmts_area_dts,
            	prty_det_pmts_rate_per_sq,
              prty_det_pmts_status,
              prty_det_pmts_bed_rooms,
              prty_det_pmts_bath_rooms,
              prty_det_pmts_car_parking,
              prty_det_pmts_year_built,
              prty_det_pmts_land_uds_area,
              prty_det_pmts_duplex,
              prty_det_pmts_no_of_open_sides,
              prty_det_pmts_main_door_facing,
              prty_det_pmts_corner_villament,
              prty_det_pmts_gated_community,
              prty_det_pmts_balconies,
              prty_det_pmts_approaching_road_width,
              prty_det_pmts_over_looking,
              prty_det_pmts_furnishing,
              prty_det_pmts_property_flooring,
              prty_det_pmts_other_advantages,
              prty_det_pmts_available_from,
              prty_det_pmts_total_project_extent,
              prty_det_pmts_transaction_type,
              prty_det_pmts_stamp_duty_registration_charges,
              prty_det_pmts_approval_authority,
              prty_det_pmts_total_units,
              prty_det_pmts_total_phases,
              prty_det_amenities,
              prty_det_about_project_builder,
              prty_det_property_video_url,
            	prty_det_audit_user
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.propertyData.salePrice}', 
            '${req.body.propertyData.suffixPrice}', 
            '${req.body.propertyData.content}',
            '${req.body.propertyData.MapRow.location}',
            '${req.body.propertyData.MapRow.address}',
            '${req.body.propertyData.MapRow.postalCode}',
            '${req.body.propertyData.MapRow.latitude}',
            '${req.body.propertyData.MapRow.longitude}',
            '${req.body.propertyData.propertyAddressDetails}',
            '${req.body.propertyData.areaDetails}', 
            '${req.body.propertyData.ratePerSqFt}', 
            '${req.body.propertyData.selectedStatus}',
            '${req.body.propertyData.selectedBedRooms}',
            '${req.body.propertyData.selectedBathRooms}',
            '${req.body.propertyData.selectedCarParking}',
            '${req.body.propertyData.yearBuilt}',
            '${req.body.propertyData.landUDSArea}',
            '${req.body.propertyData.selectedDuplex}',
            '${req.body.propertyData.noOfOpenSides}',
            '${req.body.propertyData.mainDoorFacing}',
            '${req.body.propertyData.isCornerVillament}',
            '${req.body.propertyData.isInGatedCommunity}',
            '${req.body.propertyData.balconies}',
            '${req.body.propertyData.approachingRoadWidth}',
            '${req.body.propertyData.overLooking}',
            '${req.body.propertyData.furnishing}',
            '${req.body.propertyData.propertyFlooring}',
            '${req.body.propertyData.otherAdvantages}',
            '${req.body.propertyData.availableFrom}',
            '${req.body.propertyData.totalProjectExtent}',
            '${req.body.propertyData.transactionType}',
            '${req.body.propertyData.stampDutyAndRegistrationCharges}',
            '${req.body.propertyData.approvalAuthority}',
            '${req.body.propertyData.totalUnits}', 
            '${req.body.propertyData.totalPhases}', 
            '${req.body.propertyData.projectBuilderDetails}',
            '${req.body.propertyData.selectedAmenities}',
            '${req.body.propertyData.videoUrl}',
            '${req.body.auditUser}')`;

      db.query(q_det, (error2, results2, fields2) => {
        if (error2) {
          console.error("Error inserting into another_table2: " + error2);
          return res.status(500).json({ error: "Something is wrong" });
        }
        // Insert img


        // console.log("Inserted property with id " + results.insertId);
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Property create successfully", status: "SUCCESS", RowID: lastInsertId });
      });
    }
    else if (req.body.propertyType == "PentHouses") {
      const q_det =
        `INSERT INTO prty_det_penthouses
            (prty_det_mstRowID, 
              prty_det_price,  
              prty_det_sale_price, 
              prty_det_suffix_price,
              prty_det_desc, 
              prty_det_location, 
              prty_det_address, 
              prty_det_postal_code,
              prty_det_latitude, 
              prty_det_longitude,
              prty_det_property_address_details,
              prty_det_pmts_area_dts,
            	prty_det_pmts_rate_per_sq,
              prty_det_pmts_status,
              prty_det_pmts_bed_rooms,
              prty_det_pmts_bath_rooms,
              prty_det_pmts_car_parking,
              prty_det_pmts_year_built,
              prty_det_pmts_duplex,
              prty_det_pmts_main_door_facing,
              prty_det_pmts_gated_community,
              prty_det_pmts_corner_penthouse,
              prty_det_pmts_balconies,
              prty_det_pmts_furnishing,
              prty_det_pmts_over_looking,
              prty_det_pmts_transaction_type,
              prty_det_pmts_property_flooring,
              prty_det_pmts_other_advantages,
              prty_det_pmts_no_of_open_sides,
              prty_det_pmts_approaching_road_width,
              prty_det_pmts_available_form,
              prty_det_pmts_approval_authority,
              prty_det_pmts_total_project_extent,
              prty_det_pmts_stamp_duty_registration_charges,
              prty_det_pmts_total_phases,
              prty_det_pmts_total_units,
              prty_det_amenities,
              prty_det_about_project_builder,
              prty_det_property_video_url,
              prty_det_audit_user
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.propertyData.price}', 
            '${req.body.propertyData.salePrice}', 
            '${req.body.propertyData.suffixPrice}', 
            '${req.body.propertyData.content}',
            '${req.body.propertyData.MapRow.location}',
            '${req.body.propertyData.MapRow.address}',
            '${req.body.propertyData.MapRow.postalCode}',
            '${req.body.propertyData.MapRow.latitude}',
            '${req.body.propertyData.MapRow.longitude}',
            '${req.body.propertyData.propertyAddressDetails}',
            '${req.body.propertyData.areaDetails}', 
            '${req.body.propertyData.ratePerSqFt}', 
            '${req.body.propertyData.selectedStatus}',
            '${req.body.propertyData.selectedBedRooms}',
            '${req.body.propertyData.selectedBathRooms}',
            '${req.body.propertyData.selectedCarParking}',
            '${req.body.propertyData.yearBuilt}',
            '${req.body.propertyData.selectedDuplex}',
            '${req.body.propertyData.mainDoorFacing}',
            '${req.body.propertyData.isInGatedCommunity}',
            '${req.body.propertyData.isCornerPenthouse}',
            '${req.body.propertyData.balconies}',
            '${req.body.propertyData.furnishing}',
            '${req.body.propertyData.overLooking}',
            '${req.body.propertyData.transactionType}',
            '${req.body.propertyData.propertyFlooring}',
            '${req.body.propertyData.otherAdvantages}',
            '${req.body.propertyData.noOfOpenSides}',
            '${req.body.propertyData.approachingRoadWidth}',
            '${req.body.propertyData.availableFrom}',
            '${req.body.propertyData.approvalAuthority}',
            '${req.body.propertyData.totalProjectExtent}',
            '${req.body.propertyData.stampDutyAndRegistrationCharges}',
            '${req.body.propertyData.totalPhases}', 
            '${req.body.propertyData.totalUnits}', 
            '${req.body.propertyData.selectedAmenities}', 
            '${req.body.propertyData.projectBuilderDetails}',
            '${req.body.propertyData.videoUrl}', 
            '${req.body.auditUser}')`;

      db.query(q_det, (error2, results2, fields2) => {
        if (error2) {
          console.error("Error inserting into another_table2: " + error2);
          return res.status(500).json({ error: "Something is wrong" });
        }
        // Insert img


        // console.log("Inserted property with id " + results.insertId);
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Property create successfully", status: "SUCCESS", RowID: lastInsertId });
      });
    }

  });

};

const getPropertyItem = async (req, res) => {

  const query = `
    SELECT * FROM prty_mst
    LEFT JOIN prty_det_apartment ON prty_mst.RowID = prty_det_apartment.prty_det_mstRowID
    LEFT JOIN prty_ref ON prty_mst.RowID = prty_ref.prty_mstRowID
  `;

  try {
    const [results, fields] = await db.query(query);
    res.json({ data: results, message: "Properties fetched successfully", status: "success" });
  } catch (error) {
    console.error("Error fetching properties: " + error.stack);
    res.status(500).json({ message: "Error fetching properties", status: "error" });
  }
};

// get Apartment by type
const getPropertybyType = (req, res) => {

  const { type } = req.params;
  //console.log("type____",type);
  let query = '';
  if (type === "Plots") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_plots ON prty_mst.RowID = prty_det_plots.prty_det_mstRowID LEFT JOIN ( SELECT * FROM prty_ref GROUP BY prty_mstRowID ) AS prty_ref ON prty_mst.RowID = prty_ref.prty_mstRowID WHERE prty_mst.prty_type = ? ORDER BY prty_create_date DESC
  `;
  } else if (type === "RowHouses") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_row_houses ON prty_mst.RowID = prty_det_row_houses.prty_det_mstRowID LEFT JOIN ( SELECT * FROM prty_ref GROUP BY prty_mstRowID ) AS prty_ref ON prty_mst.RowID = prty_ref.prty_mstRowID WHERE prty_mst.prty_type = ? ORDER BY prty_create_date DESC
 `;
  } else if (type === "CommercialProperties") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_commercial_properties ON prty_mst.RowID = prty_det_commercial_properties.prty_det_mstRowID LEFT JOIN ( SELECT * FROM prty_ref GROUP BY prty_mstRowID ) AS prty_ref ON prty_mst.RowID = prty_ref.prty_mstRowID WHERE prty_mst.prty_type = ? ORDER BY prty_create_date DESC
 `;
  } else if (type === "Villaments") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_villaments ON prty_mst.RowID = prty_det_villaments.prty_det_mstRowID LEFT JOIN ( SELECT * FROM prty_ref GROUP BY prty_mstRowID ) AS prty_ref ON prty_mst.RowID = prty_ref.prty_mstRowID   WHERE prty_mst.prty_type = ? ORDER BY prty_create_date DESC
 `;
  } else if (type === "PentHouses") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_penthouses ON prty_mst.RowID = prty_det_penthouses.prty_det_mstRowID LEFT JOIN ( SELECT * FROM prty_ref GROUP BY prty_mstRowID ) AS prty_ref ON prty_mst.RowID = prty_ref.prty_mstRowID   WHERE prty_mst.prty_type = ? ORDER BY prty_create_date DESC
 `;
  } else {
    query = `
    SELECT prty_mst.*, prty_det.*, prty_ref.file_name, prty_ref.attachment AS attachment
FROM prty_mst
LEFT JOIN prty_det_apartment ON prty_mst.RowID = prty_det_apartment.prty_det_mstRowID
LEFT JOIN (
    SELECT prty_mstRowID, MAX(file_name) AS file_name, MAX(attachment) AS attachment
    FROM prty_ref
    GROUP BY prty_mstRowID
) AS prty_ref ON prty_mst.RowID = prty_ref.prty_mstRowID
WHERE prty_mst.prty_type = ?
ORDER BY prty_create_date DESC;
  `;
  }

  // SELECT * FROM prty_mst LEFT JOIN prty_det ON prty_mst.RowID = prty_det.prty_det_mstRowID LEFT JOIN ( SELECT * FROM prty_ref GROUP BY prty_mstRowID ) AS prty_ref ON prty_mst.RowID = prty_ref.prty_mstRowID WHERE prty_mst.prty_type = ? ORDER BY 
  //   prty_create_date DESC


  db.query(query, [type], (error, results, fields) => {
    // console.log("results____",results);
    if (error) {
      console.error("Error fetching properties: " + error.stack);
      res.status(500).json({ message: "Error fetching properties", status: "error" });
      return;
    }

    res.json({ data: results, message: "Properties fetched successfully", status: "success" });
  });
}
// get SingleLsit Item
const getPropertyItemId = (req, res) => {
  //console.log("body__",req.body);

  const { propertyID, type } = req.params; // Assuming 'itemId' is the parameter name
  console.log("id___", propertyID);
  console.log("id___111", type);
  let query = '';

  if (type === "Plots") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_plots ON prty_mst.RowID = prty_det_plots.prty_det_mstRowID WHERE prty_mst.RowID ='${propertyID}'
 `;
  } else if (type === "RowHouses") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_row_houses ON prty_mst.RowID = prty_det_row_houses.prty_det_mstRowID WHERE prty_mst.RowID ='${propertyID}'
 `;
  } else if (type === "CommercialProperties") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_commercial_properties ON prty_mst.RowID = prty_det_commercial_properties.prty_det_mstRowID WHERE prty_mst.RowID ='${propertyID}'
 `;
  }
  else if (type === "Villaments") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_villaments ON prty_mst.RowID = prty_det_villaments.prty_det_mstRowID WHERE prty_mst.RowID ='${propertyID}'
 `;
  } else if (type === "PentHouses") {
    query = `
    SELECT * FROM prty_mst LEFT JOIN prty_det_penthouses ON prty_mst.RowID = prty_det_penthouses.prty_det_mstRowID WHERE prty_mst.RowID ='${propertyID}'
 `;
  }
  else {
    query = `
  SELECT * FROM prty_mst LEFT JOIN prty_det_apartment ON prty_mst.RowID = prty_det_apartment.prty_det_mstRowID  WHERE prty_mst.RowID ='${propertyID}'
  `;
  }


  db.query(query, (error, results, fields) => {
    //  console.log("data___",results);
    if (error) {
      console.error("Error fetching properties: " + error.stack);
      res.status(500).json({ message: "Error fetching properties", status: "error" });
      return;
    }

    res.json({ data: results, message: "Properties fetched successfully", status: "success" });
  });

};
// get Single page img 
const getsinglePageImg = (req, res) => {
  const { propertyID } = req.params; // Assuming 'itemId' is the parameter name
  console.log("ssjfjs___", propertyID);
  const query = `
SELECT * FROM prty_ref WHERE prty_mstRowID = ?
`;

  // Execute the query with the parameter
  db.query(query, [propertyID], (error, results) => {
    if (error) {
      console.error("Error fetching properties:", error.stack);
      res.status(500).json({ message: "Error fetching properties", status: "error" });
      return;
    }

    // Check if any results were returned
    if (results.length === 0) {
      res.status(404).json({ message: "No properties found", status: "not_found" });
      return;
    }

    res.json({ data: results, message: "Properties Imag fetched successfully", status: "success" });
  });

};

// update property
const updatePropertyItem = (req, res) => {
  const propertyId = req.params.propertyID;
  console.log("propertyId", propertyId);
  const {
    name,
    description,
    address,
    price,
    bathrooms,
    furnished,
    parking,
    type,
    category,
    restaurant,
    bus,
    school,
    size,
    floore,
    city,
    bedrooms,
  } = req.body;

  const q =
    "UPDATE property SET `name` = ?, `description` = ?, `address` = ?, `price` = ?, `bathrooms` = ?, `furnished` = ?, `parking` = ?, `type` = ?, `category` = ?, `restaurant` = ?, `bus` = ?, `school` = ?, `size` = ?, `flore` = ?, `cityId` = ?, `bedrooms` = ? WHERE `id` = ?";

  const propertyValues = [
    name,
    description,
    address,
    price,
    bathrooms,
    furnished,
    parking,
    type,
    category,
    restaurant,
    bus,
    school,
    size,
    floore,
    city,
    bedrooms,
    propertyId,
    req.params.propertyID,
  ];

  const duplicateQuery =
    "SELECT * FROM property WHERE (name = ? OR address = ?) AND id != ?";
  db.query(duplicateQuery, [name, address, propertyId], (error, results) => {
    if (error) {
      console.error("Error checking for duplicate property:", error.stack);
      return res.status(500).send("Internal Server Error");
    }

    db.query(q, propertyValues, (error, results, fields) => {
      if (error) {
        console.error("Error updating property: " + error.stack);
        return res.status(400).send(error);
      }

      if (results.affectedRows === 0) {
        // Property with the given ID not found
        return res.status(404).send("Property not found.");
      }

      console.log("Updated property with id " + propertyId);

      res.status(200).send("Property updated successfully");
    });
  });
};

const deletePropertyItem = (req, res) => {
  const propertyId = req.params.propertyID;
  const q = "SELECT userId FROM property WHERE id = ?";
  db.query(q, [propertyId], (error, results, fields) => {
    if (error) {
      console.error("Error deleting property: " + error.stack);
      res.status(500).json({ error: "Error deleting property" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Property not found or already deleted" });
      return;
    }
    const userId = results[0].userId;
    if (req.userId !== userId || !req.isAdmin)
      return res.status(404).send("you must be an administrator");

    const query = "DELETE FROM property WHERE id = ?";
    db.query(query, [propertyId], (error, results, fields) => {
      if (error) {
        console.error("Error deleting property: " + error.stack);
        res.status(500).json({ error: "Error deleting property" });
        return;
      }
      // Check if any rows were affected
      if (results.affectedRows === 0) {
        res
          .status(404)
          .json({ error: "Property not found or already deleted" });
        return;
      }
      res.json({ message: "Property deleted successfully" });
    });
  });
};

// Images Section

// uploading multiple Image
const uploadPropertyItem = (req, res) => {
  console.log("insert____");
  try {
    if (!req.files || req.files.length === 0) {

      return res.status(400).send("No files were uploaded.");
    }
    console.log("insert____2");
    const insertQuery2 =
      "INSERT INTO prty_ref (`prty_mstRowID`,`file_name`,`attachment`,`type`,`audit_user`,`audit_date`) VALUES ?";
    const values = req.files.map((file) => {
      const url = file.path.replace("public", "");
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);

      return [
        req.params.propertyID,
        file.originalname,
        url,
        req.body.type,
        'admin',
        formattedDate
      ];
    });

    // Check if URLs already exist in the database
    const existingUrlsQuery =
      "SELECT attachment FROM prty_ref WHERE prty_mstRowID = ?";
    db.query(existingUrlsQuery, [req.params.propertyID], (err, results) => {
      console.log("results___", results);
      if (err) {
        console.error("Error retrieving existing URLs from database:", err);
        return res.status(500).send("Internal Server Error");
      }

      const existingUrls = results.map((row) => row.attachment);
      const uniqueValues = values.filter(
        (value) => !existingUrls.includes(value[2])
      );

      if (uniqueValues.length === 0) {

        // return res.status(400).send("No new images to insert.");
        return res.status(400).json({ message: "No new images to insert", status: "ERROR" });
      }

      db.query(insertQuery2, [uniqueValues], (err, results) => {
        console.log("results____");
        // console.log(insertQuery2, uniqueValues);
        if (err) {
          console.error("Error inserting URLs into database:", err);
          //  return res.status(500).send("Internal Server Error");
          return res.status(500).json({ message: "Internal Server Error", status: "ERROR" });
        }
        // res.status(200).send("Images inserted successfully");
        res.status(200).json({ message: "Property Img upload successfully", status: "SUCCESS" });
      });
    });
  } catch (error) {
    console.error("Error processing file uploads:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Images
const deletePropertyImage = (req, res) => {
  const propertyId = req.params.propertyID;

  const deleteQuery = "DELETE FROM propertyimages WHERE id = ?";

  db.query(deleteQuery, [propertyId], (err, results) => {
    if (err) {
      console.error("Error deleting images from database:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send("Images deleted successfully");
  });
};

// Update Property Image
const updatePropertyImage = (req, res) => {
  const imageId = req.params.propertyID;

  const updateQuery = "UPDATE propertyimages SET `imageUrl` = ? WHERE id = ?";

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
  addProperty,
  getPropertyItem,
  getPropertybyType,
  updatePropertyItem,
  deletePropertyItem,
  uploadPropertyItem,
  deletePropertyImage,
  updatePropertyImage,
  getPropertyItemId,
  getsinglePageImg,
};
