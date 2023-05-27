import Navbar from "../components/Navbar";
import Leftsidebar from "../components/Leftsidebar";
import Feed from "../components/Feed";
import Rightsidebar from "../components/Rightsidebar";
import { Posts, Users } from "../dummyData";
import Profile from "./Profile";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ToolBar from "../components/ToolBar";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full">
      <Navbar />
      <ToolBar />
      <div
        style={{ height: "calc(100vh - 5rem)", overflowY: "hidden" }}
        className="w-full flex"
      >
        <div className="hidden md:block md:w-3/12 h-full overflow-y-auto">
          <Leftsidebar />
        </div>
        <div className="w-full md:w-9/12 h-full overflow-y-auto">
          <div className="flex">
            <div className="w-full lg:w-8/12">
              <Feed username={user.username} />
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

export default Home;
