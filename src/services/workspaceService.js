import ENVIRONMENT from "../config/environment";
import { getAuthorizationToken, HTTP_METHODS } from "../constants/http";

async function getWorkspaceList() {
  const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/workspace`, {
    method: HTTP_METHODS.GET,
    headers: {
      Authorization: "Bearer" + getAuthorizationToken(),
    },
  });
  const response_data = await response_http.json();
  return response_data;
}

export { getWorkspaceList };
