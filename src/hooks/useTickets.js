import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_FRONTEND_URL;
export default function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTickets();
    fetchAgents();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/tickets`, {
        withCredentials: true,
      });
      setTickets(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching tickets");
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/agents`, {
        withCredentials: true,
      });
      setAgents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching agents");
    }
  };

  const updateTicketStatus = async (ticketId, status) => {
    try {
      const res = await axios.patch(
        `${API_URL}/admin/tickets/${ticketId}/status`,
        { status },
        { withCredentials: true }
      );
      const updatedTicket = res.data.data;
      setTickets((prev) =>
        prev.map((t) =>
          t._id === ticketId ? { ...t, status: updatedTicket.status } : t
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error updating status");
    }
  };

  const assignTicket = async (ticketId, agentId) => {
    try {
      const res = await axios.patch(
        `${API_URL}/admin/ticket/${ticketId}/assign`,
        { assignedTo: agentId },
        { withCredentials: true }
      );
      const updatedTicket = res.data.data;
      setTickets((prev) =>
        prev.map((t) =>
          t._id === ticketId
            ? { ...t, assignedTo: updatedTicket.assignedTo }
            : t
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error assigning ticket");
    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(`${API_URL}/admin/tickets/${ticketId}`, {
        withCredentials: true,
      });
      setTickets((prev) => prev.filter((t) => t._id !== ticketId));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting ticket");
    }
  };

  return {
    tickets,
    agents,
    loading,
    error,
    updateTicketStatus,
    assignTicket,
    deleteTicket,
    refetch: fetchTickets,
  };
}
