import CreatePost from "./CreatePost";
import Post from "./Post";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import NoPost from "./NoPost";
import { SERVER_DOMAIN } from "../utils/pathService";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = username
        ? await axios.get(`${SERVER_DOMAIN}/api/posts/profile/${username}`)
        : await axios.get(`${SERVER_DOMAIN}/api/posts/timeline/${user._id}`);
      // console.log(data);
      setPosts(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchData();
  }, [user]);

  return (
    <div className="p-1 md:p-5 space-y-5">
      {username === user.username && <CreatePost />}
      {/* <UnderDevelopment modal={modal} setModal={setModal} /> */}

      {posts.length > 0 ? (
        posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })
      ) : (
        <NoPost />
      )}
    </div>
  );
}

export default Feed;
