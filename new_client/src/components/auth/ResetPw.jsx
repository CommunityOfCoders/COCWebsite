import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from '@material-ui/core/InputAdornment'
import EmailIcon from '@material-ui/icons/Email';
import { Paper } from "@material-ui/core";
import coc from './coc.png'
import bg from './bg_signin.png'
import { createMuiTheme } from '@material-ui/core/styles'

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

function ResetPw() {

	const [email, setEmail] = useState('');
	const handleEmail= (e) => setEmail(e.target.value);
    const [errors, updateErrors] = React.useState({
		email:''
	});


	function isFormValid() {
		let formIsValid = true;
		if (!email) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				email: "*Email can't be Empty"
            }));
            console.log(errors) //TO BE REMOVED
		}
		return formIsValid;

	}

	function handleClick(event) {
		event.preventDefault();
		if (isFormValid()) {
            //CONNECTION TO REDUX
            alert('E-mail sent with password reset link');

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
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <div className={classes.formInner}>
          <TextField
            margin="normal"
            fullWidth
            color='#52b107'
            required
            label="Email ID"
            placeholder="Enter registered Email ID"
            name="username"
            style={{color:'#52b107',borderColor:'#52b107'}}
            onChange={handleEmail}
      autoFocus
      InputProps = {{startAdornment: <InputAdornment position="start"><EmailIcon/></InputAdornment>}}
          />
          <div style={{fontSize:15}} className="errorMsg">{errors.email}</div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            size='large'
            style={{backgroundColor:'#52b107'}}
            onClick={handleClick}
          >
            Send Reset Link
          </Button>
          </div>
        </form>
      </Paper>
    </Container>
    </ThemeProvider>
  );
}

export default ResetPw;