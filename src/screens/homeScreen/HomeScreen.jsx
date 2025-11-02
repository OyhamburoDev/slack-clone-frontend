import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getWorkspaceList } from "../../services/workspaceService";
import { Link } from "react-router";

const HomeScreen = () => {
  const { loading, response, error, sendRequest } = useFetch();

  useEffect(() => {
    sendRequest(getWorkspaceList);
  }, []);

  console.log("es este", response, loading, error);
  return (
    <div>
      <h1>Espacios de trabajo</h1>
      {!loading &&
        response &&
        response.data.workspaces.map((elemento) => {
          return (
            <div key={elemento._id}>
              <h2>{elemento.name}</h2>
              <a href={`/workspace/${elemento.workspace_id}`}>Entrar</a>
            </div>
          );
        })}
      <Link to={"/workspace/new"}>Crear nuevo espacio de trabajo</Link>
    </div>
  );
};

export default HomeScreen;
