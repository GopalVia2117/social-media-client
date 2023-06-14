import { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";
import { SERVER_DOMAIN } from "../utils/pathService";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const friendId = conversation.members.find((m) => m !== currentUser._id);
      // console.log(friendId);
      try {
        const res = await axios.get(
          `${SERVER_DOMAIN}/api/users?userId=${friendId}`
        );
        setUser(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return <User user={user} />;
}

export default Conversation;
