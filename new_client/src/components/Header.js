import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#0d0d0d",
    padding: "10px 5%",
    textAlign: "center",
  },
});

export default function Header() {
  const classes = useStyles();
  return (
    <div className={`${classes.navbar} navbar`}>
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/">Events</Link>
      <Link to="/">
        <img src="./coc-logo.jpeg" alt="Coc Logo" height="30"></img>
      </Link>
      <Link to="/glimpse">Glimpses</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  );
}
