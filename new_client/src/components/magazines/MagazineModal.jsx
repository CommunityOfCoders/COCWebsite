import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Document, Page, pdfjs } from "react-pdf";
import samplepdf from "../assets/sample.pdf";

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
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
  };

  const elementRef = React.useRef(null);

  const { width } = useContainerDimensions(elementRef);
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
        >
          Download Magazine
        </Button>
        <Typography variant="body1" component="p" align="center">
          Preview:
        </Typography>
        <div ref={elementRef} className={classes.pdfviewer}>
          <Document
            file={samplepdf}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(Math.min(2, numPages)), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={`${width !== 0 ? width * 0.9 : initWidth * 0.9}`}
              />
            ))}
          </Document>
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
