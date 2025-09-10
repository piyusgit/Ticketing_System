import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";
import useTickets from "../../hooks/useTickets";

const TicketTable = () => {
  const {
    tickets,
    agents,
    loading,
    error,
    updateTicketStatus,
    assignTicket,
    deleteTicket,
  } = useTickets();
  const navigate = useNavigate();
  if (loading) return <p className="p-4">Loading tickets...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <Card>
      <CardContent className="p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Subject</th>
              <th className="p-2">Status</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Assigned To</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((t) => (
                <tr key={t._id} className="border-b">
                  <td className="p-2">{t.subject}</td>
                  <td className="p-2">
                    <Select
                      value={t.status}
                      onValueChange={(value) =>
                        updateTicketStatus(t._id, value)
                      }
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-2">{t.priority}</td>
                  <td className="p-2">{t.owner?.name || "Unassigned"}</td>

                  {/* Assign Agent Dropdown */}
                  <td className="p-2">
                    <Select
                      value={t.assignedTo?._id || ""}
                      onValueChange={(value) => assignTicket(t._id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={t.assignedTo?.name || "Assign to Agent"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {agents.map((agent) => (
                          <SelectItem key={agent._id} value={agent._id}>
                            {agent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  <td className="p-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/admin/tickets/${t._id}`)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteTicket(t._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 text-center" colSpan={6}>
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default TicketTable;
