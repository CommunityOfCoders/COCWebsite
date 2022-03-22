import React, {useState, useEffect} from "react";
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
import { useLocation, withRouter } from "react-router-dom";
import axios from 'axios';
import BackButton from "../Utilities/BackButton";
import PersonIcon from "@material-ui/icons/Person";
import EventNote from "@material-ui/icons/EventNote";

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
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const companyID = pathname.split("/")[3];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(process.env.REACT_APP_API + `/interviewList/${companyID}`)
      .then((res) => {
        console.log(res.data);
        setExpList(res.data.interviewList);
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
            {
              (!isLoading && expList.filter(exp => exp.appliedFor === "Internship").length == 0) ? 
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    style={{ color: "#5e5e5e" }}
                    gutterBottom
                  >
                    No Internship experiences found
                  </Typography>
                </Grid>
                : expList.filter(exp => exp.appliedFor === "Internship").map((exp, index) => {
                return <Grid item xs={12} md={3}>
                  <Card className={classes.root}>
                    <img src={company.image ? company.image.url : ""} alt="" />
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
                    <CardContent
                      // style={{ flex: "2" }}
                      className={classes.cardContentSecond}
                    >
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
              })
            }
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
          {
              (!isLoading && expList.filter(exp => exp.appliedFor === "Full Time").length == 0) ? 
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{ color: "#5e5e5e" }}
                  gutterBottom
                >
                  No Placement experiences found
                </Typography>
              </Grid>
              : expList.filter(exp => exp.appliedFor === "Full Time").map((exp, index) => {
                return <Grid item xs={12} md={3}>
                  <Card className={classes.root}>
                    <img src={company.image ? company.image.url : ""} alt="" />
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
                    <CardContent
                      // style={{ flex: "2" }}
                      className={classes.cardContentSecond}
                    >
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
              })
            }
        </Container>
      </Box>
    </>
  );
}
