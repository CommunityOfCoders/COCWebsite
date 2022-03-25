import React, { useState, useEffect } from "react";
import BackButton from "../Utilities/BackButton";
import { Box, Container, Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export default function MyExperiences() {
  const classes = useStyles();

  const [isLoading, setIsLoading] =useState(false);
  const [expList, setExpList] = useState([]);
  // const [draftList, setDraftList] = useState([]);

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
            {
              (!isLoading && expList.filter(exp => exp.appliedFor === "Experiences").length == 0) ? 
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    style={{ color: "#5e5e5e" }}
                    gutterBottom
                  >
                    No experiences found
                  </Typography>
                </Grid>
                : ''
                // : expList.filter(exp => exp.appliedFor === "Experiences").map((exp, index) => {
                // return <Grid item xs={12} md={3}>
                //   <Card className={classes.root}>
                //     <img src={company.image ? company.image.url : ""} alt="" />
                //     <CardContent
                //       style={{ flex: "1" }}
                //       className={classes.cardContent}
                //     >
                //       <Typography
                //         style={{ color: "#224903" }}
                //         align="center"
                //         variant="h6"
                //       >
                //         {company.title ? company.title : ""}
                //       </Typography>
                //       <Link to={`/exp/${exp._id}`}>
                //         <Button
                //           style={{ color: "#224903" }}
                //           align="center"
                //           variant="contained"
                //           className={classes.button}
                //         >
                //           Read Experience
                //         </Button>
                //       </Link>
                //     </CardContent>
                //     <CardContent
                //       // style={{ flex: "2" }}
                //       className={classes.cardContentSecond}
                //     >
                //       <Typography align="center">
                //         <PersonIcon style={{ margin: "5px" }} />
                //         {""}
                //         {exp.createdBy}
                //       </Typography>
                //       <Typography align="center">
                //         <EventNote style={{ margin: "5px" }} />
                //         {exp.appliedYear}
                //       </Typography>
                //     </CardContent>
                //   </Card>
                // </Grid>
            //   })
            }
          </Grid>
        </Container>

        <Divider className={classes.divider} />

        <Container maxWidth="lg">
          <Grid item xs={12}>
            <Typography variant="h4" style={{ color: "#52b107" }} gutterBottom>
              My Drafts
            </Typography>
          </Grid>
          {
              (!isLoading && expList.filter(exp => exp.appliedFor === "Drafts").length == 0) ? 
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{ color: "#5e5e5e" }}
                  gutterBottom
                >
                  No drafts found
                </Typography>
              </Grid>
              : ''
            //   expList.filter(exp => exp.appliedFor === "Drafts").map((exp, index) => {
            //     return <Grid item xs={12} md={3}>
            //       <Card className={classes.root}>
            //         <img src={company.image ? company.image.url : ""} alt="" />
            //         <CardContent
            //           style={{ flex: "1" }}
            //           className={classes.cardContent}
            //         >
            //           <Typography
            //             style={{ color: "#224903" }}
            //             align="center"
            //             variant="h6"
            //           >
            //             {company.title ? company.title : ""}
            //           </Typography>
            //           <Link to={`/exp/${exp._id}`}>
            //             <Button
            //               style={{ color: "#224903" }}
            //               align="center"
            //               variant="contained"
            //               className={classes.button}
            //             >
            //               Continue
            //             </Button>
            //           </Link>
            //         </CardContent>
            //         <CardContent
            //           // style={{ flex: "2" }}
            //           className={classes.cardContentSecond}
            //         >
            //           <Typography align="center">
            //             <PersonIcon style={{ margin: "5px" }} />
            //             {""}
            //             {exp.createdBy}
            //           </Typography>
            //           <Typography align="center">
            //             <EventNote style={{ margin: "5px" }} />
            //             {exp.appliedYear}
            //           </Typography>
            //         </CardContent>
            //       </Card>
            //     </Grid>
            //   })
            }
        </Container>
      </Box>
    </>
  );
}
