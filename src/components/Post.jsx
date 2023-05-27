import { MoreVert, TroubleshootOutlined } from "@mui/icons-material";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Person } from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import BASE_DIR from "../utils/pathService";

function Post({ post, showModal }) {
  // const postUser = users.filter((postUser) => postUser?.id === post?.userId)[0];

  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(AuthContext);
  const [postUser, setPostUser] = useState({});

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: postUser } = await axios.get(
        `/users?userId=${post.userId}`
      );
      setPostUser(postUser);
    };

    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      const response = await axios.put(`/posts/${post._id}/like`, {
        userId: user._id,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  return (
    <div className="p-4 shadow-md">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <Link to={`/profile/${postUser.username}`}>
            {postUser?.profilePicture ? (
              <img
                className="w-8 h-8 rounded-full object-cover fill-gray-500"
                src={`${BASE_DIR}${postUser?.profilePicture}`}
                alt=""
              />
            ) : (
              <Person
                className="border border-gray-400 rounded-full"
                htmlColor="lightblue"
              />
            )}
          </Link>

          <span className="font-medium">{postUser?.username}</span>
          <span className="text-sm">{format(post?.createdAt)}</span>
        </div>
        <button>
          <MoreVert />
        </button>
      </div>

      <div className="postContent">
        <p className="postTitle my-2">{post?.desc}</p>
        <img
          className="w-full object-contain max-h-[500px]"
          src={`${BASE_DIR}${post?.img}`}
          alt=""
        />
      </div>

      <div className="interactions flex justify-between mt-2">
        <div className="flex items-center space-x-2">
          <button className="text-md text-pink-600" onClick={handleLike}>
            {isLiked ? (
              <Favorite color="inherit" />
            ) : (
              <FavoriteBorder color="inherit" />
            )}
          </button>
          <span className="text-sm">{likeCount} people liked it</span>
        </div>
        <button className="text-sm  border-b-2 border-dashed  border-b-gray-100">
          {post.comment > 0 ? post.comment : "No"} comment
        </button>

        {/* <UnderDevelopment /> */}
        {/* <dialog
          className="flex flex-col justify-center text-center content-center rounded-md w-80 h-96"
          ref={model}
        >
          <div className="">
            <video autoplay loop src="/assets/presentation.mp4">
              Working on this feature...
            </video>
            <button
              className="bg-green-800 text-white rounded-lg px-2 py-1 mt-2"
              onClick={() => {
                model.current.close();
              }}
              value="close"
              j
              ref={closeBtn}
              formMethod="dialog"
            >
              Close
            </button>
          </div>
        </dialog> */}
      </div>
    </div>
  );
}

export default Post;
