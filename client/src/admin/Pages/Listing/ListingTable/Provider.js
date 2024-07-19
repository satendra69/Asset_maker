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

  const handleDelete = async (id) => {
    try {
      const res = await httpCommon.delete(`/list/delete/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete property");
    }
  };

  const mutation = useMutation({
    mutationFn: handleDelete,
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
