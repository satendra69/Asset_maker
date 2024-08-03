import { useState } from "react";
import { Toaster, toast } from "sonner";
import httpCommon from "../http-common";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const res = await httpCommon.post("/users/forgot-password", { email });
            toast.success(res.data);
            navigate("/sign-in");
        } catch (error) {
            const message = error.response?.data?.message || "An error occurred";
            toast.error(message);
            setErrorMessage(message);
        }
    };

    return (
        <>
            <Toaster richColors />
            <div className="max-w-lg p-3 mx-auto">
                <h1 className="text-3xl font-semibold text-center my-7">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="p-3 border rounded-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95">
                        Send Reset Link
                    </button>
                </form>
                {errorMessage && <p className="mt-5 text-red-500">{errorMessage}</p>}
            </div>
        </>
    );
};

export default ForgotPassword;
