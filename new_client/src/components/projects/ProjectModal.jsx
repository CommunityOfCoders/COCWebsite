import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: "#FFF",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "auto",
    maxHeight: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
    [theme.breakpoints.up("md")]: {
      width: "40%",
    },
  },
  modalMedia: {
    maxHeight: "50%",
    maxWidth: "auto",
    paddingTop: "56.25%", // 16:
    borderRadius: 4,
  },
}));

const getModalStyle = () => {
  const top = 45;
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
        <div style={{ margin: "0 auto" }}>
          <CardMedia
            className={classes.modalMedia}
            image={projectData.image}
            title={projectData.title}
          />
          <br />
        </div>
        <Typography variant="body1" component="p" align="center">
          {projectData.desc}
        </Typography>
      </div>
    </Modal>
  );
};

export default ProjectModal;
