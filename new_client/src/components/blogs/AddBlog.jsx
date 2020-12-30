import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { TextField, Button, Grid, Box } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Editor from "./Editor";
import axios from "axios";
import AlertUtility from "../Utilities/Alert";
import { useParams } from "react-router-dom";
import SidebySide from "./SidebySide";
import { markdownRender, sanitizeHTML } from "./utils";

function AddBlog(props) {
  const id = useParams().id;

  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogContent, setBlogContent] = useState("**Hello world!!!**");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isEditPage = !!id;

  const successString = isEditPage
    ? "Blog edited successfully!"
    : "Blog added successfully!";

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    props.history.push("/blogs");
  };

  const updateMarkdown = (newMarkdown) => {
    setBlogContent(newMarkdown);
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
          Authorization: "Bearer " + props.token,
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

  const handleDataEdit = async () => {
    const blog = {
      blogTitle: blogTitle,
      blogContent: blogContent,
    };
    const res = await axios.put(
      process.env.REACT_APP_API + `/blogs/edit/${id}`,
      JSON.stringify(blog),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token,
        },
      }
    );
    if (res.status !== 200) {
      setIsError(true);
    } else {
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (!isEditPage) {
      axios
        .post(
          process.env.REACT_APP_API + "/user",
          JSON.stringify({ username: props.username }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setBlogAuthor(res.data.username);
        })
        .catch((err) => console.log(err));
    }
  });

  useEffect(() => {
    if (isEditPage) {
      axios
        .get(process.env.REACT_APP_API + `/blogs/${id}`)
        .then((res) => {
          const { blogTitle, blogContent, date, author } = res.data;
          setBlogTitle(blogTitle);
          setBlogContent(blogContent);
          setBlogAuthor(author);
          setSelectedDate(new Date(date));
        })
        .catch((err) => console.log(err.toString()));
    }
  }, [id]);

  return (
    <Container
      maxWidth="lg"
      style={{ backgroundColor: "white", padding: "10px 40px" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Date"
            value={selectedDate.toDateString()}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            label="Enter your username"
            value={blogAuthor}
            disabled
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6} style={{ marginTop: "4" }}>
            <h4 style={{ textAlign: "center" }}>Markdown Input</h4>
            <Box>
              <TextField
                value={blogContent}
                onChange={(e) => {
                  updateMarkdown(e.target.value);
                }}
                fullWidth
                multiline
                variant="outlined"
                rows={19}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} style={{ marginTop: "4" }}>
            <h4 style={{ textAlign: "center" }}>Markdown Preview</h4>
            <Box
              dangerouslySetInnerHTML={markdownRender(sanitizeHTML(blogContent))}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={isEditPage ? handleDataEdit : handleDataSubmit}
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
        message={successString + " Reloading blogs..."}
      />
      <AlertUtility
        open={isError}
        duration={1000}
        onCloseHandler={() => setIsError(false)}
        severity="error"
        message="Oops! An error occurred. Please try again."
      />
    </Container>
    // <SidebySide />
  );
}

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
  token: state.auth.token,
  username: state.auth.username,
});

export default connect(mapStateToProps)(AddBlog);
