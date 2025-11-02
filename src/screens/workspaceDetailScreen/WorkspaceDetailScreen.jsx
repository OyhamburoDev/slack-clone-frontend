import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { getWorkspaceById } from "../../services/workspaceService";
// import InviteUserForm from "../../Components/InviteUserForm/InviteUserForm";
import ChannelList from "../../components/ChannelList/ChannelList";
import useChannels from "../../hooks/useChannels";

const WorkspaceDetailScreen = () => {
  const { workspace_id } = useParams();
  const [channelName, setChannelName] = useState("");

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
      {workspace_id && <ChannelList />}
      <p>Acá van a ir InviteUserForm y ChannelList...</p>
    </div>
  );
};

export default WorkspaceDetailScreen;
