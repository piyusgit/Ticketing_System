import React from "react";
import TicketCard from "./TicketCard";

const EmptyState = ({ message }) => (
  <p className="text-gray-500 text-center italic">{message}</p>
);

const TicketList = ({ tickets, refresh }) => {
  if (tickets.length === 0) {
    return <EmptyState message="No tickets assigned to you." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tickets.map((ticket) => (
        <TicketCard key={ticket._id} ticket={ticket} refresh={refresh} />
      ))}
    </div>
  );
};

export default TicketList;
