import ENVIRONMENT from "../config/environment";
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http";

export async function register(name, email, password) {
  try {
    const response_http = await fetch(
      `${ENVIRONMENT.URL_API}/api/auth/register`,
      {
        method: HTTP_METHODS.POST,
        headers: {
          [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const response_data = await response_http.json();

    if (!response_data.ok) {
      throw new Error(response_data.message);
    }

    return response_data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error(
        "No se pudo conectar con el servidor. Verificá tu conexión."
      );
    }
    throw error;
  }
}

export async function login(email, password) {
  try {
    const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/auth/login`, {
      method: HTTP_METHODS.POST,
      headers: {
        [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
      },
      body: JSON.stringify({ email, password }),
    });

    const response_data = await response_http.json();

    if (!response_data.ok) {
      throw new Error(response_data.message);
    }

    return response_data;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error(
        "No se pudo conectar con el servidor. Verificá tu conexión."
      );
    }
    throw error;
  }
}
