import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import useFetch from "../../hooks/useFetch";
import { UserPlus, Search } from "lucide-react";
import {
  getWorkspaceById,
  inviteMember,
} from "../../services/workspaceService";
import ChannelList from "../../components/channelList/ChannelList";
import useChannels from "../../hooks/useChannels";
import ChannelChat from "../../components/channelChat/ChannelChat";
import "./WorkspaceDetailScreen.css";
import Modal from "../../components/modals/Modal";
import CreateWorkspaceForm from "../../components/createWorkspaceForm/CreateWorkspaceForm";
import UserIconMenu from "../../components/UserIconMenu/UserIconMenu";
import {
  getWorkspaceList,
  deleteWorkspace,
} from "../../services/workspaceService";
import WorkspaceIconMenu from "../../components/WorkspaceIconMenu/WorkspaceIconMenu";
import SearchBar from "../../components/SearchBar/SearchBar";
import ChannelListPanel from "./ChannelListPanel";
import ChatPanel from "./ChatPanel";
import ROLES from "../../constants/roles";
import useIsMobile from "../../hooks/useIsMobile";
import { deleteChannel } from "../../services/channelService";

const WorkspaceDetailScreen = () => {
  const isMobile = useIsMobile(480);

  const { workspace_id, channel_id } = useParams();
  const location = useLocation();
  const isCreating = location.pathname === "/workspace/new";
  const [channelName, setChannelName] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const { sendRequest, response, error, loading } = useFetch();
  const { sendRequest: sendWorkspacesRequest, response: workspacesResponse } =
    useFetch();
  const { createChannel, channels, loadChannelList } = useChannels();
  const navigate = useNavigate();
  const [isDeleteChannelModalOpen, setIsDeleteChannelModalOpen] =
    useState(false);
  const [isDeleteWorkspaceModalOpen, setIsDeleteWorkspaceModalOpen] =
    useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);

  useEffect(() => {
    if (!isCreating && workspace_id) {
      sendRequest(async () => {
        return await getWorkspaceById(workspace_id);
      });
    }
  }, [workspace_id, isCreating]);

  useEffect(() => {
    const loadAllWorkspaces = async () => {
      await sendWorkspacesRequest(getWorkspaceList);
    };

    loadAllWorkspaces();
  }, [workspace_id]);

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (channelName.trim()) {
      createChannel(channelName);
      setChannelName("");
      setIsCreateChannelModalOpen(false);
    }
  };

  const handleInviteMember = async (e) => {
    e.preventDefault();
    if (inviteEmail.trim()) {
      const result = await inviteMember(workspace_id, inviteEmail);
      if (result.ok) {
        alert("Invitación enviada!");
        setInviteEmail("");
        setIsInviteModalOpen(false);
      } else {
        alert("Error: " + result.message);
      }
    }
  };

  const handleEliminarCanal = async () => {
    const result = await deleteChannel(workspace_id, channel_id);
    await loadChannelList();
    setIsDeleteChannelModalOpen(false);
    if (result.ok) {
      navigate(`/workspace/${workspace_id}`);
    } else {
      alert("Error: " + result.message);
    }
  };

  const handleDeleteWorkspaceConfirm = async () => {
    const result = await deleteWorkspace(workspace_id);
    setIsDeleteWorkspaceModalOpen(false);
    if (result.ok) {
      navigate("/home");
    } else {
      alert("Error: " + result.message);
    }
  };

  const isAdmin =
    !isCreating &&
    workspacesResponse?.data?.workspaces
      ?.filter((item) => item && item.workspace)
      ?.find((item) => item.workspace._id === workspace_id)?.role ===
      ROLES.ADMIN;

  return (
    <>
      {isMobile ? (
        isCreating ? (
          <div
            style={{
              height: "100vh",
              background:
                "linear-gradient(135deg, #4a154b 0%, #36184c 50%, #1a0b2e 100%)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* HEADER CON FLECHA */}
            <div
              style={{
                padding: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <button
                onClick={() => navigate(-1)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                ←
              </button>
              <h2 style={{ color: "white", margin: 0, fontSize: "1.2rem" }}>
                Crear espacio de trabajo
              </h2>
            </div>

            {/* FORMULARIO */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              <CreateWorkspaceForm />
            </div>
          </div>
        ) : channel_id ? (
          <>
            <ChatPanel
              isCreating={isCreating}
              selectedChannel={channel_id}
              workspace_id={workspace_id}
              isAdmin={isAdmin}
              loadChannelList={loadChannelList}
              channels={channels}
              onDeleteChannel={() => setIsDeleteChannelModalOpen(true)}
            />
          </>
        ) : (
          <ChannelListPanel
            isCreating={isCreating}
            response={response}
            channels={channels}
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            setIsCreateChannelModalOpen={setIsCreateChannelModalOpen}
            setIsInviteModalOpen={setIsInviteModalOpen}
            workspaces={workspacesResponse?.data?.workspaces || []}
            isAdmin={isAdmin}
            onDeleteWorkspace={() => setIsDeleteWorkspaceModalOpen(true)}
            onSelectChannel={(channelId) => {
              setSelectedChannel(channelId);
              navigate(`/workspace/${workspace_id}/${channelId}`);
            }}
            onSelectWorkspace={(workspaceId) => {
              navigate(`/workspace/${workspaceId}`);
            }}
            placeholder={`Buscar en ${
              response?.data?.workspace?.name || "tu workspace"
            }`}
            isMobile={isMobile}
          />
        )
      ) : (
        <div className="workspace-detail-container">
          <div className="workspace-header-container">
            <button className="hamburger-button">☰</button>
            <SearchBar
              channels={channels}
              workspaces={workspacesResponse?.data?.workspaces || []}
              workspaceId={workspace_id}
              onSelectChannel={(channelId) => {
                setSelectedChannel(channelId);
                navigate(`/workspace/${workspace_id}/${channelId}`);
              }}
              onSelectWorkspace={(workspaceId) => {
                navigate(`/workspace/${workspaceId}`);
              }}
              placeholder="Buscar en tu espacio de trabajo"
            />
          </div>
          <div className="cards-container">
            <div className="icons-sidebar">
              {/* Ícono del workspace arriba */}
              {!isCreating && response && (
                <WorkspaceIconMenu
                  currentWorkspace={response.data.workspace}
                  allWorkspaces={workspacesResponse?.data?.workspaces}
                  isAdmin={isAdmin}
                  onDeleteworkspace={() => setIsDeleteWorkspaceModalOpen(true)}
                />
              )}
              {/* Ícono de usuario ABAJO */}
              <UserIconMenu />
            </div>

            {/* Left card se muestra vacía si isCreating  */}
            <div className="card left-card">
              {!isCreating && (
                <>
                  <div className="left-card-content">
                    <div className="left-title-name">
                      {response && (
                        <h2 className="ws-detail-title">
                          {response.data.workspace.name}
                        </h2>
                      )}
                    </div>

                    <div className="channels-scroll-container">
                      <ChannelList
                        onSelectChannel={(id) => {
                          setSelectedChannel(id);
                          navigate(`/workspace/${workspace_id}/${id}`);
                        }}
                        selectedChannel={selectedChannel}
                        channels={channels}
                        onCreateClick={() => setIsCreateChannelModalOpen(true)}
                      />
                    </div>
                  </div>

                  <div className="left-card-footer">
                    <p className="footer-text">Slack es mejor si se combina.</p>
                    <button
                      className="invite-button"
                      onClick={() => setIsInviteModalOpen(true)}
                    >
                      <UserPlus size={15} />
                      Invita a compañeros de equipo
                    </button>
                  </div>
                </>
              )}
            </div>

            {/*  Right card muestra formulario si isCreating */}
            <div className="card right-card">
              {isCreating ? (
                <CreateWorkspaceForm />
              ) : selectedChannel ? (
                <ChannelChat
                  key={selectedChannel}
                  workspace_id={workspace_id}
                  channel_id={selectedChannel}
                  channelName={
                    channels.find((c) => c._id === selectedChannel)?.name
                  }
                  isAdmin={isAdmin}
                  loadChannelList={loadChannelList}
                  onDeleteChannel={() => setIsDeleteChannelModalOpen(true)}
                />
              ) : (
                <div className="empty-chat-message">
                  <p>
                    {channels.length === 0
                      ? "Creá un canal para comenzar"
                      : "Seleccioná un canal para ver los mensajes"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invitar miembro"
      >
        <form onSubmit={handleInviteMember} className="modal-form">
          <input
            type="email"
            placeholder="Email del usuario"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="modal-input"
          />
          <button type="submit" className="modal-submit">
            Invitar
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={isCreateChannelModalOpen}
        onClose={() => setIsCreateChannelModalOpen(false)}
        title="Crear nuevo canal"
      >
        <form onSubmit={handleCreateChannel} className="modal-form">
          <input
            type="text"
            placeholder="Nombre del canal"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="modal-input"
          />
          <button type="submit" className="modal-submit">
            Crear Canal
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={isDeleteChannelModalOpen}
        onClose={() => setIsDeleteChannelModalOpen(false)}
        title="Eliminar canal"
        variant="confirm"
      >
        <p style={{ color: "#fff", marginBottom: "20px" }}>
          ¿Seguro que querés eliminar este canal?
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => setIsDeleteChannelModalOpen(false)}
            style={{
              padding: "8px 16px",
              background: "#444",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleEliminarCanal}
            style={{
              padding: "8px 16px",
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteWorkspaceModalOpen}
        onClose={() => setIsDeleteWorkspaceModalOpen(false)}
        title="Eliminar espacio de trabajo"
        variant="confirm"
      >
        <p style={{ color: "#fff", marginBottom: "20px" }}>
          ¿Seguro que querés eliminar "{response?.data?.workspace?.name}"?
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={() => setIsDeleteWorkspaceModalOpen(false)}
            style={{
              padding: "8px 16px",
              background: "#444",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleDeleteWorkspaceConfirm}
            style={{
              padding: "8px 16px",
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
};
export default WorkspaceDetailScreen;
