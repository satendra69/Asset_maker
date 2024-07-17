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

//Icons Imports
import { AccountCircle, Edit, Send } from "@mui/icons-material";
import { FaTrash } from "react-icons/fa";

//Mock Data
// import { data } from "./data";

function Table({ data, handleClose, open, setOpen, mutation }) {
  const [id, setId] = useState(null);

  // const columns = useMemo(
  //   () => [
  //     {
  //       id: "image", //id is still required when using accessorFn instead of accessorKey
  //       header: "Name",
  //       accessorKey: "name",
  //       size: 80,
  //       Cell: ({ renderedCellValue, row }) => (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             alignItems: "center",
  //             gap: "1rem",
  //           }}
  //         >
  //           <img

  //             id={row && row.original && row.original.images && row.original.images[0] ? row.original.images[0].url : ""}
  //             alt="avatar"
  //             src={row && row.original && row.original.images && row.original.images[0] ? row.original.images[0].url : ""}
  //             loading="lazy"
  //             style={{ borderRadius: "50%", height: "50px", width: "50px" }}
  //           />
  //           {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
  //           <span>{renderedCellValue}</span>
  //         </Box>
  //       ),
  //     },
  //     {
  //       id: "description",
  //       accessorKey: "description", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
  //       enableClickToCopy: true,
  //       filterVariant: "autocomplete",
  //       header: "Description",
  //       size: 300,
  //       Cell: ({ row }) => (
  //         <div
  //           style={{
  //             maxWidth: "300px",
  //             whiteSpace: "nowrap",
  //             overflow: "hidden",
  //             // textOverflow: "ellipsis",
  //           }}
  //         >
  //           <p>{row && row.original && row.original.description ? row.original.description.split("\n")[0] : ""}</p>
  //         <p>{row && row.original && row.original.description ? row.original.description.split("\n")[1] : ""}</p>

  //           .......
  //         </div>
  //       ),
  //     },

  //     {
  //       accessorKey: "price",
  //       // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
  //       filterFn: "between",
  //       header: "Price",
  //       size: 50,
  //       //custom conditional format and styling
  //       Cell: ({ cell }) => (
  //         <Box
  //           component="span"
  //           sx={(theme) => ({
  //             backgroundColor:
  //               cell.getValue() < 50_000
  //                 ? theme.palette.error.dark
  //                 : cell.getValue() >= 50_000 && cell.getValue() < 75_000
  //                 ? theme.palette.warning.dark
  //                 : theme.palette.success.dark,
  //             borderRadius: "0.25rem",
  //             color: "#fff",
  //             maxWidth: "9ch",
  //             p: "0.25rem",
  //           })}
  //         >
  //           {cell.getValue()?.toLocaleString?.("en-US", {
  //             style: "currency",
  //             currency: "INR",
  //             minimumFractionDigits: 0,
  //             maximumFractionDigits: 0,
  //           })}
  //         </Box>
  //       ),
  //     },
  //     {
  //       accessorKey: "category", //hey a simple column for once
  //       header: "Category",
  //       size: 60,
  //     },
  //     {
  //       accessorKey: "address", //hey a simple column for once
  //       header: "Address",
  //       size: 80,
  //     },
  //     {
  //       accessorKey: "citiName", //hey a simple column for once
  //       header: "City",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "size", //hey a simple column for once
  //       header: "Size",
  //       size: 50,
  //       Cell: ({ renderedCellValue }) => <span>{renderedCellValue}sqrt</span>,
  //     },
  //     {
  //       accessorKey: "flore", //hey a simple column for once
  //       header: "Flore",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "type", //hey a simple column for once
  //       header: "Type",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "bathrooms", //hey a simple column for once
  //       header: "Bathrooms",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "bedrooms", //hey a simple column for once
  //       header: "Bedrooms",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "furnished", //hey a simple column for once
  //       header: "Furnished",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "parking", //hey a simple column for once
  //       header: "Parking",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "restaurant", //hey a simple column for once
  //       header: "Restaurant",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "bus", //hey a simple column for once
  //       header: "Bus",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "school", //hey a simple column for once
  //       header: "School",
  //       size: 50,
  //     },
  //     {
  //       accessorKey: "username", //hey a simple column for once
  //       header: "Added By",
  //       size: 50,
  //     },

  //     {
  //       id: "createdAt",
  //       accessorKey: "createdAt",
  //       header: "Added On",
  //       filterVariant: "date",
  //       filterFn: "lessThan",
  //       sortingFn: "datetime",
  //       Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>, //render Date as a string
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo(
    () => [
      {
        id: "prty_title",
        header: "Property Title",
        accessorKey: "prty_title",
        size: 200,
      },
      {
        id: "prty_owner",
        header: "Owner",
        accessorKey: "prty_owner",
        size: 150,
      },
      {
        id: "prty_type",
        header: "Type",
        accessorKey: "prty_type",
        size: 100,
      },
      {
        id: 'attachment',
        header: 'Name',
        accessorKey: 'attachment',
        size: 80,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {row.original.images && row.original.images[0] && (
              <img
                src={row.original.images[0].url}
                alt={row.original.file_name}
                loading="lazy"
                style={{ borderRadius: '50%', height: '50px', width: '50px' }}
              />
            )}
            <span>{row.original.file_name}</span>
          </Box>
        ),
      },
      {
        id: 'prty_det_desc',
        accessorKey: 'prty_det_desc',
        enableClickToCopy: true,
        filterVariant: 'autocomplete',
        header: 'Description',
        size: 300,
        Cell: ({ row }) => (
          <Box
            sx={{
              maxWidth: '300px',
              whiteSpace: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: row.original.prty_det_desc }}
            />
          </Box>
        ),
      },
      {
        id: "prty_det_sale_price",
        accessorKey: "prty_det_sale_price",
        // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
        filterFn: "between",
        header: "Price",
        size: 50,
        //custom conditional format and styling
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
        id: "prty_categories",
        header: "Categories",
        accessorKey: "prty_categories",
        size: 60,
      },
      {
        accessorKey: "prty_det_address",
        header: "Address",
        size: 80,
      },
      {
        accessorKey: "prty_regions",
        header: "City",
        size: 50,
      },
      {
        accessorKey: "prty_det_pmts_area_dts",
        header: "Size",
        size: 50,
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}sqrt</span>,
      },
      {
        accessorKey: "prty_det_pmts_bth_rom",
        header: "Bathrooms",
        size: 50,
      },
      {
        accessorKey: "prty_det_pmts_bed_rom",
        header: "Bedrooms",
        size: 50,
      },
      {
        accessorKey: "prty_det_pmts_furnishing",
        header: "Furnished",
        size: 50,
      },
      {
        accessorKey: "prty_det_pmts_car_park",
        header: "Parking",
        size: 50,
      },
      {
        id: "prty_det_create_date",
        accessorKey: "prty_det_create_date",
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
    ],
    []
  );

  const navigate = useNavigate();

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
    enableRowActions: true,
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
      sx: { fontSize: '1rem' },
    },
    muiTableHeadCellProps: {
      sx: { fontSize: '1rem' },
    },

    // // row action
    // renderRowActionMenuItems: ({ closeMenu, row }) => [
    //   <MenuItem
    //     key={0}
    //     onClick={() => {
    //       // View profile logic...
    //       closeMenu();
    //       navigate(`/admin/list/${row.original.id}`);
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     {/* { {row.original.id}} */}
    //     <ListItemIcon>
    //       <Edit className="text-green-700" />
    //     </ListItemIcon>
    //     Update Property
    //   </MenuItem>,
    //   <MenuItem
    //     key={1}
    //     onClick={() => {
    //       // Send email logic...
    //       closeMenu();
    //       setOpen(true);
    //       setId(row.original.id);
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     <ListItemIcon>
    //       <FaTrash className="text-red-600" />
    //     </ListItemIcon>
    //     Delete Property
    //   </MenuItem>,
    // ],
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
              onClick={() => mutation.mutate({ id })}
              className="px-3 py-2 text-white bg-red-600 border rounded-md shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default Table;
