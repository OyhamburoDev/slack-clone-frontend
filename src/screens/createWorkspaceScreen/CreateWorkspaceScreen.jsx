import React, { useEffect } from "react";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { createWorkspace } from "../../services/workspaceService";
import { useNavigate } from "react-router";
import slackLogo from "../../assets/images/slack-logo.png";
import "./CreateWorkspaceScreen.css";

const CreateWorkspaceScreen = () => {
  const navigation = useNavigate();
  const { response, loading, error, sendRequest } = useFetch();

  const initial_state = {
    workspace_name: "",
  };

  const onSubmit = (form_data) => {
    sendRequest(async () => {
      return await createWorkspace(form_data.workspace_name, "");
    });
  };

  const { form_state, handleInputChange, handleSubmit } = useForm({
    initial_form_state: initial_state,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (response && response.ok) {
      navigation("/home");
    }
  }, [response]);

  return (
    <div className="createWorkspace-container">
      <div className="createWorkspace-logo">
        <img src={slackLogo} alt="Slack logo" />
      </div>
      <div className="createWorkspace-title-subtitle">
        <h2>¡Hola de nuevo!</h2>
        <p>Crear un nuevo espacio de trabajo</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="workspace_name">
              Nombre del espacio de trabajo
            </label>
            <input
              type="text"
              name="workspace_name"
              id="workspace_name"
              value={form_state.workspace_name}
              onChange={handleInputChange}
            />
          </div>
          {error && <span style={{ color: "red" }}>{error.message}</span>}
          <button>Crear espacio de trabajo</button>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspaceScreen;
