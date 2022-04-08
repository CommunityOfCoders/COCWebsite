import React, { useState, useEffect } from "react";
import BackButton from "../Utilities/BackButton";
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import EventNote from "@material-ui/icons/EventNote";
import LocationOn from "@material-ui/icons/LocationOn";
import useAuthenticatedAxios from "../Utilities/useAuthenticatedAxios.js";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: "15px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
  },
  cardContentSecond: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "0px",
  },
  divider: {
    margin: "50px auto",
    height: "1px",
    width: "90%",
    backgroundColor: "rgb(0 100 0 / 39%)",
  },
}));

const MyExperiences = (props) => {
  const classes = useStyles();
  const authenticatedAxios = useAuthenticatedAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [expList, setExpList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    authenticatedAxios
      .get(process.env.REACT_APP_API + `/interview/user/${props.userID}`)
      .then((res) => {
        setExpList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

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
                My Experiences
              </Typography>
            </Grid>
            {!isLoading && expList.filter((exp) => !exp.isDraft).length == 0 ? (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{ color: "#5e5e5e" }}
                  gutterBottom
                >
                  No experiences found
                </Typography>
              </Grid>
            ) : (
              expList
                .filter((exp) => !exp.isDraft)
                .map((exp, index) => {
                  return <MyExperienceCard exp={exp} classes={classes} />;
                })
            )}
          </Grid>
        </Container>

        <Divider className={classes.divider} />

        <Container maxWidth="lg">
          <Grid item xs={12}>
            <Typography variant="h4" style={{ color: "#52b107" }} gutterBottom>
              My Drafts
            </Typography>
          </Grid>
          {!isLoading && expList.filter((exp) => exp.isDraft).length == 0 ? (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{ color: "#5e5e5e" }}
                gutterBottom
              >
                No experiences found
              </Typography>
            </Grid>
          ) : (
            expList
              .filter((exp) => exp.isDraft)
              .map((exp, index) => {
                return <MyExperienceCard exp={exp} classes={classes} />;
              })
          )}
        </Container>
      </Box>
    </>
  );
};

const MyExperienceCard = ({ exp, classes }) => {
  return (
    <Grid item xs={12} md={3}>
      <Card className={classes.root}>
        <CardContent className={classes.cardContentSecond}>
          <Typography align="center">
            <PersonIcon style={{ margin: "5px" }} />
            {""}
            {exp.createdBy}
          </Typography>
          <Typography align="center">
            <EventNote style={{ margin: "5px" }} />
            {exp.appliedYear}
          </Typography>
          <Typography align="center">
            <LocationOn style={{ margin: "5px" }} />
            {exp.companyRequest}
          </Typography>
          <Link to={`/exp/edit/${exp._id}`}>
            <Button
              style={{ color: "#224903" }}
              align="center"
              variant="contained"
              className={classes.button}
            >
              Edit Experience
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userID: state.auth.userID,
  token: state.auth.token,
});

export default connect(mapStateToProps)(MyExperiences);
