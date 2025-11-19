import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children, variant = "default" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${
          variant === "confirm" ? "modal-confirm" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`modal-header ${
            variant === "confirm" ? "modal-header-confirm" : ""
          }`}
        >
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div
          className={`modal-body ${
            variant === "confirm" ? "modal-body-confirm" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
