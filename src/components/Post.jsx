import { MoreVert, TroubleshootOutlined } from "@mui/icons-material";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Person } from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { SERVER_DOMAIN } from "../utils/pathService";

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
        `${SERVER_DOMAIN}/api/users?userId=${post.userId}`
      );
      setPostUser(postUser);
    };

    fetchUser();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      const response = await axios.put(
        `${SERVER_DOMAIN}/posts/${post._id}/like`,
        {
          userId: user._id,
        }
      );
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
                src={`${postUser?.profilePicture}`}
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
          src={`${post?.img}`}
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
        {/* <button className="text-sm  border-b-2 border-dashed  border-b-gray-100">
          {post.comment > 0 ? post.comment : "No"} comment
        </button> */}
      </div>
    </div>
  );
}

export default Post;
