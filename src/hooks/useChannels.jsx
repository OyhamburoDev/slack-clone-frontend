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
      const createResponse = await createNewChannel(workspace_id, name);

      if (!createResponse.ok) {
        throw new Error("Error al crear canal");
      }

      // Si se creó bien, pedimos la nueva lista
      const listResponse = await getChannelListByWorkspaceId(workspace_id);

      if (!listResponse.ok) {
        throw new Error("Error al obtener la lista de canales");
      }

      // ✅ devolvemos la respuesta final
      return listResponse;
    });
  }

  // ← ESTE useEffect LO HABÍAS BORRADO Y ERA NECESARIO
  useEffect(() => {
    // Solo cargar canales si workspace_id existe y no es "new"
    if (workspace_id && workspace_id !== "new") {
      loadChannelList();
    }
  }, [workspace_id]); // ← Cuando cambia workspace_id, cargar canales

  useEffect(() => {
    if (response && response.ok) {
      if (response.data && response.data.channels) {
        setChannels(response.data.channels);
      }
    }
  }, [response]);

  return {
    loading,
    response,
    error,
    channels,
    createChannel,
    loadChannelList,
  };
}

export default useChannels;
