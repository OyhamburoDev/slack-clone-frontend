import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { createWorkspace } from "../../services/workspaceService";
import { useNavigate } from "react-router";
import slackLogo from "../../assets/images/slack-logo.png";
import "./CreateWorkspaceForm.css";

const CreateWorkspaceForm = ({ onCreateWorkspace }) => {
  const navigate = useNavigate(); // Agregá esto si no lo tenés
  const [workspaceName, setWorkspaceName] = useState("");
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
    console.log("Response completa:", response); // ← Agregá esta línea

    if (response && response.ok && response.data && response.data.workspace) {
      const workspaceId = response.data.workspace._id;
      console.log("Navegando a workspace:", workspaceId);
      navigate(`/workspace/${workspaceId}`);
    }
  }, [response, navigate]);

  return (
    <div className="create-workspace-form">
      <h2>Crear nuevo workspace</h2>
      <p className="form-description">
        Dale un nombre a tu espacio de trabajo para comenzar
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="workspace_name">Nombre del espacio de trabajo</label>
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
  );
};

export default CreateWorkspaceForm;
