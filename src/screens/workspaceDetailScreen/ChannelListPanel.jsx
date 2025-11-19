import { UserPlus, Pencil, Plus, UserPlus as UserPlusIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState, useRef, useEffect } from "react";
import ChannelList from "../../components/channelList/ChannelList";
import SearchBar from "../../components/SearchBar/SearchBar";
import MobileHamburgerMenu from "../../components/MobileHamburgerMenu/MobileHamburgerMenu";
import "./ChannelListPanel.css";

const ChannelListPanel = ({
  isCreating,
  response,
  channels,
  selectedChannel,
  setSelectedChannel,
  setIsCreateChannelModalOpen,
  setIsInviteModalOpen,
  workspaces,
  onSelectChannel,
  onSelectWorkspace,
  placeholder,
  isAdmin,
  onDeleteWorkspace,
  isMobile,
}) => {
  const navigate = useNavigate();
  const { workspace_id } = useParams();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    if (menuAbierto) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAbierto]);

  const handleCreateChannel = () => {
    setIsCreateChannelModalOpen(true);
    setMenuAbierto(false);
  };

  const handleInviteTeam = () => {
    setIsInviteModalOpen(true);
    setMenuAbierto(false);
  };

  return (
    <>
      <div className="workspace-detail-container-panel">
        {/* Header mobile */}
        <div className="mobile-header-panel">
          <MobileHamburgerMenu
            currentWorkspace={response?.data?.workspace}
            allWorkspaces={workspaces}
            isAdmin={isAdmin}
            onDeleteWorkspace={onDeleteWorkspace}
          />
          <SearchBar
            channels={channels}
            workspaces={workspaces}
            workspaceId={workspace_id}
            onSelectChannel={onSelectChannel}
            onSelectWorkspace={onSelectWorkspace}
            placeholder={placeholder}
          />
        </div>

        {/* Panel de canales */}
        <div className="card-panel left-card-panel">
          {!isCreating && (
            <>
              <div className="left-card-content-panel">
                <div className="channels-scroll-container-panel">
                  <ChannelList
                    onSelectChannel={(id) => {
                      setSelectedChannel(id);
                      navigate(`/workspace/${workspace_id}/${id}`);
                    }}
                    selectedChannel={selectedChannel}
                    channels={channels}
                    onCreateClick={() => setIsCreateChannelModalOpen(true)}
                    isMobile={isMobile}
                  />
                </div>
              </div>

              <div className="left-card-footer-panel" ref={menuRef}>
                <button
                  className="invite-button-panel"
                  onClick={() => setMenuAbierto(!menuAbierto)}
                >
                  <Pencil size={22} />
                  <span className="btn-text">Acciones</span>
                </button>

                {/* MENÚ DESPLEGABLE */}
                {menuAbierto && (
                  <div className="actions-dropdown-panel">
                    <div
                      className="actions-dropdown-item"
                      onClick={handleCreateChannel}
                    >
                      <Plus size={18} />
                      <span>Crear canal</span>
                    </div>
                    <div
                      className="actions-dropdown-item"
                      onClick={handleInviteTeam}
                    >
                      <UserPlusIcon size={18} />
                      <span>Invita a compañeros de equipo</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChannelListPanel;
