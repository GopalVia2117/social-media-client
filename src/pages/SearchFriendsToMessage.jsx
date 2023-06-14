import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { SERVER_DOMAIN } from "../utils/pathService";
import User from "../components/User";
import { useNavigate, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

function SearchFriendsToMessage() {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    // Make API call using debouncedSearchTerm
    // This code will execute when debouncedSearchTerm has not changed for 300ms
    // Replace this with your API call logic
    const searchUsers = async () => {
      try {
        if (search.trim() !== "") {
          const res = await axios.get(
            `${SERVER_DOMAIN}/api/users/search/${search}`
          );
          console.log(res.data);
          setFriends(res.data);
        } else {
          setFriends([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (debouncedSearchTerm) {
      searchUsers();
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full mx-auto text-center flex flex-col items-center">
      <div className="w-full lg:w-1/2 flex items-center mt-10">
        <span
          onClick={() => navigate(-1, { replace: true })}
          className="font-bold text-3xl mr-4 flex items-center"
        >
          <ArrowBack />
        </span>

        <input
          type="text"
          value={search}
          placeholder="Search for friend..."
          className="flex-grow border rounded-md border-gray-300 px-2 py-1 outline-none focus:border-gray-500 hover:border-gray-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white px-2 py-1 flex flex-col items-center">
        {friends.length > 0 ? (
          <>
            {friends?.map((friend) => (
              <Link
                className="w-full"
                key={friend._id}
                to={`/editor/${user._id}/${friend._id}`}
              >
                <User user={friend} />
              </Link>
            ))}
          </>
        ) : (
          <h1 className="text-4xl mt-10 text-gray-500 fond-medium">
            No result found
          </h1>
        )}
      </div>
    </div>
  );
}

export default SearchFriendsToMessage;
