import React from 'react';
import { Container, Paper, Grid, TextField, Button } from '@material-ui/core';
import "./Error.css";

export default function Signin() {
	const [form, updateForm] = React.useState({
		username: "",
		password: "",
	});

	const [errors, updateErrors] = React.useState({
		username: "",
		password: "",
	});

	function isFormValid() {
		let formIsValid = true;
		if (!form.username) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				username: "*Username can't be Empty"
			}));
		}

		if (!form.password) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				password: "*Please enter your password."
			}));
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
		if (isFormValid()) {
			event.preventDefault();
			fetch(process.env.REACT_APP_API_LOGIN, {
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
			alert("There are errors in your form !");
		}
	}

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
							onChange={handleChange}
							value={form.username}
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
							onChange={handleChange}
							value={form.password}
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
				</Grid>
			</Paper>
		</Container>

	)
}