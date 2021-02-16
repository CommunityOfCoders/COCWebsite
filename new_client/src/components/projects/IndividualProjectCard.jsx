import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { overflowEllipsis } from "../Utilities/overflowEllipsis";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
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
  paper: {
    position: "absolute",
    width: "65%",
    backgroundColor: "#FFF",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
  },
}));

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const ProjectModal = ({ open, modalHide, projectData }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal open={open} onClose={modalHide}>
      <div style={modalStyle} className={classes.paper}>
        <Typography variant="h5" component="h2" align="center">
          {projectData.title}
        </Typography>
        <hr />
        <Typography variant="body1" component="p" align="center">
          {projectData.desc}
        </Typography>
      </div>
    </Modal>
  );
};

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
        <CardContent>
          <Typography variant="h5" component="h2" align="center">
            {title}
          </Typography>
          <Typography variant="subtitle1" component="h5" align="center">
            {domainNames.join(",")}
          </Typography>
          {imgSrc.length ? (
            <React.Fragment>
              <br />
              <CardMedia
                className={classes.media}
                image={imgSrc}
                title={title}
              />
            </React.Fragment>
          ) : null}
          <br />
          <Typography variant="body1" component="p" align="center">
            {displayDesc.display}
            {displayDesc.isOverflow ? (
              <a
                onClick={() => {
                  handleShow({ title: title, desc: shortDesc });
                }}
              >
                (read more)
              </a>
            ) : null}
          </Typography>
        </CardContent>
        <CardActions>
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
