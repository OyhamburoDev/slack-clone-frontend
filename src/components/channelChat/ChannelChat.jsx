import React, { useEffect, useState, useRef } from "react";
import MessageList from "./MessageList";
import useChannelMessage from "../../hooks/useChannelMessage";
import "./ChannelChat.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { deleteChannel } from "../../services/channelService";
import { MoreVertical, Trash2 } from "lucide-react";
import ChatInput from "../chatInput/ChatInput";
import Modal from "../modals/Modal";

const ChannelChat = ({
  channelName,
  isAdmin,
  loadChannelList,
  onDeleteChannel,
}) => {
  const { workspace_id, channel_id } = useParams();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]); // Se ejecuta cada vez que cambian los mensajes

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

  return (
    <>
      <div className="channel-chat-container">
        <div className="channel-chat-header">
          <button
            className="back-button-mobile"
            onClick={() => {
              loadChannelList();
              navigate(`/workspace/${workspace_id}`);
            }}
          >
            ←
          </button>
          <h3 className="channel-chat-title"># {channelName}</h3>
          {isAdmin && channel_id && (
            <div ref={menuRef}>
              <div
                className="channel-chat-title-button-ctn"
                onClick={toggleMenu}
              >
                <MoreVertical size={20} color="white" />
              </div>

              {/*  Dropdown menu */}
              {menuAbierto && (
                <div className="channel-menu-dropdown">
                  <div
                    className="channel-menu-item channel-menu-item--danger"
                    onClick={() => {
                      setMenuAbierto(false);
                      onDeleteChannel();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Eliminar canal"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setMenuAbierto(false);
                        onDeleteChannel();
                      }
                    }}
                  >
                    <Trash2 size={16} className="trash-icon-mobile" />
                    <span className="channel-menu-item-text">
                      Eliminar canal
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="channel-chat-messages" ref={messagesEndRef}>
          <MessageList messages={messages} />
        </div>

        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          channelName={channelName}
        />
      </div>
    </>
  );
};

export default ChannelChat;
