import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from '@material-ui/core/InputAdornment'
import {AccountCircle} from '@material-ui/icons'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Paper } from "@material-ui/core";
import coc from './coc.png'
import bg from './bg_signup.png'
import { createMuiTheme } from '@material-ui/core/styles'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import "./Error.css";

const useStyles = makeStyles((theme) => ({
	paper: {
	  marginTop: theme.spacing(4),
	  marginBottom: theme.spacing(1),
	  display: "flex",
	  flexDirection: "column",
	  alignItems: "center",
	  backgroundColor:'#000'
	},
	form: {
	  width: "100%", // Fix IE 11 issue.
	  marginTop: theme.spacing(1),
	  justifyContent:'center',
	  backgroundColor:'#f8f8f8'
	},
	formInner: {
	  padding:'20px'
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	  color:'white'
	},
	image: {
	  backgroundImage: `url(${bg})`,
	  backgroundRepeat: 'no-repeat',
	  /* backgroundSize: 'cover', */
	  backgroundPosition: 'center',
	},
  }));
  
  const theme1 = createMuiTheme({
	palette:{
	  primary: {
		main: "#52b107"
	  },
  }})
  
function Signup(props)
{

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
		event.preventDefault()
		if (isFormValid()) {
			//event.preventDefault()
			const user = {
				username,
				password,
				email,
				graduationYear
			};
			console.log(user)
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

	const classes = useStyles();
	return (
		<ThemeProvider theme={theme1}>
		  <Grid container style={{height:'87vh'}}>
		  <Grid item sm={false} md={7} className={classes.image} />    
			<Grid item sm={12} md={5}>
		<Container component="main" maxWidth="xs">
		  <Paper className={classes.paper} elevation={3}>
		  <img style={{marginTop:20,height:'90%',width:'90%'}} src={coc}/>{/* //"https://www.pinclipart.com/picdir/big/4-41731_lernen-clipart.png" alt="logo" width={200}/> */}
	
			<Typography style={{color:'#fff'}} component="h1" variant="h5">
			  Sign Up
			</Typography>
			<form className={classes.form} noValidate>
			  <div className={classes.formInner}>
			  <TextField
				margin="normal"
				fullWidth
				required
				label="Username"
				name="username"
				style={{color:'#52b107',borderColor:'#52b107'}}
				onChange={handleChangeUsername}
		  autoFocus
		  InputProps = {{startAdornment: <InputAdornment position="start"><AccountCircle/></InputAdornment>}}
			  />
			  <div style={{fontSize:15}} className="errorMsg">{errors.username}</div>
			  <TextField
				margin="normal"
				fullWidth
				color='#52b107'
				required
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				style={{color:'#52b107',borderColor:'#52b107'}}
				onChange={handleChangeEmail}
		  autoFocus
		  InputProps = {{startAdornment: <InputAdornment position="start"><AlternateEmailIcon/></InputAdornment>}}
			  />
			  <div style={{fontSize:15}} className="errorMsg">{errors.email}</div>
			  <TextField
				margin="normal"
				fullWidth
				required
				name="password"
				label="Password"
				type="password"
				autoComplete="current-password"
				InputProps = {{startAdornment: <InputAdornment position="start"><VpnKeyIcon/></InputAdornment>}}
				style={{color:'#52b107'}}
				onChange={handleChangePassword}
			  />
			  <div style={{fontSize:15}} className="errorMsg">{errors.password}</div>
				<TextField
				margin="normal"
				fullWidth
				color='#52b107'
				required
				id="graduation"
				label="Graduation Year"
				name="graduation year"
				style={{color:'#52b107',borderColor:'#52b107'}}
				  autoFocus
				  onChange={handleChangeGraduationYear}
		  		InputProps = {{maxLength:4, startAdornment: <InputAdornment position="start"><CalendarTodayIcon/></InputAdornment>}}
			  />
			  <div style={{fontSize:15}} className="errorMsg">{errors.graduationYear}</div>
			  <Button
				type="submit"
				fullWidth
				variant="contained"
				className={classes.submit}
				size='large'
				onClick={handleClick}
				style={{backgroundColor:'#52b107'}}>
				Sign Up
			  </Button>
				<Grid container item>
				  <Typography>
				  <Link style={{color:'#52b107',fontSize:15}} to="/signin">
					{"Have Account? Sign In"}
				  </Link>
				  </Typography>
				</Grid>
			  </div>
			</form>
		  </Paper>
		</Container>
		</Grid>
		</Grid>
		</ThemeProvider>
	  );
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Signup);