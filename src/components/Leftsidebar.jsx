import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import GroupIcon from "@mui/icons-material/Group";
import { Diversity1Sharp } from "@mui/icons-material";
import { Link } from "react-router-dom";

function Leftsidebar({}) {
  return (
    <div className="flex flex-col overflow-y-auto justify-between border-e bg-white p-3">
      <div className="px-4">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link to="/">
            <div className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-100">
              <RssFeedIcon />
              <span className="text-sm font-medium"> Feed </span>
            </div>
          </Link>

          <Link to="/messenger">
            <div className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
              <ChatIcon />
              <span className="text-sm font-medium"> Chats </span>
            </div>
          </Link>

          {/* <a
            href="#"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700"
          >
            <PlayCircleIcon />
            <span className="text-sm font-medium"> Videos </span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700"
          >
            <GroupIcon />
            <span className="text-sm font-medium"> Groups </span>
          </a> */}
        </nav>

        <hr className="mt-4" />
      </div>
    </div>
  );
}

export default Leftsidebar;
