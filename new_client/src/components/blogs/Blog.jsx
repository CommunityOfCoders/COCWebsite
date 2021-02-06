import "date-fns";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter, useLocation } from "react-router-dom";
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
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { green, red } from "@material-ui/core/colors";
import Spinner from "../spinner/Spinner";
import { format } from "date-fns";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AlertUtility from "../Utilities/Alert";
import "./Blogs.css";

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
  const params = new URLSearchParams(useLocation().search);
  const tag = params.get("tag");
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (tag) {
      axios
        .get(process.env.REACT_APP_API + `/blogs/tag/${tag}`)
        .then((res) => res.data.blogs)
        .then((res) => {
          setPosts(res.sort((a, b) => b.date - a.date));
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get(process.env.REACT_APP_API + "/blogs")
        .then((res) => res.data.blogs)
        .then((res) => {
          setPosts(res.sort((a, b) => b.date - a.date));
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [counter, tag]);

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

  let addBlogFab;

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

  let blogComponent = <Spinner />;

  if (!isLoading) {
    blogComponent = posts.map((article) => (
      <Grid item xs={12} md={6} lg={6} key={article._id}>
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
                    <DeleteOutlinedIcon variant style={{ color: red[400] }} />
                  </IconButton>
                </React.Fragment>
              )
            }
            subheader={`by ${article.author}`}
          />
          <CardContent>
            <Typography component={"span"}>
              <p>Date - {format(new Date(article.date), "do MMMM, yyyy")}</p>{" "}
              {/* <p>Written by : {article.author}</p> */}
              <p>
                Estimated reading time -{" "}
                {calculateReadingTime(article.blogContent)}
              </p>
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container spacing={4} justify="flex-end">
              <Grid item xs={8}>
                {article.tags.length !== 0 ? (
                  <ul
                    style={{
                      display: "inline-flex",
                      listStyleType: "none",
                    }}
                  >
                    {article.tags.map((t) => (
                      <li
                        key={t}
                        className="tag"
                        onClick={(e) => props.history.push(`/blogs?tag=${t}`)}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Grid>
              <Grid item xs={4}>
                <Button color="primary">
                  <Link to={`blog/${article._id}`}>Read More</Link>
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    ));
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {blogComponent}
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
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userID: state.auth.userID,
  token: state.auth.token,
});

export default withRouter(connect(mapStateToProps)(Blogs));
