import React from "react";
import { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const API_URL = import.meta.env.VITE_FRONTEND_URL;

const TicketDetail = ({ ticket, onClose }) => {
  const [comments, setComments] = useState(ticket.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `${API_URL}/user/ticket/${ticket._id}/comment`,
        { text: newComment },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err.response?.data?.message);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{ticket.subject}</CardTitle>
        <Button variant="destructive" size="sm" onClick={onClose}>
          Close
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{ticket.description}</p>
        <p className="text-sm text-gray-500">Status: {ticket.status}</p>

        {/* Comments */}
        <div>
          <h3 className="font-medium mb-2">Comments</h3>
          <div className="space-y-2">
            {comments.length ? (
              comments.map((c, i) => (
                <div key={i} className="p-2 border rounded bg-gray-50 text-sm">
                  {c.text}{" "}
                  <span className="text-xs text-gray-400">- {c.author}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No comments yet.</p>
            )}
          </div>
        </div>

        {/* Add Comment */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleAddComment}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketDetail;
