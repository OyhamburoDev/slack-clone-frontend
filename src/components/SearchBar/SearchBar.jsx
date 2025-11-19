import React, { useState, useEffect } from "react";
import { Search, Hash, Briefcase, MessageSquare } from "lucide-react";
import "./SearchBar.css";
import { searchMessages } from "../../services/channelMessageService";

const SearchBar = ({
  channels = [],
  workspaces = [],
  workspaceId,
  onSelectChannel,
  onSelectWorkspace,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.trim().length > 0);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (searchTerm.trim().length > 0 && workspaceId) {
        setLoadingMessages(true);
        const result = await searchMessages(workspaceId, searchTerm);
        console.log("Resultado búsqueda:", result);
        if (result.ok) {
          setMessages(result.data.messages);
          console.log("Mensajes encontrados:", result.data.messages);
        }
        setLoadingMessages(false);
      } else {
        setMessages([]);
      }
    };

    const timeoutId = setTimeout(fetchMessages, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, workspaceId]);

  // Filtrar canales
  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar workspaces
  const filteredWorkspaces = workspaces.filter((ws) => {
    // Verificar que workspace existe y tiene name
    if (!ws || !ws.workspace || !ws.workspace.name) return false;
    return ws.workspace.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  console.log("Workspaces recibidos:", workspaces);
  console.log("Workspaces filtrados:", filteredWorkspaces);

  const handleChannelClick = (channelId) => {
    onSelectChannel(channelId);
    setSearchTerm("");
    setShowResults(false);
  };

  const handleWorkspaceClick = (workspaceId) => {
    onSelectWorkspace(workspaceId);
    setSearchTerm("");
    setShowResults(false);
  };

  const handleMessageClick = (message) => {
    onSelectChannel(message.channel._id);
    setSearchTerm("");
    setShowResults(false);
  };

  const hasResults =
    filteredChannels.length > 0 ||
    filteredWorkspaces.length > 0 ||
    messages.length > 0;

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder={placeholder}
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Search size={16} color="#ffffffae" />
      </div>

      {/* Dropdown de resultados */}
      {showResults && (
        <div className="search-results">
          {hasResults ? (
            <>
              {/* Workspaces */}
              {filteredWorkspaces.length > 0 && (
                <div className="search-section">
                  <h4 className="search-section-title">
                    Tus espacios de trabajo
                  </h4>
                  {filteredWorkspaces.map((ws) => (
                    <div
                      key={ws.workspace._id}
                      className="search-result-item"
                      onClick={() => handleWorkspaceClick(ws.workspace._id)}
                    >
                      <Briefcase size={16} color="#888" />
                      <span className="search-result-text">
                        {ws.workspace.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Canales */}
              {filteredChannels.length > 0 && (
                <div className="search-section">
                  <h4 className="search-section-title">
                    Canales del espacio de trabajo actual
                  </h4>
                  {filteredChannels.map((channel) => (
                    <div
                      key={channel._id}
                      className="search-result-item"
                      onClick={() => handleChannelClick(channel._id)}
                    >
                      <Hash size={16} color="#888" />
                      <span className="search-result-text">{channel.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Mensajes */}
              {messages.length > 0 && (
                <div className="search-section">
                  <h4 className="search-section-title">Mensajes</h4>
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className="search-result-item message-result"
                      onClick={() => handleMessageClick(message)}
                    >
                      <MessageSquare size={16} color="#888" />
                      <div className="message-result-content">
                        <div className="message-result-header">
                          <span className="message-result-author">
                            {message.member?.user?.name}
                          </span>
                          <span className="message-result-channel">
                            en #{message.channel?.name}
                          </span>
                        </div>
                        <div className="message-result-text">
                          {message.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 80)}
                          {message.content.replace(/<[^>]*>/g, "").length >
                            80 && "..."}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="search-results-empty">
              No se encontraron resultados para "{searchTerm}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
