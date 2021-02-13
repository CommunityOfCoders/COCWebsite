import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import { AccountCircle } from "@material-ui/icons";
import { Paper, useMediaQuery } from "@material-ui/core";
import coc from "../assets/COC_Full.webp";
import bg from "../assets/bg_signin.webp";
import { createMuiTheme } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AlertUtility from "../Utilities/Alert";

import "./Error.css";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { LOGIN_FAIL } from "../../actions/types";
import Spinner from "../spinner/Spinner";
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

function SignIn(props) {
  const { isAuthenticated, error, login, history, isLoading } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [msg, setMsg] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRememberme = (e) => setRememberme(e.target.checked);

  const [errors, updateErrors] = React.useState({
    username: "",
    password: "",
  });

  const isSmOrDown = useMediaQuery(theme1.breakpoints.down("sm"));

  function isFormValid() {
    let formIsValid = true;
    if (!username) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        username: "*Username can't be Empty",
      }));
    }

    if (!password) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        password: "*Please enter your password.",
      }));
    }

    return formIsValid;
  }

  function handleClick(event) {
    event.preventDefault();
    if (isFormValid()) {
      const user = { username, password, rememberme };
      login(user);
    } else {
      alert("There are errors in your form !");
    }
  }

  useEffect(() => {
    if (error.id === LOGIN_FAIL) {
      setMsg(error.msg.error);
      setIsError(true);
    } else {
      setMsg(null);
    }
    if (isAuthenticated) {
      // Work here if auth is successful
      history.push("/");
    }
  }, [error, isAuthenticated, history]);

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme1}>
      <Grid container>
        <Grid item sm={false} md={7} className={classes.image} />
        <Grid item sm={12} md={5}>
          <Container component="main" maxWidth={isSmOrDown ? "md" : "xs"}>
            <Paper className={classes.paper} elevation={3}>
              <img
                style={{ marginTop: 20, height: "90%", width: "90%" }}
                src={coc}
                alt="COC Logo"
              />

              <Typography style={{ color: "#fff" }} component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <div className={classes.formInner}>
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    label="Username"
                    name="username"
                    style={{ borderColor: "#52b107" }}
                    onChange={handleUsername}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div style={{ fontSize: 15 }} className="errorMsg">
                    {errors.username}
                  </div>
                  <PasswordField handlePassword={handlePassword} />
                  <div style={{ fontSize: 15 }} className="errorMsg">
                    {errors.password}
                  </div>

                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        checked={rememberme}
                        onChange={handleRememberme}
                      />
                    }
                    label="Remember me"
                  />
                  <div>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        size="large"
                        style={{ backgroundColor: "#52b107" }}
                        onClick={handleClick}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        style={{ color: "#52b107", fontSize: 15 }}
                        to="/reset"
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <Link
                          style={{ color: "#52b107", fontSize: 15 }}
                          to="/signup"
                        >
                          {"New User? Sign Up"}
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </Paper>
          </Container>
        </Grid>
      </Grid>
      <AlertUtility
        open={isError}
        duration={3000}
        onCloseHandler={() => setIsError(false)}
        severity="error"
        message={`Error: ${msg}. Please try again`}
      />
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { login, clearErrors })(SignIn);
