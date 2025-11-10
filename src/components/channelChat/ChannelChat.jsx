import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import useChannelMessage from "../../hooks/useChannelMessage";
import "./ChannelChat.css";
import { useParams } from "react-router";

const ChannelChat = ({ channelName }) => {
  const { workspace_id, channel_id } = useParams();

  const { messages, createChannelMessage, loadMessagesList } =
    useChannelMessage();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await createChannelMessage(workspace_id, channel_id, newMessage);
      setNewMessage("");
    }
  };
  // useEffect(() => {
  //   // Definimos una función async dentro del useEffect
  //   const fetchMessages = async () => {
  //     if (workspace_id && channel_id) {
  //       await loadMessagesList(workspace_id, channel_id);
  //     }
  //   };

  //   fetchMessages(); // Llamamos la función
  // }, [workspace_id, channel_id]);

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
