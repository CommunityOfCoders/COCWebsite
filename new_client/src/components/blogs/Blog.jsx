import "date-fns";
import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import ReactMarkdown from "react-markdown";
import parse from "date-fns/parse";
import { format } from "date-fns";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const substringSize = 20;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/blogs")
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setPosts(res.sort((a, b) => b.date - a.date));
      })
      .catch((error) => console.log(error))
      .then(() => setIsLoading(false));
  }, []);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 228;
    const wordCount = content.replace(/[^\w ]/g, "").split(/\s+/).length;
    const readingTimeInMinutes = Math.floor(wordCount / wordsPerMinute) + 1;
    const readingTimeAsString = readingTimeInMinutes + " min";

    return readingTimeAsString;
  };

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
                  <CardHeader title={article.blogTitle} />{" "}
                  <CardContent>
                    <Typography>
                      {" "}
                      <p>
                        {format(
                          new Date(article.date),
                          "dd/MM/yyyy HH:mm:ss a"
                        )}
                      </p>{" "}
                      <p>Written by : {article.author}</p>
                      <p>
                        Estimated reading time:{" "}
                        {calculateReadingTime(article.blogContent)}
                      </p>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container spacing={4} justify="space-between">
                      <Grid item xs={4}>
                        <Button color="primary">
                          <Link to={`blogs/${article._id}`}>Read More</Link>
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button>
                          <Link to="/" className="btn-outline-success">
                            Edit Blog
                          </Link>
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button>
                          <Link to="/" className="btn-outline-danger">
                            Delete Blog
                          </Link>
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
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
export default Blogs;
