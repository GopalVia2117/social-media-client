import React from "react";
import { useNotifications } from "../context/NotificationContext";

function Notifications() {
  const { notifications, setNotifications } = useNotifications();

  console.log(notifications);
  return <div>Notifications: {notifications}</div>;
}

export default Notifications;
