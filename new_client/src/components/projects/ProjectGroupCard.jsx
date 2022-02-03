import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "20px 100px",
    backgroundColor: "white",
    position: "relative",
    height: "100%",
  },
  media: {
    height: "auto",
    paddingTop: "100%", //"56.25%", // 16:9
  },
  section1: {
    margin: theme.spacing(1, 2),
  },
  section2: {
    margin: theme.spacing(2, 2),
  },
  actions: {
    margin: theme.spacing(1, 2),
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function ProjectGroup({ id, imageURL, title, description }) {
  const classes = useStyles();
  return (
    <Card raised={true} className={classes.root}>
      {imageURL && (
        <CardMedia className={classes.media} image={imageURL} title={title} />
      )}
      <CardContent>
        <Typography
          className={classes.section1}
          gutterBottom
          variant="h6"
          component="h2"
          style={{ color: "#52b107" }}
        >
          {title}
        </Typography>
        <Divider />
        <Typography
          className={classes.section2}
          variant="body1"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions disableSpacing className={classes.actions}>
        <Link to={`projects/${id}`}>
          <Button size="small">View projects</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
