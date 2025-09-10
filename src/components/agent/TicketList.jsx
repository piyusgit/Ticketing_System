import React from "react";
import TicketCard from "./TicketCard";

const TicketList = ({ tickets, refresh }) => {
  if (tickets.length === 0) {
    return <p>No tickets assigned to you.</p>;
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
