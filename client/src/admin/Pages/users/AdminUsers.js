import React from "react";
import ExampleWithLocalizationProvider from "./component/DataTable/Provider";
import { useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import axios from "axios";
import Container from "../../../component/Container";
function AdminUsers() {
  const fetchUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/users`);
    return res.data;
  };

  const {
    isPending,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isPending) return "Loading...";

  if (error) console.log(error);
  return (
    <Container className="space-y-5">
      <div>
        <h2>User List</h2>
        <p>list of all the user registerd</p>
        <hr className="bg-[#FECE51] w-32 h-1" />
      </div>
      <ExampleWithLocalizationProvider data={users} />
    </Container>
  );
}

export default AdminUsers;
