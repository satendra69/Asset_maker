import React from "react";

import { useState } from "react";
import Container from "../../../component/Container";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Toaster, toast } from "sonner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SingleCity() {
  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: (city) => {
      return axios.post("http://localhost:8000/city/add", city);
    },
    onSuccess: (data) => {
      toast.success(data.data);
    },
    onError: (error) => {
      if (error.response) {
        // Handle unauthorized error (e.g., redirect to login, refresh token)
        console.error("hii error", error.response.data);
        toast.error(error.response.data);
        // Implement your specific logic here (redirect, refresh token, etc.)
      }
    },
  });
  const handleCities = (e) => {
    e.preventDefault();
    mutation.mutate({ name });
  };

  return (
    <>
      <Container className={"h-screen overflow-y-hidden"}>
        <Toaster richColors />
        <div>
          <h2>Add City</h2>
          <p>you can add new city here</p>
          <hr className="bg-[#FECE51] w-32 h-1" />
        </div>
        <form className="mx-auto mt-8 h-[70vh] overflow-y-scroll py-2 ">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="">
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                City Name
              </label>
              <div className="mt-2.5">
                <input
                  onChange={(e) =>
                    setName((pre) => ([e.target.name] = e.target.value))
                  }
                  placeholder="Delhi"
                  type="text"
                  name="name"
                  id="name"
                  required
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 w-1/2">
            <button
              onClick={handleCities}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {mutation.isPending ? "Adding City" : "Submit"}
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default SingleCity;
