import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "./WorkspaceIconMenu.css";

const WorkspaceIconMenu = ({ currentWorkspace, allWorkspaces }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const navigate = useNavigate();

  const menuRef = useRef(null);

  const getInitials = (name) => {
    if (!name) return "WS";
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  const getWorkspaceColors = (name) => {
    return {
      primary: "#4A5568",
      secondary: "#4A5568",
    };
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };

    if (menuAbierto) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAbierto]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // Función para cambiar de workspace
  const handleWorkspaceClick = (workspaceId) => {
    navigate(`/workspace/${workspaceId}`);
    setMenuAbierto(false);
  };

  // Si no hay workspace actual, no mostrar nada
  if (!currentWorkspace) {
    return null;
  }

  const colors = getWorkspaceColors(currentWorkspace.name);
  const initials = getInitials(currentWorkspace.name);

  return (
    <div className="workspace-icon-menu-container" ref={menuRef}>
      {/* El ícono del workspace actual */}
      <div
        className="workspace-icon-main"
        onClick={toggleMenu}
        style={{ backgroundColor: colors.primary }}
      >
        <span className="workspace-initials">{initials}</span>
      </div>

      {/* El menú desplegable con todos los workspaces */}
      {menuAbierto && allWorkspaces && allWorkspaces.length > 0 && (
        <div className="workspace-menu-dropdown">
          <div className="workspace-dropdown-header">
            <span>Cambiar a otro workspace</span>
          </div>

          <div className="workspace-list">
            {allWorkspaces.map((item) => {
              const workspace = item.workspace;
              const wsColors = getWorkspaceColors(workspace.name);
              const wsInitials = getInitials(workspace.name);
              const isCurrentWorkspace = workspace._id === currentWorkspace._id;

              return (
                <div
                  key={workspace._id}
                  className={`workspaceDetail-item ${
                    isCurrentWorkspace ? "current" : ""
                  }`}
                  onClick={() => handleWorkspaceClick(workspace._id)}
                >
                  <div
                    className="workspace-item-icon"
                    style={{ backgroundColor: wsColors.primary }}
                  >
                    {wsInitials}
                  </div>
                  <span className="workspace-item-name">{workspace.name}</span>
                  {isCurrentWorkspace && (
                    <span className="current-badge">Actual</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceIconMenu;
