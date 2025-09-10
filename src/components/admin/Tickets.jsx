import React from "react";
import TicketTable from "./TicketTable";

const Tickets = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Tickets</h1>
      <TicketTable />
    </div>
  );
};

export default Tickets;
