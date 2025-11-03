import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import {
  getWorkspaceById,
  inviteMember,
} from "../../services/workspaceService";
// import InviteUserForm from "../../Components/InviteUserForm/InviteUserForm";
import ChannelList from "../../components/ChannelList/ChannelList";
import useChannels from "../../hooks/useChannels";

import ChannelChat from "../../components/channelChat/ChannelChat";
import MessageList from "../../components/channelChat/MessageList";

const WorkspaceDetailScreen = () => {
  const { workspace_id } = useParams();
  const [channelName, setChannelName] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const { sendRequest, response, error, loading } = useFetch();
  const { createChannel } = useChannels();
  useEffect(() => {
    sendRequest(async () => {
      return await getWorkspaceById(workspace_id);
    });
  }, [workspace_id]);

  console.log("response:", response);

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (channelName.trim()) {
      createChannel(channelName);
      setChannelName(""); // Limpiar el input
    }
  };

  const handleInviteMember = async (e) => {
    e.preventDefault();
    if (inviteEmail.trim()) {
      const result = await inviteMember(workspace_id, inviteEmail);
      if (result.ok) {
        alert("Invitación enviada!");
        setInviteEmail("");
      } else {
        alert("Error: " + result.message);
      }
    }
  };

  return (
    <div>
      {response && (
        <h1>Workspace Seleccionado: {response.data.workspace.name}</h1>
      )}

      {/* Formulario para crear canal */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Crear nuevo canal</h3>
        <form onSubmit={handleCreateChannel}>
          <input
            type="text"
            placeholder="Nombre del canal"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button
            type="submit"
            style={{ padding: "8px 15px", cursor: "pointer" }}
          >
            Crear Canal
          </button>
        </form>
      </div>

      {/* <InviteUserForm workspace_id={workspace_id} /> */}

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Invitar miembro</h3>
        <form onSubmit={handleInviteMember}>
          <input
            type="email"
            placeholder="Email del usuario"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button
            type="submit"
            style={{ padding: "8px 15px", cursor: "pointer" }}
          >
            Invitar
          </button>
        </form>
      </div>
      <ChannelList onSelectChannel={(id) => setSelectedChannel(id)} />

      {selectedChannel ? (
        <ChannelChat workspace_id={workspace_id} channel_id={selectedChannel} />
      ) : (
        <p style={{ color: "#777" }}>
          Seleccioná un canal para ver los mensajes.
        </p>
      )}
    </div>
  );
};

export default WorkspaceDetailScreen;
