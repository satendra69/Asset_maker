import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import httpCommon from "../../../http-common";
import { signOutUserSuccess } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    phoneno: "",
    admin: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser || !currentUser.token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await httpCommon.get("/users", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      phoneno: user.phoneno || "",
      password: "",
      admin: user.admin || false,
    });
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };
      if (!updatedData.password) {
        delete updatedData.password;
      }
      const res = await httpCommon.put(`/users/${editingUser.id}`, updatedData, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setSuccessMessage(res.data);
      setEditingUser(null);
      setFormData({ username: "", email: "", password: "", avatar: "", phoneno: "", admin: false });
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...updatedData } : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating user");
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await httpCommon.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setSuccessMessage(res.data);

      // If the deleted user is the currently logged-in user, log them out
      if (userId === currentUser.id) {
        handleLogout();
      } else {
        setUsers(users.filter((user) => user.id !== userId)); // Remove the deleted user from the state
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting user");
    }
  };

  const handleLogout = () => {
    dispatch(signOutUserSuccess()); // Dispatch logout action
    navigate("/"); // Navigate to the home page
    toast.success("Logout Successful"); // Show logout success message
  };

  if (loading) return <div className="p-4 text-center">Loading users...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 mx-auto">
      <div className="h-[90vh] overflow-y-scroll px-10">
        <h1 className="mb-6 text-3xl font-bold text-center">Users</h1>
        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phoneno}</p>
                <p className={`text-sm ${user.admin ? 'text-green-500' : 'text-red-500'}`}>
                  {user.admin ? 'Admin' : 'User'}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingUser && (
          <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Edit User</h2>
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
              name="phoneno"
              value={formData.phoneno}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password (leave empty to keep current)"
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
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="admin"
                checked={formData.admin}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700">Admin</label>
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded hover:bg-green-600"
            >
              Update User
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
