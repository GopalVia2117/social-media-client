import { useState, useEffect } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import User from "../components/User";
import axios from "axios";
import { Link } from "react-router-dom";

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

function Search() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    // Make API call using debouncedSearchTerm
    // This code will execute when debouncedSearchTerm has not changed for 300ms
    // Replace this with your API call logic
    const searchUsers = async () => {
      try {
        if (search.trim() !== "") {
          const res = await axios.get("/users/search/" + search);
          console.log(res.data);
          setUsers(res.data);
        } else {
          setUsers([]);
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
    <div className="w-full lg:w-1/2 mx-auto text-center py-4 px-2">
      <div className="flex items-center">
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

      <div className="bg-white px-2 py-1">
        {users.length > 0 ? (
          <>
            {users?.map((user) => (
              <Link key={user._id} to={`/profile/${user.username}`}>
                <User user={user} />
              </Link>
            ))}
          </>
        ) : (
          "No result found"
        )}
      </div>
    </div>
  );
}

export default Search;
