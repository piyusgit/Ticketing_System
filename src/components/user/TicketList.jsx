import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TicketList = ({ tickets, onSelect }) => {
  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-gray-600">
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
                <p className="text-sm text-gray-500">{ticket.status}</p>
              </div>
              <Badge variant="secondary">{ticket.priority}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketList;
