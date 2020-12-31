import React, { useEffect, useState, useRef } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import AlertUtility from "../Utilities/Alert";
import Spinner from "../spinner/Spinner";
import IndividualEvent from "./IndividualEvent";
import FAB from "../Utilities/FAB";

const EventList = (props) => {
  const [isMember, setIsMember] = useState(false);
  const [events, setEvents] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const deletedEventID = useRef("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/events")
      .then((res) => {
        setEvents(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_API + "/user",
        JSON.stringify({ userID: props.userID }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsMember(res.data.isMember);
      })
      .catch((err) => console.log(err));
  }, [props.userID]);

  const handleDelete = (eventId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete the event?",
      buttons: [
        {
          label: "Delete",
          onClick: async () => {
            const res = await axios.delete(
              process.env.REACT_APP_API + `/events/${eventId}`,
              {
                headers: {
                  Authorization: "Bearer " + props.token,
                },
              }
            );
            if (res.status === 204) {
              deletedEventID.current = eventId;
              setIsDeleted(true);
            } else {
              setIsError(true);
            }
          },
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  const handleClose = () => {
    setIsDeleted(false);
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event._id !== deletedEventID.current)
    );
  };

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        events.length > 0 &&
        events.map((article) => (
          <IndividualEvent
            key={article._id}
            article={article}
            isMember={isMember}
            handleDelete={handleDelete}
          />
        ))
      )}
      <FAB
        gotoLink="/addevent"
        tooltipTitle="Add Event"
        isAuthenticated={isMember}
      />
      <AlertUtility
        open={isDeleted}
        duration={1000}
        onCloseHandler={handleClose}
        severity="success"
        message="Deleted Successfully! Reloading Events..."
      />
      <AlertUtility
        open={isError}
        duration={4500}
        onCloseHandler={() => setIsError(false)}
        severity="error"
        message="Oops! An error occurred. Please try again."
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userID: state.auth.userID,
  token: state.auth.token,
});

export default connect(mapStateToProps)(EventList);
