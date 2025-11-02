import React from "react";
import { Link, useParams } from "react-router";
import useChannels from "../../hooks/useChannels";

const ChannelList = () => {
  const { workspace_id } = useParams();
  const { channels } = useChannels();

  console.log({ channels });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Canales</h2>
      {channels.map((elemento) => {
        return (
          <Link
            key={elemento._id}
            to={`/workspace/${workspace_id}/${elemento._id}`}
          >
            {elemento.name}
          </Link>
        );
      })}
    </div>
  );
};

export default ChannelList;
