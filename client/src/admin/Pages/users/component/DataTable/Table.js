import { useMemo } from "react";

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";

//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from "@mui/material";

//Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";

//Mock Data
// import { data } from "./data";

function Table({ data }) {
  const columns = useMemo(
    () => [
      {
        id: "username", //id is still required when using accessorFn instead of accessorKey
        header: "Name",
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {console.log(row.original.avatar, "row")}
            <img
              alt="avatar"
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: "50%", height: "30px", width: "30px" }}
            />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <span>{row.original.username}</span>
          </Box>
        ),
      },
      {
        accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Email",
        size: 300,
      },
      {
        accessorKey: "phoneno", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Phone",
        size: 300,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,

    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,

    initialState: {
      // showColumnFilters: true,
      pagination: { pageSize: 5 },
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

    // row action
    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>,
    ],
  });

  return (
    <div className="bg-black w-full mx-auto">
      <MaterialReactTable table={table} />
    </div>
  );
}

export default Table;
