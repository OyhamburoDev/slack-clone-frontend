import React from "react";
import { useNavigate } from "react-router";

const CreateWorkspaceIntroScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/workspace/new");
  };

  return (
    <div className="intro-container">
      <img src="/logo-slack.png" alt="Slack logo" className="logo" />
      <h2>Comenzá tu nuevo espacio de trabajo</h2>
      <p>Creá un lugar para vos y tu equipo en segundos.</p>
      <button onClick={handleContinue}>Crear espacio de trabajo</button>
    </div>
  );
};

export default CreateWorkspaceIntroScreen;
