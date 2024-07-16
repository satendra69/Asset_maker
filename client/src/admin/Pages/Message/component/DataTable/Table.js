import { useMemo } from "react";
import { queryClient } from "../../../../../index";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import axios from "axios";
//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
//Icons Imports
import {
  AccountCircle,
  Delete,
  Send,
  TramSharp,
  Web,
} from "@mui/icons-material";

//Mock Data
// import { data } from "./data";

function Table({ data }) {
  console.log("queryClient", queryClient);
  const mutation = useMutation({
    mutationFn: (id) => {
      console.log("id: " + id);
      return axios.delete(`${process.env.REACT_APP_URL}/message/${id}`);
    },
    onSuccess: (res) => {
      toast.success(res.data);
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });
  const columns = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: "User Name",
        enableClickToCopy: true,
        size: 250,
      },
      {
        accessorKey: "message",
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Message",
        size: 300,
        Cell: ({ row }) => <textarea rows={3} value={row.original.message} />,
      },
      {
        accessorKey: "propertyName",
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Property Name",
        size: 300,
      },
      {
        accessorKey: "number",
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Contact No",
        size: 300,
      },
      {
        accessorKey: "email",
        enableClickToCopy: true,
        filterVariant: "autocomplete",
        header: "Email",
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
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Web />
        </ListItemIcon>
        {/* ${process.env.REACT_APP_URL} */}
        <Link to={`http://localhost:3000/${row.original.propertyId}`}>
          Property Details
        </Link>
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          mutation.mutate(row.original.id);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Delete Message
      </MenuItem>,
    ],
  });

  return (
    <div className="bg-black w-full mx-auto">
      <MaterialReactTable table={table} />
      <Toaster richColors />
    </div>
  );
}

export default Table;
