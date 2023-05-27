import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { NotificationContextProvider } from "./context/NotificationContext";
import { SocketProvider } from "./context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotificationContextProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
