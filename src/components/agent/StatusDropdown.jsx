import React from "react";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const StatusDropdown = ({ ticketId, refresh }) => {
  const updateStatus = async (status) => {
    try {
      await axios.patch(
        `http://localhost:5000/agent/ticket/${ticketId}/status`,
        { status },
        {
          withCredentials: true,
        }
      );
      refresh();
    } catch (err) {
      console.error(
        "Error updating ticket status:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <Select onValueChange={updateStatus}>
      <SelectTrigger>
        <SelectValue placeholder="Update Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="open">Open</SelectItem>
        <SelectItem value="in progress">In Progress</SelectItem>
        <SelectItem value="resolved">Resolved</SelectItem>
        <SelectItem value="closed">Closed</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusDropdown;
