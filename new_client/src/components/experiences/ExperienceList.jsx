import React from "react";
import Banner from "./Banner";
import { Container, Box, Grid, Typography } from "@material-ui/core";
import { Divider, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { createTheme } from "@material-ui/core/styles";
import { WriteExperience } from "./WriteExperience";
import deshaw from "../assets/DEShaw.webp";
import { Height } from "@material-ui/icons";
import BackButton from "../Utilities/BackButton";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: "10px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    margin: "50px auto",
    height: "1px",
    width: "90%",
    backgroundColor: "rgb(0 100 0 / 39%)",
  },
}));

export default function CompanyList() {
  const classes = useStyles();
  return (
    <>
      <Box p={1} m={2}>
        <BackButton link="/exp" />
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{ color: "#52b107" }}
                gutterBottom
              >
                Internships
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.root}>
                {/* <CardMedia> */}
                <img src={deshaw} alt="" />
                {/* </CardMedia> */}
                <CardContent
                  style={{ flex: "1" }}
                  className={classes.cardContent}
                >
                  <Typography
                    style={{ color: "#224903" }}
                    align="center"
                    variant="h5"
                  >
                    D E Shaw & Co.
                  </Typography>
                  {/* <Link to="/writeexp"> */}
                  <Button
                    style={{ color: "#224903" }}
                    align="center"
                    variant="contained"
                    className={classes.button}
                  >
                    View Experiences
                  </Button>
                  {/* </Link> */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.root}>
                {/* <CardMedia> */}
                <img src={deshaw} alt="" />
                {/* </CardMedia> */}
                <CardContent
                  style={{ flex: "1" }}
                  className={classes.cardContent}
                >
                  <Typography
                    style={{ color: "#224903" }}
                    align="center"
                    variant="h5"
                  >
                    D E Shaw & Co.
                  </Typography>
                  {/* <Link to="/writeexp"> */}
                  <Button
                    style={{ color: "#224903" }}
                    align="center"
                    variant="contained"
                    className={classes.button}
                  >
                    View Experiences
                  </Button>
                  {/* </Link> */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.root}>
                {/* <CardMedia> */}
                <img src={deshaw} alt="" />
                {/* </CardMedia> */}
                <CardContent
                  style={{ flex: "1" }}
                  className={classes.cardContent}
                >
                  <Typography
                    style={{ color: "#224903" }}
                    align="center"
                    variant="h5"
                  >
                    D E Shaw & Co.
                  </Typography>
                  {/* <Link to="/writeexp"> */}
                  <Button
                    style={{ color: "#224903" }}
                    align="center"
                    variant="contained"
                    className={classes.button}
                  >
                    View Experiences
                  </Button>
                  {/* </Link> */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Divider className={classes.divider} />

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{ color: "#52b107" }}
                gutterBottom
              >
                Placements
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.root}>
                {/* <CardMedia> */}
                <img src={deshaw} alt="" />
                {/* </CardMedia> */}
                <CardContent
                  style={{ flex: "1" }}
                  className={classes.cardContent}
                >
                  <Typography
                    style={{ color: "#224903" }}
                    align="center"
                    variant="h5"
                  >
                    D E Shaw & Co.
                  </Typography>
                  {/* <Link to="/writeexp"> */}
                  <Button
                    style={{ color: "#224903" }}
                    align="center"
                    variant="contained"
                    className={classes.button}
                  >
                    View Experiences
                  </Button>
                  {/* </Link> */}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
