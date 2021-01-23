import "date-fns";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Container, Grid } from "@material-ui/core";
import Spinner from "../spinner/Spinner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AlertUtility from "../Utilities/Alert";
import SingleBlog from "./SingleBlog";
import FAB from "../Utilities/FAB";
import "./Blogs.css";

const Blogs = (props) => {
  const [posts, setPosts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/blogs")
      .then((res) => res.data.blogs)
      .then((res) => {
        setPosts(res.sort((a, b) => b.date - a.date));
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [counter]);

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

  return (
    <div>
      {/* <div className="blogs-parallax"></div> */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {isLoading ? (
            <Spinner />
          ) : (
            posts.map((article) => (
              <SingleBlog
                key={article._id}
                article={article}
                handleVisibility={handleVisibility}
                handleDelete={handleDelete}
              />
            ))
          )}
          <FAB
            gotoLink="/addblog"
            tooltipTitle="Add Blog"
            isAuthenticated={props.isAuthenticated}
          />
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

export default connect(mapStateToProps)(Blogs);
