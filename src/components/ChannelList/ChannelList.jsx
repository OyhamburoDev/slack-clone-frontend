import React from "react";
import { useParams } from "react-router";

import "./ChannelList.css";

const ChannelList = ({
  onSelectChannel,
  selectedChannel,
  channels,
  onCreateClick,
}) => {
  const { workspace_id } = useParams();

  console.log("este es el bucle", { channels });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "0.5rem",
        }}
      >
        <h2 className="canal-title">Canales</h2>
        <button onClick={onCreateClick} className="add-channel-button">
          +
        </button>
      </div>
      {Array.isArray(channels) &&
        channels.map((elemento) => {
          return (
            <button
              key={elemento._id}
              onClick={() => onSelectChannel(elemento._id)}
              className={`channel-item ${
                elemento._id === selectedChannel ? "channel-item-active" : ""
              }`}
            >
              # {elemento.name}
            </button>
          );
        })}
    </div>
  );
};

export default ChannelList;
