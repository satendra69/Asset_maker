//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Table from "./Table";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
const ExampleWithLocalizationProvider = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["citis"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:8000/city");
        return res.data;
      } catch (error) {
        return error;
      }
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return toast.error(error.message);
  }
  console.log("cities", data);
  //App.tsx or AppProviders file

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Table data={data} />
    </LocalizationProvider>
  );
};

export default ExampleWithLocalizationProvider;
