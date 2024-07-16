import React, { useEffect, useState } from "react";
import App from "./App";
import axios from "axios";

function ParentApp() {
  const [token, setToken] = useState("");
  // useEffect hook to retrieve token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // useEffect hook to include the token in all Axios requests
  useEffect(() => {
    // Set default headers for all Axios requests
    // Set default headers for all Axios requests
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }, [token]);

  return (
    <div>
      <App />
    </div>
  );
}

export default ParentApp;
