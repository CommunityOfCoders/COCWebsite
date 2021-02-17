import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

import "../Description/Description.scss";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  carousel: {
    maxWidth: 700,
  },
  root: {
    maxWidth: 500,
  },
  media: {
    height: 250,
  },
  actions: {
    alignItems: "center",
    display: "flex",
  },
});

const Achievements = (props) => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/achievements").then((res) => {
      setAchievements(res.data);
    });
  }, []);

  const classes = useStyles();

  return (
    <section className="Description">
      <div className="description-top">
        <div className="description-mission">
          <h3 className="description-mission-heading">Our Achievements</h3>
          <p className="MissionContent">
            Our community helps our members build their skills and achieve their
            dreams. <br />
            CoC is also where we celebrate those achievements.
          </p>
          <br />
          <Carousel
            animation="slide"
            classname={classes.carousel}
            interval={2500}
          >
            {achievements.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

const Item = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ display: "inline-block" }} raised>
      <CardMedia className={classes.media} image={props.item.imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.item.title}
        </Typography>
        <Typography variant="body" color="textPrimary" component="h5">
          {props.item.description}
        </Typography>
        <br />
        <Typography variant="body" color="textPrimary" component="p">
          By: <br />
          {props.item.owner.fullName}
        </Typography>
      </CardContent>

      <CardActions className={classes.actions}>
        <a
          href={"mailto:" + props.item.owner.email}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="small" color="primary">
            Contact me
          </Button>
        </a>
        {props.item.projectUrl ? (
          <a
            href={props.item.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Achievements;
