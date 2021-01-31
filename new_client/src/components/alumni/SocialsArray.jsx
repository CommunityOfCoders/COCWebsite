import React from "react";
import { makeStyles } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  iconButton: {
    color: "#ffffff",
  },
  array: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const socialIcons = {
  personal: <PersonIcon style={{ color: "#ffffff" }} fontSize="large" />,
  facebook: <FacebookIcon style={{ color: "#ffffff" }} fontSize="large" />,
  github: <GitHubIcon style={{ color: "#ffffff" }} fontSize="large" />,
  instagram: <InstagramIcon style={{ color: "#ffffff" }} fontSize="large" />,
  linkedin: <LinkedInIcon style={{ color: "#ffffff" }} fontSize="large" />,
  twitter: <TwitterIcon style={{ color: "#ffffff" }} fontSize="large" />,
};

function SocialsArray({ socialUrls }) {
  const classes = useStyles();

  return (
    <div className={classes.array}>
      {Object.keys(socialUrls)
        .filter((key) => socialUrls[key] !== "")
        .map((key) => (
          <a
            key={key}
            href={socialUrls[key]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton className={classes.iconButton}>
              {socialIcons[key]}
            </IconButton>
          </a>
        ))}
    </div>
  );
}

export default SocialsArray;
