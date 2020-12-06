import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { useState, useEffect } from "react";
import {connect} from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Button,
  TextField,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import Editor from "./Editor";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditBlog(props) {
  const classes = useStyles();
  const id = useParams().id;
  const history = useHistory();

  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + `/blogs/${id}`)
      .then((res) => {
        const { blogTitle, blogContent, date, author } = res.data;
        setBlogTitle(blogTitle);
        setBlogContent(blogContent);
        setBlogAuthor(author);
        setSelectedDate(date);
      })
      .catch((err) => console.log(err.toString()));
  }, [id]);

  const handleDataSubmit = async () => {
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
          "Authorization": "Bearer " + props.token
        },
      }
    );
    if (res.status !== 200) {
      setIsError(true);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    history.push("/blogs");
  };

  return (
    <Container maxWidth="md" style={{ backgroundColor: "white" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date posted"
              format="MM/dd/yyyy"
              value={selectedDate}
              disabled
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            disabled
            label="Your username"
            value={blogAuthor}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Edit title"
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
      <div className={classes.root}>
        <Snackbar
          open={isSubmitted}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Edited Successfully! Redirecting to Blog Page...
          </Alert>
        </Snackbar>
      </div>
      <div className={classes.root}>
        <Snackbar
          open={isError}
          autoHideDuration={6000}
          onClose={() => setIsError(false)}
        >
          <Alert onClose={() => setIsError(false)} severity="error">
            Oops! An error occurred. Please try again.
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  userID: state.auth.userID
})

export default connect(mapStateToProps)(EditBlog);
