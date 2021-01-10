import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

export default function Header(props) {
	const [isDesktop, setisDesktop] = useState(window.innerWidth > 1080);
	const [navOpen, setnavOpen] = useState(false);
	const [currPage, setCurrPage] = useState("home");

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
		switch (clickedPage) {
			case "home":
				setCurrPage("home");
				break;
			case "about":
				setCurrPage("about");
				break;
			case "events":
				setCurrPage("events");
				break;
			case "glimpse":
				setCurrPage("glimpse");
				break;
			case "blogs":
				setCurrPage("blogs");
				break;
			case "resources":
				setCurrPage("resources");
				break;
			case "projects":
				setCurrPage("projects");
				break;
			case "login":
				setCurrPage("login");
				break;
			default:
				break;
		}
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
				<Link
					to="/"
					className={navItemClass}
					onClick={() => currPageChange("home")}
				>
					<div className={getNavItemContClass("home")}>
						Home
						<i class="fa fa-home" aria-hidden="true"></i>
					</div>
				</Link>
				<Link
					to="/about"
					className={navItemClass}
					onClick={() => currPageChange("about")}
				>
					<div className={getNavItemContClass("about")}>
						About Us
						<i class="fa fa-info-circle" aria-hidden="true"></i>
					</div>
				</Link>
				<Link
					to="/events"
					className={navItemClass}
					onClick={() => currPageChange("events")}
				>
					<div className={getNavItemContClass("events")}>
						Events
						<i class="fa fa-calendar" aria-hidden="true"></i>
					</div>
				</Link>
				<Link
					to="/glimpse"
					className={navItemClass}
					onClick={() => currPageChange("glimpse")}
				>
					<div className={getNavItemContClass("glimpse")}>
						Glimpses
						<i class="fa fa-eye" aria-hidden="true"></i>
					</div>
				</Link>
				<Link
					to="/blogs"
					className={navItemClass}
					onClick={() => currPageChange("blogs")}
				>
					<div className={getNavItemContClass("blogs")}>
						Blogs
						<i class="fa fa-pencil" aria-hidden="true"></i>
					</div>
				</Link>
				<Link
					to="/"
					className={navItemClass}
					onClick={() => currPageChange("resources")}
				>
					<div className={getNavItemContClass("resources")}>
						Resources
						<i class="fa fa-cog" aria-hidden="true"></i>
					</div>
				</Link>
				<Link
					to="/"
					className={navItemClass}
					onClick={() => currPageChange("projects")}
				>
					<div className={getNavItemContClass("projects")}>
						Projects
						<i class="fa fa-code" aria-hidden="true"></i>
					</div>
				</Link>
				<Link
					to="/signin"
					className={navItemClass}
					onClick={() => currPageChange("login")}
				>
					<div className={getNavItemContClass("login")}>
						{props.loggedIn ? "Logout" : "Login"}
						<i class="fa fa-sign-in" aria-hidden="true"></i>
					</div>
				</Link>
			</div>
		</div>
	);
}
