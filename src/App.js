import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { About } from "./screens/About";
import NotificationsScreen from "./screens/NotificationsScreen";
import { NotificationDetail } from "./screens/NotificationDetail";

function App() {
  useEffect(() => {
    document.title = "Activate-Ate Push Notifications Tool";
  }, []);
  let element = useRoutes([
    { path: "/", element: <About /> },
    { path: "/about", element: <About /> },
    { path: "/notifications", element: <NotificationsScreen /> },
    { path: "/notification/detail/:id", element: <NotificationDetail /> },
    { path: "/new-notification-header", element: <NotificationDetail /> },
  ]);

  return element;
}
export default App;