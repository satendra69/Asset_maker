import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import httpCommon from "../../../http-common";
import { signOutUserSuccess } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";// Adjust the import path as necessary

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        avatar: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!currentUser || !currentUser.token) {
                setError("User is not authenticated.");
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const res = await httpCommon.get(`/users/${currentUser.id}`, {
                    headers: { Authorization: `Bearer ${currentUser.token}` },
                });
                setFormData({
                    username: res.data.username,
                    email: res.data.email,
                    avatar: res.data.avatar,
                    password: "",
                    confirmPassword: "",
                });
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching user profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                username: formData.username,
                email: formData.email,
                avatar: formData.avatar,
            };

            if (formData.password) {
                if (formData.password !== formData.confirmPassword) {
                    alert("Passwords do not match");
                    return;
                }
                updatedData.password = formData.password;
            }

            const res = await httpCommon.put(`/users/${currentUser.id}`, updatedData, {
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            setSuccessMessage(res.data);
        } catch (err) {
            alert(err.response?.data?.message || "Error updating profile");
        }
    };

    const handleLogout = () => {
        dispatch(signOutUserSuccess());
        navigate("/");
        toast.success("Logout Successful");
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;

        try {
            const res = await httpCommon.delete(`/users/${currentUser.id}`, {
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            alert(res.data);
            handleLogout();
        } catch (err) {
            alert(err.response?.data?.message || "Error deleting account");
        }
    };

    if (loading) return <div className="p-4 text-center">Loading profile...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="p-6 mx-auto">
            <h1 className="mb-6 text-3xl font-bold text-center">Profile</h1>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
                {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    placeholder="Avatar URL"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="New Password (leave empty to keep current)"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
                >
                    Update Profile
                </button>
            </form>
            <button
                onClick={handleDelete}
                className="px-4 py-2 mt-4 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
            >
                Delete Account
            </button>
        </div>
    );
};

export default Profile;
