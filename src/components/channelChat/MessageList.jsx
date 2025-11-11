import React from "react";
import "./MessageList.css";

const processMessagesForGrouping = (messages) => {
  return messages.map((msg, index) => {
    // Si es el primer mensaje, siempre mostramos foto y nombre
    if (index === 0) {
      return { ...msg, showHeader: true };
    }

    const previousMsg = messages[index - 1];
    const currentTime = new Date(msg.created_at);
    const previousTime = new Date(previousMsg.created_at);

    // Calculamos la diferencia en minutos
    const diffInMinutes = (currentTime - previousTime) / (1000 * 60);

    // ¿Es del mismo usuario Y pasaron menos de 5 minutos?
    const sameUser = msg.member?.user?._id === previousMsg.member?.user?._id;
    const withinTimeLimit = diffInMinutes <= 5;

    // Mostramos header solo si cambió de usuario O pasaron más de 5 min
    return {
      ...msg,
      showHeader: !sameUser || !withinTimeLimit,
    };
  });
};

//  Función para formatear la hora
const formatMessageTime = (dateString) => {
  const date = new Date(dateString);

  // Formateamos la hora en formato 24hs: "14:30"
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

const MessageList = ({ messages = [] }) => {
  if (!messages.length) {
    return (
      <p style={{ color: "#888" }}>Todavía no hay mensajes en este canal.</p>
    );
  }

  // Procesar los mensajes ANTES del return
  const processedMessages = processMessagesForGrouping(messages);

  return (
    <div>
      {processedMessages.map((msg) => (
        <div
          key={msg._id}
          style={{
            paddingTop: msg.showHeader ? "1rem" : "0.2rem",
            paddingBottom: "0.2rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <div className="message-list-container">
            {/* CONDICIONAL: Solo mostramos foto si showHeader es true */}
            {msg.showHeader ? (
              <div>
                <img
                  src="https://ca.slack-edge.com/T09PEMM1PCJ-U09NZ7PJAB1-g5331fa8f25c-48"
                  alt={`Avatar de ${msg.member?.user?.name || "usuario"}`}
                  className="message-avatar"
                />
              </div>
            ) : (
              // Si NO mostramos header, dejamos espacio vacío del mismo tamaño
              <div style={{ width: "46px" }}></div>
            )}

            <div>
              {/* CONDICIONAL: Solo mostramos nombre si showHeader es true */}
              {msg.showHeader && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <strong className="message-autor">
                    {msg.member?.user?.name || "Anónimo"}
                  </strong>
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    {formatMessageTime(msg.created_at)}
                  </span>
                </div>
              )}

              {/* El contenido SIEMPRE se muestra */}
              <p className="message-content">{msg.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
