import React from "react";
import { ArrowBack, Telegram } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import Message from "../components/Message";
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { SERVER_DOMAIN } from "../utils/pathService";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const MessageEditor = ({}) => {
  const param = useParams();
  const [currentChat, setCurrentChat] = useState(null);
  const { user } = useContext(AuthContext);
  const [friend, setFriend] = useState("");
  //   const user = {
  //     _id: "644e7e6fc6026ebc23a0ab92",
  //     username: "Janell Shrum",
  //     email: "janell@gmail.com",
  //     password: "$2b$10$sLRTpLQonCiy5Zjhet/KaukCHoaccbdFwJwTUm5Sc/AVJJrr49a/y",
  //     profilePicture: "1684237841033advertisement.jpg",
  //     coverPicture: "1684861815283photo5.jpg",
  //     followers: ["644e7e4ec6026ebc23a0ab90", "644e7e98c6026ebc23a0ab94"],
  //     followings: ["644e7e4ec6026ebc23a0ab90", "644e7e98c6026ebc23a0ab94"],
  //     isAdmin: false,
  //     createdAt: {
  //       $date: {
  //         $numberLong: "1682865775313",
  //       },
  //     },
  //     updatedAt: {
  //       $date: {
  //         $numberLong: "1684861815666",
  //       },
  //     },
  //     __v: 0,
  //     city: "Bhopal",
  //     from: "Raisen",
  //     relationship: 2,
  //     desc: "Love to interact with new people",
  //   };
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const getFriend = async () => {
      const { data } = await axios.get(
        `${SERVER_DOMAIN}/api/users?userId=${param.friendId}`
      );
      setFriend(data);
    };
    getFriend();
  }, [param.friendId]);
  useEffect(() => {
    const getConversations = async () => {
      const { data } = await axios.get(
        `${SERVER_DOMAIN}/api/conversations/find/${param.userId}/${param.friendId}`
      );
      setCurrentChat(data);
    };
    getConversations();
  }, [param]);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      console.log("Get Message Event Called....");
      const currentTime = Date.now();

      // const newNotifications = [
      //   ...notifications,
      //   {
      //     sender: data.senderId,
      //     notificationMessage: data.notificationMessage,
      //   },
      // ];

      // setNotifications(newNotifications);
      // console.log(notifications);

      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: currentTime,
      });
    });
  });

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${SERVER_DOMAIN}/api/messages/` + currentChat._id
        );
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMsg = {
      sender: user._id,
      conversationId: currentChat._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current?.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage,
      notificationMessage: "message",
    });

    try {
      const res = await axios.post(`${SERVER_DOMAIN}/api/messages`, newMsg);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-h-screen overflow-hidden">
      <div className="w-full flex items-center justify-center space-x-4 top-0 p-4 h-[4rem] bg-gray-50 text-xl z-10">
        <span
          className="absolute left-4"
          onClick={() => navigate(-1, { replace: true })}
        >
          <ArrowBack />
        </span>
        <h1>{friend?.username}</h1>
      </div>
      <div
        style={{ maxHeight: "calc(100vh - 8rem)" }}
        className="w-full overflow-x-hidden overflow-y-auto px-4"
      >
        <div className="w-full lg:w-6/12 h-full mx-auto">
          {messages.length > 0 ? (
            <>
              <div className="h-3/4 overflow-y-auto p-4 ">
                {messages.map((message) => (
                  <div ref={scrollRef} key={message._id}>
                    <Message currentUser={user} message={message} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <span className="text-3xl md:text-5xl lg:text-6xl text-gray-400 relative top-20">
              Open a conversation to start a chat...
            </span>
          )}
        </div>
      </div>
      <div className="w-full fixed flex items-center justify-center bottom-0 p-4 h-[4rem] bg-gray-50 z-10">
        <div className="relative w-full lg:w-6/12  text-blue-600">
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="outline-none w-full text-black rounded-lg px-2 py-2 bg-white border border-solid border-gray-300 hover:border-gray-400 focus:border-gray-500"
            type="text"
            placeholder="Write something..."
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="absolute top-1 right-2 text-2xl"
          >
            <Telegram />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageEditor;
