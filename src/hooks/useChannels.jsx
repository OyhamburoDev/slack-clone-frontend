import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  createNewChannel,
  getChannelListByWorkspaceId,
} from "../services/channelService";
import useFetch from "./useFetch";

function useChannels() {
  const { loading, response, error, sendRequest } = useFetch();

  const { workspace_id } = useParams();
  const [channels, setChannels] = useState([]);

  async function loadChannelList() {
    sendRequest(async () => {
      return getChannelListByWorkspaceId(workspace_id);
    });
  }

  async function createChannel(name) {
    sendRequest(async () => {
      return createNewChannel(workspace_id, name);
    });
  }

  useEffect(() => {
    loadChannelList();
  }, [workspace_id]);

  //Para que esto funcione correctamente, es importante que el backend siempre responda con la misma firma
  useEffect(() => {
    if (response && response.ok) {
      //Porque si se actualiza la ultima respuesta del servidor, quiero que se actulice mi estado
      setChannels(response.data.channels);
    }
  }, [response]);
  return {
    loading,
    response,
    error,
    channels,
    createChannel,
  };
}

export default useChannels;
