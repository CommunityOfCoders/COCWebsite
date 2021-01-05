import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Paper } from "@material-ui/core";
import coc from "./coc.png";
import bg from "./bg_signin.png";
import { createMuiTheme } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";

import "./Error.css";
import { newPassword } from "../../actions/authActions";
import AlertUtility from "../Utilities/Alert";
import { connect } from "react-redux";
import PasswordField from "./PasswordField";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#000",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  formInner: {
    padding: "30px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
  },
  image: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));

const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: "#52b107",
    },
  },
});

function NewPw(props) {
  const token = useParams().token;
  const history = useHistory();

  const [password, setPassword] = useState("");
  const handlePassword = (e) => setPassword(e.target.value);

  const [confirmPassword, setConfirmPassword] = useState("");
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const [errors, updateErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  function isFormValid() {
    let formIsValid = true;
    if (!password) {
      formIsValid = false;
      updateErrors({
        password: "*Please enter your new password.",
      });
    }
    if (password !== "") {
      if (
        !password.match(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        )
      ) {
        formIsValid = false;
        updateErrors({
          password: `Passwords should contain atleast one number, one special character,  
                    one uppercase character, one lowercase character and must be between 6 to 16 characters long`,
        });
      }
    }
    if (!confirmPassword) {
      formIsValid = false;
      updateErrors((prevState) => ({
        ...prevState,
        confirmPassword: "*Please enter your password to confirm",
      }));
    } else {
      if (confirmPassword !== password) {
        formIsValid = false;
        updateErrors((prevState) => ({
          ...prevState,
          confirmPassword: "*Passwords don't match!",
        }));
      }
    }

    return formIsValid;
  }

  function handleClose(e) {
    setIsSubmitted(false);
    history.push("/signin");
  }

  function handleClick(event) {
    event.preventDefault();
    if (isFormValid()) {
      props.newPassword({ newPassword: password, token });
      setIsSubmitted(true);
    } else {
      alert("There are errors in your form !");
    }
  }

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme1}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <img
            style={{ marginTop: 20, height: "90%", width: "90%" }}
            src={coc}
          />

          <Typography style={{ color: "#fff" }} component="h1" variant="h5">
            New Password
          </Typography>
          <form className={classes.form} noValidate>
            <div className={classes.formInner}>
              <PasswordField handlePassword={handlePassword} isNew />
              <div style={{ fontSize: 15 }} className="errorMsg">
                {errors.password}
              </div>
              <PasswordField
                handlePassword={handleConfirmPassword}
                name="confirm password"
                isNew
              />
              <div style={{ fontSize: 15 }} className="errorMsg">
                {errors.confirmPassword}
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                size="large"
                style={{ backgroundColor: "#52b107" }}
                onClick={handleClick}
              >
                Update Password
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      <AlertUtility
        open={isSubmitted}
        duration={9000}
        onCloseHandler={handleClose}
        severity="success"
        message={
          "Password reset successful! You will be redirected to login screen"
        }
      />
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  newPassword: state.auth.newPassword,
});

export default connect(mapStateToProps, { newPassword })(NewPw);
