import ENVIRONMENT from "../config/environment.js";
import {
  getAuthorizationToken,
  HTTP_METHODS,
  HEADERS,
  CONTENT_TYPE_VALUES,
} from "../constants/http.js";

async function getWorkspaceList() {
  const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/workspace`, {
    method: HTTP_METHODS.GET,
    headers: {
      Authorization: "Bearer " + getAuthorizationToken(),
    },
  });
  const response_data = await response_http.json();
  return response_data;
}

async function createWorkspace(name, url_image = "") {
  const response_http = await fetch(`${ENVIRONMENT.URL_API}/api/workspace`, {
    method: HTTP_METHODS.POST,
    headers: {
      [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
      Authorization: "Bearer " + getAuthorizationToken(),
    },
    body: JSON.stringify({ name, url_image }),
  });
  const response_data = await response_http.json();
  return response_data;
}

async function getWorkspaceById(workspace_id) {
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}`,
    {
      method: HTTP_METHODS.GET,
      headers: {
        Authorization: "Bearer " + getAuthorizationToken(),
      },
    }
  );
  const response_data = await response_http.json();
  return response_data;
}

export { getWorkspaceList, createWorkspace, getWorkspaceById };
