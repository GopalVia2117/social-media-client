import Navbar from "../components/Navbar";
import Leftsidebar from "../components/Leftsidebar";
import Feed from "../components/Feed";
import Rightsidebar from "../components/Rightsidebar";
import Intro from "../components/Intro";
import { Posts, Users } from "../dummyData";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/users?username=${username}`);
      setUser(data);
      console.log(data);
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      <Navbar />
      <div
        style={{ height: "calc(100vh - 5rem)", overflowY: "hidden" }}
        className="flex"
      >
        <div className="hidden md:block md:w-3/12 h-full overflow-y-auto">
          <Leftsidebar users={Users} />
        </div>
        <div className="w-full md:w-9/12 h-full overflow-y-auto">
          <div className="w-full">
            <Intro user={user} />
          </div>
          <div className="flex">
            <div className="w-full lg:w-8/12">
              <Feed username={username} />
            </div>
            <div className="hidden lg:block lg:w-4/12 mt-2">
              <Rightsidebar user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
