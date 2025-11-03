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
      return getChannelMessageListByChannelId(workspace_id, channel_id);
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
    if (workspace_id && channel_id) {
      loadMessagesList(workspace_id, channel_id);
    }
  }, [workspace_id, channel_id]);

  useEffect(() => {
    if (response && response.ok && response.data && response.data.messages) {
      setMessages(response.data.messages);
    }
  }, [response]);

  return {
    loading,
    response,
    error,
    messages,
    createChannelMessage,
  };
}

export default useChannelMessage;
