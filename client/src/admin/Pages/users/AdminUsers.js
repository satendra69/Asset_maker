import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import httpCommon from "../../../http-common";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneno: "",
    password: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
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
      phoneno: user.phoneno,
      avatar: user.avatar,
      password: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      alert(res.data);
      setEditingUser(null);
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating user");
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Admin Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.username}</p>
          <button onClick={() => handleEdit(user)}>Edit</button>
        </div>
      ))}
      {editingUser && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phoneno"
            value={formData.phoneno}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password (leave empty to keep current)"
          />
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
          />
          <button type="submit">Update User</button>
        </form>
      )}
    </div>
  );
};

export default AdminUsers;
