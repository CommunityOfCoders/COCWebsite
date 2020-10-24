import React, { useEffect, useState } from 'react';
import { Container, Paper, Grid, TextField, Button, Typography } from '@material-ui/core';
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import "./Error.css";

function Signup(props) {

	const { isAuthenticated, error, register, clearErrors, history } = props;

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [graduationYear, setGraduationYear] = useState(null);
	const [msg, setMsg] = useState(null);

	const handleChangeUsername = (e) => setUsername(e.target.value)
	const handleChangePassword = (e) => setPassword(e.target.value)
	const handleChangeEmail = (e) => setEmail(e.target.value)
	const handleChangeGraduationYear = (e) => setGraduationYear(parseInt(e.target.value))

	const [errors, updateErrors] = useState({
		username: '',
		email: '',
		password: '',
		graduationYear: null
	})

	function isFormValid() {
		let formIsValid = true;
		// Constraints for Username

		if (!username) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				username: "*Username can't be Empty"
			}));
		}

		if (username) {
			if (username.length > 10) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					username: "*Username can't be more than 10 characters long."
				}));
			}
		}

		// Constraints for Email

		if (!email) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				email: "*Email can't be Empty",
			}));
		}

		if (email) {
			// /^[a-zA-Z0-9_+&*-] + (?:\\.[a-zA-Z0-9_+&*-]+ )*@(?:[a-zA-Z0-9-]+\\.) + [a-zA-Z]{2, 7}/
			let pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
			if (!pattern.test(email)) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					errors: "*Please enter valid Email ID",
				}));
			}
		}

		/* Password Constraints 
		1. Must be within 6 to 16 characters
		2. Must contain at least 1 number, 1 lowercase, 1 uppercase letter, 1 special character
		*/

		if (!password) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				password: "*Password can't be empty."
			}));
		}

		if (password !== "") {
			if (!password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					password: `Passwords should contain atleast one number, one special character,  
					one uppercase character, one lowercase character and must be between 6 to 16 characters long`
				}));

			}
		}

		// Constraints for Graduation Year
		if (!graduationYear) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				graduationYear: "*Graduation Year can't be Empty",
			}));
		}

		if (graduationYear) {
			let pattern = new RegExp(/^[0-9]{4}$/);
			if (!pattern.test(graduationYear)) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					graduationYear: "*Please enter valid year",
				}));
			}
		}

		return formIsValid;

	}

	function handleClick(event) {
		if (isFormValid()) {
			event.preventDefault()
			const user = {
				username,
				password,
				email,
				graduationYear
			};
			register(user);
		}
		else {
			alert("There are errors in your form.");
			console.log(errors);
		}
	};

	useEffect(() => {
		if (error.id === 'REGISTER_FAIL') {
			setMsg(error.msg.msg);
		} else {
			setMsg(null);
		}
		if (isAuthenticated) {
			// TODO: something here after auth
			history.push("/");
		}
	}, [error, isAuthenticated]);

	return (
		<Container maxWidth="sm">

			<h1 className="heading"> SIGN UP </h1>
			<Paper style={{ padding: 16 }} id="from_style">
				<Grid container alignItems="flex-start" spacing={2}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="username"
							type="text"
							placeholder="Username"
							onChange={handleChangeUsername}
						/>
						<div className="errorMsg">{errors.username}</div>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="email"
							type="email"
							placeholder="Email"
							onChange={handleChangeEmail}
						/>
						<div className="errorMsg">{errors.email}</div>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="password"
							type="password"
							placeholder="Password"
							onChange={handleChangePassword}
						/>
						<div className="errorMsg">{errors.password}</div>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="graduationYear"
							type="text"
							inputProps={{
								maxLength: 4
							}}
							placeholder="Graduation Year"
							onChange={handleChangeGraduationYear}
						/>
						<div className="errorMsg">{errors.graduationYear}</div>
					</Grid>

					<Grid item xs={12}>
						<div>
							<Button
								variant="contained"
								color="secondary"
								onClick={handleClick}
							>
								Submit
              </Button>
						</div>
					</Grid>

					<Grid item xs={12}>
						<Typography>
							Already an user ? <Link to="/signin">Sign In</Link> instead.
						</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Container >

	)
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Signup);