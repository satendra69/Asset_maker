import { useMemo, useState ,useEffect} from "react";
import dayjs from 'dayjs';
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, Button, Dialog, Tooltip } from "@mui/material";
import { Edit, Delete, FileCopy as CopyIcon, PictureAsPdf,Sell  } from "@mui/icons-material";

import Swal from "sweetalert2";
import httpCommon from "../../../../http-common";
import CreatePDF from '../Component/CreatePDF';

function Table({ data, handleClose, open, setOpen, mutation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [soldData, setSoldData] = useState(null);
  const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const navigate = useNavigate();
  const [dropdownValue, setDropdownValue] = useState("");
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    // Extract unique `ltg_type` values
    const unique = Array.from(new Set(data.map((item) => item.ltg_type)));
    setUniqueTypes(unique);
    setFilteredData(data);
  }, [data]);

  const handleDropdownChange = (event) => {
    const selectedType = event.target.value;
    setDropdownValue(selectedType);
    const filtered = selectedType
    ? data.filter((item) => item.ltg_type === selectedType)
    : data;

  setFilteredData(filtered);
    console.log("Selected value:", event.target.value); // Perform any logic based on the dropdown selection
  };

  const getMainImageUrl = (attachments) => {
    if (!attachments || !Array.isArray(attachments)) {
      return httpCommon.defaults.baseURL + '\\images\\defaultasset.jpg';
    }
    const mainImage = attachments.find(att => att.type === "Main");
    return mainImage
      ? httpCommon.defaults.baseURL + mainImage.attachment
      : httpCommon.defaults.baseURL + '\\images\\defaultasset.jpg';
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getDynamicFields = (type) => {
    switch (type) {
      case 'CommercialProperties':
        return {
          desc: 'ltg_det_comm_prop_desc',
          salePrice: 'ltg_det_comm_prop_sale_price',
          area: 'ltg_det_comm_prop_pmts_area_dts',
          address: 'ltg_det_comm_prop_address',
        };
      case 'PentHouses':
        return {
          desc: 'ltg_det_penthouses_desc',
          salePrice: 'ltg_det_penthouses_sale_price',
          area: 'ltg_det_penthouses_pmts_area_dts',
          address: 'ltg_det_penthouses_address',
        };
      case 'Plots':
        return {
          desc: 'ltg_det_plot_desc',
          salePrice: 'ltg_det_plot_sale_price',
          area: 'ltg_det_plot_pmts_area_dts',
          address: 'ltg_det_plot_address',
        };
      case 'RowHouses':
        return {
          desc: 'ltg_det_row_house_desc',
          salePrice: 'ltg_det_row_house_sale_price',
          area: 'ltg_det_row_house_pmts_area_dts',
          address: 'ltg_det_row_house_address',
        };
      case 'Villaments':
        return {
          desc: 'ltg_det_villaments_desc',
          salePrice: 'ltg_det_villaments_sale_price',
          area: 'ltg_det_villaments_pmts_area_dts',
          address: 'ltg_det_villaments_address',
        };
      default:
        return {
          desc: 'ltg_det_desc',
          salePrice: 'ltg_det_sale_price',
          area: 'ltg_det_pmts_area_dts',
          address: 'ltg_det_address',
        };
    }
  };

  const formatText = (text) => {
    if (text !== undefined) {
      if (text === "AssetMakers") {
        return "Asset Makers";
      }
      return text.replace(/\b\w/g, char => char.toUpperCase());
    } else {
      return "";
    }
  };

  const formatSalePrice = (price) => {
    if (!price) return '';
    const strPrice = price.toString();
    const lastThreeDigits = strPrice.slice(-3);
    let otherDigits = strPrice.slice(0, -3);
    if (otherDigits.length > 0) {
      otherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    }
    return otherDigits.length > 0 ? otherDigits + ',' + lastThreeDigits : lastThreeDigits;

  };

  const columns = useMemo(
    () => [
      {
        id: "actions",
        header: "",
        size: 10,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Tooltip title="Edit Property">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    minWidth: 0,
                    width: 20,
                    height: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  // onClick={() => navigate(`/admin/property/edit/${row.original.ltg_det_mstRowID}`)}
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You are about to edit this property.",
                      icon: 'info',
                      showCancelButton: true,
                      confirmButtonText: 'Yes, edit it!',
                      cancelButtonText: 'Cancel'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate(`/admin/property/edit/${row.original.ltg_det_mstRowID}`);
                        // Swal.fire('Edited!', 'The property has been edited.', 'success');
                      }
                    });
                  }}
                >
                  <Edit style={{ fontSize: 15 }} />
                </Button>
              </Tooltip>

              <Tooltip title="Clone Property">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{
                    minWidth: 0,
                    width: 20,
                    height: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  // onClick={() => navigate(`/admin/property/clone/${row.original.ltg_det_mstRowID}`)}
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You are about to clone this property.",
                      icon: 'info',
                      showCancelButton: true,
                      confirmButtonText: 'Yes, clone it!',
                      cancelButtonText: 'Cancel'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate(`/admin/property/clone/${row.original.ltg_det_mstRowID}`);
                        // Swal.fire('Cloned!', 'The property has been cloned.', 'success');
                      }
                    });
                  }}
                >
                  <CopyIcon style={{ fontSize: 15 }} />
                </Button>
              </Tooltip>

              <Tooltip title="Delete Property">
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{
                    minWidth: 0,
                    width: 20,
                    height: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() => {
                    setSelectedId(row.original.ltg_det_mstRowID);
                    setSelectedType(row.original.ltg_type);
                    setOpen(true);
                  }}
                >
                  <Delete style={{ fontSize: 15 }} />
                </Button>
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Create PDF">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{
                    minWidth: 0,
                    width: 25,
                    height: 25,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() => {
                    setPdfData(row.original);
                    setOpenPdfDialog(true);
                  }}
                >
                  <PictureAsPdf style={{ fontSize: 15 }} />
                </Button>
              </Tooltip>

              <Tooltip title="SOLD Property">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{
                    minWidth: 0,
                    width: 25,
                    height: 25,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft:"5px"
                  }}
                  onClick={async () => {
                  // console.log("row.original____",row.original.ltg_type);
                    const isSoldChecked = row.original.ltg_det_sold_type === "1";
                    const isAvailableChecked = row.original.ltg_det_sold_type === "0";
                    const { value: formValues } = await Swal.fire({
                      title: "Are you sure?",
                      html: `
                      <p>Choose the status of the property:</p>
                      <div style="display: flex; flex-direction: column; align-items: flex-start; margin-top: 10px;">
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                          <input 
                            type="checkbox" 
                            id="availableCheckbox" 
                            name="statusCheckbox" 
                            ${isAvailableChecked ? "checked" : ""} 
                            onchange="document.getElementById('soldCheckbox').checked = false;"
                          />
                          <label for="availableCheckbox" style="margin-left: 5px;">Available</label>
                        </div>
                        <div style="display: flex; align-items: center;">
                          <input 
                            type="checkbox" 
                            id="soldCheckbox" 
                            name="statusCheckbox" 
                            ${isSoldChecked ? "checked" : ""} 
                            onchange="document.getElementById('availableCheckbox').checked = false;"
                          />
                          <label for="soldCheckbox" style="margin-left: 5px;">Mark as Sold</label>
                        </div>
                      </div>
                    `,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes",
                      cancelButtonText: "Cancel",
                      preConfirm: () => {
                        const availableCheckbox = document.getElementById("availableCheckbox");
                        const soldCheckbox = document.getElementById("soldCheckbox");
                
                        if (availableCheckbox.checked) {
                          return { soldStatus: "0" };
                        }
                        if (soldCheckbox.checked) {
                          return { soldStatus: "1" };
                        }
                
                        // Return null if neither checkbox is selected
                        Swal.showValidationMessage("Please select a status.");
                        return null;
                      },
                    });
                
                    if (formValues) {
                     // console.log("Sold Status:", formValues.soldStatus);
                      try {
                        const response = await httpCommon.post("/list/list_sold_out_update", {
                          id: row.original.ltg_det_mstRowID, // ID of the listing to update
                          soldStatus: formValues.soldStatus,
                          ltg_type: row.original.ltg_type,
                        });
                        console.log(response.data.message);
                        //setSoldData({ ...row.original, ltg_det_chekBox: formValues.soldStatus });
                        Swal.fire("Update!", "The property has been Updated.", "success");
                        window.location.reload();
                      } catch (error) {
                        console.error("Error updating property:", error);
                        Swal.fire("Error!", "There was an issue editing the property.", "error");
                      }
                    }
                  }}
               
                >
                  <Sell  style={{ fontSize: 15 }} />
                </Button>
              </Tooltip>
            </Box>
            
          </Box>
        ),
      },
      {
        id: "mainImage",
        header: "Property Image",
        size: 100,
        Cell: ({ row }) => {
          const imageUrl = getMainImageUrl(row.original.attachments);
          return (
            <img
              src={imageUrl}
              alt={row.original.ltg_title}
              style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
            />
          );
        },
      },
      {
        id: "ltg_title",
        header: "Property Title",
        accessorKey: "ltg_title",
        size: 200,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        id: "ltg_projectName",
        header: "Property Name",
        accessorKey: "ltg_projectName",
        size: 200,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        id: "ltg_owner",
        header: "Owner",
        accessorKey: "ltg_owner",
        size: 150,
        Cell: ({ cell }) => formatText(cell.getValue()),
      },
      {
        id: 'description',
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).desc],
        enableClickToCopy: true,
        filterVariant: 'autocomplete',
        header: 'Description',
        size: 300,
        Cell: ({ row }) => {
          const descriptionHtml = row.original[getDynamicFields(row.original.ltg_type).desc];
          if (!descriptionHtml) {
            return '';
          }
          const descriptionText = descriptionHtml.replace(/<[^>]*>/g, '').trim();
          const capitalizedDescription = descriptionText.charAt(0).toUpperCase() + descriptionText.slice(1);
          const updatedHtml = descriptionHtml.replace(descriptionText, capitalizedDescription);

          return (
            <Box
              sx={{
                maxWidth: '300px',
                maxHeight: '100px',
                whiteSpace: 'normal',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: updatedHtml }}
              />
            </Box>
          );
        },
      },
      {
        id: "salePrice",
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).salePrice],
        filterFn: "between",
        header: "Price",
        size: 50,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() < 50_000
                  ? theme.palette.error.dark
                  : cell.getValue() >= 50_000 && cell.getValue() < 75_000
                    ? theme.palette.warning.dark
                    : theme.palette.success.dark,
              borderRadius: "0.25rem",
              color: "#fff",
              maxWidth: "9ch",
              p: "0.25rem",
            })}
          >
            {formatSalePrice(cell.getValue())}
          </Box>
        ),
      },
      {
        accessorKey: "ltg_categories",
        header: "Category",
        size: 60,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        accessorKey: "ltg_type",
        header: "Type",
        size: 60,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).address],
        header: "Address",
        size: 80,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        accessorKey: "ltg_regions",
        header: "City",
        size: 50,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).area],
        header: "Size",
        size: 50,
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
      {
        id: "ltg_create_date",
        accessorKey: "ltg_create_date",
        header: "Added On",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return (
            <span>
              {dateValue ? dayjs(dateValue).format('YYYY-MM-DD') : ''}
            </span>
          );
        },
      },
    ], [navigate, setOpen]);

 

  const tableData = useMemo(() => {
    return (filteredData || []).map((item, index) => ({
      ...item,
      RowID: index + 1,
    }));
  }, [filteredData]);
  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableDensityToggle: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowSelection: true,
    enableStickyHeader: true,
    enableStickyFooter: true,

    initialState: {
      density: 'compact',
      pagination: { pageSize: 5 },
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: [],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [2, 5, 10, 15, 20],
      shape: "rounded",
      variant: "outlined",
    },
    muiTableBodyCellProps: {
      sx: { fontSize: '0.9rem' },
    },
    muiTableHeadCellProps: {
      sx: { fontSize: '1rem' },
    },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Custom Dropdown */}
        <Select
          value={dropdownValue}
          onChange={handleDropdownChange}
          displayEmpty
          size="small"
          variant="outlined"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">
          <em>Select Property Type</em>
        </MenuItem>
        {uniqueTypes.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
        </Select>
      </Box>
    ),
  });

  return (
    <div className="w-full mx-auto bg-black">
      <Dialog onClose={handleClose} open={open}>
        <div className="p-4 space-y-5">
          <h2>Are you sure want to delete</h2>
          <div className="flex items-center justify-end gap-5 button">
            <button
              className="px-3 py-2 border rounded-md shadow-sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedId !== null && selectedType !== null) {
                  mutation.mutate({ id: selectedId, type: selectedType });
                }
                setOpen(false);
              }}
              className="px-3 py-2 text-white bg-red-600 border rounded-md shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>

      {/* Create PDF Dialog */}
      <CreatePDF open={openPdfDialog} onClose={() => setOpenPdfDialog(false)} data={pdfData} />

      <MaterialReactTable
        table={table}
      />
    </div>
  );
}

export default Table;
