import React from "react";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TicketForm = ({ onTicketCreated }) => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/user/ticket",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      onTicketCreated(res.data);
      setFormData({
        subject: "",
        description: "",
        priority: "",
      });
    } catch (err) {
      console.error("Error creating ticket:", err.response?.data?.message);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Raise New Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <Select
            value={formData.priority}
            onValueChange={(val) => setFormData({ ...formData, priority: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem>-- Assign Priority --</SelectItem>

              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            Submit Ticket
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TicketForm;
