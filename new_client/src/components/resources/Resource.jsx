import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useResourceStyles = makeStyles({
  resource: {
    backgroundColor: "rgba(25, 25, 25, 0.50)",
    borderRadius: "10px",
    height: "120px",
    margin: "2%",
    cursor: "pointer",
    transition: "transform .2s",
    "&:hover, &:focus": {
      transform: "scale(1.10)",
    },
  },
  resourceText: {
    opacity: 1,
    color: "white",
    textAlign: "center",
  },
});

export default function Resource({ title, link, description }) {
  const classes = useResourceStyles();
  return (
    <Grid
      item
      container
      xs={12}
      md={4}
      lg={3}
      justify="center"
      alignItems="center"
      className={classes.resource}
      onClick={() => window.open(link)}
    >
      <Grid item>
        <Typography variant="h5" className={classes.resourceText}>{title}</Typography>
        <Typography variant="subtitle2" className={classes.resourceText} noWrap>{description}</Typography>
      </Grid>
    </Grid>
  );
}
