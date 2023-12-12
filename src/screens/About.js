import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const About = () => {
  var environment = "";

  const user = sessionStorage.getItem("username");

  return (
    <div className="container">
      <br></br>
      <h1>Salesforce Service Cloud</h1>
      <br></br>
      <h2>Welcome "Username"</h2>
      <h2 style={{ color: "red" }}>{environment}</h2>
      <h6>{user}</h6>
    </div>
  );
};