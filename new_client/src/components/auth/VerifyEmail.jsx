import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import coc from "../assets/COC_Full.webp";
import { createMuiTheme } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import "./Error.css";
import AlertUtility from "../Utilities/Alert";

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
}));

const theme1 = createMuiTheme({
  palette: {
    primary: {
      main: "#52b107",
    },
  },
});

function VerifyEmail(props) {
  const token = useParams().token;
  const history = useHistory();
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleClose(e) {
    setIsSubmitted(false);
    history.push("/signin");
  }

  function handleClick(event) {
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_API + "/verify-email", { token })
      .then((res) => {
        if (res.status === 200) {
          setMsg(res.data.message);
          setIsSubmitted(true);
        } else {
          setMsg("Unknown Error");
          setIsError(true);
        }
      })
      .catch((err) => {
        setMsg(err.response.data.error);
        setIsError(true);
      });
  }

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme1}>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <img
            style={{ marginTop: 20, height: "90%", width: "90%" }}
            src={coc}
            alt="COC Logo"
          />

          <Typography style={{ color: "#fff" }} component="h1" variant="h5">
            Verify Email
          </Typography>
          <form className={classes.form} noValidate>
            <div className={classes.formInner}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                size="large"
                style={{ backgroundColor: "#52b107" }}
                onClick={handleClick}
              >
                Verify Email
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      <AlertUtility
        open={isSubmitted}
        duration={3000}
        onCloseHandler={handleClose}
        severity="success"
        message={msg}
      />
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

export default VerifyEmail;
