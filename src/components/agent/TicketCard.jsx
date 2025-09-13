import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusDropdown from "./StatusDropdown";
import CommentSection from "./CommentSection";

const StatusBadge = ({ status }) => {
  const colors = {
    open: "bg-blue-500",
    "in progress": "bg-yellow-500",
    resolved: "bg-green-500",
    closed: "bg-gray-500",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-white text-sm ${
        colors[status] || "bg-blue-500"
      }`}
    >
      {status}
    </span>
  );
};

const TicketCard = ({ ticket, refresh }) => {
  return (
    <Card className="shadow-lg rounded-2xl hover:shadow-xl transition">
      <CardHeader>
        <CardTitle>{ticket.title}</CardTitle>
        <p className="text-sm text-gray-500">{ticket.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p>
          <strong>Status:</strong> <StatusBadge status={ticket.status} />
        </p>

        <StatusDropdown ticketId={ticket._id} refresh={refresh} />
        <CommentSection ticket={ticket} refresh={refresh} />
      </CardContent>
    </Card>
  );
};

export default TicketCard;
