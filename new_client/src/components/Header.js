import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
export default function Header(props) {
	const [isDesktop, setisDesktop] = useState(window.innerWidth > 1080);
	const [navOpen, setnavOpen] = useState(false);
	// const [currPage, setCurrPage] = useState("home");

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
				<Link to="/" className={navItemClass}>
					<div className="nav-item-cont-wrapper curr-page">
						Home
						<i class="fa fa-home" aria-hidden="true"></i>
					</div>
				</Link>
				<Link to="/about" className={navItemClass}>
					<div className="nav-item-cont-wrapper">
						About Us
						<i class="fa fa-info-circle" aria-hidden="true"></i>
					</div>
				</Link>
				<Link to="/events" className={navItemClass}>
					<div className="nav-item-cont-wrapper">
						Events
						<i class="fa fa-calendar" aria-hidden="true"></i>
					</div>
				</Link>
				<Link to="/glimpse" className={navItemClass}>
					<div className="nav-item-cont-wrapper">
						Glimpses
						<i class="fa fa-eye" aria-hidden="true"></i>
					</div>
				</Link>
				<Link to="/blogs" className={navItemClass}>
					<div className="nav-item-cont-wrapper">
						Blogs
						<i class="fa fa-pencil" aria-hidden="true"></i>
					</div>
				</Link>
				<Link to="/" className={navItemClass}>
					<div className="nav-item-cont-wrapper">
						Resources
						<i class="fa fa-cog" aria-hidden="true"></i>
					</div>
				</Link>
				<Link to="/" className={navItemClass}>
					<div className="nav-item-cont-wrapper">
						Projects
						<i class="fa fa-code" aria-hidden="true"></i>
					</div>
				</Link>
				<Link to="/signin" className={navItemClass}>
					<div className="nav-item-cont-wrapper">
						{props.loggedIn ? "Logout" : "Login"}
						<i class="fa fa-sign-in" aria-hidden="true"></i>
					</div>
				</Link>
			</div>
		</div>
	);
}
