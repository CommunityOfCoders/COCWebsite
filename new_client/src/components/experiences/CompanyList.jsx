import React, { useState, useEffect } from "react";
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
import { AutorenewTwoTone, Height } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  button: {
    marginTop: "10px",
  },
  grid: {
    marginTop: "15px",
    padding: "10px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px 5px",
  },
  divider: {
    height: "1px",
    width: "80%",
    margin: "10px auto",
  },
}));

export default function CompanyList() {
  const classes = useStyles();

  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(process.env.REACT_APP_API + "/company")
      .then((res) => {
        setCompanyList(res.data.companies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Banner />
      <Box p={1}>
        <Container>
          <Grid container spacing={4}>
            <Grid
              className={classes.grid}
              container
              justifyContent="space-between"
            >
              <Grid md={12} xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  <Box sx={{flex: '1'}}>
                    <Typography
                      variant="h4"
                      style={{ color: "#52b107" }}
                      gutterBottom
                      className={classes.grid}
                    >
                      Experiences
                    </Typography>
                  </Box>
                  
                  <Link to="/myexp" style={{ textDecoration: "none" }}>
                  <Button
                    style={{ color: "#224903" }}
                    align="center"
                    variant="contained"
                  >
                    My Experiences
                  </Button>
                </Link>
                </Box>
                
              </Grid>
            </Grid>
            {companyList.map((company, index) => {
              return (
                <Grid key={index} item xs={12} sm={4} md={2}>
                  <Card className={classes.root}>
                    <div
                      style={{
                        display: "flex",
                        alignItem: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <CardMedia
                        style={{
                          width: "100%",
                          objectFit: "contain",
                        }}
                        component="img"
                        image={company.image.url}
                        title="Contemplative Reptile"
                      />
                    </div>
                    <Divider className={classes.divider} />
                    <CardContent
                      style={{ flex: "1" }}
                      className={classes.cardContent}
                    >
                      <Typography
                        style={{ color: "#224903" }}
                        align="center"
                        variant="h6"
                      >
                        {company.title}
                      </Typography>
                      <CardActions>
                        <Link to={`/exp/list/${company._id}`}>
                          <Button size="small">View</Button>
                        </Link>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Divider className={classes.divider} />
      <Container maxWidth="lg" className={classes.link}>
        <Typography variant="h5" style={{ color: "#52b107" }} align="center">
          Want to share your experience? Click below!
        </Typography>
        <Link
          to="/writeexp"
          style={{ textDecoration: "none" }}
          className={classes.link}
        >
          <Button
            style={{ color: "#224903" }}
            align="center"
            variant="contained"
          >
            Write Experience
          </Button>
        </Link>
      </Container>
    </>
  );
}
