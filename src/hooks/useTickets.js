import { useEffect, useState } from "react";
import axios from "axios";

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
      const res = await axios.get("http://localhost:5000/admin/tickets", {
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
      const res = await axios.get("http://localhost:5000/admin/agents", {
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
        `http://localhost:5000/admin/tickets/${ticketId}/status`,
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
        `http://localhost:5000/admin/ticket/${ticketId}/assign`,
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
      await axios.delete(`http://localhost:5000/tickets/${ticketId}`, {
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
