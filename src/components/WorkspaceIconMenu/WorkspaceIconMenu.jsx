import React from "react";
import { useWorkspaceMenu } from "../../hooks/useWorkspaceMenu";
import { getInitials } from "../../utils/workspaceUtils";
import "./WorkspaceIconMenu.css";

const WorkspaceIconMenu = ({ currentWorkspace, allWorkspaces }) => {
  const { menuAbierto, menuRef, toggleMenu, handleWorkspaceClick } =
    useWorkspaceMenu();

  if (!currentWorkspace) {
    return null;
  }

  const initials = getInitials(currentWorkspace.name);

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
              .filter((item) => item && item.workspace) // ← Agregá esta línea
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
        </div>
      )}
    </div>
  );
};

export default WorkspaceIconMenu;
