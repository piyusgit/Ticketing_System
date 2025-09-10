import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import StatusDropdown from "./StatusDropdown";
import CommentSection from "./CommentSection";

const TicketCard = ({ ticket, refresh }) => {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>{ticket.title}</CardTitle>
        <p className="text-sm text-gray-500">{ticket.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          <strong>Status:</strong>{" "}
          <span className="px-2 py-1 rounded text-white bg-blue-500">
            {ticket.status}
          </span>
        </p>

        {/* Status Update */}
        <StatusDropdown ticketId={ticket._id} refresh={refresh} />

        {/* Comments */}
        <CommentSection ticket={ticket} refresh={refresh} />
      </CardContent>
    </Card>
  );
};

export default TicketCard;
