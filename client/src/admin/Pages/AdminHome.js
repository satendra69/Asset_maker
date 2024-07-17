import React from "react";
import ExampleWithLocalizationProvider from "../Pages/Property/PropertyTable/Provider";
import Container from "../../component/Container";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
function AdminHome() {
  const { currentUser } = useSelector((state) => state.user);
  // const currentUser = {
  //   id: 17,
  //   username: 'dev',
  //   email: 'dev1@mail.com',
  //   avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  //   admin: 1
  // };

  const getProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/property/`);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Internal Error");
      throw new Error("Failed to fetch properties");
    }
  };
  const getSingleProperty = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/property/${currentUser.id}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Internal Error");
      throw new Error("Failed to fetch property");
    }
  };

  const { isLoading, data, isError } = useQuery({
    queryKey: currentUser.admin ? ["propertylist"] : ["propertylistSingle"],
    queryFn: currentUser.admin ? getProperty : getSingleProperty,
  });

  console.log(data);

  if (isLoading) return "Loading...";
  if (isError) return "Failed to fetch data";

  return (
    <div className="h-[98vh] overflow-y-scroll">
      <div className={`px-8 space-y-5`}>
        <div>
          <h2>Admin DashBoard</h2>
          <p>Manage Your Data Here</p>
          <hr className="bg-[#FECE51] w-32 h-1" />
        </div>
        <ExampleWithLocalizationProvider data={isError ? [] : data.data} />
      </div>
    </div>
  );
}

export default AdminHome;
