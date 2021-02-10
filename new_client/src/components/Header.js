import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

import "./Header.css";

function Header(props) {
  let location = useLocation();
  console.log(location);
  const [isDesktop, setisDesktop] = useState(window.innerWidth > 1080);
  const [navOpen, setnavOpen] = useState(false);
  const [currPage, setCurrPage] = useState(
    location.pathname.slice(1) ? location.pathname.slice(1) : "home"
  );

  useEffect(() => {
    function navToggle() {
      setnavOpen((navPrevState) => {
        return !navPrevState;
      });
    }
    window.addEventListener("resize", () => {
      setisDesktop(window.innerWidth > 1080);
    });
    document.getElementById("nav-toggler").addEventListener("click", navToggle);
    return () => {
      document
        .getElementById("nav-toggler")
        .removeEventListener("click", navToggle);
    };
  }, []);
  let navItemClass = isDesktop ? "nav-item-desk" : "nav-item-mob";

  function getNavItemContClass(navPage) {
    if (navPage === currPage) {
      return "nav-item-cont-wrapper curr-page";
    } else {
      return "nav-item-cont-wrapper";
    }
  }
  function currPageChange(clickedPage) {
    // console.log(`Curr page changed to ${clickedPage}`);
    setCurrPage(clickedPage);
  }

  return (
    <div className={isDesktop ? "navbar-custom-desk" : "navbar-custom-mob"}>
      <div
        className={isDesktop ? "nav-burg-desk" : "nav-burg-mob"}
        id="nav-toggler"
      >
        <i className="fa fa-bars"></i>
      </div>
      <div
        className={
          (isDesktop ? "nav-item-list-desk" : "nav-item-list-mob") +
          (navOpen ? " nav-mob-open" : " nav-mob-close")
        }
      >
        <div id="coclogonav" className={navItemClass}>
          <img
            src="https://res.cloudinary.com/coc-vjti/image/upload/v1611151381/coc_dark_ukajqb.webp"
            alt=""
          />
        </div>
        <Link
          to="/"
          className={navItemClass}
          onClick={() => currPageChange("home")}
        >
          <nav className={getNavItemContClass("home")}>HOME</nav>
        </Link>
        <Link
          to="/about"
          className={navItemClass}
          onClick={() => currPageChange("about")}
        >
          <nav className={getNavItemContClass("about")}>ABOUT US</nav>
        </Link>
        <Link
          to="/events"
          className={navItemClass}
          onClick={() => currPageChange("events")}
        >
          <nav className={getNavItemContClass("events")}>EVENTS</nav>
        </Link>
        <Link
          to="/alumni"
          className={navItemClass}
          onClick={() => currPageChange("alumni")}
        >
          <nav className={getNavItemContClass("alumni")}>ALUMNI</nav>
        </Link>
        {/* <Link
					to="/blogs"
					className={navItemClass}
					onClick={() => currPageChange("blogs")}
				>
					<nav className={getNavItemContClass("blogs")}>
						BLOGS
					</nav>
				</Link> */}
        {/* <Link
					to="/resources"
					className={navItemClass}
					onClick={() => currPageChange("resources")}
				>
					<nav className={getNavItemContClass("resources")}>
						RESOURCES
					</nav>
				</Link> */}
        <Link
          to="/projects"
          className={navItemClass}
          onClick={() => currPageChange("projects")}
        >
          <nav className={getNavItemContClass("projects")}>PROJECTS</nav>
        </Link>
        {props.isAuthenticated ? (
          <div
            className={
              isDesktop ? `${navItemClass} nav-item-right` : navItemClass
            }
            style={{ cursor: "pointer" }}
            onClick={() => currPageChange("home")}
          >
            <nav className={getNavItemContClass("home")} onClick={props.logout}>
              LOGOUT
            </nav>
          </div>
        ) : (
          <Link
            to="/signin"
            className={
              isDesktop ? `${navItemClass} nav-item-right` : navItemClass
            }
            onClick={() => currPageChange("login")}
          >
            <nav className={getNavItemContClass("login")}>LOGIN</nav>
          </Link>
        )}

        <Link
          to="/signup"
          className={navItemClass}
          onClick={() => currPageChange("signup")}
        >
          <nav className={getNavItemContClass("signup")}>SIGNUP</nav>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
