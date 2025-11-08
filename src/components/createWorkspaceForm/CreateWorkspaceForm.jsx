import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { createWorkspace } from "../../services/workspaceService";
import { useNavigate } from "react-router";
import "./CreateWorkspaceForm.css";

const CreateWorkspaceForm = () => {
  const navigate = useNavigate();
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
    if (response && response.ok && response.data && response.data.workspace) {
      const workspaceId = response.data.workspace._id;
      navigate(`/workspace/${workspaceId}`);
    }
  }, [response, navigate]);

  return (
    <div className="create-workspace-form">
      <h2>¿Cómo quieres que se llame tu espacio de trabajo de Slack?</h2>
      <p className="form-description">
        Elige algo que tu equipo pueda reconocer, como el nombre de tu empresa o
        equipo.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            name="workspace_name"
            id="workspace_name"
            placeholder="P. ej.: Empresa 123 o Ficciones S. A."
            value={form_state.workspace_name}
            onChange={handleInputChange}
            maxLength={50}
          />
        </div>
        {error && <span className="error-message">{error.message}</span>}
        <button type="submit" className="submit-button">
          Siguiente
        </button>
      </form>
    </div>
  );
};

export default CreateWorkspaceForm;
