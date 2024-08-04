import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { Toaster, toast } from "sonner";
import httpCommon from "../http-common";
import axios from "axios";

export default function SignIn() {
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
    if (error) {
      dispatch(signInFailure(null));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await httpCommon.post(`/auth/loginP`, formData);
      const data = res.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success(data.message || "Login successful!");
        dispatch(signInSuccess({ ...data.user, token: data.token }));
        navigate(data.user.admin ? "/" : "/");
      } else {
        toast.error(data.error);
        dispatch(signInFailure(data.error || "Login failed"));
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "An error occurred.";
        toast.error(errorMessage);
        dispatch(signInFailure(errorMessage));
      } else {
        toast.error("An error occurred");
        dispatch(signInFailure("An error occurred"));
      }
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="max-w-lg p-3 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            className="p-3 border rounded-lg"
            id="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="password"
            className="p-3 border rounded-lg"
            id="password"
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex gap-2">
            <p>Don't have an account?</p>
            <Link to={"/sign-up"}>
              <span className="text-blue-700">Sign up</span>
            </Link>
          </div>
          <div className="flex gap-2">
            <p>Forgot your password?</p>
            <Link to={"/forgot-password"}>
              <span className="text-blue-700">Reset Password</span>
            </Link>
          </div>
        </div>
        {error && <p className="mt-5 text-red-500">{error}</p>}
      </div>
    </>
  );
}
