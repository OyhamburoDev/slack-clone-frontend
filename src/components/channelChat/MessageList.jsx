import React from "react";

const MessageList = ({ messages = [] }) => {
  if (!messages.length) {
    return (
      <p style={{ color: "#888" }}>Todavía no hay mensajes en este canal.</p>
    );
  }

  return (
    <div>
      {messages.map((msg) => (
        <div
          key={msg._id}
          style={{
            marginBottom: "10px",
            backgroundColor: "#f6f6f6",
            padding: "8px",
            borderRadius: "5px",
          }}
        >
          <strong>{msg.member?.user?.name || "Anónimo"}:</strong>
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
