import React from "react";
import { useParams } from "react-router";
import { formatTimeFromDate } from "../../utils/dateFormatter";
import "./ChannelList.css";

const ChannelList = ({
  onSelectChannel,
  selectedChannel,
  channels,
  onCreateClick,
  isMobile,
}) => {
  const { workspace_id } = useParams();

  return (
    <div className="channelList-cnt">
      <div className="channelList-title-cnt">
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
              <span># {elemento.name}</span>
              {isMobile && (
                <span className="channel-time">
                  {formatTimeFromDate(elemento.lastMessageAt)}
                </span>
              )}
            </button>
          );
        })}
    </div>
  );
};

export default ChannelList;
