import React, { useEffect, useState, useRef } from "react";
import MessageList from "./MessageList";
import useChannelMessage from "../../hooks/useChannelMessage";
import "./ChannelChat.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { deleteChannel } from "../../services/channelService";
import { MoreVertical } from "lucide-react";

const ChannelChat = ({ channelName, isAdmin, loadChannelList }) => {
  const { workspace_id, channel_id } = useParams();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  console.log("que tiene channel id", channel_id);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el menú existe Y el click fue FUERA del menú
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false); // Cerrá el menú
      }
    };

    // Solo agregá el listener si el menú está abierto
    if (menuAbierto) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup: Removelo cuando el componente se desmonte o menuAbierto cambie
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAbierto]); // Se ejecuta cada vez que menuAbierto cambia

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleEliminarCanal = async () => {
    if (window.confirm("¿Seguro que querés eliminar este canal?")) {
      const result = await deleteChannel(workspace_id, channel_id);
      await loadChannelList();
      setMenuAbierto(false);
      if (result.ok) {
        navigate(`/workspace/${workspace_id}`);
      } else {
        alert("Error: " + result.message);
      }
    }
  };

  return (
    <div className="channel-chat-container">
      <div className="channel-chat-header">
        <h3 className="channel-chat-title"># {channelName}</h3>
        {isAdmin && channel_id && (
          <div className="channel-chat-title-button-ctn" onClick={toggleMenu}>
            <MoreVertical size={20} color="white" />
          </div>
        )}
        {/*  Dropdown menu */}
        {menuAbierto && (
          <div className="channel-menu-dropdown" ref={menuRef}>
            <div className="channel-menu-item" onClick={handleEliminarCanal}>
              Eliminar canal
            </div>
          </div>
        )}
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
