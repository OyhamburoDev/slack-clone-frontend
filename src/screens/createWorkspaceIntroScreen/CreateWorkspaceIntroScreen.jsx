import React from "react";
import { useNavigate } from "react-router";
import slackLogo from "../../assets/images/slack-logo.png";
import "./CreateWorkspaceIntroScreen.css";

const CreateWorkspaceIntroScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/workspace/new");
  };

  return (
    <div className="createWorkspace-container">
      <div className="createWorkspace-logo">
        <img src={slackLogo} alt="Slack logo" />
      </div>
      <div className="createWorkspace-title-subtitle">
        <h2 className="createWorkspaceIntro-title">¡Hola de nuevo!</h2>
        <p className="createWorkspaceIntro-subtitle">
          Crear un nuevo espacio de trabajo
        </p>
      </div>
      <div className="createWorkspaceInto-cnt-button">
        <button className="createWorkspaceInto-button" onClick={handleContinue}>
          <span className="button-icon">+</span>
          <span className="button-text">Crea un nuevo espacio de trabajo</span>
          <span className="button-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default CreateWorkspaceIntroScreen;
