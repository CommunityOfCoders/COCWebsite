import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
    margin: "auto",
    borderRadius: 12,
    padding: 12,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    borderRadius: 16,
  },
  font: {
    alignContent: "center",
  },
}));

export default function ProjectGroup({ id, imageURL, title, description }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" align="center">
          {title}
        </Typography>
        {imageURL.length ? (
          <React.Fragment>
            <br />
            <CardMedia
              className={classes.media}
              image={imageURL}
              title={title}
            />
          </React.Fragment>
        ) : null}
        <br />
        <Typography variant="body" component="p" align="center">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`projects/${id}`}>
          <Button size="small">View projects</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
