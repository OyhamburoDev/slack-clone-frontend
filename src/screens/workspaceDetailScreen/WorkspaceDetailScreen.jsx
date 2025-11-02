import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { getWorkspaceById } from "../../services/workspaceService";
// import InviteUserForm from "../../Components/InviteUserForm/InviteUserForm";
// import ChannelList from "../../Components/ChannelList/ChannelList";

const WorkspaceDetailScreen = () => {
  const { workspace_id } = useParams();

  const { sendRequest, response, error, loading } = useFetch();
  useEffect(() => {
    sendRequest(async () => {
      return await getWorkspaceById(workspace_id);
    });
  }, [workspace_id]);

  console.log("response:", response);

  return (
    <div>
      {response && (
        <h1>Workspace Seleccionado: {response.data.workspace.name}</h1>
      )}
      {/* <InviteUserForm workspace_id={workspace_id} />
      {workspace_id && <ChannelList />} */}
      <p>Acá van a ir InviteUserForm y ChannelList...</p>
    </div>
  );
};

export default WorkspaceDetailScreen;
