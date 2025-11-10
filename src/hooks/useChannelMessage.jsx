import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  createNewChannelMessage,
  getChannelMessageListByChannelId,
} from "../services/channelMessageService";
import useFetch from "./useFetch";

function useChannelMessage() {
  const { loading, response, error, sendRequest } = useFetch();
  const { workspace_id, channel_id } = useParams();
  const [messages, setMessages] = useState([]);

  async function loadMessagesList(workspace_id, channel_id) {
    sendRequest(async () => {
      return await getChannelMessageListByChannelId(workspace_id, channel_id);
    });
  }

  async function createChannelMessage(workspace_id, channel_id, content) {
    await sendRequest(async () => {
      return createNewChannelMessage(workspace_id, channel_id, content);
    });
    // Recargar mensajes después de crear
    loadMessagesList(workspace_id, channel_id);
  }

  useEffect(() => {
    console.log("🔄 Cambió workspace/channel:", workspace_id, channel_id);

    setMessages([]); // Limpiar mensajes
    if (workspace_id && channel_id) {
      loadMessagesList(workspace_id, channel_id);
    }
  }, [workspace_id, channel_id]);

  useEffect(() => {
    console.log("📩 Response:", response);
    if (response && response.ok && response.data && response.data.messages) {
      console.log("✅ Mensajes recibidos:", response.data.messages.length);
      setMessages(response.data.messages);
    }
  }, [response]);

  return {
    loading,
    response,
    error,
    messages,
    createChannelMessage,
    loadMessagesList,
  };
}

export default useChannelMessage;
