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
    height: "auto",
    paddingTop: "100%", //"56.25%", // 16:9
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(2, 2),
  },
}));

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
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">New Event</Typography>.
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Typography variant="h3">{event.eventName}</Typography>
          <br />
          <Typography
            className={classes.section2}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <EventIcon style={{ color: "#52b107" }} />{" "}
            {format(new Date(event.date), "EEEE, do MMMM, yyyy")}
          </Typography>
          <Typography
            className={classes.section2}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <RoomOutlinedIcon style={{ color: "#52b107" }} />
            {" " + event.venue}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <img
            src={event.image.url}
            alt="Event Poster"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Event Description</Typography> <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={classes.section3}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {event.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <RegisterButton />
        </Grid>

        {/* <Grid item xs={12}>
                    <img src={event.image.url} alt="Event Poster" style={{ width: "60%", margin: "auto" }} /></Grid> */}
      </Grid>
    </Container>
  );
}
