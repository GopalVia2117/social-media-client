import { useEffect, useState } from "react";
import axios from "axios";
// import BASE_DIR from "../utils/pathService";
// import { Person } from "@mui/icons-material";
import User from "./User";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const friendId = conversation.members.find((m) => m !== currentUser._id);
      // console.log(friendId);
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    // <div className="flex items-center mt-2 cursor-pointer hover:bg-gray-100 p-2">
    //   {user?.profilePicture ? (
    //     <img
    //       className="w-8 h-8 rounded-full object-cover"
    //       src={`${BASE_DIR}${user.profilePicture}`}
    //       alt=""
    //     />
    //   ) : (
    //     <span className="border border-white rounded-full p-2">
    //       <Person htmlColor="lightgray" />
    //     </span>
    //   )}
    //   <span className="text-lg font-medium ml-2">{user?.username}</span>
    // </div>
    <User user={user} />
  );
}

export default Conversation;
