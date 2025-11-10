import ENVIRONMENT from "../config/environment.js";
import {
  getAuthorizationToken,
  HTTP_METHODS,
  HEADERS,
  CONTENT_TYPE_VALUES,
} from "../constants/http.js";

async function getChannelListByWorkspaceId(workspace_id) {
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels`,
    {
      method: HTTP_METHODS.GET,
      headers: {
        Authorization: "Beaber " + getAuthorizationToken(),
      },
    }
  );
  const response_data = await response_http.json();
  return response_data;
}

async function createNewChannel(workspace_id, channel_name) {
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels`,
    {
      method: HTTP_METHODS.POST,
      headers: {
        [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
        Authorization: "Bearer " + getAuthorizationToken(),
      },
      body: JSON.stringify({ name: channel_name }),
    }
  );

  const response_data = await response_http.json();

  return response_data;
}

export { getChannelListByWorkspaceId, createNewChannel };
