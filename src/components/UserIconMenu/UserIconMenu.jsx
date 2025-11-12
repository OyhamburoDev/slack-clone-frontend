import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { getUserDataFromToken } from "../../utils/auth.utils";
import "./UserIconMenu.css";

const UserIconMenu = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [userData, setUserData] = useState(null);
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

  useEffect(() => {
    const data = getUserDataFromToken();
    setUserData(data);
  }, []);

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

      {menuAbierto && (
        <div className="user-menu-dropdown">
          {userData ? (
            <>
              <div className="user-menu-dropdown-fullname">
                <div>
                  <img
                    src="https://ca.slack-edge.com/T09PEMM1PCJ-U09NZ7PJAB1-g5331fa8f25c-48"
                    alt="avatar-usuario"
                    className="message-avatar"
                  />
                </div>
                <div className="user-menu-dropdown-name">
                  <strong style={{ color: "#d5d3d3ff" }}>
                    {userData.name}
                  </strong>
                  <span
                    style={{
                      color: "#d5d3d3ff",
                      fontSize: "0.8rem",
                      paddingTop: "0.1rem",
                    }}
                  >
                    Disponible
                  </span>
                </div>
              </div>

              <div>
                <button className="logout-button" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            </>
          ) : (
            <div style={{ padding: "12px", color: "#d5d3d3ff" }}>
              Cargando...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserIconMenu;
