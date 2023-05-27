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

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route
          path="/search"
          element={user ? <Search /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={user ? <Notifications /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:username/edit"
          element={user ? <EditProfile /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
