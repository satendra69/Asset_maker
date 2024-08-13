import React from "react";
import ExampleWithLocalizationProvider from "./component/DataTable/Provider";
import Container from "../../../component/Container";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import httpContent from "../../../http-content";
import httpCommon from "../../../http-common";

function AdminMessages() {
  const fetchMessageList = async () => {
    try {
      const { data } = await httpContent.get(`/contact/message`);
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Internal Error");
      return [];
    }
  };

  const fetchPropertyList = async () => {
    try {
      const res = await httpCommon.get(`/list`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      toast.error("Internal Error");
      throw new Error("Failed to fetch properties");
    }
  };

  const { data: messages, isLoading: isMessagesLoading, isError: isMessagesError } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessageList,
  });

  const { data: properties, isLoading: isPropertiesLoading, isError: isPropertiesError } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchPropertyList,
  });

  console.log("PropertyList", properties);
  console.log("MessageList", messages);

  if (isMessagesLoading || isPropertiesLoading) {
    return <span>Loading...</span>;
  }

  if (isMessagesError || isPropertiesError) {
    toast.error("Error fetching data");
    return <span>Error loading data</span>;
  }

  const getMainImageUrl = (attachments) => {
    const mainImage = attachments?.find(att => att.type === "Main");
    return mainImage
      ? httpCommon.defaults.baseURL + mainImage.attachment
      : httpCommon.defaults.baseURL + "/defaultasset.jpg";
  };

  const enrichedMessages = messages.map((message) => {
    const matchedProperty = properties.find(property => Number(property.RowID) === Number(message.propertyId));
    console.log("matchedProperty", matchedProperty);
    return {
      ...message,
      propertyImage: matchedProperty ? getMainImageUrl(matchedProperty.attachments) : null,
      propertyTitle: matchedProperty ? matchedProperty.ltg_title : null,
    };
  });

  console.log("Merged Data", enrichedMessages);

  return (
    <Container className={"space-y-5"}>
      <div>
        <h2>Message List</h2>
        <p>Manage your users' messages here</p>
        <hr className="bg-[#FECE51] w-32 h-1" />
      </div>
      <ExampleWithLocalizationProvider data={enrichedMessages} />
    </Container>
  );
}

export default AdminMessages;
