import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('access_token') != null)

	useEffect( () => {
		setLoggedIn(localStorage.getItem('access_token') != null)
		console.log(loggedIn)
		console.log("NAVBAR", localStorage.getItem('access_token'))
	})

	const handleLogout = () => {
		localStorage.removeItem('access_token')
		actions.syncStoreToLocalStorage()
	}


	if (loggedIn) {
		return (
			<nav className="navbar navbar-light bg-light">
				<div className="container d-flex justify-content-end">
					<div className="ml-auto mx-2">
						<Link to="/">
							<button className="btn btn-primary" onClick={handleLogout}>Logout</button>
						</Link>
					</div>
				</div>
			</nav>
		);
	}

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
