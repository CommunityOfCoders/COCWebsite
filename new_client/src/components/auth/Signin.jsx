import React, {useState, useEffect} from 'react';
import { Container, Paper, Grid, TextField, Button, Typography, Link } from '@material-ui/core';
import "./Error.css";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { LOGIN_FAIL } from "../../actions/types";

function Signin(props) {

	const { isAuthenticated, error, login, clearErrors } = props; 

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [msg, setMsg] = useState(null);

	const handleUsername= (e) => setUsername(e.target.value);
	const handlePassword= (e) => setPassword(e.target.value);

	const [errors, updateErrors] = React.useState({
		username: "",
		password: "",
	});

	function isFormValid() {
		let formIsValid = true;
		if (!username) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				username: "*Username can't be Empty"
			}));
		}

		if (!password) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				password: "*Please enter your password."
			}));
		}

		return formIsValid;

	}

	function handleClick(event) {
		event.preventDefault();
		if (isFormValid()) {
			const user = { username, password };
			login(user);
		}
		else {
			alert("There are errors in your form !");
		}
	}

	useEffect(() => {
		if (error.id === LOGIN_FAIL) {
			setMsg(error.msg.msg);
		}
		else {
			setMsg(null);
		}

		if (isAuthenticated) {
			// Work here if auth is successful
		}
	}, [error, isAuthenticated]);

	return (
		<Container maxWidth="sm">
			<h1 className="heading"> LOGIN </h1>
			<Paper style={{ padding: 16 }} id="from_style">
				<Grid container alignItems="flex-start" spacing={2}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="username"
							type="text"
							placeholder="Username"
							onChange={handleUsername}
						/>
						<div className="errorMsg">{errors.username}</div>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="password"
							type="password"
							placeholder="Password"
							onChange={handlePassword}
						/>
						<div className="errorMsg">{errors.password}</div>
					</Grid>

					<Grid item xs={12}>
						<Button
							variant="contained"
							color="secondary"
							onClick={handleClick}
						>
							Submit
                </Button>
					</Grid>

					<Grid item xs={12}>
						<Typography>
							New User ? <Link to="/signup">Sign Up</Link> instead.
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Container>

	)
}

const mapStateToProps = (state) => ({
	isAuthenticated : state.auth.isAuthenticated,
	error : state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Signin);