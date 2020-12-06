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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const buttonStyle = {
  margin: "10px 15px",
  maxWidth: "120px",
};

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "20px 100px",
    backgroundColor: "white",
    position: "relative",
  },
}));

const EventList = (props) => {
  const classes = useStyles();

  const handleEdit = (eventId) => {
    props.handleEdit(eventId);
  };

  const handleDelete = (eventId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete the event?",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            props.handleDelete(eventId);
          },
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  let editBtnText = "Edit Event";
  let editBtnStyle = "btn-outline-warning";
  if (props.isUpdating) {
    editBtnText = "Stop Editing";
    editBtnStyle = "btn-warning";
  }

  return (
    <Container>
      {props.events.length ? (
        props.events.map((article) => (
          <>
            {article.version ? (
              <img
                src={`http://res.cloudinary.com/coc-vjti/image/upload/v${article.version}/${article._id}`}
                alt="coc event 1"
              />
            ) : null}
            <Card className={classes.card}>
              <CardHeader title={article.eventName} />{" "}
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
                  {/* {handleVisibility(article.authorID) && ( */}
                  <>
                    <Grid item xs={4}>
                      <Button
                        className="btn-outline-success"
                        variant="outlined"
                      >
                        {/* <Link
                    to={`blog/edit/${article._id}`}
                    className="btn-outline-success"
                  > */}
                        {editBtnText}
                        {/* </Link> */}
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
                  {/* )} */}
                </Grid>
              </CardActions>
            </Card>
          </>
        ))
      ) : (
        <div>OOOPSY: NO EVENTS REGISTERED</div>
      )}
    </Container>
  );
};

export default EventList;
