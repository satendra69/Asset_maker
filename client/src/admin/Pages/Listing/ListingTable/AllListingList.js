import React from "react";
import ExampleWithLocalizationProvider from "./Provider";
import Container from "../../../../component/Container";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import httpCommon from "../../../../http-common";

function AllListingList() {
  const { currentUser } = useSelector((state) => state.user);

  const getProperty = async () => {
    try {
      const res = await httpCommon.get(`/list`);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Internal Error");
      throw new Error("Failed to fetch properties");
    }
  };
  const getSingleProperty = async () => {
    try {
      const res = await httpCommon.get(`/list/${currentUser.id}`);
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
          <h2>Listing DashBoard</h2>
          <p>Manage Your Data Here</p>
          <hr className="bg-[#FECE51] w-32 h-1" />
        </div>
        <ExampleWithLocalizationProvider data={isError ? [] : data.data} />
      </div>
    </div>
  );
}

export default AllListingList;
