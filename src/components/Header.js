import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { port } from "../Config";

export const Header = () => {
  var headerColor = "";

  if (port === "1002") {
    headerColor = "#dc3545";
  } else if (port === "2002") {
    headerColor = "#28a745";
  } else if (port === "3002"){
    headerColor = "#007bff";
  } else headerColor = "#007bff";

  const headerStyle = {
    width: "100%",
    padding: "2% 2% 1% 2%",
    backgroundColor: headerColor,
    color: "white",
    textAlign: "left",
  };

  const titleStyle = {
    display: "inline",
    padding: "0.5em 1em",
    color: "white",
  };

  const tdStyle = {
    "border-top": "none",
  };
  const menuStyle = {
    display: "inline-block",
    padding: "0.2em 35em",
    color: "black",
    boder: "1px solid black",
    "vertical-align": "bottom",
  };

  const linkStyle = {
    display: "inline-block",
    color: "white",
  };

  return (
    <div style={headerStyle}>
      <h1 style={titleStyle}>Salesforce Service Cloud</h1>
      <table style={menuStyle} className="table">
        <thead>
          <tr>
            <td style={tdStyle}>
              <NavLink
                style={linkStyle}
                className="nav-link"
                to="/notifications"
              >
                <h4 style={linkStyle}>Current Notifications</h4>
              </NavLink>
            </td>
            <td style={tdStyle}>
              <NavLink style={linkStyle} className="nav-link" to="/about">
                <h4 style={linkStyle}>About</h4>
              </NavLink>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  );
};