import React from "react";
import { useWorkspaceMenu } from "../../hooks/useWorkspaceMenu";
import { getInitials } from "../../utils/workspaceUtils";
import { useNavigate } from "react-router";
import "./WorkspaceIconMenu.css";

const WorkspaceIconMenu = ({ currentWorkspace, allWorkspaces }) => {
  const { menuAbierto, menuRef, toggleMenu, handleWorkspaceClick } =
    useWorkspaceMenu();
  const navigate = useNavigate();

  if (!currentWorkspace) {
    return null;
  }

  const initials = getInitials(currentWorkspace.name);

  const handleAddWorkspace = () => {
    navigate("/workspace/new");
  };

  return (
    <div className="workspace-icon-menu-container" ref={menuRef}>
      <div
        className="workspace-icon-main"
        onClick={toggleMenu}
        style={{ backgroundColor: "#4A5568" }}
      >
        <span className="workspace-initials">{initials}</span>
      </div>

      {menuAbierto && allWorkspaces && allWorkspaces.length > 0 && (
        <div className="workspace-menu-dropdown">
          <div className="workspace-dropdown-header">
            <span>Cambiar a otro workspace</span>
          </div>

          <div className="workspace-list">
            {allWorkspaces
              .filter((item) => item && item.workspace)
              .map((item) => {
                const workspace = item.workspace;
                const wsInitials = getInitials(workspace.name);
                const isCurrentWorkspace =
                  workspace._id === currentWorkspace._id;

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
                      style={{ backgroundColor: "#4A5568" }}
                    >
                      {wsInitials}
                    </div>
                    <span className="workspace-item-name">
                      {workspace.name}
                    </span>
                    {/* {isCurrentWorkspace && (
                      <span className="current-badge">Actual</span>
                    )} */}
                  </div>
                );
              })}
          </div>
          {/*  Botón para agregar workspace */}
          <div className="workspaceDetail-item" onClick={handleAddWorkspace}>
            <div
              className="workspace-item-icon"
              style={{ backgroundColor: "#4a556840", fontSize: "1.5rem" }}
            >
              +
            </div>
            <span className="workspace-item-name">
              Añadir un espacio de trabajo
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceIconMenu;
