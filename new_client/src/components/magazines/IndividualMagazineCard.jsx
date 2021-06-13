import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { overflowEllipsis } from "../Utilities/overflowEllipsis";
import MagazineModal from "./MagazineModal";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { green, red } from "@material-ui/core/colors";
// import ProjectModal from "./ProjectModal";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
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

export default function IndividualMagazineCard({
  id,
  imageURL,
  title,
  description,
  pdfUrl,
  date,
  isMember,
  handleDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const classes = useStyles();
  const displayDesc = overflowEllipsis(description);

  const handleShow = (data) => {
    setIsModalOpen(true);
    setModalInfo(data);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setModalInfo({});
  };

  return (
    <div style={{ height: "100%" }}>
      <Card className={classes.root} variant="outlined">
        {imageURL.length && (
          <CardMedia className={classes.media} image={imageURL} title={title} />
        )}
        <CardContent style={{ flex: "1" }}>
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
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {format(new Date(date), "do MMMM, yyyy")}
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
                  handleShow({
                    title: title,
                    desc: description,
                    image: imageURL,
                    pdfUrl: pdfUrl,
                  });
                }}
              >
                (read more)
              </Button>
            ) : null}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardActions disableSpacing style={{}} className={classes.actions}>
          <Button
            size="small"
            onClick={() => {
              handleShow({
                title: title,
                desc: description,
                image: imageURL,
                pdfUrl: pdfUrl,
              });
            }}
          >
            View Sample
          </Button>

          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <Button size="small" variant="contained" color="primary">
              Download
            </Button>
          </a>
        </CardActions>
        <CardActions disableSpacing style={{}} className={classes.actions}>
          {isMember && (
            <>
              <Link to={`magazine/edit/${id}`}>
                <IconButton>
                  <EditOutlinedIcon style={{ color: green[500] }} />
                </IconButton>
              </Link>
              <IconButton onClick={() => handleDelete(id)}>
                <DeleteOutlinedIcon style={{ color: red[400] }} />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
      <MagazineModal
        open={isModalOpen}
        modalHide={handleClose}
        magazineData={modalInfo}
      />
    </div>
  );
}
