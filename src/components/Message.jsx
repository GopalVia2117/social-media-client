import axios from "axios";
import { useEffect, useState } from "react";
import timeago, { format } from "timeago.js";
import { SERVER_DOMAIN } from "../utils/pathService";
import { Person } from "@mui/icons-material";

export default function Message({ currentUser, message }) {
  const [senderProfile, setSenderProfile] = useState(null);
  const [own, setOwn] = useState(false);

  useEffect(() => {
    const getSender = async () => {
      try {
        if (message.sender === currentUser._id) {
          setSenderProfile(currentUser);
          setOwn(true);
        } else {
          const response = await axios.get(
            `${SERVER_DOMAIN}/users?userId=${message.sender}`
          );
          setSenderProfile(response.data);
          setOwn(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSender();
  }, [message.sender]);
  return (
    <div className={own ? "ml-auto max-w-sm mt-4" : "max-w-md mt-4"}>
      <div>
        <div className={own ? "flex justify-end" : "flex"}>
          {senderProfile?.profilePicture ? (
            <img
              className="w-8 h-8 rounded-full object-cover mr-2"
              src={`$${senderProfile.profilePicture}`}
              alt=""
            />
          ) : (
            <span className="border border-white rounded-full p-2">
              <Person htmlColor="lightgray" />
            </span>
          )}
          <span
            className={
              own
                ? "bg-gray-100 rounded-md p-2"
                : "bg-blue-600 text-white rounded-md p-2"
            }
          >
            {message.text}
          </span>
        </div>
        <span className={own ? "text-sm text-end block" : "text-sm block"}>
          {format(message?.createdAt)}
        </span>
      </div>
    </div>
  );
}
