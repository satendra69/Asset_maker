import axios from "axios";

export default axios.create({
    baseURL:process.env.REACT_APP_BASEURL,
  // baseURL: "http://localhost:8000/",
  // baseURL: "http://evantage.ddns.net/React_helpDesk_web/",
  // baseURL: "http://192.168.0.34:8080/react_web/",
  //   baseURL: "http://localhost:8080/react_web/",
  headers: {
    "Content-type": "application/json",
  },
});
