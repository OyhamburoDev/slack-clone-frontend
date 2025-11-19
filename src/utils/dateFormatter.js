/**
 * Formatea una fecha dependiendo si es de hoy o de días anteriores
 * - Hoy: "5:33 PM"
 * - Días anteriores: "Nov 15"
 * @param {string|null} dateString - Fecha en formato ISO
 * @returns {string} - Fecha formateada o "Sin mensajes"
 */
export function formatTimeFromDate(dateString) {
  // Si no hay fecha, retornar "Sin mensajes"
  if (!dateString) {
    return "Sin mensajes";
  }

  const messageDate = new Date(dateString);
  const today = new Date();

  // Verificar si el mensaje es de hoy
  const isToday =
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear();

  if (isToday) {
    // MOSTRAR HORA (5:33 PM)
    let hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesFormatted} ${ampm}`;
  } else {
    // MOSTRAR FECHA (Nov 15)
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const month = months[messageDate.getMonth()];
    const day = messageDate.getDate();
    return `${month} ${day}`;
  }
}
