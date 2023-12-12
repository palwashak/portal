import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import {
//   getHeaderById,
//   getDetailById,
//   updateNotification,
//   actionNotification,
// } from "../services/NotificationDetailService";
//import { getConnectionToken } from "../services/NotificationService";
//import axios from "axios";

export const NotificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destType, setDestType] = useState([]);
  const [states, setStates] = useState([]);
  const [file, setFile] = useState();

  const [allDest, setAllDest] = useState(0);
  const [stateDest, setStateDest] = useState(0);
  const [memberDest, setMemberDest] = useState(0);
  const [columns, setColumns] = useState("1");
  const [emails, setEmails] = useState([]);
  var [isValidEmailList, setIsValidEmailList] = useState([]);

  const [isCheckedBne, setIsCheckedBne] = useState(0);
  const [isCheckedSyd, setIsCheckedSyd] = useState(0);
  const [isCheckedAde, setIsCheckedAde] = useState(0);
  const [isCheckedPth, setIsCheckedPth] = useState(0);
  const [isCheckedMel, setIsCheckedMel] = useState(0);

  const [hasSaved, setHasSaved] = useState(1);
  var memberContainerHeight = "50px";
  const changedBoderStyle2 = {
    border: "5px solid red",
  };
  const unchangeboderStyle = {
    border: "1px solid black",
  };

  const initialHeader = {
    NotificationHeaderID: 0,
    NotificationWhenCreated_Date: "",
    NotificationWhenCreated_By: "",
    NotificationMessageAvailFrom: "",
    NotificationMessageAvailTo: "",
    NotificationHeader: "",
    NotificationMessage: "",
    NotificationDest_Type: "ALL",
    NotificationActionedDate: null,
    NotificationActionedBy: "",
  };
  const initialDetails = {
    NotificationDetailRecipient: "",
    NotificationDetailReceipientID: 0,
    NotificationHeaderID: 0,
    rCount: 0,
  };
  const [headerObject, setHeaderObject] = useState(initialHeader);
  const [details, setDetails] = useState([initialDetails]);
  const [ableToAction, setAbleToAction] = useState(0);

  // useEffect(() => {
  //   if (id) {
  //     GetConnectionToken().then(() =>
  //       getHeaderById(sessionStorage.getItem("ConnectionToken"), id).then(
  //         (headerObject) => {
  //           setHeaderObject(headerObject);
  //           setupDestType(headerObject);
  //         }
  //       )
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   if (id) {
  //     GetConnectionToken().then(() =>
  //       getDetailById(sessionStorage.getItem("ConnectionToken"), id).then(
  //         (details) => {
  //           setDetails(details);
  //           PrepopulateDetails(details);
  //         }
  //       )
  //     );
  //   }
  // }, []);

  useEffect(() => {
    CheckIfAdmin();
  });

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
  //   console.log("GetConnectionToken");
  //   //Check if the connection token is already in storage

  //   // sessionStorage.setItem("ConnectionToken","TEST")
  //   //sessionStorage.removeItem("ConnectionToken"); ////DEV USE ONLY***

  //   let data = sessionStorage.getItem("ConnectionToken");

  //   console.log(data);
  //   console.log(sessionStorage);
  //   if (data !== null && data.length > 0) {
  //     //Success
  //   } else {
  //     console.log("sessionStorage ConnectionToken = null");
  //     //TODO: request for connection token
  //     //TODO store result in the session

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

  function removeExtraComma(str) {
    if (str.endsWith(",")) {
      //remove any trailing comma
      str = str.slice(0, -1);
    }
    if (str.startsWith(",")) {
      //remove any trailing comma
      str = str.substring(1);
    }
    return str;
  }

  function PrepopulateDetails(details) {
    var fullRecepStr = "";
    for (const key in details) {
      const element = details[key];
      fullRecepStr += element.NotificationDetailRecipient + ",";
    }

    fullRecepStr = removeExtraComma(fullRecepStr);

    // console.log("fullRecepStr: " + fullRecepStr);
    prepopulateStates(fullRecepStr, 1);
    prepopulateEmails(fullRecepStr);
  }
  function setupDestType(headerObject) {
    // console.log(headerObject);

    var currentDestType = headerObject.NotificationDest_Type;
    //console.log("Current Dest type =" + currentDestType);
    if (currentDestType === "State") {
      //Show States
      handleDestChangeOffice();
    }
    if (currentDestType === "Member") {
      //Show Members
      handleDestChangeMember();
    }
    setHasSaved(1);
  }

  function prepopulateStates(curRecep, isCheckedStatus) {
    var curRecep = curRecep.toString();
    if (curRecep.includes("Bne")) {
      setIsCheckedBne(isCheckedStatus);
    }
    if (curRecep.includes("Syd")) {
      setIsCheckedSyd(isCheckedStatus);
    }
    if (curRecep.includes("Ade")) {
      setIsCheckedAde(isCheckedStatus);
    }
    if (curRecep.includes("Pth")) {
      setIsCheckedPth(isCheckedStatus);
    }
    if (curRecep.includes("Mel")) {
      setIsCheckedMel(isCheckedStatus);
    }
    var tempStates = curRecep.split(",");

    for (const key in tempStates) {
      const element = tempStates[key];
      if (isCheckedStatus === 1) {
        setStates((states) => [...states, element]);
      } else {
        let data = [...states];
        var index = data.indexOf(element);
        data.splice(index, 1);
        setStates(data);
      }
    }
  }

  function prepopulateEmails(curRecep) {
    var recepArray = curRecep.split(",");
    for (const key in recepArray) {
      const element = recepArray[key];
      var recepToBeAdded = element;
      setEmails((emails) => [...emails, recepToBeAdded]);
    }
  }

  function CheckIfAdmin() {
    let data = sessionStorage.getItem("isAdmin");
    if (data !== null && data === "Y") {
      setAbleToAction(1);
    } else {
      setAbleToAction(0);
    }
  }

  function getUserNameFromSession() {
    var result = "";
    let data = sessionStorage.getItem("username");
    if (data !== null || data !== "") {
      result = data;
    }
    //console.log(result);
    return result;
  }

  function IsValidNotificationAction() {
    var result = "Y";

    var detailsListValid = "N";
    for (const key in details) {
      const currentDetail = details[key];
      if (currentDetail.NotificationDetailReceipientID !== -1) {
        detailsListValid = "Y";
      }
    }
    if (
      headerObject.NotificationDest_Type == "Member" &&
      detailsListValid == "N"
    ) {
      result = "At least one member member must be valid";
    }
    return result;
  }

  const onActionBtnClicked = async (event) => {
    event.preventDefault();

    const msg = IsValidNotificationAction();
    if (msg !== "Y") {
      alert(msg);
    } else {
      // console.log("ActionBtnClicked!");
      const emailArray = details.map((object) => {
        return object.NotificationDetailRecipient;
      });
      const emailsString = emailArray.join(",");
      const notificationUpdate = {
        ConnectionToken: sessionStorage.getItem("ConnectionToken"),
        NotificationHeaderID: headerObject.NotificationHeaderID,
        NotificationWhenCreated_By: headerObject.NotificationWhenCreated_By,
        NotificationHeader: headerObject.NotificationHeader,
        NotificationMessage: headerObject.NotificationMessage,
        NotificationDest_Type: headerObject.NotificationDest_Type,
        NotificationActionedDate: headerObject.NotificationActionedDate,
        NotificationActionedBy: getUserNameFromSession(),
        emails: emailsString,
      };
      //await actionNotification(notificationUpdate);
      goBack();
    }
  };

  function actionSectionVisible(isSaved) {
    // console.log("actionSectionVisible");
    // console.log("headerObject.NotificationHeaderID:" + headerObject.NotificationHeaderID);

    var result = "row";
    //if brand new then hide it as well
    if (headerObject.NotificationHeaderID === 0) {
      result = "row" + " hide-action-date";
    }
    //if already actioned then hide action section
    if (headerObject.NotificationActionedDate !== null) {
      result = "row" + " hide-action-date";
    } else {
      //if edited but not save then hide section
      if (isSaved == 0) {
        result = "row" + " hide-action-date";
      }
    }
    return result;
  }

  const ShowActionBtn = (
    <button
      onClick={onActionBtnClicked}
      className="btn btn-primary"
      style={{ marginRight: "50px", marginTop: "1rem", marginBottom: "1rem" }}
    >
      **ACTION PUSH NOW!!!**
    </button>
  );

  const HideActionBtn = (
    <p>You don't have permission to action this notification</p>
  );

  const goBack = () => {
    navigate(`/notifications`);
  };

  function IsValidNotification() {
    var result = "";
    //Notifcation Message validation
    if (headerObject.NotificationHeader.toString().trim() == "") {
      result += "Empty Header | ";
    }
    if (headerObject.NotificationMessage.toString().trim() == "") {
      result += "| Empty Message | ";
    }
    if (getLatestDestType() === "All") {
    }
    if (getLatestDestType() === "State") {
      if (states.length === 0 || states[0] === "") {
        result += "| At least 1 state must be selected |";
      }
    }
    if (getLatestDestType() === "Member") {
      if (emails.length === 0) {
        result += "| At least 1 email must be included |";
      }
      // console.log("emailsArray: " + emails);
      var anyEmailsEmpty = false;
      var emailContains = false;
      for (const email in emails) {
        const element = emails[email];
        // console.log("emailcontents: " + element);
        if (element.trim() === "") {
          anyEmailsEmpty = true;
        }
        if (!element.includes("@")) {
          emailContains = true;
        }
      }
      if (anyEmailsEmpty) {
        result += "| No email boxes may be empty |";
      }
      if (emailContains) {
        result += "| Each email should have @ in it |";
      }
    }

    //If there are no other messages
    if (result === "") {
      result = "Y";
    }

    return result;
  }

  function buildRecepString() {
    var result = "";
    if (stateDest == 1) {
      setEmails([]);
      result = states.join(",");
    }
    if (memberDest === 1) {
      setStates([]);
      result = emails.join(",");
    }
    result = removeExtraComma(result);
    return result;
  }

  function getLatestDestType() {
    var result = "All";
    if (stateDest === 1) {
      result = "State";
    }
    if (memberDest === 1) {
      result = "Member";
    }
    return result;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const msg = IsValidNotification();
    if (msg !== "Y") {
      alert(msg);
    } else {
      const recepString = buildRecepString();
      const notificationUpdate = {
        NotificationHeaderID: headerObject.NotificationHeaderID,
        NotificationWhenCreated_By: getUserNameFromSession(),
        NotificationHeader: headerObject.NotificationHeader,
        NotificationMessage: headerObject.NotificationMessage,
        NotificationDest_Type: getLatestDestType(),
        NotificationActionedDate: headerObject.NotificationActionedDate,
        NotificationActionedBy: headerObject.NotificationActionedBy,
        recipients: recepString,
        Connection_Token: sessionStorage.getItem("ConnectionToken"),
      };
      //await updateNotification(notificationUpdate);
      setHasSaved(1);
      goBack();
    }
  };

  const handleOnFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onNewMoreFields = (event) => {
    event.preventDefault();
    setEmails([...emails, ""]);
    setIsValidEmailList([...isValidEmailList, true]);
    setHasSaved(0);
  };

  const importCsv = (event) => {
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = function (event) {
        const document = event.target.result;
        var docString = document.toString();
        var tempArray = docString.trim().split(",");
        for (const element of tempArray) {
          setEmails((emails) => [...emails, element]);
          setIsValidEmailList([...isValidEmailList, true]);
        }
      };

      fileReader.readAsText(file);
    }
    setHasSaved(0);
  };

  const importList = (event) => {
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = function (event) {
        const document = event.target.result;
        var docString = document.toString();
        var tempArray = docString.trim().split(/\s+/);
        for (const element of tempArray) {
          setEmails((emails) => [...emails, element]);
          setIsValidEmailList([...isValidEmailList, true]);
        }
      };

      fileReader.readAsText(file);
    }
    setHasSaved(0);
  };

  function checkEmailValiditiy(index, hasSavedVar) {
    if (emails[index] === "") {
      return changedBoderStyle2;
    }
    if (details.length > index) {
      var currDetail = details[index];
      if (currDetail.NotificationDetailReceipientID === -1) {
        return changedBoderStyle2;
      } else {
        return unchangeboderStyle;
      }
    }
  }

  const handleNewFormChange = (index, event) => {
    event.preventDefault();
    let data = [...emails];
    data[index] = event.target.value;
    setEmails(data);

    let tempData = [...isValidEmailList];
    tempData[index] = true;
    setIsValidEmailList(tempData);

    setHasSaved(0);
  };

  const removeNewFormFields = (index, event) => {
    event.preventDefault();
    let data = [...emails];
    data.splice(index, 1);
    setEmails(data);

    let tempData = [...isValidEmailList];
    tempData.splice(index, 1);
    setIsValidEmailList(tempData);

    let tempDetails = [...details];
    tempDetails.splice(index, 1);
    setDetails(tempDetails);

    setHasSaved(0);
  };
  const MemberImport = (
    <div>
      <div>
        {!headerObject.NotificationActionedDate && (
          <input type={"file"} accept={".csv"} onChange={handleOnFileChange} />
        )}
        {!headerObject.NotificationActionedDate && (
          <button onClick={importCsv} className="btn btn-primary">
            Import CSV
          </button>
        )}
      </div>
      <br></br>
      <div>
        {!headerObject.NotificationActionedDate && (
          <input type={"file"} accept={".csv"} onChange={handleOnFileChange} />
        )}
        {!headerObject.NotificationActionedDate && (
          <button onClick={importList} className="btn btn-primary">
            Import List
          </button>
        )}
      </div>
    </div>
  );

  const handleInputChange = (event) => {
    let data = event.target.value;
    setColumns(data);
  };

  function calculateHeight() {
    var initHeight = 0;
    var xx = emails.length * 10 + initHeight;
    let heightColumn1 = xx * 2;
    memberContainerHeight = xx + "px";
    if (columns === "1") return heightColumn1 + "px";
    else return memberContainerHeight;
  }

  const calculateColumns = () => {
    if (columns === "1")
      return {
        height: calculateHeight(),
        width: "500px"
      };
    else if (columns === "2")
      return {
        height: calculateHeight(),
        width: "800px"
      };
    else if (columns === "3")
      return {
        height: calculateHeight(),
        width: "1000px"
      };
    else if (columns === "4")
      return {
        height: calculateHeight(),
        width: "1500px"
      };
    else
      return {
        height: calculateHeight(),
        width: "800px"
      };
  };

  const MemberShow = (
    <div className="form-group">
      <p>
        MEMBER{" "}
        {id && (
          <span style={{ fontSize: "x-small", marginLeft: "1rem" }}>
            Emails highlighted with red border are invalid
          </span>
        )}
      </p>
      {MemberImport}
      {!headerObject.NotificationActionedDate && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={onNewMoreFields} className="btn btn-primary">
            New
          </button>
        </div>
      )}
      {headerObject.NotificationActionedDate && (
        <div>
          <label htmlFor="name">
            <span style={{ fontSize: "small" }}>
              Number of columns to display
            </span>
          </label>{" "}
          &nbsp;
          <span style={{ fontSize: "small" }}>
            <select
              name="columns"
              id="columns"
              value={columns}
              onChange={handleInputChange}
            >
              <option disabled selected></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </span>
        </div>
      )}
      <div style={calculateColumns()}>
        {emails.map((email, index) => {
          return (
            <div key={index} className="form-group">
              <div
                style={
                  !headerObject.NotificationActionedDate
                    ? { width: "300px", float: "left", marginTop: "5px" }
                    : {
                        width: "300px",
                        float: "left",
                        marginTop: "5px",
                        marginRight: "5px",
                      }
                }
              >
                <input
                  name="email"
                  type={
                    !headerObject.NotificationActionedDate ? "email" : "text"
                  }
                  maxLength={320}
                  className="form-control"
                  style={checkEmailValiditiy(index, hasSaved)}
                  value={email}
                  onChange={(event) => handleNewFormChange(index, event)}
                  readOnly={headerObject.NotificationActionedDate ? "True" : ""}
                />
              </div>
              {!headerObject.NotificationActionedDate && (
                <div
                  style={{
                    width: "10%",
                    float: "left",
                    marginTop: "5px",
                  }}
                >
                  <button
                    onClick={(event) => removeNewFormFields(index, event)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  function handleStateChange(e) {
    var value = e.target.value;
    var checkstatus = e.target.checked;
    // console.log("You selected " + value + " checked: " + checkstatus);
    if (checkstatus) {
      //add
      prepopulateStates(value, 1);
    } else {
      //remove
      prepopulateStates(value, 0);
    }
    setHasSaved(0);
  }

  const selectState = (
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Bne"
          id="chkQLD"
          checked={isCheckedBne}
          onChange={handleStateChange}
        />
        <label className="form-check-label" htmlFor="chkQLD">
          QLD
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Syd"
          id="chkNSW"
          checked={isCheckedSyd}
          onChange={handleStateChange}
        />
        <label className="form-check-label" htmlFor="chkNSW">
          NSW and ACT
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Mel"
          id="chkVIC"
          checked={isCheckedMel}
          onChange={handleStateChange}
        />
        <label className="form-check-label" htmlFor="chkVIC">
          VIC and TAS
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Ade"
          id="chkSA"
          checked={isCheckedAde}
          onChange={handleStateChange}
        />
        <label className="form-check-label" htmlFor="chkSA">
          SA
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Pth"
          id="chkWA"
          checked={isCheckedPth}
          onChange={handleStateChange}
        />
        <label className="form-check-label" htmlFor="chkWA">
          WA
        </label>
      </div>
    </div>
  );

  const handleHeaderChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setHeaderObject({ ...headerObject, [name]: value });
    setHasSaved(0);
  };

  function destTypeClear() {
    setAllDest(0);
    setStateDest(0);
    setMemberDest(0);
  }

  function fullListOfStates() {
    return "Bne,Syd,Ade,Pth,Mel";
  }

  const handleDestChangeAll = (event) => {
    setDestType("All");
    destTypeClear();
    setAllDest(1);

    //Clear other dest type values
    setStates([]);
    setEmails([]);
    prepopulateStates(fullListOfStates, 0);
    setHasSaved(0);
  };
  const handleDestChangeOffice = (event) => {
    setDestType("State");
    destTypeClear();
    setStateDest(1);
    //Clear other dest type values
    setEmails([]);
    setHasSaved(0);
  };
  const handleDestChangeMember = (event) => {
    setDestType("Member");
    destTypeClear();
    setMemberDest(1);
    //Clear other dest type values
    setStates([]);
    setHasSaved(0);
  };

  const handleCancel = () => {
    window.confirm("You will lose unsaved changes Are you sure?")
      ? goBack()
      : onCancel("cancel");
  };

  const onCancel = () => {
    return;
  };

  return (
    <div className="container">
      <h2 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        {id == null
          ? "New "
          : headerObject.NotificationActionedDate == null
          ? "Edit "
          : "View "}
      </h2>
      <div className={actionSectionVisible(hasSaved)}>
        {ableToAction === 1 ? ShowActionBtn : HideActionBtn}
      </div>

      <div className="row">
        <div className="col-6">
          <div className="form-group">
            {id && <label htmlFor="NotificationHeaderID">Header Id</label>}
            {id && (
              <input
                name="NotificationHeaderID"
                readOnly={true}
                value={headerObject.NotificationHeaderID}
                className="form-control"
              ></input>
            )}
          </div>
          {headerObject.NotificationActionedDate && (
            <div className="form-group">
              <label htmlFor="NotificationWhenCreated_By">Created By</label>
              <input
                readOnly={true}
                name="NotificationWhenCreated_By"
                value={headerObject.NotificationWhenCreated_By}
                className="form-control"
              ></input>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="NotificationHeader">Header</label>
            <textarea
              readOnly={headerObject.NotificationActionedDate ? "True" : ""}
              rows={4}
              cols={100}
              maxLength={255}
              name="NotificationHeader"
              value={headerObject.NotificationHeader}
              onChange={handleHeaderChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="NotificationMessage">Message</label>
            <textarea
              rows={4}
              readOnly={headerObject.NotificationActionedDate ? "True" : ""}
              cols={100}
              maxLength={255}
              name="NotificationMessage"
              value={headerObject.NotificationMessage}
              onChange={handleHeaderChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            {!headerObject.NotificationActionedDate && (
              <div style={{ marginBottom: "1rem" }}>
                <button
                  className="btn btn-primary"
                  style={{ marginRight: "30px" }}
                  text="All"
                  onClick={handleDestChangeAll}
                >
                  All
                </button>
                <button
                  className="btn btn-primary"
                  style={{ marginRight: "30px" }}
                  text="Office"
                  onClick={handleDestChangeOffice}
                >
                  Office
                </button>
                <button
                  className="btn btn-primary"
                  style={{ marginRight: "30px" }}
                  text="Member"
                  onClick={handleDestChangeMember}
                >
                  Member
                </button>
              </div>
            )}
            <div></div>

            <div>
              {stateDest === 1 ? (
                <div>{selectState}</div>
              ) : memberDest === 1 ? (
                <div>{MemberShow}</div>
              ) : (
                <div>
                  <h6>All customers selected</h6>
                </div>
              )}
            </div>
          </div>
          <div className="form-group" style={{ clear: "both", paddingTop: "2rem"}}>
            {id && headerObject.NotificationActionedDate && (
              <label htmlFor="NotificationActionedDate">Actioned Date</label>
            )}
            <input
              name="NotificationActionedDate"
              type={
                id == null
                  ? "hidden"
                  : !headerObject.NotificationActionedDate
                  ? "hidden"
                  : "text"
              }
              readOnly={headerObject.NotificationActionedDate ? "True" : ""}
              value={headerObject.NotificationActionedDate}
              onChange={handleHeaderChange}
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            {id && headerObject.NotificationActionedDate && (
              <label htmlFor="NotificationActionedBy">Actioned By</label>
            )}
            <input
              readOnly={headerObject.NotificationActionedDate ? "True" : ""}
              type={
                id == null
                  ? "hidden"
                  : !headerObject.NotificationActionedDate
                  ? "hidden"
                  : "text"
              }
              name="NotificationActionedBy"
              value={headerObject.NotificationActionedBy}
              onChange={handleHeaderChange}
              className="form-control"
            ></input>
          </div>
          <br></br>

          <br></br>
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={handleCancel}
              className="btn btn-primary"
              style={{ marginRight: "50px" }}
            >
              Cancel
            </button>
            {!headerObject.NotificationActionedDate && (
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};