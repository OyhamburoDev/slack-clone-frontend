import { useState, useRef, useCallback } from "react";

const useFetchMessages = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);

  const sendRequest = useCallback(async (requestCallback) => {
    try {
      requestIdRef.current += 1;
      const currentRequestId = requestIdRef.current;

      setLoading(true);
      setError(null);

      const result = await requestCallback();

      // Solo actualizar si este es el request más reciente
      if (currentRequestId === requestIdRef.current) {
        setResponse(result);
      }
    } catch (err) {
      if (currentRequestId === requestIdRef.current) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    response,
    error,
    sendRequest,
  };
};

export default useFetchMessages;
