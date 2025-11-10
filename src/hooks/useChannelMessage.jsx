import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import {
  createNewChannelMessage,
  getChannelMessageListByChannelId,
} from "../services/channelMessageService";
import useFetchMessages from "./useFetchMessages";

function useChannelMessage() {
  const { loading, response, error, sendRequest } = useFetchMessages();
  const { workspace_id, channel_id } = useParams();
  const [messages, setMessages] = useState([]);
  const lastChannelRef = useRef(null); // ← Guardamos el último canal pedido

  async function loadMessagesList(workspace_id, channel_id) {
    lastChannelRef.current = channel_id; // ← Guardamos qué canal estamos pidiendo
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
    setMessages([]); // Limpiar mensajes
    if (workspace_id && channel_id) {
      loadMessagesList(workspace_id, channel_id);
    }
  }, [workspace_id, channel_id]);

  useEffect(() => {
    if (response && response.ok && response.data && response.data.messages) {
      // ← Solo actualizar si la respuesta es del canal actual
      if (lastChannelRef.current === channel_id) {
        setMessages(response.data.messages);
      }
    }
  }, [response, channel_id]);

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
