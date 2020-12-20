import "date-fns";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Fab,
  makeStyles,
  Tooltip,
  IconButton
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {green,red,grey} from '@material-ui/core/colors';

import { format } from "date-fns";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AlertUtility from "../Utilities/Alert";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   background: "linear-gradient(45deg, #BFDCBC 30%, #EEF36A 90%)",
  //   border: 0,
  //   borderRadius: 3,
  //   boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  //   color: "white",
  //   marginTop: 5,
  // },
}));

const Blogs = (props) => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/blogs")
      .then((res) => res.data.blogs)
      .then((res) => {
        setPosts(res.sort((a, b) => b.date - a.date));
      })
      .catch((error) => console.log(error));
  }, [counter]);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 228;
    const wordCount = content.replace(/[^\w ]/g, "").split(/\s+/).length;
    const readingTimeInMinutes = Math.floor(wordCount / wordsPerMinute) + 1;
    const readingTimeAsString = readingTimeInMinutes + " min";

    return readingTimeAsString;
  };

  const handleClose = () => {
    setIsDeleted(false);
    setCounter(counter + 1);
  };

  const handleVisibility = (authorID) => authorID === props.userID;

  const handleDelete = (blogId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete the blog?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const res = await axios.delete(
              process.env.REACT_APP_API + `/blogs/delete/${blogId}`,
              {
                headers: {
                  Authorization: "Bearer " + props.token,
                },
              }
            );
            if (res.status === 204) {
              setIsDeleted(true);
            } else {
              setIsError(true);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  // TODO :- Change this to increase it to 12 if user isn't signed in.
  const spanSize = 4;

  let addBlogFab = (
    <Grid item style={{ position: "fixed", right: "50px", bottom: "25px" }}>
      <Tooltip title="Login Required" aria-label="add">
        <span>
          <Fab color="secondary" disabled>
            <AddIcon />
          </Fab>
        </span>
      </Tooltip>
    </Grid>
  );

  if (props.isAuthenticated) {
    addBlogFab = (
      <Grid item style={{ position: "fixed", right: "50px", bottom: "25px" }}>
        <Link to="/addblog" style={{ color: "white" }}>
          <Tooltip title="Add Blog" aria-label="add" arrow>
            <Fab color="secondary">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Link>
      </Grid>
    );
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {posts.map((article) => (
            <Grid item xs={6} key={article._id}>
              <Card>
                <CardHeader
                  title={article.blogTitle}
                  action={
                    handleVisibility(article.authorID) && (
                      <React.Fragment>
                        <Link to={`blog/edit/${article._id}`}>
                          <IconButton>
                            <EditOutlinedIcon style={{ color: green[500] }} />
                          </IconButton>
                        </Link>
                        <IconButton onClick={() => handleDelete(article._id)}>
                          <DeleteOutlinedIcon
                            variant
                            style={{ color: red[400] }}
                          />
                        </IconButton>
                      </React.Fragment>
                    )
                  }
                  subheader={`by ${article.author}`}
                />
                <CardContent>
                  <Typography>
                    <p>
                      Date - {format(new Date(article.date), "do MMMM, yyyy")}
                    </p>{" "}
                    {/* <p>Written by : {article.author}</p> */}
                    <p>
                      Estimated reading time - {" "}
                      {calculateReadingTime(article.blogContent)}
                    </p>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={4} justify="flex-end">
                    <Grid item xs={spanSize}>
                      <Button color="primary">
                        <Link to={`blogs/${article._id}`}>Read More</Link>
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {addBlogFab}
        </Grid>
      </Container>
      <AlertUtility
        open={isDeleted}
        duration={1000}
        onCloseHandler={handleClose}
        severity="success"
        message="Deleted Successfully! Reloading Blogs..."
      />
      <AlertUtility
        open={isError}
        duration={4500}
        onCloseHandler={() => setIsError(false)}
        severity="error"
        message="Oops! An error occurred. Please try again."
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userID: state.auth.userID,
  token: state.auth.token
});

export default connect(mapStateToProps)(Blogs);
