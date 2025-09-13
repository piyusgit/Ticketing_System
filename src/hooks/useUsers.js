import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_FRONTEND_URL;

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/users`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/admin/users/${userId}`, {
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting user");
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const res = await axios.put(
        `${API_URL}/admin/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      );

      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: res.data.role } : u))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error updating role");
    }
  };

  return {
    users,
    loading,
    error,
    deleteUser,
    updateUserRole,
    refetch: fetchUsers,
  };
}
