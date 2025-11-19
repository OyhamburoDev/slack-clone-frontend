import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { getUserDataFromToken } from "../../utils/auth.utils";
import { getInitials } from "../../utils/workspaceUtils";
import { deleteWorkspace } from "../../services/workspaceService";
import "./MobileHamburgerMenu.css";

const MobileHamburgerMenu = ({
  currentWorkspace,
  allWorkspaces,
  isAdmin,
  onDeleteWorkspace,
}) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);

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

  useEffect(() => {
    const data = getUserDataFromToken();
    setUserData(data);
  }, []);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  const handleWorkspaceClick = (workspaceId) => {
    navigate(`/workspace/${workspaceId}`);
    setMenuAbierto(false);
  };

  const handleAddWorkspace = () => {
    navigate("/workspace/new");
    setMenuAbierto(false);
  };

  const handleDeleteWorkspace = () => {
    onDeleteWorkspace(); // Solo abre el modal
    setMenuAbierto(false);
  };

  return (
    <div className="mobile-hamburger-container" ref={menuRef}>
      <button className="hamburger-button-panel" onClick={toggleMenu}>
        ☰
      </button>

      {menuAbierto && (
        <div className="mobile-menu-dropdown">
          {/* SECCIÓN DE USUARIO */}
          {userData && (
            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <img
                  src="https://ca.slack-edge.com/T09PEMM1PCJ-U09NZ7PJAB1-g5331fa8f25c-48"
                  alt="avatar-usuario"
                  className="mobile-user-avatar"
                />
                <div className="mobile-user-details">
                  <strong className="mobile-user-name">{userData.name}</strong>
                  <span className="mobile-user-status">Disponible</span>
                </div>
              </div>
              <div className="mobile-logout-item" onClick={handleLogout}>
                Cerrar sesión
              </div>
            </div>
          )}

          {/* SEPARADOR */}
          <div className="mobile-menu-separator"></div>

          {/* SECCIÓN DE WORKSPACE ACTUAL */}
          {currentWorkspace && (
            <div className="mobile-workspace-current">
              <div className="mobile-workspace-name">
                {currentWorkspace.name}
              </div>
              {isAdmin && (
                <div
                  className="mobile-workspace-delete"
                  onClick={handleDeleteWorkspace}
                >
                  Eliminar espacio de trabajo
                </div>
              )}
            </div>
          )}

          {/* CAMBIAR A OTRO WORKSPACE */}
          <div className="mobile-workspace-header">
            Cambiar a otro workspace
          </div>

          <div className="mobile-workspace-list">
            {allWorkspaces
              ?.filter((item) => item && item.workspace)
              .map((item) => {
                const workspace = item.workspace;
                const wsInitials = getInitials(workspace.name);
                const isCurrentWorkspace =
                  currentWorkspace && workspace._id === currentWorkspace._id;

                return (
                  <div
                    key={workspace._id}
                    className={`mobile-workspace-item ${
                      isCurrentWorkspace ? "current" : ""
                    }`}
                    onClick={() => handleWorkspaceClick(workspace._id)}
                  >
                    <div
                      className="mobile-workspace-icon"
                      style={{ backgroundColor: "#4A5568" }}
                    >
                      {wsInitials}
                    </div>
                    <span className="mobile-workspace-item-name">
                      {workspace.name}
                    </span>
                  </div>
                );
              })}
          </div>

          {/* AÑADIR WORKSPACE */}
          <div className="mobile-workspace-item" onClick={handleAddWorkspace}>
            <div
              className="mobile-workspace-icon"
              style={{ backgroundColor: "#4a556840", fontSize: "1.5rem" }}
            >
              +
            </div>
            <span className="mobile-workspace-item-name">
              Añadir un espacio de trabajo
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHamburgerMenu;
