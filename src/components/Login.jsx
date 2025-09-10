import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", formData, {
        withCredentials: true,
      });
      console.log(res.data);
      //   localStorage.setItem("userToken", res.data.token);
      //   console.log(res.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      console.error(err.response?.data?.error || "Login failed");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
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
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
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
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
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
        <div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
