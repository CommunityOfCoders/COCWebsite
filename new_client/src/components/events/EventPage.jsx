import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Spinner from "../spinner/Spinner";
import RegisterButton from "./RegisterButton";
import EventIcon from "@material-ui/icons/Event";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import { format } from "date-fns";
import AlertUtility from "../Utilities/Alert";
import { connect } from "react-redux";
import { isFuture } from "date-fns/esm";
import BackButton from "../Utilities/BackButton";
import useAuthenticatedAxios from "../Utilities/useAuthenticatedAxios.js";
import "./EventPage.css";

const useStyles = makeStyles((theme) => ({
  media: {
    width: "80%",
    margin: "25px",
  },
  section2: {
    fontSize: "large",
    paddingTop: theme.spacing(3),
    whiteSpace: "pre-line",
  },
  titleGap: {
    paddingTop: "70px",
  },
  eventDescription: {
    padding: "15px 0",
  },
  eventTitle: {
    height: "3px",
    backgroundColor: "#52b107",
    border: "none",
  },
}));

export const TitleWithDivider = ({ text }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3">{text}</Typography>
      <Divider className={classes.eventTitle} />
    </>
  );
};

function EventPage(props) {
  const authenticatedAxios = useAuthenticatedAxios();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const id = useParams().id;

  const [event, setEvent] = useState({});
  const [isError, setIsError] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + `/events/${id}`)
      .then((res) => {
        console.log(res.data);
        setEvent(res.data);
        setIsRegistered(
          res.data.registeredUsers &&
            res.data.registeredUsers.includes(props.userID)
        );
      })
      .catch((err) => console.log(err.toString()))
      .finally(() => setIsLoading(false));
  }, [id, counter, props.userID]);

  const handleRSVP = async (eventId, isUserRegistered) => {
    try {
      const url = !isUserRegistered
        ? process.env.REACT_APP_API +
          `/events/register?eid=${eventId}&uid=${props.userID}`
        : process.env.REACT_APP_API +
          `/events/unregister?eid=${eventId}&uid=${props.userID}`;

      const response = await authenticatedAxios.post(url);

      if (response.status === 200) {
        setIsRegisterSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <BackButton
        link="/events"
        onClick={
          (document
            .getElementById("nav-toggler")
            .classList.add("onlyEventPage"),
          document.getElementsByClassName("nav-item-list-mob").length == 0
            ? " "
            : (document.getElementsByClassName("nav-item-list-mob")[0].id =
                "onlyEventPageSideBar"))
        }
      />
      <Container maxWidth="md">
        <Grid container className={classes.titleGap}>
          <Grid item xs={12} md={6} lg={6}>
            <TitleWithDivider text={event.eventName} />
            <br />
            <Typography
              className={classes.section2}
              variant="body2"
              component="p"
            >
              <EventIcon style={{ color: "#52b107" }} />{" "}
              {format(new Date(event.date), "EEEE, do MMMM, yyyy")}
            </Typography>
            <Typography
              className={classes.section2}
              variant="body2"
              component="p"
            >
              <RoomOutlinedIcon style={{ color: "#52b107" }} />
              {" " + event.venue}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6} style={{ textAlign: "center" }}>
            <img
              src={event.image.url}
              alt="Event Poster"
              className={classes.media}
            />
          </Grid>
          <Grid item xs={12}>
            <TitleWithDivider text="Event Description" />
          </Grid>
          <Grid item xs={12} className={classes.eventDescription}>
            <Typography className={classes.section2} component="p">
              {event.description}
            </Typography>
          </Grid>
          {isFuture(new Date(event.date)) && (
            <Grid item xs={12} style={{ padding: "20px 0" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RegisterButton
                  eventID={id}
                  handleRSVP={handleRSVP}
                  isUserRegistered={isRegistered}
                />
              </div>
            </Grid>
          )}
        </Grid>
      </Container>
      <AlertUtility
        open={isError}
        duration={4500}
        onCloseHandler={() => setIsError(false)}
        severity="error"
        message="Oops! An error occurred. Please try again."
      />
      <AlertUtility
        open={isRegisterSuccess}
        duration={1000}
        onCloseHandler={() => {
          setIsRegisterSuccess(false);
          setCounter(counter + 1);
        }}
        severity="success"
        message="Event RSVP Updated"
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
});

export default connect(mapStateToProps)(EventPage);
