import React from "react";
import "./MessageList.css";

// Función para verificar si dos fechas son del mismo día
const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Función para formatear la fecha del divisor
const formatDateDivider = (dateString) => {
  const messageDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Si es hoy
  if (isSameDay(messageDate, today)) {
    return "Hoy";
  }

  // Si es ayer
  if (isSameDay(messageDate, yesterday)) {
    return "Ayer";
  }

  // Para otras fechas: "Miércoles, 29 de octubre"
  const options = { weekday: "long", day: "numeric", month: "long" };
  const formatted = messageDate.toLocaleDateString("es-ES", options);

  // Capitalizar la primera letra
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const processMessagesForGrouping = (messages) => {
  return messages.map((msg, index) => {
    // Verificar si necesitamos mostrar divisor de fecha
    let showDateDivider = false;
    if (index === 0) {
      showDateDivider = true;
    } else {
      const previousMsg = messages[index - 1];
      if (!isSameDay(msg.created_at, previousMsg.created_at)) {
        showDateDivider = true;
      }
    }

    // Si es el primer mensaje del día, siempre mostramos foto y nombre
    if (showDateDivider) {
      return { ...msg, showHeader: true, showDateDivider };
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
      showDateDivider: false,
    };
  });
};

// Función para formatear la hora
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
        <React.Fragment key={msg._id}>
          {/* Divisor de fecha */}
          {msg.showDateDivider && (
            <div
              className="date-divider"
              style={{
                marginTop:
                  processedMessages.indexOf(msg) === 0 ? "0rem" : "1.5rem",
              }}
            >
              <div className="date-divider-line"></div>
              <span className="date-divider-text">
                {formatDateDivider(msg.created_at)}
              </span>
              <div className="date-divider-line"></div>
            </div>
          )}

          {/* Mensaje */}
          <div
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
                <div
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessageList;
