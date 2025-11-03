import React from "react";
import { useParams } from "react-router";
import useChannels from "../../hooks/useChannels";

const ChannelList = ({ onSelectChannel }) => {
  const { workspace_id } = useParams();
  const { channels } = useChannels();

  console.log({ channels });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Canales</h2>
      {channels.map((elemento) => {
        return (
          <button
            key={elemento._id}
            onClick={() => onSelectChannel(elemento._id)}
            style={{
              padding: "8px",
              margin: "5px 0",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {elemento.name}
          </button>
        );
      })}
    </div>
  );
};

export default ChannelList;
