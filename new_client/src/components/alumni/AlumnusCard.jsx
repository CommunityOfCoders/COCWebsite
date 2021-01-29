import React, { useState } from "react";
import { Card, Typography, makeStyles } from "@material-ui/core";
import ReactCardFlip from "react-card-flip";
import PropTypes from "prop-types";

import SocialsArray from "./SocialsArray";
/*
  alumnus: {
    fullName,
    professionalTitle,
    company,
    imageUrl,
    socialsUrl,
    graduationYear
  }
*/

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justify: "center",
    textDecoration: "none",
    height: "27rem",
    width: "20rem",
    cursor: "pointer",
  },
  frontCard: {
    backgroundColor: theme.palette.background.paper,
    padding: "2rem 1rem 2rem 1rem",
  },
  backCard: {
    padding: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  backCardContent: {
    backgroundColor: "rgba(81, 176, 7, 0.75)",
    height: "100%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "end",
  },
  img: {
    width: "100%",
  },
}));

function AlumnusCardFront({ mask, alumnus }) {
  const classes = useStyles();
  return (
    <Card raised className={`${classes.card} ${classes.frontCard}`}>
      <img
        style={{
          clipPath: mask || "circle(50% at 50% 50%)",
        }}
        src={alumnus.imageUrl}
        alt="User Image"
        className={classes.img}
      />
      <Typography component="span" align="center" variant="h5">
        {alumnus.fullName}
      </Typography>
      <Typography component="span" align="center" variant="subtitle1">
        {alumnus.professionalTitle} at {alumnus.company}
      </Typography>
    </Card>
  );
}

function AlumnusCardBack({ alumnus }) {
  const classes = useStyles();
  return (
    <Card
      raised
      className={`${classes.card} ${classes.backCard}`}
      style={{
        backgroundImage: `url(${alumnus.imageUrl})`,
      }}
    >
      <div className={classes.backCardContent}>
        <Typography component="span" align="center" variant="h4">
          {alumnus.fullName}
        </Typography>
        <Typography component="span" align="center" variant="h5">
          {alumnus.professionalTitle} at {alumnus.company}
        </Typography>
        <SocialsArray socialUrls={alumnus.socialUrls} />
      </div>
    </Card>
  );
}

function AlumnusCard({ mask, alumnus }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      flipSpeedBackToFront="0.2"
      flipSpeedFrontToBack="0.3"
    >
      <div
        className=""
        key="front"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <AlumnusCardFront mask={mask} alumnus={alumnus} />
      </div>
      <div
        className=""
        key="back"
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <AlumnusCardBack alumnus={alumnus} />
      </div>
    </ReactCardFlip>
  );
}

AlumnusCard.propTypes = {
  alumnus: PropTypes.object.isRequired,
};

export default AlumnusCard;
