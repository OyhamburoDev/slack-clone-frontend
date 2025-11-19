import ChannelChat from "../../components/channelChat/ChannelChat";
import CreateWorkspaceForm from "../../components/createWorkspaceForm/CreateWorkspaceForm";
import "./ChatPanel.css";

const ChatPanel = ({
  isCreating,
  workspace_id,
  selectedChannel,
  isAdmin,
  loadChannelList,
  channels,
  onDeleteChannel,
}) => {
  return (
    <div className="chat-panel-container">
      <div className="chat-panel-content">
        {isCreating ? (
          <CreateWorkspaceForm />
        ) : selectedChannel ? (
          <ChannelChat
            key={selectedChannel}
            workspace_id={workspace_id}
            channel_id={selectedChannel}
            channelName={channels.find((c) => c._id === selectedChannel)?.name}
            isAdmin={isAdmin}
            loadChannelList={loadChannelList}
            onDeleteChannel={onDeleteChannel}
          />
        ) : (
          <div>EMPTY</div>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;
