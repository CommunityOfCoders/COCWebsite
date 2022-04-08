import React, { useState, useEffect } from "react";
import { Container, Box, Grid, Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BackButton from "../Utilities/BackButton";
import PersonIcon from "@material-ui/icons/Person";
import EventNote from "@material-ui/icons/EventNote";
import { Spinner } from "react-bootstrap";

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

export default function CompanyList() {
  const classes = useStyles();

  const [company, setCompany] = useState({});
  const [expList, setExpList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();
  const companyID = pathname.split("/")[3];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(process.env.REACT_APP_API + `/interviewList/${companyID}`)
      .then((res) => {
        const experiences = res.data.interviewList;
        experiences.sort((a, b) => b.appliedYear - a.appliedYear);
        setExpList(experiences);
        setCompany(res.data.company);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [pathname]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
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
                {!isLoading &&
                expList.filter((exp) => exp.appliedFor === "Internship")
                  .length == 0 ? (
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      style={{ color: "#5e5e5e" }}
                      gutterBottom
                    >
                      No Internship experiences found
                    </Typography>
                  </Grid>
                ) : (
                  expList
                    .filter((exp) => exp.appliedFor === "Internship")
                    .map((exp, index) => {
                      return (
                        <Grid item xs={12} sm={4} md={3}>
                          <Card className={classes.root}>
                            <img
                              src={company.image ? company.image.url : ""}
                              alt=""
                            />
                            <CardContent
                              style={{ flex: "1" }}
                              className={classes.cardContent}
                            >
                              <Typography
                                style={{ color: "#224903" }}
                                align="center"
                                variant="h6"
                              >
                                {company.title ? company.title : ""}
                              </Typography>
                              <Link to={`/exp/${exp._id}`}>
                                <Button
                                  style={{ color: "#224903" }}
                                  align="center"
                                  variant="contained"
                                  className={classes.button}
                                >
                                  Read Experience
                                </Button>
                              </Link>
                            </CardContent>
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
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })
                )}
              </Grid>
            </Container>

            <Divider className={classes.divider} />

            <Container maxWidth="lg">
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  style={{ color: "#52b107" }}
                  gutterBottom
                >
                  Placements
                </Typography>
              </Grid>
              {!isLoading &&
              expList.filter((exp) => exp.appliedFor === "Full Time").length ==
                0 ? (
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    style={{ color: "#5e5e5e" }}
                    gutterBottom
                  >
                    No Placement experiences found
                  </Typography>
                </Grid>
              ) : (
                expList
                  .filter((exp) => exp.appliedFor === "Full Time")
                  .map((exp, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={3}>
                        <Card className={classes.root}>
                          <img
                            src={company.image ? company.image.url : ""}
                            alt=""
                          />
                          <CardContent
                            style={{ flex: "1" }}
                            className={classes.cardContent}
                          >
                            <Typography
                              style={{ color: "#224903" }}
                              align="center"
                              variant="h6"
                            >
                              {company.title ? company.title : ""}
                            </Typography>
                            <Link to={`/exp/${exp._id}`}>
                              <Button
                                style={{ color: "#224903" }}
                                align="center"
                                variant="contained"
                                className={classes.button}
                              >
                                Read Experience
                              </Button>
                            </Link>
                          </CardContent>
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
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })
              )}
            </Container>
          </Box>
        </>
      )}
    </>
  );
}
