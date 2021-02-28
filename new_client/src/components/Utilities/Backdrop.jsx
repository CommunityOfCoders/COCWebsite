import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "100",
    left: "0",
    top: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const Backdrop = (props) => {
  const classes = useStyles();
  return props.show ? (
    <div className={classes.backdrop} onClick={props.clicked}></div>
  ) : null;
};

export default Backdrop;
