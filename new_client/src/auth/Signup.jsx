import React from 'react';
import { Container, Paper, Grid, TextField, Button } from '@material-ui/core';
import "./Error.css";

export default function Signup() {
	const [form, updateForm] = React.useState({
		username: "",
		email: "",
		password: "",
		graduationYear: null
	});

	const [errors, updateErrors] = React.useState({
		username: "",
		email: "",
		password: "",
		graduationYear: ""
	});

	function isFormValid() {
		let formIsValid = true;
		// Constraints for Username

		if (!form.username) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				username: "*Username can't be Empty"
			}));
		}

		if (form.username) {
			if (form.username.length > 10) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					username: "*Username can't be more than 10 characters long."
				}));
			}
		}

		// Constraints for Email

		if (!form.email) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				email: "*Email can't be Empty",
			}));
		}

		if (form.email) {
			let pattern = new RegExp(/^[a-zA-Z0-9_+&*-] + (?:\\.[a-zA-Z0-9_+&*-]+ )*@(?:[a-zA-Z0-9-]+\\.) + [a-zA-Z]{2, 7}/);
			if (!pattern.test(form.email)) {
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

		if (!form.password) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				password: "*Password can't be empty."
			}));
		}

		if (form.password !== "") {
			if (!form.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					password: `Passwords should contain atleast one number, one special character,  
					one uppercase character, one lowercase character and must be between 6 to 16 characters long`
				}));

			}
		}

		// Constraints for Graduation Year
		if (!form.graduationYear) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				graduationYear: "*Graduation Year can't be Empty",
			}));
		}

		if (form.graduationYear) {
			let pattern = new RegExp(/^[0-9]{4}$/);
			if (!pattern.test(form.graduationYear)) {
				formIsValid = false;
				updateErrors(prevErrors => ({
					...prevErrors,
					graduationYear: "*Please enter valid year",
				}));
			}
		}

		return formIsValid;

	}

	function handleChange(event) {
		const { name, value } = event.target;
		updateForm(prevDetails => {
			return (
				{
					...prevDetails,
					[name]: value
				}
			);
		});

	}

	function handleClick(event) {
		event.preventDefault();
		if (isFormValid()) {
			fetch(process.env.REACT_APP_API_REGISTER, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			})
				.then((response) => response.json())
				.catch((err) => {
					console.log(err);
				});
		}
		else {
			alert("There are errors in the form !");
		}
	}

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
							onChange={handleChange}
							value={form.username}
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
							onChange={handleChange}
							value={form.email}
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
							onChange={handleChange}
							value={form.password}
						/>
						<div className="errorMsg">{errors.password}</div>
					</Grid>

					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							name="graduationYear"
							type="number"
							placeholder="Graduation Year"
							onChange={handleChange}
							value={form.graduationYear}
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
				</Grid>
			</Paper>
		</Container >

	)
}