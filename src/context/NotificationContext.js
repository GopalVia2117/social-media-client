import React, { useContext, useState } from "react";

const NotificationContext = React.createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationContextProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}
