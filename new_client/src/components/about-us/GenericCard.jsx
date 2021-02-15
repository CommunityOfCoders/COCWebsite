import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto 1.25rem",
    height: "auto",
    width: "90%",
    boxShadow: "0 0 25px rgba(0,0,0,.3)",
    borderRadius: "10px",
  },
}));

export default function GenericCard({ imgSrc, title }) {
  const classes = useStyles();

  return (
    <Tooltip title={title}>
      <img src={imgSrc} alt={title} className={classes.root} />
    </Tooltip>
  );
}
