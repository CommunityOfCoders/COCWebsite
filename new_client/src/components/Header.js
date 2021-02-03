import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

import "./Header.css";
function Header({ isAuthenticated, logout }) {
  return (
    <div className="navbar">
      <div className="navbar-right">
        <Link to="/">
          <i className="fa fa-fw fa-home"></i> HOME
        </Link>
        <Link to="/about">
          <i className="fa fa-fw fa-info"></i> ABOUT US
        </Link>

        <Link to="/events">
          <i className="fa fa-fw fa-calendar"></i>EVENTS
        </Link>
        {/* <Link to="/glimpse">
          <i className="fa fa-fw fa-info"></i>GLIMPSES
        </Link> */}
        <Link to="/alumni">
          <i className="fa fa-fw fa-graduation-cap"></i>ALUMNI
        </Link>
        <Link to="/alumni">
          <i className="fa fa-fw fa-graduation-cap"></i>ALUMNI
        </Link>
        <Link to="/blogs">
          <i className="fa fa-fw fa-pencil"></i>BLOGS
        </Link>
        <Link to="/projects">
          <i className="fa fa-fw fa-desktop"></i>PROJECTS
        </Link>
        <Link to="/resources">
          <i className="fa fa-fw fa-book"></i>RESOURCES
        </Link>
        {isAuthenticated || localStorage.getItem("token") !== null ? (
          <Link to="/" onClick={() => logout()}>
            <i className="fa fa-fw fa-sign-in"></i> LOGOUT
          </Link>
        ) : (
          <Link to="/signup">
            <i className="fa fa-fw fa-sign-in"></i> SIGN UP
          </Link>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
