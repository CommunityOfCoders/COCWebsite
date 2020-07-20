import "date-fns";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Grid, Typography, Card } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactMarkdown from "react-markdown";
import parse from "date-fns/parse";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const substringSize = 20;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/blogs")
      .then((res) => setPosts(res.data.sort((a, b) => b.date - a.date)))
      .catch((error) => console.log(error))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <Container maxWidth="md">
      {loading ? (
        <Skeleton variant="rect" />
      ) : (
        <>
          <Grid container spacing={3}>
            {posts.map((article, key) => (
              <Grid item xs={6}>
                <Card>
                  <Typography variant="h3">{article.blogTitle}</Typography>
                  <ReactMarkdown
                    source={
                      article.blogContent.length > substringSize
                        ? `${article.blogContent.substring(
                            0,
                            substringSize
                          )}...`
                        : article.blogContent
                    }
                  />
                  <span className="badge badge-secondary p-2">
                    {" "}
                    {/* {parse(article.date, "dd-MM-YYYY HH:mm:ss", new Date())} */}
                  </span>
                  <Typography>Written by : {article.author}</Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <Button>
                        <Link to="/" className="btn-outline-success">
                          Edit Blog
                        </Link>
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button>
                        <Link to="/" className="btn-outline-danger">
                          Delete Blog
                        </Link>
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" color="primary">
            <Link to="/addblog" style={{ color: "white" }}>
              Add a new blog
            </Link>
          </Button>
        </>
      )}
    </Container>
  );
};
export default Blog;
