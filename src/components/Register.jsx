import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      setMessage(response.data.message);
      navigate("/login");
      setLoading(false);
    } catch (error) {
      setMessage(error.response?.data?.message);
      setLoading(false);
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          New to our platform?{" "}
          <span className="text-blue-500">Register here</span>
        </h2>

        {/* Message */}
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Registration Form
          </h3>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block mb-1 text-sm font-medium text-gray-600"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">-- Select Role --</option>
              <option value="user">user</option>
              <option value="agent">agent</option>
              <option value="admin">admin</option>
            </select>
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
