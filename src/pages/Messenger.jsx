import Navbar from "../components/Navbar";
import Conversation from "../components/Conversation";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { SERVER_DOMAIN } from "../utils/pathService";
import { useNotifications } from "../context/NotificationContext";
import { useSocket } from "../context/SocketContext";
import { useNavigate, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Search } from "@mui/icons-material";

function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [search, setSearch] = useState("");
  const socket = useSocket();
  const { notifications, setNotifications } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    socket.current?.emit("addUser", user._id);
    socket.current?.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${SERVER_DOMAIN}/api/conversations/${user._id}`
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [user._id]);

  return (
    <>
      <div
        style={{ height: "calc(100vh - 6rem)" }}
        className="w-full flex flex-col items-center p-4"
      >
        <div className="w-96 lg:w-1/2">
          <div className="flex justify-between items-center">
            <span
              onClick={() => navigate(-1, { replace: true })}
              className="flex items-center"
            >
              <span className="font-bold mr-4 text-xl text-gray-800 cursor-pointer">
                <ArrowBack />
              </span>
              <span className="font-md text-xl text-gray-400">
                Conversations
              </span>
            </span>

            {/* <input
              type="text"
              value={search}
              placeholder="Search for friend..."
              className="flex-grow border rounded-md border-gray-300 px-2 py-1 outline-none focus:border-gray-500 hover:border-gray-500"
              onChange={(e) => setSearch(e.target.value)}
            /> */}
            <Link
              to="/search-chat"
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 text-gray-800"
            >
              <Search />
            </Link>
          </div>
          {conversations.length > 0 ? (
            <div className="w-full">
              {conversations.map((conversation) => (
                <div
                  className="block w-max mx-auto"
                  key={conversation._id}
                  onClick={() => setCurrentChat(conversation)}
                  to={`/editor/${user._id}/${conversation.members.map(
                    (c) => c !== user._id
                  )}`}
                >
                  <Conversation
                    conversation={conversation}
                    currentUser={user}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-24">
              <h1 className="text-4xl font-semibold text-gray-500">
                No conversations to show.
              </h1>
              <h2 className="text-xl font-md text-gray-200">
                Search for friend and initiate a conversation.
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Messenger;
