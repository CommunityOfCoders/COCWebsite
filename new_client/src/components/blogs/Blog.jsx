import React from 'react'
import styled from 'styled-components';
const Blog = ({ posts }) => {
    return (
        <MainContainer>

            {posts.map((article, key) => (
                <div className="container">
                    <h2>{article.blogTitle}</h2>
                    <p>{article.blogContent}</p>
                    <span className="badge badge-secondary p-2"> {article.author}</span>
                    <div className="row my-4">
                        <div className="col-sm-2">
                            <a href="/" className="btn btn-outline-success">Edit Blog</a>
                        </div>
                        <div className="col-sm-2">
                            <a href="/" className="btn btn-outline-danger">Delete Blog</a>
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