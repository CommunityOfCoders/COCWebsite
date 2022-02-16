import {
  IconButton,
  Card,
  Divider,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import { format, isFuture } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import EventIcon from "@material-ui/icons/Event";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { green, red } from "@material-ui/core/colors";
import RegisterButton from "./RegisterButton";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "20px 100px",
    backgroundColor: "white",
    position: "relative",
  },
  media: {
    height: "auto",
    paddingTop: "100%", //"56.25%", // 16:9
  },
  section1: {
    margin: theme.spacing(1, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(2, 2),
  },
}));

export default function IndividualEvent({
  article,
  isMember,
  handleDelete,
  handleRSVP,
  userID,
  isUserRegistered,
}) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card raised={true}>
        {!!article.image && (
          <CardMedia className={classes.media} image={article.image.url} />
        )}
        <CardContent>
          <Typography
            className={classes.section1}
            gutterBottom
            variant="h6"
            component="h2"
          >
            {article.eventName}
          </Typography>
          <Divider />
          <Typography
            className={classes.section2}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <EventIcon style={{ color: "#52b107" }} />{" "}
            {format(new Date(article.date), "EEEE, do MMMM, yyyy")}
          </Typography>
          <Typography
            className={classes.section2}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <RoomOutlinedIcon style={{ color: "#52b107" }} />
            {" " + article.venue}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardActions
          disableSpacing="true"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {isMember && (
            <>
              <Link to={`event/edit/${article._id}`}>
                <IconButton>
                  <EditOutlinedIcon style={{ color: green[500] }} />
                </IconButton>
              </Link>
              <IconButton onClick={() => handleDelete(article._id)}>
                <DeleteOutlinedIcon style={{ color: red[400] }} />
              </IconButton>
            </>
          )}
          <Link to={`/events/${article._id}`}>
            <Button
              variant="contained"
              onClick={
                (document
                  .getElementById("nav-toggler")
                  .classList.remove("onlyEventPage"),
                document.getElementsByClassName("nav-item-list-mob").length == 0
                  ? " "
                  : (document.getElementsByClassName(
                      "nav-item-list-mob"
                    )[0].id = ""))
              }
            >
              View More
            </Button>
          </Link>
          {isFuture(new Date(article.date)) && (
            <RegisterButton
              eventID={article._id}
              handleRSVP={handleRSVP}
              isUserRegistered={isUserRegistered}
            />
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
