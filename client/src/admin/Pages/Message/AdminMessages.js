import React from "react";
import ExampleWithLocalizationProvider from "./component/DataTable/Provider";
import Container from "../../../component/Container";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
function AdminMessages() {
  const fetchMessageList = async () => {
    try {
      const message = await axios.get(`${process.env.REACT_APP_URL}/message`);
      return message?.data;
    } catch (error) {
      console.error(error);
      toast.error("Internal Error");
    }
  };

  const {
    data: messages,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessageList,
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  return (
    <Container className={"space-y-5"}>
      <div>
        <h2>Message List</h2>
        <p>manage your users message here</p>
        <hr className="bg-[#FECE51] w-32 h-1" />
      </div>
      <ExampleWithLocalizationProvider data={isError ? [] : messages} />
    </Container>
  );
}

export default AdminMessages;
