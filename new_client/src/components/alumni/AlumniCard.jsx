import { Card, Typography, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1rem 2rem 1rem",
    justify: "center",
  },
  img: {
    width: "12rem",
  }
}))

export default function AlumniCard({ mask }) {
  const classes = useStyles()
  return (
    <Grid item>
      <Card
        raised
        style={{
        }}
        className={classes.card}
      >
        <img
          style={{
            clipPath: mask || "circle(50% at 50% 50%)"
          }}
          src="https://randomuser.me/api/portraits/men/67.jpg"
          alt="User Image"
          className={classes.img}
        />
        <Typography align="center" variant="h5">
          Patrick Jane
        </Typography>
        <Typography align="center" variant="subtitle1">
          Mentalist at CBI
        </Typography>
      </Card>
    </Grid>
  );
}
