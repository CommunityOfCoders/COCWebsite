import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { TextField, Button, Grid } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Editor from "./Editor";
import axios from "axios";
import AlertUtility from "../Utilities/Alert";

function AddBlog(props) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogContent, setBlogContent] = useState("**Hello world!!!**");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    props.history.push("/blogs");
  };

  const handleDataSubmit = async () => {
    const blog = {
      blogTitle: blogTitle,
      blogContent: blogContent,
      date: selectedDate,
      author: blogAuthor,
      authorID: props.userID,
    };
    axios
      .post(process.env.REACT_APP_API + "/blogs/new", JSON.stringify(blog), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + props.token
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setIsSubmitted(true);
        } else {
          setIsError(true);
        }
      })
      .catch((err) => setIsError(true));
  };

  return (
    <Container maxWidth="md" style={{ backgroundColor: "white" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            label="Enter your username"
            value={blogAuthor}
            onChange={(e) => setBlogAuthor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Enter a title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Editor content={blogContent} setContent={setBlogContent} />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDataSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <AlertUtility 
        open={isSubmitted}
        duration={3000}
        onCloseHandler={handleClose}
        severity="success"
        message="Blog added successfully! Redirecting to Blogs page..."
      />
      <AlertUtility 
        open={isError}
        duration={1000}
        onCloseHandler={() => setIsError(false)}
        severity="error"
        message="Oops! An error occurred. Please try again."
      />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
  token: state.auth.token
});

export default connect(mapStateToProps)(AddBlog);
