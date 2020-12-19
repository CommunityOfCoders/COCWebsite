import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  Paper,
  makeStyles,
  Button,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Container,
  Tooltip,
  Fab,
  CardMedia,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { connect } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import AlertUtility from "../Utilities/Alert";
import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "20px 100px",
    backgroundColor: "white",
    position: "relative",
  },
  media: {
    height: "auto",
    paddingTop: "56.25%", // 16:9
  },
}));

const EventList = (props) => {
  const classes = useStyles();
  const [isMember, setIsMember] = useState(false);
  const [events, setEvents] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const deletedEventID = useRef("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/events")
      .then((res) => {
        setEvents(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      })
      .catch((error) => console.log(error));
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

  let addEventFab = <div></div>;

  if (isMember) {
    addEventFab = (
      <Grid item style={{ position: "fixed", right: "50px", bottom: "25px" }}>
        <Link to="/addevent" style={{ color: "white" }}>
          <Tooltip title="Add Event" aria-label="add" arrow>
            <Fab color="secondary">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Link>
      </Grid>
    );
  }

  return (
    <Container>
      {events.length ? (
        events.map((article) => (
          <>
            <Card className={classes.card}>
              <CardHeader title={article.eventName} />{" "}
              {!!article.image && (
                <CardMedia
                  className={classes.media}
                  image={article.image.url}
                />
              )}
              <CardContent>
                <Typography>
                  {" "}
                  <p>{format(new Date(article.date), "dd/MM/yyyy")}</p>{" "}
                  <small
                    style={{
                      position: "absolute",
                      right: "20px",
                    }}
                  >
                    Venue:
                    {" " + article.venue}
                  </small>
                  {article.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container spacing={2} xs={6} justify="space-between">
                  {isMember && (
                    <>
                      <Grid item xs={4}>
                        <Button
                          className="btn-outline-success"
                          variant="outlined"
                        >
                          <Link
                            to={`event/edit/${article._id}`}
                            className="btn-outline-success"
                          >
                            Edit Event
                          </Link>
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          className="btn-outline-danger"
                          onClick={() => handleDelete(article._id)}
                          color="secondary"
                          variant="outlined"
                        >
                          Delete Event
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardActions>
            </Card>
          </>
        ))
      ) : (
        <div>OOOPSY: NO EVENTS REGISTERED</div>
      )}
      {addEventFab}
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
