import LOCALSTORAGE_KEYS from "./localstorage";

/* Métodos HTTP que vamos a usar */
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

/* Headers que vamos a usar */
export const HEADERS = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
};

/* Ti[ps de contenido */
export const CONTENT_TYPE_VALUES = {
  JSON: "application/json",
};

export function getAuthorizationToken() {
  const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN);
  return auth_token;
}
