import React, { useState } from "react";
import { Search, Hash, Briefcase } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({
  channels = [],
  workspaces = [],
  onSelectChannel,
  onSelectWorkspace,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.trim().length > 0);
  };

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

  const hasResults =
    filteredChannels.length > 0 || filteredWorkspaces.length > 0;

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Buscar en tu workspace"
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
