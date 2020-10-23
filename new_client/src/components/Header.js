import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, register } from "../actions/authActions";

import "./Header.css";
function Header({ isAuthenticated }) {
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
        <Link to="/glimpse">
          <i className="fa fa-fw fa-info"></i>GLIMPSES
        </Link>
        <Link to="/blogs">
          <i className="fa fa-fw fa-pencil"></i>BLOGS
        </Link>
        {isAuthenticated || localStorage.getItem("token") !== null ? (
          <Link
            to="/"
          >
            <i className="fa fa-fw fa-sign-in"></i> LOGOUT
          </Link>
        ) : (
          <Link to="/signin">
            <i className="fa fa-fw fa-sign-in"></i> SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, register })(Header);
