"use client";

import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getWorkspaceList } from "../../services/workspaceService";
import { Link } from "react-router";
import "./HomeScreen.css";
import slackWhiteLogo from "../../assets/images/slack-white-logo.png";
import ilustracion from "../../assets/images/workspace-ilustration.png";

const HomeScreen = () => {
  const { loading, response, error, sendRequest } = useFetch();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    sendRequest(getWorkspaceList);
  }, []);

  console.log("es este", response, loading, error);
  console.log("WORKSPACES:", response?.data?.workspaces);

  const getWorkspaceColors = (name) => {
    const colorPairs = [
      { primary: "#4A154B", secondary: "#2EB67D" },
      { primary: "#E01E5A", secondary: "#ECB22E" },
      { primary: "#36C5F0", secondary: "#2EB67D" },
      { primary: "#611f69", secondary: "#ECB22E" },
      { primary: "#1264a3", secondary: "#007a5a" },
      { primary: "#E01E5A", secondary: "#36C5F0" },
    ];
    const index =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colorPairs.length;
    return colorPairs[index];
  };

  // Obtener el nombre del usuario del response
  const userName = response?.data?.workspaces?.[0]?.user?.name || "ti";

  const filteredWorkspaces =
    response?.data?.workspaces?.filter(
      (elemento) => elemento.workspace !== null
    ) || [];

  const workspacesCount = filteredWorkspaces.length;
  const hasWorkspaces = workspacesCount > 0;
  const hasMoreThanThree = workspacesCount > 3;

  return (
    <div className="home-container">
      {/* Logo de Slack y botón crear workspace */}
      <div className="home-header">
        <img
          src={slackWhiteLogo}
          alt="Slack logo"
          className="slack-white-logo"
        />
        <Link to="/workspace/create" className="create-workspace-button-header">
          Crear un nuevo espacio de trabajo
        </Link>
      </div>

      <div className="home-content">
        {loading && (
          <div className="workspaces-card">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Cargando espacios de trabajo...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="workspaces-card">
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <h3 className="error-title">Error al cargar</h3>
              <p className="error-message">{error.message}</p>
            </div>
          </div>
        )}

        {!loading && response && response.data.workspaces && (
          <>
            <div className="workspaces-card">
              {/* Título dentro de la card */}
              <div className="workspaces-card-header">
                <h2 className="workspaces-card-title">
                  Espacios de trabajo para {userName}
                </h2>
              </div>

              <div className="workspaces-list">
                {filteredWorkspaces
                  .slice(0, showAll ? undefined : 3)
                  .map((elemento) => {
                    const workspace = elemento.workspace;
                    const colors = getWorkspaceColors(workspace.name);

                    return (
                      <div key={elemento._id} className="workspace-item">
                        <div className="workspace-left">
                          <div className="workspace-icon">
                            <div
                              className="icon-square"
                              style={{ backgroundColor: colors.primary }}
                            ></div>
                            <div
                              className="icon-square"
                              style={{ backgroundColor: colors.secondary }}
                            ></div>
                            <div
                              className="icon-bar"
                              style={{ backgroundColor: colors.secondary }}
                            ></div>
                          </div>
                          <div className="workspace-details">
                            <h3 className="workspace-name">{workspace.name}</h3>
                          </div>
                        </div>
                        <a
                          href={`/workspace/${workspace._id}`}
                          className="workspace-button"
                        >
                          Iniciar Slack
                        </a>
                      </div>
                    );
                  })}
              </div>

              {hasMoreThanThree && (
                <button
                  className="show-more-button"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll
                    ? "Mostrar menos espacios de trabajo"
                    : `${workspacesCount - 3} espacios de trabajo más`}
                </button>
              )}
            </div>

            {/* Card para crear workspace (abajo) */}
            {hasWorkspaces && (
              <div className="create-workspace-card-bottom">
                <div className="create-workspace-illustration">
                  <img
                    src={ilustracion}
                    alt="Crear workspace"
                    className="illustration-image"
                  />
                </div>
                <h2 className="create-card-title">
                  ¿Quieres usar Slack con otro equipo?
                </h2>
                <Link
                  to="/workspace/create"
                  className="create-workspace-button-bottom"
                >
                  CREAR UN NUEVO ESPACIO DE TRABAJO
                </Link>
              </div>
            )}
          </>
        )}

        {!loading && response && workspacesCount === 0 && (
          <div className="workspaces-card">
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="empty-title">No tienes espacios de trabajo</h3>
              <p className="empty-description">
                Crea tu primer espacio de trabajo para comenzar a colaborar con
                tu equipo
              </p>
              <Link to="/workspace/new" className="empty-action-button">
                Crear mi primer espacio
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
