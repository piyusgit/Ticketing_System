import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import TicketList from "./TicketList";

const API_URL = import.meta.env.VITE_FRONTEND_URL;

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/agent/tickets`, {
        withCredentials: true,
      });
      setTickets(res.data || []);
    } catch (err) {
      console.error(
        "Error fetching tickets:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTickets();
  }, []);
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">🎫 My Assigned Tickets</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
        </div>
      ) : (
        <TicketList tickets={tickets} refresh={fetchTickets} />
      )}
    </div>
  );
};

export default AgentDashboard;
