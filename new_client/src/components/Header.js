import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
export default function Header(props) {
	const [isDesktop, setisDesktop] = useState(window.innerWidth > 900);
	const [navOpen, setnavOpen] = useState(false);
	useEffect(() => {
		function navToggle() {
			setnavOpen((navPrevState) => {
				return !navPrevState;
			});
		}
		window.addEventListener("resize", () => {
			setisDesktop(window.innerWidth > 900);
		});
		document.getElementById("nav-toggler").addEventListener("click", navToggle);
	}, []);

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
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					<div className="nav-item-cont-wrapper">Home</div>
				</Link>
				<Link
					to="/about"
					className={isDesktop ? "nav-item-desk" : "nav-item-mob"}
				>
					<div className="nav-item-cont-wrapper">About Us</div>
				</Link>
				<Link
					to="/events"
					className={isDesktop ? "nav-item-desk" : "nav-item-mob"}
				>
					<div className="nav-item-cont-wrapper">Events</div>
				</Link>
				<Link
					to="/glimpse"
					className={isDesktop ? "nav-item-desk" : "nav-item-mob"}
				>
					<div className="nav-item-cont-wrapper">Glimpses</div>
				</Link>
				<Link
					to="/blogs"
					className={isDesktop ? "nav-item-desk" : "nav-item-mob"}
				>
					<div className="nav-item-cont-wrapper">Blogs</div>
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					<div className="nav-item-cont-wrapper">Resources</div>
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					<div className="nav-item-cont-wrapper">Projects</div>
				</Link>
				<Link
					to="/signin"
					className={isDesktop ? "nav-item-desk" : "nav-item-mob"}
				>
					<div className="nav-item-cont-wrapper">
						{props.loggedIn ? "Logout" : "Login"}
					</div>
				</Link>
			</div>
		</div>
	);
}
