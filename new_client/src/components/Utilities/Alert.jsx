import React from "react";
import { makeStyles, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "./Backdrop";

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "100%",
    zIndex: "500",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

// const AlertUtility = props => {
// 	return <MuiAlert elevation={6} variant='filled' {...props} />;
// };

const Alert = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Backdrop show={props.open} />
      <div className={classes.alert}>
        <Snackbar
          open={props.open}
          autoHideDuration={props.duration}
          onClose={props.onCloseHandler}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={props.onCloseHandler}
            severity={props.severity}
          >
            {props.message}
          </MuiAlert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
};

export default Alert;
