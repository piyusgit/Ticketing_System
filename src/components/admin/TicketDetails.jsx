// src/components/admin/TicketDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const API_URL = import.meta.env.VITE_FRONTEND_URL;

const TicketDetails = () => {
  const { id } = useParams(); // ticketId from URL
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/tickets/${id}`, {
        withCredentials: true,
      });
      setTicket(res.data);
    } catch (err) {
      console.error(
        "Error fetching ticket details:",
        err.response?.data?.message
      );
    }
  };

  if (!ticket) return <p className="p-6">Loading ticket...</p>;

  return (
    <div className="p-6">
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">{ticket.subject}</h1>
          <p>
            <strong>Status:</strong> {ticket.status}
          </p>
          <p>
            <strong>Priority:</strong> {ticket.priority}
          </p>
          <p>
            <strong>Owner:</strong> {ticket.owner?.name || "Unassigned"}
          </p>
          <p>
            <strong>Assigned To:</strong>{" "}
            {ticket.assignedTo?.name || "Unassigned"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {ticket.description || "No description provided"}
          </p>

          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetails;
