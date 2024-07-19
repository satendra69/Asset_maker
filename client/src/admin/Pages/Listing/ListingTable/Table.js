import { useMemo, useState } from "react";
import dayjs from 'dayjs';
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { useNavigate } from "react-router-dom";
//Material UI Imports
import {
  Box,
  Button,
  Dialog,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from "@mui/material";
import { Edit, Delete, AccountCircle, Send } from "@mui/icons-material";
//Icons Imports
import { FaTrash } from "react-icons/fa";
import httpCommon from "../../../../http-common";
import { toast, Toaster } from "sonner";

function Table({ data, handleClose, open, setOpen, mutation }) {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

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

  const columns = useMemo(
    () => [
      {
        id: "ltg_title",
        header: "Property Title",
        accessorKey: "ltg_title",
        size: 200,
      },
      {
        id: "ltg_type",
        header: "Type",
        accessorKey: "ltg_type",
        size: 100,
      },
      {
        id: "ltg_owner",
        header: "Owner",
        accessorKey: "ltg_owner",
        size: 150,
      },
      {
        id: 'description',
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).desc],
        enableClickToCopy: true,
        filterVariant: 'autocomplete',
        header: 'Description',
        size: 300,
        Cell: ({ row }) => (
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
              dangerouslySetInnerHTML={{ __html: row.original[getDynamicFields(row.original.ltg_type).desc] }}
            />
          </Box>
        ),
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
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        accessorKey: "ltg_categories",
        header: "Category",
        size: 60,
      },
      {
        // accessorKey: "ltg_det_address",
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).address],
        header: "Address",
        size: 80,
      },
      {
        accessorKey: "ltg_regions", //hey a simple column for once
        header: "City",
        size: 50,
      },
      // {
      //   accessorKey: "ltg_det_pmts_area_dts", //hey a simple column for once
      //   header: "Size",
      //   size: 50,
      //   Cell: ({ renderedCellValue }) => <span>{renderedCellValue}sqrt</span>,
      // },
      // {
      //   accessorKey: "ltg_det_pmts_bth_rom", //hey a simple column for once
      //   header: "Bathrooms",
      //   size: 50,
      // },
      // {
      //   accessorKey: "ltg_det_pmts_bed_rom", //hey a simple column for once
      //   header: "Bedrooms",
      //   size: 50,
      // },
      // {
      //   accessorKey: "ltg_det_pmts_furnishing", //hey a simple column for once
      //   header: "Furnished",
      //   size: 50,
      // },
      // {
      //   accessorKey: "ltg_det_pmts_car_park", //hey a simple column for once
      //   header: "Parking",
      //   size: 50,
      // },
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
              {dateValue ? dayjs(dateValue).format('YYYY-MM-DD HH:mm') : ''}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        size: 150,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/admin/property/edit/${row.original.RowID}`)}
              startIcon={<Edit />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setSelectedId(row.original.RowID);
                console.log("original", row.original.RowID);
                setOpen(true);
              }}
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </Box>
        ),
      },
    ], [navigate, setOpen]);

  const tableData = useMemo(() => data.map((item, index) => ({
    ...item,
    RowID: index + 1 // Adding a unique RowID for each item
  })), [data]);

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

    initialState: {
      // showColumnFilters: true,
      density: 'compact',
      pagination: { pageSize: 8 },
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
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
      rowsPerPageOptions: [2, 5, 10],
      shape: "rounded",
      variant: "outlined",
    },
    muiTableBodyCellProps: {
      sx: { fontSize: '0.9rem' },
    },
    muiTableHeadCellProps: {
      sx: { fontSize: '1rem' },
    },
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
                console.log("selectedId", selectedId);
                if (selectedId !== null) {
                  mutation.mutate(selectedId);
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
      <MaterialReactTable
        table={table}
      />
    </div>
  );
}

export default Table;
