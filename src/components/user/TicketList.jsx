import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PriorityBadge = ({ priority }) => {
  const colors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-orange-500",
    urgent: "bg-red-500",
  };

  return (
    <Badge className={`${colors[priority] || "bg-gray-500"} text-white`}>
      {priority}
    </Badge>
  );
};

const TicketList = ({ tickets, onSelect }) => {
  if (!tickets.length) {
    return (
      <Card>
        <CardContent className="p-4 text-gray-600 text-center italic">
          No tickets found.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 flex justify-between items-center"
              onClick={() => onSelect(ticket)}
            >
              <div>
                <p className="font-medium">{ticket.subject}</p>
                <p className="text-sm text-gray-500">Status: {ticket.status}</p>
              </div>
              <PriorityBadge priority={ticket.priority} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketList;
