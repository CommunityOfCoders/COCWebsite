import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from '@material-ui/core/InputAdornment'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Paper } from "@material-ui/core";
import coc from './coc.png'
import bg from './bg_signin.png'
import { createMuiTheme } from '@material-ui/core/styles'
import { useParams } from "react-router-dom";

import "./Error.css";



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor:'#000'
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    justifyContent:'center',
    backgroundColor:'#f8f8f8'
  },
  formInner: {
    padding:'30px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color:'white'
  },
  image: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}));

const theme1 = createMuiTheme({
  palette:{
    primary: {
      main: "#52b107"
    },
}})

function NewPw() 
{
    const token = useParams().token;// HASH TOKEN GENERATED
	const [password, setPassword] = useState('');
	const handlePassword= (e) => setPassword(e.target.value);
    const [errors, updateErrors] = useState({
		password:''
	});


	function isFormValid() {
		let formIsValid = true;
		if (!password) {
			formIsValid = false;
			updateErrors({
				password: "*Please enter your new password."
            });
        }
        if (password !== "") {
            if (!password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
                formIsValid = false;
                updateErrors({
                    password: `Passwords should contain atleast one number, one special character,  
                    one uppercase character, one lowercase character and must be between 6 to 16 characters long`
                });

            }
        }
		return formIsValid;
	}

	function handleClick(event) {
		event.preventDefault();
		if (isFormValid()) {
            //VALID DATA ENTRY, CONNECTION TO REDUX
            alert(`Valid New Password! ${password}`);//TO BE REMOVED

		}
		else {
			alert("There are errors in your form !");
		}
	}

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme1}>
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
      <img style={{marginTop:20,height:'90%',width:'90%'}} src={coc}/>

        <Typography style={{color:'#fff'}} component="h1" variant="h5">
          New Password
        </Typography>
        <form className={classes.form} noValidate>
          <div className={classes.formInner}>
          <TextField
            margin="normal"
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps = {{startAdornment: <InputAdornment position="start"><VpnKeyIcon/></InputAdornment>}}
            style={{color:'#52b107'}}
            onChange={handlePassword}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            size='large'
            style={{backgroundColor:'#52b107'}}
            onClick={handleClick}
          >
            Update Password
          </Button>
          </div>
        </form>
      </Paper>
    </Container>
    </ThemeProvider>
  );
}

export default NewPw;