import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { getChannelMessageListByChannelId } from "../services/channelMessageService";
import useFetchMessages from "./useFetchMessages";
import io from "socket.io-client";
import ENVIRONMENT from "../config/environment";
import { getAuthorizationToken } from "../constants/http";

function useChannelMessage() {
  const { loading, response, error, sendRequest } = useFetchMessages();
  const { workspace_id, channel_id } = useParams();
  const [messages, setMessages] = useState([]);
  const lastChannelRef = useRef(null);
  const socketRef = useRef(null); // Guardar socket

  // ========== HTTP: Carga inicial ==========
  async function loadMessagesList(workspace_id, channel_id) {
    lastChannelRef.current = channel_id;
    sendRequest(async () => {
      return await getChannelMessageListByChannelId(workspace_id, channel_id);
    });
  }

  // ========== WebSocket: Conectar ==========
  useEffect(() => {
    // Conectar al servidor WebSocket
    const token = getAuthorizationToken();

    socketRef.current = io(ENVIRONMENT.URL_API, {
      auth: {
        token: token,
      },
    });

    socketRef.current.on("connect", () => {
      console.log("✅ WebSocket conectado");
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ WebSocket desconectado");
    });

    // Limpiar al desmontar
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // ========== WebSocket: Unirse al canal ==========
  useEffect(() => {
    if (socketRef.current && channel_id) {
      // Salir del canal anterior
      socketRef.current.emit("leave_channel");

      // Unirse al canal nuevo
      socketRef.current.emit("join_channel", channel_id);
    }
  }, [channel_id]);

  // ========== WebSocket: Escuchar mensajes nuevos  ==========
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("new_message", (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("new_message");
      }
    };
  }, []);

  // ========== WebSocket: Enviar mensaje==========
  function createChannelMessage(workspace_id, channel_id, content) {
    if (socketRef.current) {
      socketRef.current.emit("send_message", {
        channel_id,
        content,
      });
    }
  }

  // ========== Cargar mensajes al cambiar de canal ==========
  useEffect(() => {
    setMessages([]);
    if (workspace_id && channel_id) {
      loadMessagesList(workspace_id, channel_id);
    }
  }, [workspace_id, channel_id]);

  // ========== Actualizar mensajes desde HTTP ==========
  useEffect(() => {
    if (response && response.ok && response.data && response.data.messages) {
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
