import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import Alert from "../Utilities/Alert";

const RegisterEvent = (props) => {
  const uid = useParams().uid;
  const eid = useParams().eid;
  const [alert, setAlert] = useState("");

  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + props.token,
        },
      };
      const url =
        process.env.REACT_APP_API + `/events/register?eid=${eid}&uid=${uid}`;
      const response = await fetch(url, requestOptions);
      if (response.status === 200) {
        setAlert("success");
      } else {
        setAlert("error");
      }
    })();
  }, [eid, uid, props.token]);

  let alertComp = null;
  if (alert !== "") {
    alertComp = (
      <Alert
        open
        duration={5000}
        onCloseHandler={props.history.replace("/events")}
        severity={alert}
        message={
          alert === "success"
            ? "Successfully Registered! Redirecting to Events page"
            : "Oops An Error occurred! Redirecting to Events page"
        }
      />
    );
  }

  return (
    <React.Fragment>
      <h1>You have been registered for the event</h1>
    </React.Fragment>
  );
};

export default withRouter(RegisterEvent);
