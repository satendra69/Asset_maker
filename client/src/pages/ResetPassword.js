import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import httpCommon from "../http-common";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const res = await httpCommon.post("/users/reset-password", { token, newPassword });
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
                <h1 className="text-3xl font-semibold text-center my-7">Reset Password</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        className="p-3 border rounded-lg"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="p-3 border rounded-lg"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95">
                        Reset Password
                    </button>
                </form>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </>
    );
};

export default ResetPassword;
