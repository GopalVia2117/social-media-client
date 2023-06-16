import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Person, Message, Search, FavoriteBorder } from "@mui/icons-material";

function Navbar() {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="w-full flex h-16 items-center justify-between text-white bg-blue-600 px-3">
      <h1 className="relative text-xl font-bold me-4">
        <Link to="/">Socio</Link>
        <span className="absolute text-pink-500 left-1/2 -top-1/2 -z-1">
          <FavoriteBorder />
        </span>
      </h1>

      <input
        onFocus={() => navigate("/search")}
        className="hidden max-w-[280px] md:block flex-grow placeholder:text-center outline-none text-white bg-transparent border-b-[1px] border-b-solid border-b-gray-400"
        type="text"
        placeholder="Search for friend, post or video"
      />

      <div className="flex justify-center items-center space-x-3">
        {/* <div className="hidden relative sm:block">
          <Link to="/">
            <Notifications />
          </Link>
          <span className="absolute top-0 right-0 flex justify-center items-center bg-red-700 text-white text-sm  w-3 h-3 rounded-full">
            3
          </span>
        </div> */}

        <Link to="/search" className="md:hidden">
          {" "}
          <Search className="text-white rounded-full" />
        </Link>

        <Link to="/messenger">
          <Message />
        </Link>
        {/* <span className="absolute top-0 right-0 flex justify-center items-center bg-red-700 text-white text-sm  w-3 h-3 rounded-full">
            {notifications.length}
          </span> */}

        <Link to={`/profile/${user.username}`}>
          {user.profilePicture ? (
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={`${user.profilePicture}`}
              alt=""
            />
          ) : (
            <span className="border border-white rounded-full p-2">
              <Person htmlColor="lightgray" />
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
