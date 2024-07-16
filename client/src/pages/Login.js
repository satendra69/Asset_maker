import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { Toaster, toast } from "sonner";
import httpCommon from "../http-common";
import axios from "axios";

export default function SignIn() {
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  //  const url = "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await httpCommon.post(`/auth/signin/`, formData);
      const data = await res.data;
      console.log("data____", data);

      if (!res.data.message
      ) {
        toast.error(data); // Display toast for 404 responses

        dispatch(signInFailure(data.message || "An error occurred."));
        return;
      }
      console.log("data", data.token);
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      dispatch(signInSuccess(data.user));

      if (data.user.admin) return navigate("/");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 2xx
          if (error.response.status === 404) {
            toast.error("Resource not found (404)");
          } else {
            toast.error(`Error: ${error.response.data.message || error.response.status}`);
          }
          dispatch(signInFailure(error.response.data.message || "An error occurred."));
        } else if (error.request) {
          // Request was made but no response was received
          toast.error("No response from server");
          dispatch(signInFailure("No response from server"));
        } else {
          // Something else happened while setting up the request
          toast.error("An error occurred");
          dispatch(signInFailure("An error occurred"));
        }
      } else {
        // Non-Axios error
        toast.error(error.message);
        dispatch(signInFailure(error.message));
      }

    }
  };
  return (
    <>
      <Toaster richColors />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          {/* <OAuth /> */}
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </>
  );
}
