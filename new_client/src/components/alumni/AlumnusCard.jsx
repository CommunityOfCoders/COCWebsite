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
    socialUrls,
    graduationYear
  }
*/

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textDecoration: "none",
    height: "27rem",
    width: "20rem",
    cursor: "pointer",
  },
  frontCard: {
    backgroundColor: theme.palette.background.paper,
    padding: "1rem 0rem 1rem 0rem",
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
    justifyContent: "flex-end",
  },
  img: {
    width: "100%",
    height: "80%",
    objectFit: "cover",
    margin: "0 1rem 1rem 1rem",
    alignSelf: "center",
    textAlign: "center",
    lineHeight: "25rem",
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
        alt="Alumnus"
        className={classes.img}
      />
      <Typography component="span" align="center" variant="h5">
        {alumnus.fullName}
      </Typography>
      <Typography
        component="span"
        align="center"
        variant="subtitle1"
        style={{ padding: "0 0.25rem" }}
      >
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
        {!!alumnus.socialUrls && (
          <SocialsArray socialUrls={alumnus.socialUrls} />
        )}
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
