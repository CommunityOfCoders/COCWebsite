import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { overflowEllipsis } from "../Utilities/overflowEllipsis";
import ProjectModal from "./ProjectModal";

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

export default function IndividualProjectCard({
  imgSrc,
  title,
  domains,
  shortDesc,
  linkToRepo,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const classes = useStyles();
  const displayDesc = overflowEllipsis(shortDesc);
  let domainNames = [];

  domains.forEach((domain) => {
    domainNames.push(domain["domainName"]);
  });

  const handleShow = (data) => {
    setIsModalOpen(true);
    setModalInfo(data);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setModalInfo({});
  };

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        {imgSrc.length && (
          <CardMedia className={classes.media} image={imgSrc} title={title} />
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
          <Typography
            className={classes.section2}
            gutterBottom
            variant="subtitle2"
            component="h6"
          >
            {domainNames.join(",")}
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            component="p"
            className={classes.section2}
            color="textSecondary"
          >
            {displayDesc.display}
            {displayDesc.isOverflow ? (
              <Button
                color="grey"
                onClick={() => {
                  handleShow({ title: title, desc: shortDesc, image: imgSrc });
                }}
              >
                (read more)
              </Button>
            ) : null}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardActions disableSpacing style={{}} className={classes.actions}>
          <a href={linkToRepo} target="_blank" rel="noopener noreferrer">
            <Button size="small">View project</Button>
          </a>
        </CardActions>
      </Card>
      <ProjectModal
        open={isModalOpen}
        modalHide={handleClose}
        projectData={modalInfo}
      />
    </div>
  );
}
