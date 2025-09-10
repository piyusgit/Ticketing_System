import React, { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CommentSection = ({ ticket, refresh }) => {
  const [commentText, setCommentText] = useState("");
  const addComment = async () => {
    try {
      await axios.post(
        `http://localhost:5000/agent/tickets/${ticket._id}/comment`,
        { text: commentText },
        {
          withCredentials: true,
        }
      );
      setCommentText("");
      refresh();
    } catch (err) {
      console.error("Error adding comment:", err.response?.data || err.message);
    }
  };
  return (
    <div className="space-y-2">
      <h4 className="font-semibold">Comments:</h4>
      {ticket.comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet.</p>
      ) : (
        ticket.comments.map((c) => (
          <p key={c._id} className="text-sm bg-gray-100 rounded p-2">
            {c.text}
          </p>
        ))
      )}

      <Textarea
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button onClick={addComment}>Add Comment</Button>
    </div>
  );
};

export default CommentSection;
