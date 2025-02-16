import * as XLSX from "xlsx-js-style";

const ExportToExcel = (tableData,dropdownValue) => {
  const dropdownVl = dropdownValue;
  console.log("dropdownVl____",dropdownVl);
  if (!tableData || tableData.length === 0) {
    alert("No data to export.");
    return;
  }

  console.log("Original tableData:", tableData);
  let headers = [];
  let formattedData = [];
  let columnWidths = [];

  if (!dropdownValue || dropdownValue === "") {
    // Default headers
    headers = [
      ["Property Title", "Property Name", "Sale Price", "Suffix Price", "Type", "Address", "City", "Size"]
    ];

    // Default data mapping
    formattedData = tableData.map((item) => [
      item.ltg_title || "",
      item.ltg_projectName || "",
      item.ltg_det_sale_price || "",
      item.ltg_det_suffix_price || "",
      item.ltg_type || "",
      item.ltg_det_location || "",
      item.ltg_regions || "",
      item.ltg_det_pmts_area_dts || "",
    ]);

    columnWidths = [
      { wch: 30 }, 
      { wch: 25 }, 
      { wch: 15 }, 
      { wch: 15 }, 
      { wch: 20 }, 
      { wch: 40 }, 
      { wch: 20 }, 
      { wch: 15 }  
    ];

  } else if (dropdownValue == "Apartments") {
   
    headers = [
      ["Property Type", "Project Name","Region","Category","Price","Location","Flat Super Area","Bed Rooms","Bath Rooms","Status","Flat On Floor","Total Floors","Main Door Facing","Balconies","Furnishing","Year Built","Total Project Extent","Total Blocks","Total Towers in Society","Total Flats in Society","Approaching Road Width","Other Advantages","Transaction Type","Approval Authority"]
    ];

    
    formattedData = tableData.map((item) => [
      item.ltg_type || "",
      item.ltg_projectName || "",
      item.ltg_regions || "",
      item.ltg_categories || "",
      item.ltg_det_sale_price || "",
      item.ltg_det_location || "",
      item.ltg_det_pmts_area_dts || "",
      item.ltg_det_pmts_bed_rom || "",
      item.ltg_det_pmts_bth_rom || "",
      item.ltg_det_pmts_status || "",
      item.ltg_det_pmts_flat_on_flr || "",
      item.ltg_det_pmts_total_flrs || "",
      item.ltg_det_pmts_main_dor_facing || "",
      item.ltg_det_pmts_balconies || "",
      item.ltg_det_pmts_furnishing || "",
      item.ltg_det_pmts_year_build || "",
      item.ltg_det_totl_project_extent || "",
      item.ltg_det_pmts_totl_block || "",
      item.ltg_det_pmts_total_towrs || "",
      item.ltg_det_pmts_totalFlatsInSociety || "",
      item.ltg_det_pmts_approaching_road_width || "",
      item.ltg_det_pmts_other_advtages || "",
      item.ltg_det_pmts_transaction_typ || "",
      item.ltg_det_pmts_approval_authority || ""
    
    ]);

    columnWidths = [
      { wch: 30 }, 
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 }
      
    ];

  } else if(dropdownValue == "Plots"){
    headers = [
      ["Property Type", "Project Name", "Region", "Category", "Price", "Location", "Plot Area Details","Plot Dimensions","Plot Facing","Is this Corner Plot","No Of Open Sides","Status","Approaching Road Width","Is In Gated Community","Floors Allowed For Construction","Total Project Extent","Transaction Type","Year Built","Total Units","Plot Approved By","Rate Per Sq-Ft"]
    ];

    // Custom data mapping
    formattedData = tableData.map((item) => [
      item.ltg_type || "",
      item.ltg_projectName || "",
      item.ltg_regions || "",
      item.ltg_categories || "",
      item.ltg_det_plot_sale_price || "",
      item.ltg_det_plot_location || "",
      item.ltg_det_plot_pmts_area_dts || "",
      item.ltg_det_plot_pmts_plot_dimensions || "",
      item.ltg_det_plot_pmts_plot_facing || "",
      item.ltg_det_plot_pmts_corner_plot || "",
      item.ltg_det_plot_pmts_no_of_open_sides || "",
      item.ltg_det_plot_pmts_status || "",
      item.ltg_det_plot_pmts_approaching_road_width || "",
      item.ltg_det_plot_pmts_gated_community || "",
      item.ltg_det_plot_pmts_floors_allowed_for_construction || "",
      item.ltg_det_plot_pmts_total_project_extent || "",
      item.ltg_det_plot_pmts_transaction_type || "",
      item.ltg_det_plot_pmts_year_built || "",
      item.ltg_det_plot_pmts_total_units || "",
      item.ltg_det_plot_pmts_plot_approval_authority || "",
      item.ltg_det_plot_pmts_rate_per_sq || "",
    ]);

    columnWidths = [
      { wch: 30 }, 
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      
      
    ];
  } else if(dropdownValue == "Villas"){
    headers = [
      ["Property Type", "Project Name", "Region", "Category", "Price", "Location", "Villa Built Area","Total Floors","Bed Rooms","Corner Villa","Plot Facing","Main Door Facing","Plot Area","Plot Dimensions","Furnishing","Approaching Road Width","Is In Gated Community","Year Built","Transaction Type","Status","Total Project Extent","Total Units","Approved By"]
    ];

    // Custom data mapping
    formattedData = tableData.map((item) => [
      item.ltg_type || "",
      item.ltg_projectName || "",
      item.ltg_regions || "",
      item.ltg_categories || "",
      item.ltg_det_sale_price || "",
      item.ltg_det_location || "",
      item.ltg_det_pmts_area_dts || "",
      item.ltg_det_pmts_total_flrs || "",
      item.ltg_det_pmts_bed_rom || "",
      item.ltg_det_corner_villa || "",
      item.ltg_det_pmts_plot_facing || "",
      item.ltg_det_pmts_main_dor_facing || "",
      item.ltg_det_plot_area || "",
      item.ltg_det_plot_dimensions || "",
      item.ltg_det_pmts_furnishing || "",
      item.ltg_det_pmts_approaching_road_width || "",
      item.ltg_det_gated_community || "",
      item.ltg_det_pmts_year_build || "",
      item.ltg_det_pmts_transaction_typ || "",
      item.ltg_det_pmts_status || "",
      item.ltg_det_totl_project_extent || "",
      item.ltg_det_pmts_totalunits || "",
      item.ltg_det_pmts_approval_authority || "",
    ]);

    columnWidths = [
      { wch: 30 }, 
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      
      
    ];

  }else if(dropdownValue == "PentHouses"){
    headers = [
      ["Penthouse Super Area", "Bed Rooms","Status","Penthouse On Floor","Total Floors","Main Door Facing","Private Terrace","Furnishing","Lifts In the Tower","Year Built","Total Project Extent","Total Towers in Society","Total Flats in Society","Approaching Road Width","Transaction Type","Approved By"]
    ];

    // Custom data mapping
    formattedData = tableData.map((item) => [
      item.ltg_det_penthouses_pmts_area_dts || "",
      item.ltg_det_penthouses_pmts_bed_rooms || "",
      item.ltg_det_penthouses_pmts_status || "",
      item.ltg_det_penthouses_pmts_penthouse_on_floor || "",
      item.ltg_det_penthouses_pmts_total_floors || "",
      item.ltg_det_penthouses_pmts_main_door_facing || "",
      item.ltg_det_penthouses_pmts_private_terrace || "",
      item.ltg_det_penthouses_pmts_furnishing || "",
      item.ltg_det_penthouses_pmts_lifts_in_tower || "",
      item.ltg_det_penthouses_pmts_year_built || "",
      item.ltg_det_penthouses_pmts_total_project_extent || "",
      item.ltg_det_penthouses_pmts_total_towers_in_society || "",
      item.ltg_det_penthouses_pmts_total_flats_in_society || "",
      item.ltg_det_penthouses_pmts_approaching_road_width || "",
      item.ltg_det_penthouses_pmts_transaction_type || "",
      item.ltg_det_pmts_approaching_road_width || "",
      item.ltg_det_penthouses_pmts_approval_authority || "",
     
    ]);

    columnWidths = [
      { wch: 30 }, 
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
     
      
      
    ];

  }
  else if(dropdownValue == "RowHouses"){
    headers = [
      ["Row Villa Built Area", "Total Floors","Bed Rooms","This Is A Corner Rowhouse","Property Facing","Main Door Facing","Land UDS Area","Plot Dimensions","Furnishing","Approaching Road Width","Year Built","Transaction Type","Status","Other Advantages","Total Project Extent","Total Units","Approval Authority"]
    ];

    // Custom data mapping
    formattedData = tableData.map((item) => [
      item.ltg_det_row_house_pmts_area_dts || "",
      item.ltg_det_row_house_pmts_total_floors || "",
      item.ltg_det_row_house_pmts_bed_rooms || "",
      item.ltg_det_row_house_pmts_corner_rowhouse || "",
      item.ltg_det_row_house_pmts_property_facing || "",
      item.ltg_det_row_house_pmts_main_door_facing || "",
      
      item.ltg_det_row_house_pmts_land_uds_area || "",
      item.ltg_det_row_house_pmts_plot_dimensions || "",
      item.ltg_det_row_house_pmts_furnishing || "",
      item.ltg_det_row_house_pmts_approaching_road_width || "",
      item.ltg_det_row_house_pmts_year_built || "",
      item.ltg_det_row_house_pmts_transaction_type || "",
      item.ltg_det_row_house_pmts_status || "",
      item.ltg_det_row_house_pmts_other_advantages || "",
      item.ltg_det_row_house_pmts_total_project_extent || "",
      item.ltg_det_row_house_pmts_total_units || "",
      item.ltg_det_row_house_pmts_approval_authority || "",
     
    ]);

    columnWidths = [
      { wch: 30 }, 
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      
    ];

  }
 
  const ws = XLSX.utils.aoa_to_sheet(headers); // Add headers first
  XLSX.utils.sheet_add_aoa(ws, formattedData, { origin: "A2" }); 

  // Apply custom styling to the header row (row 0)
  headers[0].forEach((_, colIndex) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex });
    ws[cellRef].s = {
      font: { bold: true, sz: 13, color: { rgb: "FFFFFF" } }, // White text, 18px
      fill: { fgColor: { rgb: "#808080" } }, // Red background
      alignment: { horizontal: "left", vertical: "left" }
    };
  });
  
  //setColumnWidths(ws);
  ws["!cols"] = columnWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Property Data");

  XLSX.writeFile(wb, "Property_Listing.xlsx");
};

export default ExportToExcel;
