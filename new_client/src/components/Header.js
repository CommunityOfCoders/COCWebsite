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
					Home
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					About Us
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					Events
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					Glimpses
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					Blogs
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					Resources
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					Projects
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : "nav-item-mob"}>
					{props.loggedIn ? "Logout" : "Login"}
				</Link>
			</div>
		</div>
	);
}
