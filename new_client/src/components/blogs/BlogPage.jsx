import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Container } from "@material-ui/core";
import CodeBlock from "./SyntaxHighlighter";

function IndividualBlog() {
  const id = useParams().id;
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + `/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => console.log(err.toString()));
  }, [id]);

  return (
    <Container>
      <ReactMarkdown
        source={blog.blogContent}
        renderers={{ code: CodeBlock }}
      />
    </Container>
  );
}

export default IndividualBlog;
