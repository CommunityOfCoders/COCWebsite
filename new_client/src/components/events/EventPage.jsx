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
import { RegisterButton } from "./RegisterButton";
import EventIcon from "@material-ui/icons/Event";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  media: {
    width: "80%",
    margin: "25px",
  },
  section2: {
    fontSize: "large",
    paddingTop: theme.spacing(3),
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

const TitleWithDivider = ({ text }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3">{text}</Typography>
      <Divider className={classes.eventTitle} />
    </>
  );
};

export default function EventPage() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const id = useParams().id;
  const [event, setEvent] = useState({});

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + `/events/${id}`)
      .then((res) => {
        console.log(res.data);
        setEvent(res.data);
      })
      .catch((err) => console.log(err.toString()))
      .finally(() => setIsLoading(false));
  }, [id]);

  return isLoading ? (
    <Spinner />
  ) : (
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
        <Grid item xs={12} style={{ padding: "20px 0" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <RegisterButton />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
