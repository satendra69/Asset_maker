//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Table from "./Table";

const ExampleWithLocalizationProvider = ({ data }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Table data={data} />
  </LocalizationProvider>
);

export default ExampleWithLocalizationProvider;
