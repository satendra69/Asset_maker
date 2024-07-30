// ExampleWithLocalizationProvider.js
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Table from "./Table";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { queryClient } from "../../../../index";
import httpCommon from "../../../../http-common";

const ExampleWithLocalizationProvider = ({ data }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async ({ id, type }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await httpCommon.delete(`/list/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { type }
      });
      console.log("Delete response: ", res);
      return res.data;
    } catch (error) {
      console.log("Error: ", error);
      throw new Error("Failed to delete property");
    }
  };


  const mutation = useMutation({
    mutationFn: ({ id, type }) => handleDelete({ id, type }),
    onSuccess: async (data) => {
      toast.success(data.message);
      handleClose();
      queryClient.invalidateQueries({ queryKey: ["propertylist"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete property");
      console.log(error);
    },
  });

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Table
          data={data}
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
          mutation={mutation}
        />
      </LocalizationProvider>
      <Toaster richColors />
    </div>
  );
};

export default ExampleWithLocalizationProvider;
