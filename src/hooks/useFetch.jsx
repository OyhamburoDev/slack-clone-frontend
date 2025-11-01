import { useState } from "react";

/* Gestión interna de los fetch de mi app */
const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  async function sendRequest(requestCallback) {
    try {
      //Marcamos que estamos cargando
      setLoading(true);
      setError(null);
      // ejecutamos la consulta http
      const response = await requestCallback();

      //seteamos la respuesta como estado
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    response,
    error,
    sendRequest,
  };
};

export default useFetch;
