const db = require("../connect");
const moment = require("moment");


const addListings = async (req, res) => {

  const customLabels = JSON.stringify(req.body.CustomLabel);
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
    '${customLabels}', 
    '${req.body.auditUser}',
    '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}',
    '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}')`;

	
		try {
		const [results] = await db.query(q);
		const lastInsertId = results.insertId;

        // Insert Data ltg_det
        if(req.body.listingType == "Apartments" || req.body.listingType == "Villas"){
          const q_det =
          `INSERT INTO ltg_det
            (ltg_det_mstRowID, 
            ltg_det_price, 
            ltg_det_sale_price, 
            ltg_det_suffix_price,
            ltg_det_desc, 
            ltg_det_location,
            ltg_det_address, 
            ltg_det_postal_code,
            ltg_det_latitude, 
            ltg_det_longitude,
            ltg_det_property_address_details,
            ltg_det_pmts_area_dts,
            ltg_det_pmts_rate_per_sq,
            ltg_det_pmts_status,
            ltg_det_pmts_bed_rom,
            ltg_det_pmts_bth_rom,
            ltg_det_pmts_car_park,
            ltg_det_pmts_year_build,
            ltg_det_plot_dimensions,
            ltg_det_open_sides,
            ltg_det_corner_villa,
            ltg_det_plot_area,
            ltg_det_gated_community,
            ltg_det_over_looking,
            ltg_det_totl_project_extent,
            ltg_det_pmts_total_flrs,
            ltg_det_pmts_flat_on_flr,
            ltg_det_pmts_lfts_in_tower,
            ltg_det_pmts_main_dor_facing,
            ltg_det_pmts_property_flrg,
            ltg_det_pmts_balconies,
            ltg_det_pmts_approaching_road_width,
            ltg_det_pmts_furnishing,
            ltg_det_pmts_stamp_duty,
            ltg_det_pmts_tproject_evnt,
            ltg_det_pmts_totl_block,
            ltg_det_pmts_transaction_typ,
            ltg_det_pmts_total_towrs,
            ltg_det_pmts_total_phases,
            ltg_det_pmts_approval_authority,
            ltg_det_pmts_totalunits,
            ltg_det_pmts_other_advtages,
            ltg_det_about_project_buder,
            ltg_det_amenities,
            ltg_det_property_video_url,
            ltg_det_audit_user,
            ltg_det_create_date,
            ltg_det_update_date)
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.ListingData.price}', 
            '${req.body.ListingData.salePrice}', 
            '${req.body.ListingData.suffixPrice}', 
            '${req.body.ListingData.content}',
            '${req.body.ListingData.MapRow.location}',
            '${req.body.ListingData.MapRow.address}',
            '${req.body.ListingData.MapRow.postalCode}',
            '${req.body.ListingData.MapRow.latitude}',
            '${req.body.ListingData.MapRow.longitude}',
            '${req.body.ListingData.propertyAddressDetails}', 
            '${req.body.ListingData.areaDetails}', 
            '${req.body.ListingData.ratePerSqFt}', 
            '${req.body.ListingData.selectedStatus}', 
            '${req.body.ListingData.selectedBedRooms}', 
            '${req.body.ListingData.selectedBathRooms}', 
            '${req.body.ListingData.selectedCarParking}', 
            '${req.body.ListingData.yearBuilt}', 
            '${req.body.ListingData.plotDimensions}',
            '${req.body.ListingData.noOfOpenSides}', 
            '${req.body.ListingData.isCornerVilla}', 
            '${req.body.ListingData.plotArea}', 
            '${req.body.ListingData.isInGatedCommunity}', 
            '${req.body.ListingData.overLooking}', 
            '${req.body.ListingData.totalProjectExtent}',  
            '${req.body.ListingData.totalFloors}', 
            '${req.body.ListingData.flatOnFloor}', 
            '${req.body.ListingData.liftsInTheTower}', 
            '${req.body.ListingData.mainDoorFacing}', 
            '${req.body.ListingData.propertyFlooring}', 
            '${req.body.ListingData.balconies}', 
            '${req.body.ListingData.approachingRoadWidth}', 
            '${req.body.ListingData.furnishing}', 
            '${req.body.ListingData.stampDutyAndRegistrationCharges}', 
            '${req.body.ListingData.totalProjectExtent}', 
            '${req.body.ListingData.totalBlocks}', 
            '${req.body.ListingData.transactionType}', 
            '${req.body.ListingData.totalTowers}', 
            '${req.body.ListingData.totalPhases}', 
            '${req.body.ListingData.approvalAuthority}', 
            '${req.body.ListingData.totalUnits}', 
            '${req.body.ListingData.otherAdvantages}', 
            '${req.body.ListingData.projectBuilderDetails}', 
            '${req.body.ListingData.selectedAmenities}', 
            '${req.body.ListingData.videoUrl}', 
            '${req.body.auditUser}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}')`;

			
			try {
				const [results_det] = await db.query(q_det);
				console.log("Data inserted into ltg_det successfully");
				res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
			  } catch (error) {
				console.error("Error inserting into ltg_det:", error.stack);
				res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
			  }
        }
        else if(req.body.listingType == "Plots"){
          console.log("ploats____");
          const q_det =
          `INSERT INTO ltg_det_plots
            (ltg_det_mstRowID, 
            ltg_det_plot_price,  
            ltg_det_plot_sale_price, 
            ltg_det_plot_suffix_price,
            ltg_det_plot_desc, 
            ltg_det_plot_location, 
            ltg_det_plot_address, 
            ltg_det_plot_postal_code,
            ltg_det_plot_latitude, 
            ltg_det_plot_longitude,
            ltg_det_plot_property_address_details,
            ltg_det_plot_pmts_area_dts,
            ltg_det_plot_pmts_rate_per_sq,
            ltg_det_plot_pmts_status,
            ltg_det_plot_pmts_plot_dimensions,
            ltg_det_plot_pmts_floors_allowed_for_construction,
            ltg_det_plot_pmts_no_of_open_sides,
            ltg_det_plot_pmts_plot_facing,
            ltg_det_plot_pmts_corner_plot,
            ltg_det_plot_pmts_gated_community,
            ltg_det_plot_pmts_boundary_wall_made,
            ltg_det_plot_pmts_approaching_road_width,
            ltg_det_plot_pmts_transaction_type,
            ltg_det_plot_pmts_stamp_duty_registration_charges,
            ltg_det_plot_pmts_total_project_extent,
            ltg_det_plot_pmts_plot_approval_authority,
            ltg_det_plot_pmts_year_built,
            ltg_det_plot_pmts_total_units,
            ltg_det_plot_pmts_total_phases,
            ltg_det_plot_amenities,
            ltg_det_plot_about_project_builder,
            ltg_det_plot_property_video_url,
            ltg_det_audit_user,
            ltg_det_ploat_create_date,
            ltg_det_ploat_update_date
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.ListingData.price}', 
            '${req.body.ListingData.salePrice}', 
            '${req.body.ListingData.suffixPrice}', 
            '${req.body.ListingData.content}',
            '${req.body.ListingData.MapRow.location}',
            '${req.body.ListingData.MapRow.address}',
            '${req.body.ListingData.MapRow.postalCode}',
            '${req.body.ListingData.MapRow.latitude}',
            '${req.body.ListingData.MapRow.longitude}',
            '${req.body.ListingData.propertyAddressDetails}', 
            '${req.body.ListingData.areaDetails}', 
            '${req.body.ListingData.ratePerSqFt}', 
            '${req.body.ListingData.selectedStatus}', 
            '${req.body.ListingData.plotDimensions}', 
            '${req.body.ListingData.floorsAllowedForConstruction}', 
            '${req.body.ListingData.noOfOpenSides}', 
            '${req.body.ListingData.plotFacing}', 
            '${req.body.ListingData.cornerPlot}', 
            '${req.body.ListingData.isInGatedCommunity}', 
            '${req.body.ListingData.boundaryWallMade}', 
            '${req.body.ListingData.approachingRoadWidth}',
            '${req.body.ListingData.transactionType}',
            '${req.body.ListingData.stampDutyAndRegistrationCharges}',
            '${req.body.ListingData.totalProjectExtent}',
            '${req.body.ListingData.plotApprovalAuthority}', 
            '${req.body.ListingData.yearBuilt}', 
            '${req.body.ListingData.totalUnits}', 
            '${req.body.ListingData.totalPhases}', 
            '${req.body.ListingData.selectedAmenities}', 
            '${req.body.ListingData.projectBuilderDetails}', 
            '${req.body.ListingData.videoUrl}', 
            '${req.body.auditUser}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}')`;

      
			try {
				const [results_det] = await db.query(q_det);
				console.log("Data inserted into ltg_det successfully");
				res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
			  } catch (error) {
				console.error("Error inserting into ltg_det:", error.stack);
				res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
			  }
        }
        else if(req.body.listingType == "RowHouses"){
          const q_det =
          `INSERT INTO ltg_det_row_houses
            (ltg_det_mstRowID, 
              ltg_det_row_house_price,  
              ltg_det_row_house_sale_price, 
              ltg_det_row_house_suffix_price,
              ltg_det_row_house_desc, 
              ltg_det_row_house_location, 
              ltg_det_row_house_address, 
              ltg_det_row_house_postal_code,
              ltg_det_row_house_latitude, 
              ltg_det_row_house_longitude,
            	ltg_det_row_house_property_address_details,
              ltg_det_row_house_pmts_area_dts,
            	ltg_det_row_house_pmts_rate_per_sq,
              ltg_det_row_house_pmts_status,
              ltg_det_row_house_pmts_bed_rooms,
            	ltg_det_row_house_pmts_bath_rooms,
              ltg_det_row_house_pmts_car_parking,
              ltg_det_row_house_pmts_year_built,
              ltg_det_row_house_pmts_plot_dimensions,
              ltg_det_row_house_pmts_land_uds_area,
              ltg_det_row_house_pmts_over_looking,
              ltg_det_row_house_pmts_main_door_facing,
            	ltg_det_row_house_pmts_corner_rowhouse,
              ltg_det_row_house_pmts_gated_community,
              ltg_det_row_house_pmts_balconies,
              ltg_det_row_house_pmts_other_advantages,
              ltg_det_row_house_pmts_approaching_road_width,
              ltg_det_row_house_pmts_furnishing,
              ltg_det_row_house_pmts_property_flooring,
              ltg_det_row_house_pmts_no_of_open_sides,
              ltg_det_row_house_pmts_total_project_extent,
            	ltg_det_row_house_pmts_available_from,
              ltg_det_row_house_pmts_stamp_duty_registration_charges,
              ltg_det_row_house_pmts_transaction_type,
              ltg_det_row_house_pmts_approval_authority,
              ltg_det_row_house_pmts_total_units,
              ltg_det_row_house_pmts_total_phases,
              ltg_det_row_house_amenities,
              ltg_det_row_house_about_project_builder,
              ltg_det_row_house_property_video_url,
              ltg_det_audit_user,
              ltg_det_row_house_create_date,
              ltg_det_row_house_update_date
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.ListingData.price}', 
            '${req.body.ListingData.salePrice}', 
            '${req.body.ListingData.suffixPrice}', 
            '${req.body.ListingData.content}',
            '${req.body.ListingData.MapRow.location}',
            '${req.body.ListingData.MapRow.address}',
            '${req.body.ListingData.MapRow.postalCode}',
            '${req.body.ListingData.MapRow.latitude}',
            '${req.body.ListingData.MapRow.longitude}',
            '${req.body.ListingData.propertyAddressDetails}', 
            '${req.body.ListingData.areaDetails}', 
            '${req.body.ListingData.ratePerSqFt}', 
            '${req.body.ListingData.selectedStatus}',
            '${req.body.ListingData.selectedBedRooms}',
            '${req.body.ListingData.selectedBathRooms}',
            '${req.body.ListingData.selectedCarParking}',
            '${req.body.ListingData.yearBuilt}', 
            '${req.body.ListingData.plotDimensions}',
            '${req.body.ListingData.landUDSArea}',
            '${req.body.ListingData.overLooking}',
            '${req.body.ListingData.mainDoorFacing}',
            '${req.body.ListingData.isCornerRowhouse}',
            '${req.body.ListingData.isInGatedCommunity}', 
            '${req.body.ListingData.balconies}',
            '${req.body.ListingData.otherAdvantages}',
            '${req.body.ListingData.approachingRoadWidth}',
            '${req.body.ListingData.furnishing}',
            '${req.body.ListingData.propertyFlooring}',
            '${req.body.ListingData.noOfOpenSides}', 
            '${req.body.ListingData.totalProjectExtent}',
            '${req.body.ListingData.availableFrom}',
            '${req.body.ListingData.stampDutyAndRegistrationCharges}',
            '${req.body.ListingData.transactionType}',
            '${req.body.ListingData.approvalAuthority}',
            '${req.body.ListingData.totalUnits}', 
            '${req.body.ListingData.totalPhases}', 
            '${req.body.ListingData.selectedAmenities}', 
            '${req.body.ListingData.projectBuilderDetails}', 
            '${req.body.ListingData.videoUrl}', 
            '${req.body.auditUser}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}')`;

			try {
				const [results_det] = await db.query(q_det);
				console.log("Data inserted into ltg_det successfully");
				res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
			  } catch (error) {
				console.error("Error inserting into ltg_det:", error.stack);
				res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
			  }
        }
        else if(req.body.listingType == "CommercialProperties"){
          const q_det =
          `INSERT INTO ltg_det_commercial_properties
            (ltg_det_mstRowID, 
              ltg_det_comm_prop_price,  
              ltg_det_comm_prop_sale_price, 
              ltg_det_comm_prop_suffix_price,
              ltg_det_comm_prop_desc, 
              ltg_det_comm_prop_location, 
              ltg_det_comm_prop_address, 
              ltg_det_comm_prop_postal_code,
              ltg_det_comm_prop_latitude, 
              ltg_det_comm_prop_longitude,
              ltg_det_comm_prop_pmts_area_dts,
              ltg_det_comm_prop_pmts_rate_per_sq,
            	ltg_det_comm_prop_pmts_status,
              ltg_det_comm_prop_pmts_year_built,
              ltg_det_comm_prop_pmts_balconies,
              ltg_det_comm_prop_pmts_other_advantages,
              ltg_det_comm_prop_pmts_furnishing,
              ltg_det_comm_prop_pmts_car_parking,
              ltg_det_comm_prop_pmts_total_floors,
              ltg_det_comm_prop_pmts_property_on_floor,
              ltg_det_comm_prop_pmts_total_units,
              ltg_det_comm_prop_pmts_transaction_type,
              ltg_det_comm_prop_pmts_approaching_road_width,
              ltg_det_comm_prop_pmts_approval_authority,
              ltg_det_comm_prop_pmts_total_phases,
              ltg_det_comm_prop_pmts_total_project_extent,
              ltg_det_comm_prop_pmts_stamp_duty_registration_charges,
              ltg_det_comm_prop_pmts_property_flooring,
              ltg_det_comm_prop_amenities,
              ltg_det_comm_prop_about_project_builder,
              ltg_det_comm_prop_property_video_url,
            	ltg_det_audit_user,
              ltg_det_comm_prop_create_date,
              ltg_det_comm_prop_update_date
              
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.ListingData.price}', 
            '${req.body.ListingData.salePrice}', 
            '${req.body.ListingData.suffixPrice}', 
            '${req.body.ListingData.content}',
            '${req.body.ListingData.MapRow.location}',
            '${req.body.ListingData.MapRow.address}',
            '${req.body.ListingData.MapRow.postalCode}',
            '${req.body.ListingData.MapRow.latitude}',
            '${req.body.ListingData.MapRow.longitude}',
            '${req.body.ListingData.areaDetails}', 
            '${req.body.ListingData.ratePerSqFt}', 
            '${req.body.ListingData.selectedStatus}',
            '${req.body.ListingData.yearBuilt}',
            '${req.body.ListingData.balconies}',
            '${req.body.ListingData.otherAdvantages}',
            '${req.body.ListingData.furnishing}',
            '${req.body.ListingData.selectedCarParking}',
            '${req.body.ListingData.totalFloors}',
            '${req.body.ListingData.propertyOnFloor}',
            '${req.body.ListingData.totalUnits}', 
            '${req.body.ListingData.transactionType}',
            '${req.body.ListingData.approachingRoadWidth}',
            '${req.body.ListingData.approvalAuthority}',
            '${req.body.ListingData.totalPhases}', 
            '${req.body.ListingData.totalProjectExtent}',
            '${req.body.ListingData.stampDutyAndRegistrationCharges}',
            '${req.body.ListingData.propertyFlooring}',
            '${req.body.ListingData.selectedAmenities}', 
            '${req.body.ListingData.projectBuilderDetails}',
            '${req.body.ListingData.videoUrl}',  
            '${req.body.auditUser}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}')`;

          try {
				const [results_det] = await db.query(q_det);
				console.log("Data inserted into ltg_det successfully");
				res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
			  } catch (error) {
				console.error("Error inserting into ltg_det:", error.stack);
				res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
			  }
        }
        else if(req.body.listingType == "Villaments"){
          const q_det =
          `INSERT INTO ltg_det_villaments
            (	ltg_det_mstRowID, 
              ltg_det_villaments_price,  
              ltg_det_villaments_sale_price, 
              ltg_det_villaments_suffix_price,
              ltg_det_villaments_desc, 
              ltg_det_villaments_location, 
              ltg_det_villaments_address, 
              ltg_det_villaments_postal_code,
              ltg_det_villaments_latitude, 
              ltg_det_villaments_longitude,
              ltg_det_villaments_property_address_details,
              ltg_det_villaments_pmts_area_dts,
            	ltg_det_villaments_pmts_rate_per_sq,
              ltg_det_villaments_pmts_status,
              ltg_det_villaments_pmts_bed_rooms,
              ltg_det_villaments_pmts_bath_rooms,
              ltg_det_villaments_pmts_car_parking,
              ltg_det_villaments_pmts_year_built,
              ltg_det_villaments_pmts_land_uds_area,
              ltg_det_villaments_pmts_duplex,
              ltg_det_villaments_pmts_no_of_open_sides,
              ltg_det_villaments_pmts_main_door_facing,
              ltg_det_villaments_pmts_corner_villament,
              ltg_det_villaments_pmts_gated_community,
              ltg_det_villaments_pmts_balconies,
              ltg_det_villaments_pmts_approaching_road_width,
              ltg_det_villaments_pmts_over_looking,
              ltg_det_villaments_pmts_furnishing,
              ltg_det_villaments_pmts_property_flooring,
              ltg_det_villaments_pmts_other_advantages,
              ltg_det_villaments_pmts_available_from,
              ltg_det_villaments_pmts_total_project_extent,
              ltg_det_villaments_pmts_transaction_type,
              ltg_det_villaments_pmts_stamp_duty_registration_charges,
              ltg_det_villaments_pmts_approval_authority,
              ltg_det_villaments_pmts_total_units,
              ltg_det_villaments_pmts_total_phases,
              ltg_det_villaments_amenities,
              ltg_det_villaments_about_project_builder,
              ltg_det_villaments_property_video_url,
            	ltg_det_audit_user,
              ltg_det_villaments_property_create_date,
              ltg_det_villaments_property_update_date
              
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.ListingData.price}', 
            '${req.body.ListingData.salePrice}', 
            '${req.body.ListingData.suffixPrice}', 
            '${req.body.ListingData.content}',
            '${req.body.ListingData.MapRow.location}',
            '${req.body.ListingData.MapRow.address}',
            '${req.body.ListingData.MapRow.postalCode}',
            '${req.body.ListingData.MapRow.latitude}',
            '${req.body.ListingData.MapRow.longitude}',
            '${req.body.ListingData.propertyAddressDetails}',
            '${req.body.ListingData.areaDetails}', 
            '${req.body.ListingData.ratePerSqFt}', 
            '${req.body.ListingData.selectedStatus}',
            '${req.body.ListingData.selectedBedRooms}',
            '${req.body.ListingData.selectedBathRooms}',
            '${req.body.ListingData.selectedCarParking}',
            '${req.body.ListingData.yearBuilt}',
            '${req.body.ListingData.landUDSArea}',
            '${req.body.ListingData.selectedDuplex}',
            '${req.body.ListingData.noOfOpenSides}',
            '${req.body.ListingData.mainDoorFacing}',
            '${req.body.ListingData.isCornerVillament}',
            '${req.body.ListingData.isInGatedCommunity}',
            '${req.body.ListingData.balconies}',
            '${req.body.ListingData.approachingRoadWidth}',
            '${req.body.ListingData.overLooking}',
            '${req.body.ListingData.furnishing}',
            '${req.body.ListingData.propertyFlooring}',
            '${req.body.ListingData.otherAdvantages}',
            '${req.body.ListingData.availableFrom}',
            '${req.body.ListingData.totalProjectExtent}',
            '${req.body.ListingData.transactionType}',
            '${req.body.ListingData.stampDutyAndRegistrationCharges}',
            '${req.body.ListingData.approvalAuthority}',
            '${req.body.ListingData.totalUnits}', 
            '${req.body.ListingData.totalPhases}', 
            '${req.body.ListingData.projectBuilderDetails}',
            '${req.body.ListingData.selectedAmenities}',
            '${req.body.ListingData.videoUrl}', 
            '${req.body.auditUser}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}')`;

            try {
				const [results_det] = await db.query(q_det);
				console.log("Data inserted into ltg_det successfully");
				res.status(200).json({ message: "Listing created successfully", status: "SUCCESS", RowID: lastInsertId });
			  } catch (error) {
				console.error("Error inserting into ltg_det:", error.stack);
				res.status(500).json({ error: "Error inserting into ltg_det", status: "error" });
			  }
        }
        else if(req.body.listingType == "PentHouses"){
          const q_det =
          `INSERT INTO ltg_det_penthouses
            (ltg_det_mstRowID, 
              ltg_det_penthouses_price,  
              ltg_det_penthouses_sale_price, 
              ltg_det_penthouses_suffix_price,
              ltg_det_penthouses_desc, 
              ltg_det_penthouses_location, 
              ltg_det_penthouses_address, 
              ltg_det_penthouses_postal_code,
              ltg_det_penthouses_latitude, 
              ltg_det_penthouses_longitude,
              ltg_det_penthouses_property_address_details,
              ltg_det_penthouses_pmts_area_dts,
            	ltg_det_penthouses_pmts_rate_per_sq,
              ltg_det_penthouses_pmts_status,
              ltg_det_penthouses_pmts_bed_rooms,
              ltg_det_penthouses_pmts_bath_rooms,
              ltg_det_penthouses_pmts_car_parking,
              ltg_det_penthouses_pmts_year_built,
              ltg_det_penthouses_pmts_duplex,
              ltg_det_penthouses_pmts_main_door_facing,
              ltg_det_penthouses_pmts_gated_community,
              ltg_det_penthouses_pmts_corner_penthouse,
              ltg_det_penthouses_pmts_balconies,
              ltg_det_penthouses_pmts_furnishing,
              ltg_det_penthouses_pmts_over_looking,
              ltg_det_penthouses_pmts_transaction_type,
              ltg_det_penthouses_pmts_property_flooring,
              ltg_det_penthouses_pmts_other_advantages,
              ltg_det_penthouses_pmts_no_of_open_sides,
              ltg_det_penthouses_pmts_approaching_road_width,
              ltg_det_penthouses_pmts_available_form,
              ltg_det_penthouses_pmts_approval_authority,
              ltg_det_penthouses_pmts_total_project_extent,
              ltg_det_penthouses_pmts_stamp_duty_registration_charges,
              ltg_det_penthouses_pmts_total_phases,
              ltg_det_penthouses_pmts_total_units,
              ltg_det_penthouses_amenities,
              ltg_det_penthouses_about_project_builder,
              ltg_det_penthouses_property_video_url,
              ltg_det_audit_user,
              ltg_det_penthouses_create_date,
              ltg_det_penthouses_update_date
              
            )
            VALUES
            (
            '${lastInsertId}', 
            '${req.body.ListingData.price}', 
            '${req.body.ListingData.salePrice}', 
            '${req.body.ListingData.suffixPrice}', 
            '${req.body.ListingData.content}',
            '${req.body.ListingData.MapRow.location}',
            '${req.body.ListingData.MapRow.address}',
            '${req.body.ListingData.MapRow.postalCode}',
            '${req.body.ListingData.MapRow.latitude}',
            '${req.body.ListingData.MapRow.longitude}',
            '${req.body.ListingData.propertyAddressDetails}',
            '${req.body.ListingData.areaDetails}', 
            '${req.body.ListingData.ratePerSqFt}', 
            '${req.body.ListingData.selectedStatus}',
            '${req.body.ListingData.selectedBedRooms}',
            '${req.body.ListingData.selectedBathRooms}',
            '${req.body.ListingData.selectedCarParking}',
            '${req.body.ListingData.yearBuilt}',
            '${req.body.ListingData.selectedDuplex}',
            '${req.body.ListingData.mainDoorFacing}',
            '${req.body.ListingData.isInGatedCommunity}',
            '${req.body.ListingData.isCornerPenthouse}',
            '${req.body.ListingData.balconies}',
            '${req.body.ListingData.furnishing}',
            '${req.body.ListingData.overLooking}',
            '${req.body.ListingData.transactionType}',
            '${req.body.ListingData.propertyFlooring}',
            '${req.body.ListingData.otherAdvantages}',
            '${req.body.ListingData.noOfOpenSides}',
            '${req.body.ListingData.approachingRoadWidth}',
            '${req.body.ListingData.availableFrom}',
            '${req.body.ListingData.approvalAuthority}',
            '${req.body.ListingData.totalProjectExtent}',
            '${req.body.ListingData.stampDutyAndRegistrationCharges}',
            '${req.body.ListingData.totalPhases}', 
            '${req.body.ListingData.totalUnits}', 
            '${req.body.ListingData.selectedAmenities}', 
            '${req.body.ListingData.projectBuilderDetails}',
            '${req.body.ListingData.videoUrl}', 
            '${req.body.auditUser}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}',
            '${moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")}')`;

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
			console.error("Error inserting property:", error.stack);
			res.status(500).json({ message: "Error inserting property", status: "error" });
		  }
      
      };

const getListItem = async(req, res) => {

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

// get Apartment by type
const getListingbyType = async (req, res) => {
  
   const { type } = req.params;
   //console.log("type____",type);
   let query = '';
   if(type === "Plots"){
     query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_plots ON ltg_mst.RowID = ltg_det_plots.ltg_det_mstRowID LEFT JOIN ( SELECT * FROM ltg_ref GROUP BY ltg_mstRowID ) AS ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID WHERE ltg_mst.ltg_type = ? ORDER BY ltg_create_date DESC
  `;
   }else if(type === "RowHouses"){
    query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_row_houses ON ltg_mst.RowID = ltg_det_row_houses.ltg_det_mstRowID LEFT JOIN ( SELECT * FROM ltg_ref GROUP BY ltg_mstRowID ) AS ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID WHERE ltg_mst.ltg_type = ? ORDER BY ltg_create_date DESC
 `;
  }else if(type === "CommercialProperties"){
    query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_commercial_properties ON ltg_mst.RowID = ltg_det_commercial_properties.ltg_det_mstRowID LEFT JOIN ( SELECT * FROM ltg_ref GROUP BY ltg_mstRowID ) AS ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID WHERE ltg_mst.ltg_type = ? ORDER BY ltg_create_date DESC
 `;
  }else if(type === "Villaments"){
    query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_villaments ON ltg_mst.RowID = ltg_det_villaments.ltg_det_mstRowID LEFT JOIN ( SELECT * FROM ltg_ref GROUP BY ltg_mstRowID ) AS ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID   WHERE ltg_mst.ltg_type = ? ORDER BY ltg_create_date DESC
 `;
  }else if(type === "PentHouses"){
    query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_penthouses ON ltg_mst.RowID = ltg_det_penthouses.ltg_det_mstRowID LEFT JOIN ( SELECT * FROM ltg_ref GROUP BY ltg_mstRowID ) AS ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID   WHERE ltg_mst.ltg_type = ? ORDER BY ltg_create_date DESC
 `;
  }else{
     query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det ON ltg_mst.RowID = ltg_det.ltg_det_mstRowID LEFT JOIN ( SELECT * FROM ltg_ref GROUP BY ltg_mstRowID ) AS ltg_ref ON ltg_mst.RowID = ltg_ref.ltg_mstRowID WHERE ltg_mst.ltg_type = ? ORDER BY 
    ltg_create_date DESC
  `;
   }
 
  try {
    const [results, fields] = await db.query(query, [type]);
    res.json({ data: results, message: "Properties fetched successfully", status: "success" });
  } catch (error) {
    console.error("Error fetching properties: " + error.stack);
    res.status(500).json({ message: "Error fetching properties", status: "error" });
  }
  
}
// get SingleLsit Item
const getListItemId = async (req, res) => {
  
  const { id, type } = req.params; 
 
  let query = '';

  if(type === "Plots"){
    query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_plots ON ltg_mst.RowID = ltg_det_plots.ltg_det_mstRowID WHERE ltg_mst.RowID ='${id}'
 `;
  }else if(type === "RowHouses"){
    query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_row_houses ON ltg_mst.RowID = ltg_det_row_houses.ltg_det_mstRowID WHERE ltg_mst.RowID ='${id}'
 `;
  }else if(type === "CommercialProperties"){
    query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_commercial_properties ON ltg_mst.RowID = ltg_det_commercial_properties.ltg_det_mstRowID WHERE ltg_mst.RowID ='${id}'
 `;
  }
  else if(type === "Villaments"){
    query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_villaments ON ltg_mst.RowID = ltg_det_villaments.ltg_det_mstRowID WHERE ltg_mst.RowID ='${id}'
 `;
  }else if(type === "PentHouses"){
    query = `
    SELECT * FROM ltg_mst LEFT JOIN ltg_det_penthouses ON ltg_mst.RowID = ltg_det_penthouses.ltg_det_mstRowID WHERE ltg_mst.RowID ='${id}'
 `;
  }
  else{
    query = `
  SELECT * FROM ltg_mst LEFT JOIN ltg_det ON ltg_mst.RowID = ltg_det.ltg_det_mstRowID  WHERE ltg_mst.RowID ='${id}'
  `;
  }
  
  try {
    const [results, fields] = await db.query(query);
    res.json({ data: results, message: "Properties fetched successfully", status: "success" });
  } catch (error) {
    console.error("Error fetching properties: " + error.stack);
    res.status(500).json({ message: "Error fetching properties", status: "error" });
  }

};
// get Single page img 

const getsinglePageImg = async (req, res) => {
  const { id } = req.params; 

  const query = `
    SELECT * FROM ltg_ref WHERE ltg_mstRowID = ?
  `;

  try {
    const [results] = await db.query(query, [id]);

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

// update List
const updateListItem = (req, res) => {
  const propertyId = req.params.id;
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
    "UPDATE listings SET `name` = ?, `description` = ?, `address` = ?, `price` = ?, `bathrooms` = ?, `furnished` = ?, `parking` = ?, `type` = ?, `category` = ?, `restaurant` = ?, `bus` = ?, `school` = ?, `size` = ?, `flore` = ?, `cityId` = ?, `bedrooms` = ? WHERE `id` = ?";

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
    req.params.id,
  ];

  const duplicateQuery =
    "SELECT * FROM listings WHERE (name = ? OR address = ?) AND id != ?";
  db.query(duplicateQuery, [name, address, propertyId], (error, results) => {
    if (error) {
      console.error("Error checking for duplicate listings:", error.stack);
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

const deleteListItem = (req, res) => {
  const propertyId = req.params.id;
  const q = "SELECT userId FROM listings WHERE id = ?";
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

    const query = "DELETE FROM listings WHERE id = ?";
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
// const uploadListItem = async(req, res) => {
// console.log("insert____");
  // try {
    // if (!req.files || req.files.length === 0) {
      
      // return res.status(400).send("No files were uploaded.");
    // }
    // console.log("insert____2");
    // const insertQuery2 =
                // "INSERT INTO ltg_ref (`ltg_mstRowID`,`file_name`,`attachment`,`type`,`audit_user`,`audit_date`) VALUES ?";
    // const values = req.files.map((file) => {
      // const url = file.path.replace("public", "");
      // const now = new Date();
      // const formattedDate = now.toISOString().slice(0, 10);
     // // console.log("url", url);
      
      // return [
        // req.params.id,                      
        // file.originalname,                
        // url,                              
        // req.body.type,                              
        // 'admin',                           
        // formattedDate 
    // ];
    // });

    // // Check if URLs already exist in the database
    // const existingUrlsQuery =
      // "SELECT attachment FROM ltg_ref WHERE ltg_mstRowID = ?";
    // db.query(existingUrlsQuery, [req.params.id], (err, results) => {
     // console.log("results___",results);
      // if (err) {
        // console.error("Error retrieving existing URLs from database:", err);
        // return res.status(500).send("Internal Server Error");
      // }

      // const existingUrls = results.map((row) => row.attachment);
      // const uniqueValues = values.filter(
        // (value) => !existingUrls.includes(value[2])
      // );

      // if (uniqueValues.length === 0) {
       
       // // return res.status(400).send("No new images to insert.");
        // return res.status(400).json({ message: "No new images to insert", status: "ERROR" });
      // }

      // db.query(insertQuery2, [uniqueValues], (err, results) => {
        // console.log("results____");
        // if (err) {
          // console.error("Error inserting URLs into database:", err);
        // //  return res.status(500).send("Internal Server Error");
          // return res.status(500).json({ message: "Internal Server Error", status: "ERROR" });
        // }
       // // res.status(200).send("Images inserted successfully");
        // res.status(200).json({ message: "Listing Img upload successfully", status: "SUCCESS" });
      // });
    // });
  // } catch (error) {
    // console.error("Error processing file uploads:", error);
    // res.status(500).send("Internal Server Error");
  // }
// };

const uploadListItem = async (req, res) => {
  console.log("insert____");

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    console.log("insert____2");
    const insertQuery =
      "INSERT INTO ltg_ref (`ltg_mstRowID`, `file_name`, `attachment`, `type`, `audit_user`, `audit_date`) VALUES ?";
    
    const values = req.files.map((file) => {
      const url = file.path.replace("public", "");
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);

      return [
        req.params.id,
        file.originalname,
        url,
        req.body.type,
        'admin',
        formattedDate
      ];
    });

    // Check if URLs already exist in the database
    const existingUrlsQuery =
      "SELECT attachment FROM ltg_ref WHERE ltg_mstRowID = ?";
    
    const [existingUrlsResults, _] = await db.query(existingUrlsQuery, [req.params.id]);
    const existingUrls = existingUrlsResults.map((row) => row.attachment);

    const uniqueValues = values.filter(
      (value) => !existingUrls.includes(value[2])
    );

    if (uniqueValues.length === 0) {
      return res.status(400).json({ message: "No new images to insert", status: "ERROR" });
    }

    const [insertResults, __] = await db.query(insertQuery, [uniqueValues]);
    console.log("insertResults:", insertResults);

    res.status(200).json({ message: "Listing Img upload successfully", status: "SUCCESS" });

  } catch (error) {
    console.error("Error processing file uploads:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = uploadListItem;

// Delete Images
const deleteListImage = (req, res) => {
  const propertyId = req.params.id;

  const deleteQuery = "DELETE FROM propertyimages WHERE id = ?";

  db.query(deleteQuery, [propertyId], (err, results) => {
    if (err) {
      console.error("Error deleting images from database:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send("Images deleted successfully");
  });
};

// Update List Image
const updateListImage = (req, res) => {
  const imageId = req.params.id;

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
  addListings,
  getListItem,
  getListingbyType,
  updateListItem,
  deleteListItem,
  uploadListItem,
  deleteListImage,
  updateListImage,
  getListItemId,
  getsinglePageImg,
};
