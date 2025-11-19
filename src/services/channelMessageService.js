import ENVIRONMENT from "../config/environment.js";
import {
  getAuthorizationToken,
  HTTP_METHODS,
  HEADERS,
  CONTENT_TYPE_VALUES,
} from "../constants/http.js";

async function getChannelMessageListByChannelId(workspace_id, channel_id) {
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels/${channel_id}/message`,
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

async function createNewChannelMessage(workspace_id, channel_id, content) {
  const response_http = await fetch(
    `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels/${channel_id}/message`,
    {
      method: HTTP_METHODS.POST,
      headers: {
        [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
        Authorization: "Bearer " + getAuthorizationToken(),
      },
      body: JSON.stringify({ content: content }),
    }
  );

  const response_data = await response_http.json();
  return response_data;
}

async function searchMessages(workspace_id, query) {
  const response_http = await fetch(
    `${
      ENVIRONMENT.URL_API
    }/api/workspace/${workspace_id}/search?query=${encodeURIComponent(query)}`,
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

export {
  getChannelMessageListByChannelId,
  createNewChannelMessage,
  searchMessages,
};
