import ENVIRONMENT from "../config/environment";
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http";

export async function register(name, email, password) {
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
}

export async function login(email, password) {
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
}
