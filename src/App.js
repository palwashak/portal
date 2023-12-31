import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { About } from "./screens/About";
import NotificationsScreen from "./screens/NotificationsScreen";
import { NotificationDetail } from "./screens/NotificationDetail";
import Hello from "./screens/Hello.js";

function App() {
  useEffect(() => {
    document.title = "Salesforce Service Cloud";
  }, []);
  <h1>Welcome</h1>;
  let element = useRoutes([
    { path: "/", element: <Hello /> },
    { path: "/about", element: <About /> },
    { path: "/notifications", element: <NotificationsScreen /> },
    { path: "/notification/detail/:id", element: <NotificationDetail /> },
    { path: "/new-notification-header", element: <NotificationDetail /> },
  ]);

  return element;
}
export default App;
