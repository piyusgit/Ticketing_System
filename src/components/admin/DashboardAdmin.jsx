// Dashboard.jsx
import React from "react";
import StatsCard from "./StatsCard";
import Users from "./Users";
import Tickets from "./Tickets";
import useTicketStats from "../../hooks/useTicketStats.js";
import { statusColors } from "../../constants/statusColors.js";

const Dashboard = () => {
  const { stats, loading, error } = useTicketStats();

  if (loading) return <p className="text-center">Loading stats...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([status, count]) => (
          <StatsCard
            key={status}
            title={status.charAt(0).toUpperCase() + status.slice(1)}
            value={count}
            color={statusColors[status]}
          />
        ))}
      </div>

      {/* Users & Tickets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Users />
        <Tickets />
      </div>
    </div>
  );
};

export default Dashboard;
