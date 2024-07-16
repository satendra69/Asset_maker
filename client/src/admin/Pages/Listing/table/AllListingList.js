import React, { useState, useEffect } from "react";
import Container from "../../../../component/Container";
import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
  } from "material-react-table";
  import { IconButton } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";

import { toast } from "sonner";
import { useSelector } from "react-redux";
import httpCommon from "../../../../http-common";

function AllListingList() {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [search, setSearch] = useState("");


const getListingAll = async () => {
    setLoading(true);
    try {
      const response = await httpCommon.get("/list/All");
      if(response.data.status === "success"){
        setData(response.data.data);
        setTotalCount(response.data.data.length)
        setLoading(false);
      }
      console.log("res_____",response);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Internal Error");
    }
  };
  useEffect(() =>{
    getListingAll();
  },[]);

  const handleEdit = (rowData) => {
    // Implement your edit logic here
    alert("You want to edit " + rowData.ltg_title);
  };

  const handleDelete = (rowData) => {
    // Implement your delete logic here
    alert("You want to delete " + rowData.ltg_title);
  };

const columns = [
    { header: "Title", accessorKey: "ltg_title"},
    { header: "Categories", accessorKey: "ltg_categories" },
    { header: "Type", accessorKey: "ltg_type" },
    { header: "Owner", accessorKey: "ltg_owner" },
    {
        header: "Actions",
        id: "actions", // You need to give it an id so that it doesn't clash with the other columns
        Cell: ({ row }) => (
          <div>
            <IconButton
              onClick={() => handleEdit(row.original)}
              color="primary"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row.original)}
              color="secondary"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )
      }
  ];
  console.log("totalCount__",totalCount);
  return (
    <div>
      <Container className={"space-y-5"}>
        <div>
          <h2>All Listing List</h2>
          <p>manage your data here</p>
          <hr className="bg-[#FECE51] w-32 h-1" />
        </div>
        {data && (
  
            <MaterialReactTable
            columns={columns}
            data={data}
            isLoading={loading}
            initialState={{
                pagination: { pageIndex: page, pageSize: pageSize }
            }}
            manualPagination
            rowCount={totalCount}
            onPaginationChange={({ pageIndex, pageSize }) => {
                setPage(pageIndex);
                setPageSize(pageSize);
            }}
            onSearchChange={(searchText) => {
                setSearch(searchText);
            }}
            enableSorting
            />

        )}

  
      </Container>
    </div>
  );
}

export default AllListingList;
