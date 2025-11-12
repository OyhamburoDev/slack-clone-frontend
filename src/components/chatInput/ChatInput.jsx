import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import "./ChatInput.css";

const ChatInput = ({ newMessage, setNewMessage, handleSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const inputRef = useRef(null);

  // Posicionar cursor después de actualizar el mensaje
  useEffect(() => {
    if (cursorPosition !== null && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      setCursorPosition(null);
    }
  }, [newMessage, cursorPosition]);

  // Función para envolver texto con formato
  const wrapText = (before, after = before) => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = newMessage.substring(start, end);

    const newText =
      newMessage.substring(0, start) +
      before +
      selectedText +
      after +
      newMessage.substring(end);

    setNewMessage(newText);

    // Calcular nueva posición del cursor
    const newPosition = selectedText
      ? end + before.length + after.length
      : start + before.length;

    setCursorPosition(newPosition);
  };

  // Funciones de formato
  const handleBold = () => wrapText("**");
  const handleItalic = () => wrapText("*");
  const handleStrikethrough = () => wrapText("~");
  const handleCode = () => wrapText("`");

  // Función para agregar emoji
  const onEmojiClick = (emojiObject) => {
    setNewMessage(newMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <form onSubmit={handleSendMessage} className="channel-chat-form">
      <div className="chat-input-wrapper">
        {/* Toolbar */}
        <div className="chat-toolbar">
          <button
            type="button"
            className="toolbar-button"
            title="Negrita"
            onClick={handleBold}
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Cursiva"
            onClick={handleItalic}
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Tachado"
            onClick={handleStrikethrough}
          >
            <s>S</s>
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Código"
            onClick={handleCode}
          >
            &lt;/&gt;
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Emoji"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              width="100%"
              height="350px"
            />
          </div>
        )}

        {/* Input + Botón */}
        <div className="chat-input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Escribí tu mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="channel-chat-input"
          />

          <button
            type="submit"
            className={`channel-chat-button ${
              newMessage.trim() ? "active" : ""
            }`}
            disabled={!newMessage.trim()}
          >
            ▶
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
