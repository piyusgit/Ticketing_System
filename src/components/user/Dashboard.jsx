import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TicketForm from "./TicketForm";
import TicketDetail from "./TicketDetail";
import TicketList from "./TicketList";
const API_URL = import.meta.env.VITE_FRONTEND_URL;

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/ticket/myTickets`, {
          withCredentials: true,
        });
        console.log(res.data);
        setTickets(res.data || []);
      } catch (err) {
        console.error("Error fetching tickets:", err.response?.data?.message);
      }
    };
    fetchTickets();
  }, []);

  const handleTicketCreated = (newTicket) => {
    setTickets([...tickets, newTicket]);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🎟️ User Dashboard</CardTitle>
          <CardContent className="space-y-6">
            <TicketForm onTicketCreated={handleTicketCreated} />

            <TicketList tickets={tickets} onSelect={setSelectedTicket} />

            {selectedTicket && (
              <TicketDetail
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
              />
            )}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Dashboard;
