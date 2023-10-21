import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-end">
				<div className="ml-auto mx-2">
					<Link to="/sign-up">
						<button className="btn btn-primary">Sign Up</button>
					</Link>
				</div>

				<div className="ml-auto mx-2">
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
