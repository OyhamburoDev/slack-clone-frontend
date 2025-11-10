import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "./UserIconMenu.css";

const UserIconMenu = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    if (menuAbierto) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAbierto]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <div className="user-icon-menu-container" ref={menuRef}>
      <div className="user-icon" onClick={toggleMenu}>
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Círculo de la cabeza */}
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          {/* Cuerpo/hombros */}
          <path
            d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* El menú desplegable (solo se muestra si menuAbierto es true) */}
      {menuAbierto && (
        <div className="user-menu-dropdown">
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserIconMenu;
