import { useMemo } from "react";
import { queryClient } from "../../../../../index";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import httpContent from "../../../../../http-content";
import { toast, Toaster } from "sonner";
import { ListItemIcon, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Delete, Web } from "@mui/icons-material";

function Table({ data }) {

  console.log("data", data);
  // Function to capitalize the first letter
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const mutation = useMutation({
    mutationFn: (id) => {
      return httpContent.delete(`/contact/message/${id}`);
    },
    onSuccess: (res) => {
      const message = typeof res.data === 'string' ? res.data : res.data.message || 'Message deleted successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (err) => {
      const errorMessage = typeof err.message === 'string' ? err.message : 'An error occurred';
      toast.error(errorMessage);
    },
  });

  const columns = useMemo(
    () => [
      {
        id: "mainImage",
        header: "Property Image",
        size: 100,
        Cell: ({ row }) => {
          const imageUrl = (row.original.propertyImage);
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
        accessorKey: "propertyTitle",
        header: "Property Title",
        size: 100,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        accessorKey: "name",
        header: "User Name",
        enableClickToCopy: true,
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableClickToCopy: true,
        size: 200,
      },
      {
        accessorKey: "phone",
        header: "Contact No",
        enableClickToCopy: true,
        size: 150,
      },
      {
        accessorKey: "message",
        header: "Message",
        size: 300,
        Cell: ({ row }) => <textarea rows={3} value={row.original.message} readOnly />,
      },
      {
        accessorKey: "listingType",
        header: "Listing Type",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "purpose",
        header: "Purpose",
        size: 150,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        size: 150,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
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

    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Web />
        </ListItemIcon>
        <Link
          to={`/Property/details`}
          state={{ id: row.original.propertyId, ltg_type: row.original.listingType }}
        >
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
    <div className="w-full mx-auto bg-black">
      <MaterialReactTable table={table} />
      <Toaster richColors />
    </div>
  );
}

export default Table;
