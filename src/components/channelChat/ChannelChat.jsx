import React, { useState } from "react";
import MessageList from "./MessageList";
import useChannelMessage from "../../hooks/useChannelMessage";
import "./ChannelChat.css";

const ChannelChat = ({ workspace_id, channel_id, channelName }) => {
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
    <div className="channel-chat-container">
      <div className="channel-chat-header">
        <h3 className="channel-chat-title"># {channelName}</h3>
      </div>

      <div className="channel-chat-messages">
        <MessageList messages={messages} />
      </div>

      <form onSubmit={handleSendMessage} className="channel-chat-form">
        <input
          type="text"
          placeholder="Escribí tu mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="channel-chat-input"
        />
        <button type="submit" className="channel-chat-button">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChannelChat;
