import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
      width: "60%",
    },
  },
  downloadBtn: {
    margin: "5% 0",
  },
  pdfviewer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "8px",
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

const MagazineModal = ({ open, modalHide, magazineData }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal open={open} onClose={modalHide}>
      <div style={modalStyle} className={classes.paper}>
        <Typography variant="h5" component="h2" align="center">
          {magazineData.title}
        </Typography>
        <hr />
        <Typography variant="body1" component="p" align="center">
          {magazineData.desc}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.downloadBtn}
          onClick={() => {
            window.open(magazineData.pdfUrl);
          }}
        >
          Download Magazine
        </Button>
        <Typography variant="body1" component="p" align="center">
          Preview:
        </Typography>
        <div className={classes.pdfviewer}>
          {magazineData.pdfUrl && (
            <iframe
              title="Magazine Preview"
              src={magazineData.pdfUrl.split("/view")[0] + "/preview"}
              width="640"
              height="480"
            ></iframe>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MagazineModal;
