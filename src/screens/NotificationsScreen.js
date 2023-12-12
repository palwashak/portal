import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import nots from "../res.json";

// import {
//   getAllNotifications,
//   getAllNotificationsWithFilter,
//   getConnectionToken,
// } from "../services/NotificationService";
//import { apiurl, adminCode } from "../Config";
//import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const initialFilterOptions = {
    Actioned: null,
    DestinationType: "",
    ActionDateFrom: "",
    ActionDateTo: "",
    HeaderKeywords: "",
    MessageKeywords: "",
  };
  const [filterOptionsState, setFilterOptionsState] =
    useState(initialFilterOptions);
  const [filterOptionActioned, setFilterOptionActioned] = useState("");
  const [filterOptionDestinationType, setFilterOptionDestinationType] =
    useState("");
  const [filterOptionHeader, setFilterOptionHeader] = useState("");
  const [filterOptionMsg, setFilterOptionMsg] = useState("");
  const [filterOptionActionDateFrom, setFilterOptionActionDateFrom] =
    useState("");
  const [filterOptionActionDateTo, setFilterOptionActionDateTo] = useState("");
  const [filterOptionActionDateVisible, setFilterOptionActionDateVisible] =
    useState("form-group col-3 hide-action-date");

  // useEffect(() => {
  //   GetConnectionToken().then(() => {
  //     trygetUsername();
  //     getAllNotifications(sessionStorage.getItem("ConnectionToken")).then(
  //       (notifications) => {
  //         console.log(notifications);
  //         setNotifications(notifications);
  //       }
  //     );
  //   });
  // }, []);
  useEffect(() => {

    setNotifications(nots);

  }, []);

  async function GetUserIpAddress() {
    try {
      //const res = await axios.get("https://geolocation-db.com/json/");
      //console.log(res.data);
      //return res.data.IPv4;
    } catch {
      return "127.0.0.1";
    }
  }

  // async function GetConnectionToken() {
  //   let data = sessionStorage.getItem("ConnectionToken");
  //   if (data !== null && data.length > 0) {
  //   } else {
  //     console.log("sessionStorage ConnectionToken = null");
  //     var currentIp = await GetUserIpAddress();
  //     console.log("currentIp: " + currentIp);
  //     var connectRequest = {
  //       App_Auth: "284CA2B0-C9F7-46DB-A259-836A0AF92625",
  //       App_Format: "Futureuse",
  //       IP_Address: currentIp,
  //       App_Release: "T1",
  //     };
  //     console.log(connectRequest);
  //     var currConnectionTokenResponse = await getConnectionToken(
  //       connectRequest
  //     );
  //     console.log("currConnectionTokenResponse:");
  //     console.log(currConnectionTokenResponse);

  //     console.log("currConnectionTokenResponse.return_code:");
  //     console.log(currConnectionTokenResponse.return_code);

  //     if (
  //       currConnectionTokenResponse !== null &&
  //       currConnectionTokenResponse.return_code === "0"
  //     ) {
  //       sessionStorage.setItem(
  //         "ConnectionToken",
  //         currConnectionTokenResponse.Connection_Token
  //       );
  //     } else {
  //       alert(
  //         "**Failed to get connection token - please try again later MSG: " +
  //           currConnectionTokenResponse.show_msg
  //       );
  //       //navigate("https://www.liteneasy.com.au/"); //TODO UNCOMMENT
  //     }
  //   }
  // }
  function trygetUsername() {
    //FORMAT notifications?secretCode=abc123/UserID:nxs
    var fullURL = window.location.href;
    var userIdParam = "UserID:";

    if (fullURL.includes(userIdParam)) {
      var startOfUserName = fullURL.indexOf("UserID:");
      var justUserName = fullURL.substring(startOfUserName);
      var onlyUserName = justUserName.split(":");
      sessionStorage.setItem("username", onlyUserName[1]);

      //if (fullURL.includes("secretCode=" + adminCode)) {
      //  sessionStorage.setItem("isAdmin", "Y");
      //  console.log("ADMIN = Y");
      //} else {
        //sessionStorage.setItem("isAdmin", "N");
        //console.log("ADMIN = N");
      //}
    //   navigate("/notifications");
    // } else if (sessionStorage.getItem("username") === null) {
      //window.location.replace("google");
    }
  }

  function BuildRowClasses(index, notification) {
    var result = "";
    result = index % 2 === 0 ? "odd" : "even";

    if (IsNotificationActioned(notification) === "Y") {
      result = result + " NotActiveRow";
    }

    return result;
  }

  function DisplayTimeStamp(dateTimeInput) {
    var result = "";
    if (dateTimeInput === null) {
      return result;
    }
    dateTimeInput = dateTimeInput.replace("Z", "");
    var m = new Date(Date.parse(dateTimeInput));

    let options = {
      dateStyle: "short",
      timeStyle: "medium",
      hour12: true,
      timezone: "Australia/Brisbane",
    };
    var dateString = m.toLocaleString("en-GB", options);

    result = dateString;
    return result;
  }

  function IsNotificationActioned(notification) {
    var result = "N";
    if (notification.IsClosed !== false) {
      result = "Y";
    }
    return result;
  }

  //#region Btn Handlers
  const onEditHandler = (e) => {
    let id = e.target.getAttribute("id");
    console.log("after clicking edit: " + id);
    navigate("/notification/detail" + "/" + id);
  };

  const onDeleteHandler = (e) => {
    const id = e.target.getAttribute("id");
    console.log("id: " + id);
    window.confirm("Are you sure you wish to delete this notification?")
      ? onConfirm(id)
      : onCancel("cancel");
  };
  const onConfirm = (id) => {
    deleteNotification(sessionStorage.getItem("ConnectionToken"), id);
    return;
  };
  const onCancel = () => {
    return;
  };

  // Delete notification and associated answers
  async function deleteNotification(ConnectionToken, id) {
    console.log(id);
    // try {
    //   if (!id) id = 0;
    //   const response = await fetch(
    //     apiurl + `/api/deletepushnotificationheader/${ConnectionToken}/${id}`
    //   );
    //   window.location.reload(false);
    //   return await response.json();
    // } catch (error) {
    //   return [];
    // }
  }

  function EditBtnText(notification) {
    if (IsNotificationActioned(notification) === "N") {
      return "Edit";
    }
    return "View";
  }

  const ShowDeleteBtn = (notification) => {
    if (IsNotificationActioned(notification) === "N") {
      return (
        <td>
          <button
            id={notification.NotificationHeaderID}
            onClick={onDeleteHandler}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      );
    }
    return <td></td>;
  };

  const ShowEditBtn = (notification) => {
    return (
      <td>
        <button
          id={notification.NotificationHeaderID}
          onClick={onEditHandler}
          className="btn btn-primary"
        >
          {EditBtnText(notification)}
        </button>
      </td>
    );
  };

  //#region UserRow
  const UserRow = (notification, index) => {
    return (
      <tr
        key={index}
        style={
          notification.IsClosed
             ? { backgroundColor: "#e9ecef" }
             : { backgroundColor: "#ffffff" }
        }
        className={BuildRowClasses(index, notification)}
      >
        <td>{notification.Id}</td>
        <td>{notification.IsClosed ? "Closed" : "Open"}</td>
        <td>{DisplayTimeStamp(notification.ClosedDate)}</td>
        <td>{notification.CaseNumber}</td>
        <td>{notification.Status}</td>
        <td>{notification.Subject}</td>
        <td>{notification.Description}</td>
        {ShowEditBtn(notification)}
        {ShowDeleteBtn(notification)}
      </tr>
    );
  };

  //#endregion

  const handleSubmit = (event) => {
    event.preventDefault();
    //Validate the filter options
    //Make sure dates "From" is before "To"
    var dateFrom = Date.parse(filterOptionActionDateFrom);
    var dateTo = Date.parse(filterOptionActionDateTo);
    if (dateFrom > dateTo) {
      alert("Your Action Date From must be BEFORE Action Date To");
      return;
    }

    //Gather filter options
    var filterOptionsToUpdate = {
      Actioned: filterOptionActioned,
      DestinationType: filterOptionDestinationType,
      ActionDateFrom: filterOptionActionDateFrom,
      ActionDateTo: filterOptionActionDateTo,
      HeaderKeywords: filterOptionHeader,
      MessageKeywords: filterOptionMsg,
    };

  //   getAllNotificationsWithFilter(
  //     sessionStorage.getItem("ConnectionToken"),
  //     filterOptionsToUpdate
  //   ).then((notifications) => {
  //     setNotifications(notifications);
  //   });
  };

  const addNewNotification = () => {
    navigate(`/new-notification-header`);
  };

  const handleDestinationTypeChange = (e) => {
    // console.log("handleDestinationTypeChange: " + e.target.value);
    setFilterOptionDestinationType(e.target.value);
  };
  const handleActionDropDown = (e) => {
    console.log("handleActionDropDown: " + e.target.value);
    if (e.target.value === "" || e.target.value === "N") {
      //hide and clear action dates
      setFilterOptionActionDateFrom("");
      setFilterOptionActionDateTo("");
      setFilterOptionActionDateVisible("form-group col-3 hide-action-date");
    } else {
      setFilterOptionActionDateVisible("form-group col-3");
    }

    setFilterOptionActioned(e.target.value);
  };

  const handleInputHeaderChange = (e) => {
    //console.log("handleInputHeaderChange: " + e.target.value);
    setFilterOptionHeader(e.target.value);
  };

  const handleInputMsgChange = (e) => {
    //console.log("handleInputMsgChange: " + e.target.value);
    setFilterOptionMsg(e.target.value);
  };

  const handleInputActionDateFrom = (e) => {
    console.log("handleInputActionDateFrom: " + e.target.value);
    setFilterOptionActionDateFrom(e.target.value);
  };
  const handleInputActionDateTo = (e) => {
    console.log("handleInputActionDateTo: " + e.target.value);
    setFilterOptionActionDateTo(e.target.value);
  };

  const userTable = notifications.map((notification, index) =>
    UserRow(notification, index)
  );

  //#region Final Return
  return (
    <div className="container">
      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <h2>Cases</h2>
      </div>
      <button onClick={addNewNotification} className="btn btn-primary">
        Create New
      </button>
      <br></br>
      <br></br>
      <h3>Filter Options</h3>
      <div className="filterOptionsDiv ">
        <div className="row">
          <div className="form-group col-2">
            <label for="IsActionedFilterDropDown">Status</label>
            <br />
            <select
              name="IsActionedFilterDropDown"
              defaultValue={filterOptionActioned}
              onChange={handleActionDropDown}
            >
              <option value=""></option>
              <option value="Y">Closed</option>
              <option value="N">Open</option>
            </select>
          </div>

          <div className="form-group col-3">
            <label for="DestTypeDropdown">Location</label>
            <br />
            <select
              name="DestTypeDropdown"
              defaultValue={filterOptionDestinationType}
              onChange={handleDestinationTypeChange}
            >
              <option value=""></option>
              <option value="ALL">ALL</option>
              <option value="STATE">Country A</option>
              <option value="MEMBER">Country B</option>
            </select>
          </div>
          <div className={filterOptionActionDateVisible}>
            <label for="notification_date_action_from">
              Before This Date
            </label>
            <input
              type="date"
              name="notification_date_action_from"
              className="form-control filterOptionDate"
              value={filterOptionActionDateFrom}
              onChange={handleInputActionDateFrom}
            ></input>
          </div>

          <div className={filterOptionActionDateVisible}>
            <label for="notification_date_action_to">After This Date</label>
            <input
              type="date"
              name="notification_date_action_to"
              className="form-control filterOptionDate"
              value={filterOptionActionDateTo}
              onChange={handleInputActionDateTo}
            ></input>
          </div>
        </div>
        <br></br>
        <div className="row">
        </div>
      </div>
      <br></br>
      <div>
        <button
          className="btn btn-primary filterBtn"
          type="submit"
          onClick={handleSubmit}
        >
          Export to CSV
        </button>
      </div>
      <br></br>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Enquiry Reference Number</th>
            <th>Is Closed</th>
            <th>Date Closed</th>
            <th>Case Number</th>
            <th>Status</th>
            <th>Subject <br></br> <div className="form-group col-6">
            <label for="notification_Message"></label>
            <input
              type="text"
              name="notification_Message"
              className="form-control filterOptionDate"
              placeholder="Contains..."
              value={filterOptionMsg}
              onChange={handleInputMsgChange}
            ></input>{" "}
          </div></th>
            <th>Description</th>
            {/* <th>Owner Name <br></br> <div className="form-group col-5">
            <label for="notification_Header"></label>
            <input
              type="text"
              name="notification_Header"
              className="form-control filterOptionDate"
              placeholder="Contains..."
              value={filterOptionHeader}
              onChange={handleInputHeaderChange}
            ></input>{" "}
          </div></th> */}
          </tr>
        </thead>
        <div>
        <br></br>
        <button
          className="btn btn-primary filterBtn"
          type="submit"
          onClick={handleSubmit}
        >
          Filter
        </button>
      </div>
        <tbody>{userTable}</tbody>
      </table>
    </div>
  );
};

export default NotificationsScreen;