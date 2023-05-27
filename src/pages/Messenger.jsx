import Navbar from "../components/Navbar";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import ChatOnline from "../components/ChatOnline";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { useNotifications } from "../context/NotificationContext";
import { useSocket } from "../context/SocketContext";

function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  // const socket = useRef();
  const socket = useSocket();

  const { notifications, setNotifications } = useNotifications();

  useEffect(() => {
    // socket.current = io("ws://localhost:3201");

    socket.current?.on("getMessage", (data) => {
      console.log("Get Message Event Called....");

      const currentTime = Date.now();

      const newNotifications = [
        ...notifications,
        {
          sender: data.senderId,
          notificationMessage: data.notificationMessage,
        },
      ];

      setNotifications(newNotifications);
      console.log(notifications);

      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: currentTime,
      });
    });
  });

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current?.emit("addUser", user._id);
    socket.current?.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get("/messages/" + currentChat?._id);
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, [user._id]);

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
      const res = await axios.post("/messages", newMsg);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar notifications={notifications} />
      <div
        style={{ height: "calc(100vh - 6rem)" }}
        className="w-full flex flex-col lg:flex-row p-4"
      >
        <div className="w-full lg:w-3/12">
          <input
            className="inline-block outline-none border-b border-b-gray-100 focus:border-b-gray-300 p-2 w-11/12"
            placeholder="Search for friends"
          />
          <div className="w-full whitespace-nowrap overflow-x-auto">
            {conversations.map((conversation) => (
              <div
                className="inline-block lg:block w-max"
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-6/12 h-full">
          {currentChat ? (
            <>
              <div className="h-3/4 overflow-y-auto p-4 ">
                {messages.map((message) => (
                  <div ref={scrollRef} key={message._id}>
                    <Message currentUser={user} message={message} />
                  </div>
                ))}
              </div>

              <hr className="my-2" />
              <div className="flex justify-around items-center mt-4">
                <textarea
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  className="w-96 h-32 outline-none border p-2 border-gray-200 hover:border-gray-400 focus:border-gray-400"
                  placeholder="Write something..."
                ></textarea>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-md"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="text-3xl md:text-5xl lg:text-6xl text-gray-400 relative top-20">
              Open a conversation to start a chat...
            </span>
          )}
        </div>
        {/* <div className="w-3/12 p-4">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentUserId={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div> */}
      </div>

      {/* <datalist id="friends">
        {conversations.map((conversation) => (
          <option key={conversation._id}>
            <div onClick={() => setCurrentChat(conversation)}>
              <Conversation conversation={conversation} currentUser={user} />
            </div>
          </option>
        ))}
      </datalist> */}
    </>
  );
}

export default Messenger;
