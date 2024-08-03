import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BasicModal from "../admin/Component/OtpModal";
import httpCommon from "../http-common";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirm password field
  });
  const [loading, setLoading] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [currentOtp, setCurrentOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpActiveIndex, setOtpActiveIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [otpActiveIndex, otpOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrorMessage(""); // Clear error message on input change
  };

  const handleChangeOtp = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    if (!value) {
      newOtp[index] = "";
      setOtpActiveIndex(index - 1);
    } else {
      const val = value.substring(value.length - 1);
      newOtp[index] = val;
      setOtpActiveIndex(index + 1);
    }
    setOtp(newOtp);
  };

  const handleKey = (e, index) => {
    if (e.key === "Backspace") {
      setOtpActiveIndex(index - 1);
    }
  };

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    // Validate that password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await httpCommon.post(`/auth/registerP`, formData);
      if (res.data) {
        setCurrentOtp(res.data.otp);
        setOtpSent(true);
        toast.success("OTP sent successfully to your email.");
        setOtpOpen(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Set error message for UI display
      setErrorMessage(error.response?.data?.error || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (currentOtp && otpString === currentOtp.toString()) {
      try {
        await httpCommon.post(`/auth/verifyP`, {
          email: formData.email,
          otp: otpString,
        });
        toast.success("Email verified successfully");
        navigate("/sign-in");
      } catch (error) {
        console.error("OTP verification failed:", error);
        toast.error("OTP verification failed");
      }
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <>
      <div className="max-w-lg p-3 mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSendOtp}>
          <input
            type="text"
            placeholder="username"
            className="p-3 border rounded-lg"
            id="username"
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            placeholder="confirm password" // Confirm password field
            className="p-3 border rounded-lg"
            id="confirmPassword"
            onChange={handleChange}
            required
          />
          {errorMessage && (
            <div className="text-red-500">{errorMessage}</div> // Display error message
          )}
          <button
            disabled={loading}
            className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
            type="submit"
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
        </form>
        <p className="mt-6">
          Have an account?{" "}
          <Link to="/sign-in" className="font-medium text-slate-800">
            Sign in
          </Link>
        </p>
      </div>
      <BasicModal modalOpen={otpOpen} setModalOpen={setOtpOpen}>
        <div>
          <form className="flex flex-col gap-4 p-6" onSubmit={handleOtpSubmit}>
            <p>Enter OTP sent to your email</p>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-3">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="number"
                    value={value}
                    onChange={(e) => handleChangeOtp(e, index)}
                    onKeyUp={(e) => handleKey(e, index)}
                    ref={index === otpActiveIndex ? inputRef : null}
                    className="w-12 h-12 text-center border-2 rounded"
                    maxLength={1}
                    required
                  />
                ))}
              </div>
              <button
                type="submit"
                className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </BasicModal>
    </>
  );
}
