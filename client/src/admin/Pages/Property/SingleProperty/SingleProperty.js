import React, { useEffect } from "react";
import { useState } from "react";

import { Switch } from "@headlessui/react";
import Container from "../../../../component/Container";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import httpCommon from "../../../../http-common";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { FaPhotoVideo } from "react-icons/fa";
import { queryClient } from "../../../..";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SingleProperty() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  // get property by Id
  const {
    isPending: propertyPending,
    data: singleProperty,
    error: propertyError,
  } = useQuery({
    queryKey: ["singleProperty"],
    queryFn: async () => {
      try {
        if (id !== "new") {
          const res = await axios.get(`http://localhost:8000/list/${id}`);
          return res.data;
        } else return [];
      } catch (error) {
        console.log(error);
        // toast.error("internal error single list");
      }
    },
  });

  useEffect(() => {
    if (singleProperty?.id) {
      setProperty(
        {
          name: singleProperty.name,
          city: singleProperty.cityId,
          description: singleProperty.description,
          address: singleProperty.address,
          price: parseInt(singleProperty.price),
          bathrooms: parseInt(singleProperty.bathrooms),
          bathrooms: parseInt(singleProperty.bathrooms),
          bedrooms: parseInt(singleProperty.bedrooms),
          parking: parseInt(singleProperty.parking),
          category: singleProperty.category,
          type: singleProperty.type,
          restaurant: singleProperty.restaurant,
          bus: singleProperty.bus,
          school: singleProperty.school,
          floore: singleProperty.flore,
          size: singleProperty.size,
          furnished: singleProperty.furnished,
        },
        [singleProperty]
      );
    }
  }, [singleProperty]);
  const [property, setProperty] = useState({
    name: "",
    city: 6,
    description: "",
    address: "",
    price: 0,
    bathrooms: 0,
    parking: 0,
    category: "",
    type: "buy",
    restaurant: "",
    bus: "",
    school: "",
    floore: 1,
    size: "",
    bedrooms: 0,
    furnished: false,
  });

  const handleChange = (e) => {
    setProperty((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSelect = (e) => {
    setProperty((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  // use querty to get city
  const {
    isPending,
    isError,
    data: cities,
    error,
  } = useQuery({
    queryKey: ["citis"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:8000/city");
        return res.data;
      } catch (error) {
        toast.error("Internal error in city");
        console.log(error);
      }
    },
  });

  // image and post property Section
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  // uploadImage
  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  // Add Property
  const addPropertyfun = async (data) => {
    console.log(singleProperty, "single");
    try {
      if (singleProperty.length > 0) {
        const res = await axios.patch(
          `http://localhost:8000/list/${singleProperty?.id}`,
          data
        );
        return res;
      } else {
        const res = await axios.post("http://localhost:8000/list", data);
        return res;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  // Image Upload
  const handleImageUplaod = async (id) => {
    // e.preventDefault();
    console.log("hiii upload");

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        `http://localhost:8000/list/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Uploaded file paths:", response.data.filepaths);

      // Add code to handle successful upload (e.g., display success message)
      return response;
    } catch (error) {
      setErrorMessage(error.response.data.error);
      // Add code to handle error (e.g., display error message)
    }
  };

  // posting property
  const addProperty = useMutation({
    mutationFn: addPropertyfun,

    onSuccess: async (data) => {
      const propertyId = data.data;

      console.log("prpertyId", propertyId);
      const res = await handleImageUplaod(propertyId);

      toast.success(res.data);
      queryClient.invalidateQueries({ queryKey: ["propertylist"] });
      navigate("/admin");
    },
  });

  // Update
  const updatePropertyfun = async (data) => {
    console.log(singleProperty, "single");
    try {
      const res = await axios.patch(
        `http://localhost:8000/list/${singleProperty?.id}`,
        data
      );
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  const updateProperty = useMutation({
    mutationFn: updatePropertyfun,

    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["propertylist"] });
      navigate("/admin");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Internal error in updating");
    },
  });
  // Dialog Close
  const handleClose = () => {
    setOpen(false);
  };
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return toast.error(error.response.data);
  }
  //Conditional FormData
  const form = {
    button: singleProperty?.id ? "Update" : "Create",
    title: singleProperty?.id ? "Update Property" : "Create Property",
    description: singleProperty?.id
      ? "You can update your property here"
      : "You can add new property here",
  };
  return (
    <Container className={"h-screen overflow-y-hidden"}>
      <Toaster richColors />
      <div>
        <h2>{form.title}</h2>
        <p>{form.description}</p>
        <hr className="bg-[#FECE51] w-32 h-1" />
      </div>
      <form
        // action="#"
        // method="POST"
        className="mx-auto mt-8 h-[70vh] overflow-y-scroll py-2 "
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="">
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Property Name
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="Beautiful Apartment"
                value={property.name}
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* City */}
          <div className="">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
            </label>
            <div className="mt-2">
              <select
                placeholder={"Banglore"}
                id="city"
                name="city"
                value={property.city}
                autoComplete={false}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleSelect}
              >
                {cities?.map((item) => (
                  <option value={item.id}>{item.name.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                name="description"
                id="description"
                placeholder="tell me about your property"
                value={property.description}
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="address"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2.5">
              <textarea
                name="address"
                id="address"
                placeholder="1234 Broadway St"
                value={property.address}
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-10">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleChange}
                  type="number"
                  name="price"
                  placeholder="1200"
                  value={property.price}
                  id="price"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* 2 */}
            <div>
              <label
                htmlFor="bathrooms"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Bathrooms
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleChange}
                  type="number"
                  name="bathrooms"
                  placeholder="1"
                  id="bathrooms"
                  value={property.bathrooms}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* 2 */}
            <div>
              <label
                htmlFor="bedrooms"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Bedrooms
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleChange}
                  type="number"
                  name="bedrooms"
                  placeholder="1"
                  id="bedrooms"
                  value={property.bedrooms}
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* 3 */}
            <div>
              <label
                htmlFor="parking"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Parking
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleChange}
                  type="number"
                  name="parking"
                  placeholder="1"
                  id="parking"
                  value={property.parking}
                  autoComplete={false}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          {/* category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="category"
                value={property.category}
                id="category"
                placeholder="Villa"
                autoComplete={false}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* type */}
          <div className="">
            <label
              htmlFor="type"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Type
            </label>
            <div className="mt-2">
              <select
                onChange={handleSelect}
                value={property.type}
                id="type"
                name="type"
                autoComplete={false}
                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
              >
                <option value={"buy"}>Buy</option>
                <option value={"rent"}>Rent</option>
                <option value={"lease"}>Lease</option>
              </select>
            </div>
          </div>

          {/* resturent */}
          <div>
            <label
              htmlFor="restaurant"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Restaurant
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                type="text"
                name="restaurant"
                placeholder="50m away"
                id="restaurant"
                value={property.restaurant}
                autoComplete={false}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* bus */}
          <div>
            <label
              htmlFor="bus"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Bus
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                type="text"
                name="bus"
                placeholder="100m away"
                value={property.bus}
                id="bus"
                autoComplete={false}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* bus */}
          <div>
            <label
              htmlFor="school"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              School
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                type="text"
                name="school"
                placeholder="250m away"
                value={property.school}
                id="school"
                autoComplete={false}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* size and floor */}
          <div className="grid grid-cols-3 gap-10 items-center">
            <div>
              <label
                htmlFor="floore"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Floore
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleChange}
                  type="number"
                  name="floore"
                  placeholder="1"
                  value={property.floore}
                  id="floore"
                  autoComplete={false}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="size"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Size
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleChange}
                  type="text"
                  name="size"
                  placeholder="128sqft"
                  value={property.size}
                  id="size"
                  autoComplete={false}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <Switch.Group as="div" className="flex gap-x-4 mt-10">
              <div className="flex h-6 items-center">
                <Switch
                  checked={property.furnished}
                  onChange={(value) =>
                    setProperty((pre) => ({
                      ...pre,
                      furnished: value,
                    }))
                  }
                  className={classNames(
                    property.furnished ? "bg-indigo-600" : "bg-gray-200",
                    "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      property.furnished ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </div>
              <Switch.Label className="text-sm leading-6 text-gray-600">
                <a href="#" className="font-semibold text-indigo-600">
                  Furnished
                </a>
                .
              </Switch.Label>
            </Switch.Group>
          </div>
        </div>
        <div className="col-span-full mt-5">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Property Images
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {singleProperty?.id ? (
                <div className="flex items-center gap-5">
                  {singleProperty?.images.map((item) => (
                    <div className="h-20 w-20 rounded-md shadow-md p-2">
                      <img
                        src={item.url}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <FaPhotoVideo
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
              )}

              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    multiple
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e) => {
              e.preventDefault();
              singleProperty.id
                ? updateProperty.mutate(property)
                : addProperty.mutate(property);
            }}
          >
            {form.button}
          </button>
        </div>
      </form>
    </Container>
  );
}

export default SingleProperty;
