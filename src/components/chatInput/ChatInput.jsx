import React, { useState, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Extension } from "@tiptap/core";
import EmojiPicker from "emoji-picker-react";
import Placeholder from "@tiptap/extension-placeholder";
import "./ChatInput.css";
import {
  List,
  ListOrdered,
  Smile,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  SendHorizontal,
} from "lucide-react";

// Extensión para Enter/Shift+Enter
const EnterSubmit = Extension.create({
  name: "enterSubmit",

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        this.editor.view.dom.closest("form")?.requestSubmit();
        return true;
      },
      "Shift-Enter": () => {
        return this.editor.commands.first(({ commands }) => [
          () => commands.newlineInCode(),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock(),
        ]);
      },
    };
  },
});

const ChatInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  channelName,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const editorConfig = useMemo(
    () => ({
      extensions: [
        StarterKit.configure({
          hardBreak: false,
          link: false, // ← Desactivar link del StarterKit
          underline: false, // ← Desactivar underline del StarterKit
        }),
        Underline,
        Link.configure({
          openOnClick: false,
          autolink: true,
        }),
        Placeholder.configure({
          placeholder: `Mensaje #${channelName || "canal"}`,
        }),
        EnterSubmit,
      ],
      content: "",
      onUpdate: ({ editor }) => {
        const text = editor.getText();
        setNewMessage(text.trim() ? editor.getHTML() : "");
      },
    }),
    [channelName]
  );

  const editor = useEditor(editorConfig);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      handleSendMessage(e);
      editor?.commands.clearContent();
    }
  };

  const onEmojiClick = (emojiObject) => {
    editor?.chain().focus().insertContent(emojiObject.emoji).run();
    setShowEmojiPicker(false);
  };

  if (!editor) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="channel-chat-form">
      <div className="chat-input-wrapper">
        {/* Toolbar */}
        <div className="chat-toolbar">
          <button
            type="button"
            className="toolbar-button"
            title="Negrita"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Cursiva"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Subrayado"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Tachado"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={16} />
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Código"
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code size={16} />
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Lista con viñetas"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={16} />
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Lista numerada"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={16} />
          </button>
          <button
            type="button"
            className="toolbar-button"
            title="Emoji"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile size={16} />
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

        {/* Input */}
        <div className="chat-input-container">
          <div>
            <EditorContent editor={editor} className="channel-chat-input" />
          </div>
          <div>
            <button
              type="submit"
              className={`channel-chat-button ${
                newMessage.trim() ? "active" : ""
              }`}
              disabled={!newMessage.trim()}
            >
              <SendHorizontal size={15} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
