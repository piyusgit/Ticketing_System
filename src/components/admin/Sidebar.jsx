import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, Ticket } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-3">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <Home size={18} /> Dashboard
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <Users size={18} /> Users
        </Link>
        <Link
          to="/admin/tickets"
          className="flex items-center gap-2 hover:text-blue-600"
        >
          <Ticket size={18} /> Tickets
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
