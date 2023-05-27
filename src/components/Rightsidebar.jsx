import { useContext, useEffect, useState } from "react";
import Online from "./Online";
import axios from "axios";
import BASE_DIR from "../utils/pathService";
import { AuthContext } from "../context/AuthContext";
import { Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

function Rightsidebar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setFollowed(!followed);
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const { data } = await axios.get(`/users/friends/${user._id}`);
        setFriends(data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user._id]);

  function HomeRightsidebar() {
    return (
      <>
        <div className="flex items-center gap-2">
          <img className="w-12 h-12" src={`${BASE_DIR}gift.png`} alt="" />
          <span>
            <b>Palo Papello</b> and <b>3 other friends</b> have their birthdays
            today.
          </span>
        </div>

        <img className="w-full mt-4" src="/assets/ad.png" alt="" />

        <div className="mt-2">
          <h2 className="font-medium text-xl mb-2">Online Friends</h2>
          <div className="space-y-4">
            {/* {users.map((user) => (
              <Online key={user.id} user={user} />
            ))} */}
          </div>
        </div>
      </>
    );
  }

  function ProfileRightsidebar() {
    return (
      <>
        {user.username !== currentUser.username && (
          <button
            className="px-2 py-1 bg-blue-600 text-white rounded-md"
            onClick={handleFollow}
          >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <div className="flex flex-col">
          <h2 className="font-medium text-xl ">User Information</h2>
          {user.city || user.from || user.relationship ? (
            <>
              <span>
                City: <b>{user.city}</b>
              </span>
              <span>
                From: <b>{user.from}</b>
              </span>
              <span>
                Relationship:{" "}
                <b>
                  {user.relationship === 1
                    ? "Single"
                    : user.relationship === 2
                    ? "Married"
                    : "Complex"}
                </b>
              </span>
            </>
          ) : (
            <span className="text-red-400 font-medium">Nothing to show</span>
          )}
        </div>

        <div className="mt-4">
          <h2 className="font-medium text-xl">User friends</h2>
          <div className="flex flex-wrap gap-3 mt-2">
            {friends.map((friend) => {
              return (
                <Link key={friend._id} to={"/profile/" + friend.username}>
                  <div className="flex flex-col items-center">
                    {friend.profilePicture ? (
                      <img
                        className="w-24 h-24 rounded-md object-cover"
                        src={`${BASE_DIR}${friend.profilePicture}`}
                        alt=""
                      />
                    ) : (
                      <span className="border border-white rounded-full p-2">
                        <Person htmlColor="lightgray" />
                      </span>
                    )}
                    <span>{friend.username}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="p-4">
      {user ? <ProfileRightsidebar /> : <HomeRightsidebar />}
    </div>
  );
}

export default Rightsidebar;
