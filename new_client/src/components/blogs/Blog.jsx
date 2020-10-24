import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from "axios"

const Blog = () => {

	const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/blogs")
      .then(res => setPosts(res.data.blogs))
      .catch(error => console.log(error));
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
							<Link to="/" className="btn btn-outline-success">Edit Blog</Link>
						</div>
						<div className="col-sm-2">
							<Link to="/" className="btn btn-outline-danger">Delete Blog</Link>
						</div>
					</div>
				</div>
			))}
		</MainContainer>

	);
};
export default Blog;

const MainContainer = styled.div`
margin:7rem 0;`