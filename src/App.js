import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./main.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Notifications from "./pages/Notifications";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/Messenger";
import EditProfile from "./pages/EditProfile";
import MessageEditor from "./pages/MessageEditor";
import EmailVerify from "./pages/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword";
import SendMail from "./pages/SendMail";
import SearchFriendsToMessage from "./pages/SearchFriendsToMessage";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={user ? <Home /> : <Register />} />
        <Route
          path="/search"
          element={user ? <Search /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:username"
          exact
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route
          path="/register"
          exact
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          exact
          element={user ? <Messenger /> : <Navigate to="/" />}
        />

        <Route
          path="/editor/:userId/:friendId"
          exact
          element={user ? <MessageEditor /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          exact
          element={user ? <Notifications /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:username/edit"
          exact
          element={user ? <EditProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/users/:id/verify/:token"
          exact
          element={<EmailVerify />}
        />
        <Route
          path="/users/:id/verify/:token/password/update"
          exact
          element={<ForgotPassword />}
        />
        <Route path="/send-mail" exact element={<SendMail />} />
        <Route path="/search-chat" exact element={<SearchFriendsToMessage />} />
      </Routes>
    </Router>
    // <Router>
    //   <Routes>
    //     <Route path="/messenger" element={<MessageEditor />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
