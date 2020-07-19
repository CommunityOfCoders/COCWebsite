import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import AddBlog from "./AddBlog";
import { Button, Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Blog = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [isModal, toggleIsModal] = useState(false);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/blogs")
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
  }, posts);

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
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleIsModal(true)}
      >
        Add a new blog
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModal}
        onClose={() => toggleIsModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModal}>
          <div className={classes.paper}>
            <AddBlog />
          </div>
        </Fade>
      </Modal>
    </MainContainer>
  );
};
export default Blog;

const MainContainer = styled.div`
  margin: 7rem 0;
`;
