import React, { useState } from "react";
import MessageList from "./MessageList";
import useChannelMessage from "../../hooks/useChannelMessage";

const ChannelChat = ({ workspace_id, channel_id }) => {
  const { messages, createChannelMessage } = useChannelMessage();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await createChannelMessage(workspace_id, channel_id, newMessage);
      setNewMessage("");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "10px",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        height: "400px",
      }}
    >
      <h3>Mensajes del canal</h3>

      {/* Lista de mensajes */}
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
        <MessageList messages={messages} />
      </div>

      {/* Input para enviar mensaje */}
      <form
        onSubmit={handleSendMessage}
        style={{
          display: "flex",
          gap: "10px",
          borderTop: "1px solid #ddd",
          paddingTop: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Escribí tu mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 15px", cursor: "pointer" }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChannelChat;
