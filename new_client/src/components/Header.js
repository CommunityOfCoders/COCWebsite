import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
export default function Header(props) {
	const [isDesktop, setisDesktop] = useState(window.innerWidth > 900);

	useEffect(() => {
		console.log("Listener added");
		window.addEventListener("resize", () => {
			setisDesktop(window.innerWidth > 900);
		});
	}, []);

	return (
		<div className={isDesktop ? "navbar-custom-desk" : ""}>
			<div className={isDesktop ? "nav-item-list-desk" : ""}>
				<Link to="/" className={isDesktop ? "nav-item-desk" : ""}>
					Home
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : ""}>
					About Us
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : ""}>
					Events
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : ""}>
					Glimpses
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : ""}>
					Blogs
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : ""}>
					Resources
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : ""}>
					Projects
				</Link>
				<Link to="/" className={isDesktop ? "nav-item-desk" : ""}>
					{props.loggedIn ? "Logout" : "Login"}
				</Link>
			</div>
		</div>
	);
}
