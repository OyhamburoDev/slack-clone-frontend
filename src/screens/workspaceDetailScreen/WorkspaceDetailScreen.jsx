import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import useFetch from "../../hooks/useFetch";
import { UserPlus } from "lucide-react";
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
import { getWorkspaceList } from "../../services/workspaceService";
import WorkspaceIconMenu from "../../components/WorkspaceIconMenu/WorkspaceIconMenu";

const WorkspaceDetailScreen = () => {
  const { workspace_id } = useParams();
  const location = useLocation();
  const isCreating = location.pathname === "/workspace/new";
  const [channelName, setChannelName] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const { sendRequest, response, error, loading } = useFetch();
  const { sendRequest: sendWorkspacesRequest, response: workspacesResponse } =
    useFetch();
  const { createChannel, channels } = useChannels();
  const navigate = useNavigate();

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
  }, []);

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

  return (
    <div className="workspace-detail-container">
      <div className="cards-container">
        <div className="icons-sidebar">
          {/* Ícono del workspace arriba */}
          {!isCreating && response && (
            <WorkspaceIconMenu
              currentWorkspace={response.data.workspace}
              allWorkspaces={workspacesResponse?.data?.workspaces}
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

                <div style={{ marginTop: "20px" }}>
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
    </div>
  );
};
export default WorkspaceDetailScreen;
