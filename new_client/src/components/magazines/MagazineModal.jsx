import React, { useState } from "react";
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
  modalMedia: {
    maxHeight: "50%",
    maxWidth: "auto",
    paddingTop: "56.25%", // 16:
    borderRadius: 4,
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
  const elementRef = React.useRef(null);
  const [initWidth, setInitWidth] = React.useState(0);

  React.useEffect(() => {
    if (open && initWidth == 0) {
      setInitWidth(elementRef.current ? elementRef.current.offsetWidth : 200);
    }
  }, [elementRef.current]);

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
        <div ref={elementRef} className={classes.pdfviewer}>
          {magazineData.pdfUrl && (
            <iframe
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

export const useContainerDimensions = (myRef) => {
  const getDimensions = () => ({
    width: myRef.current ? myRef.current.offsetWidth : 0,
  });

  const [dimensions, setDimensions] = useState({ width: 0 });
  React.useEffect(() => {
    if (myRef.current != null) {
      setDimensions(getDimensions());
    }
    const handleResize = () => {
      setDimensions(getDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);
  return dimensions;
};

export default MagazineModal;
