import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  bigDiv: {
    height: "70vh ",
  },
});

const Blog = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.blog);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getAllBlogs());
  }, posts);

  if (isLoading)
    return (
      <div className={`${classes.bigDiv} ${classes.center} `}>
        <CircularProgress />
      </div>
    );
  return (
    <MainContainer>
      {posts.map((article, key) => (
        <div className="container">
          <h2>{article.blogTitle}</h2>
          <p>{article.blogContent}</p>

          <span className="badge badge-secondary p-2"> {article.author}</span>

          <div className="row my-4">
            <div className="col-sm-2">
              <Link to="/" className="btn btn-outline-success">
                Edit Blog
              </Link>
            </div>
            <div className="col-sm-2">
              <Link to="/" className="btn btn-outline-danger">
                Delete Blog
              </Link>
            </div>
          </div>
        </div>
      ))}
    </MainContainer>
  );
};
export default Blog;

const MainContainer = styled.div`
  margin: 7rem 0;
`;
