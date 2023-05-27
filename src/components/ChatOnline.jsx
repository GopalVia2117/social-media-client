import { useEffect, useState } from "react";
import axios from "axios";
import BASE_DIR from "../utils/pathService";
import { Person } from "@mui/icons-material";

function ChatOnline({ onlineUsers, currentUserId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + currentUserId);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentUserId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {}
  };

  return (
    <div>
      {onlineFriends.map((user) => (
        <div
          key={user._id}
          onClick={() => handleClick(user)}
          className="flex items-center mt-2 cursor-pointer hover:bg-gray-100 px-4 py-2"
        >
          {user?.profilePicture ? (
            <div className="relative">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={`${BASE_DIR}${user.profilePicture}`}
                alt=""
              />
              <span className="absolute w-2 h-2 rounded-full bg-green-500 top-0 right-0"></span>
            </div>
          ) : (
            <div className="relative">
              <span className="border border-white rounded-full p-2">
                <Person htmlColor="lightgray" />
              </span>
              <span className="absolute w-2 h-2 rounded-full bg-green-500 top-0 right-0"></span>
            </div>
          )}
          <span className="text-lg font-medium ml-2">{user?.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
