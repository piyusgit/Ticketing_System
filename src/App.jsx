import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/user/Dashboard";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import Users from "./components/admin/Users";
import Tickets from "./components/admin/Tickets";
import AgentDashboard from "./components/agent/AgentDashboard";
import TicketDetails from "./components/admin/TicketDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* // Admin routes */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="admin/tickets" element={<Tickets />} />
          <Route path="/admin/tickets/:id" element={<TicketDetails />} />

          {/* // Agent routes */}
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
