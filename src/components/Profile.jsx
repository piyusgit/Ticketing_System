import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          withCredentials: true, // important for sending cookies
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response?.data?.message);
        navigate("/login"); // redirect if not logged in
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        My Profile
      </h2>

      {/* Profile Info */}
      <div className="space-y-3">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {user.role}
        </p>
        <p>
          <span className="font-semibold">Joined:</span>{" "}
          {new Date(user.createdAt).toDateString()}
        </p>
      </div>

      {/* Role Based Actions */}
      <div className="mt-6 space-y-3">
        {user.role === "user" && (
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
            onClick={() => navigate("/dashboard")}
          >
            Go to User Dashboard
          </button>
        )}

        {user.role === "agent" && (
          <button
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md"
            onClick={() => navigate("/agent/dashboard")}
          >
            Go to Agent Dashboard
          </button>
        )}

        {user.role === "admin" && (
          <button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md"
            onClick={() => navigate("/admin/dashboard")}
          >
            Go to Admin Panel
          </button>
        )}
      </div>

      {/* Common Actions */}
      <div className="mt-6 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
          onClick={() => alert("Edit profile coming soon")}
        >
          Edit Profile
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
