import * as XLSX from "xlsx-js-style";

const ExportToExcel = (tableData) => {
  if (!tableData || tableData.length === 0) {
    alert("No data to export.");
    return;
  }

  //console.log("Original tableData:", tableData);

  // Define headers
  const headers = [["Property Title", "Property Name", "Sale Price", "Suffix Price", "Type","Address","City","Size"]];

  

  // Map tableData to match headers
  const formattedData = tableData.map((item) => [
     item.ltg_title || "" ,
     item.ltg_projectName || "" ,
     item.ltg_det_sale_price || "" ,
    item.ltg_det_suffix_price || "" ,
     item.ltg_type || "", 
   item.ltg_det_location || "", 
    item.ltg_regions || "", 
     item.ltg_det_pmts_area_dts || "",
    
  ]);
  const setColumnWidths = (ws) => {
    ws["!cols"] = [
      { wch: 50 }, // Property Name
      { wch: 30 }, // Project Name
      { wch: 15 }, // Price
      { wch: 18 }, // Expected Price
      { wch: 12 }, // Type
      { wch: 50 }, // Address
      { wch: 20 }, // City
      { wch: 10 }  // Size (sq ft)
    ];
  };
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
  
  setColumnWidths(ws);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Property Data");

  XLSX.writeFile(wb, "Property_Listing.xlsx");
};

export default ExportToExcel;
