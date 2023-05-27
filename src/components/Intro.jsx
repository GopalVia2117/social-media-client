import { Person } from "@mui/icons-material";
import BASE_DIR from "../utils/pathService";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Intro({ user }) {
  const params = useParams();
  const { user: authUser } = useContext(AuthContext);
  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-56 object-cover"
          src={
            user.coverPicture
              ? `${BASE_DIR}/${user.coverPicture}`
              : "/assets/post/4.jpeg"
          }
          alt="Cover image"
        />
      </div>

      <div className="relative">
        {user.profilePicture ? (
          <img
            className="relative w-32 h-32 rounded-full object-cover mx-auto -top-16 border-2 border-white"
            src={`${BASE_DIR}${user.profilePicture}`}
            alt=""
          />
        ) : (
          <span className="relative flex  justify-center items-center w-32 h-32 object-cover mx-auto -top-16 border-2 border-white text-[128px] rounded-full p-2">
            <Person htmlColor="lightgray" fontSize="inherit" />
          </span>
        )}
      </div>

      <h2 className="relative -top-16 text-xl font-medium text-center">
        {user.username}
      </h2>
      <p className="relative -top-12 text-center">{user.desc}</p>

      {params.username === authUser.username ? (
        <div className="w-full text-center">
          <button className="bg-blue-800 text-white px-2 py-1 rounded-md shadow-gray-400 shadow-md">
            <Link to={`/profile/${user.username}/edit`}>Edit Profile</Link>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Intro;
