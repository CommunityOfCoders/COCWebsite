import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography, Box } from "@material-ui/core";
import ProjectGroup from "../projects/ProjectGroupCard";
import Spinner from "../spinner/Spinner";
import Banner from "./Banner";
import IndividualMagazineCard from "./IndividualMagazineCard";

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [magazines, setMagazines] = useState([
    {
      _id: 1,
      imageURL:
        "http://img.timeinc.net/time/magazine/archive/covers/2000/1101000619_400.jpg",
      magazineTitle: "The Future of Technology",
      magazineDescription:
        "Web Development is all about building websites. From developing top class UIs, to providing a strong and resilient backend, such is the scope of web development.",
      pdfUrl: "...",
      date: Date.now(),
    },
    {
      _id: 2,
      imageURL:
        "https://www.goubiq.com/wp-content/uploads/2015/09/412015-pc-magazine-february-2016.jpg",
      magazineTitle: "Robot Wants Your Job",
      magazineDescription:
        "Web Development is all about building websites. From developing top class UIs, to providing a strong and resilient backend, such is the scope of web development.",
      pdfUrl: "...",
      date: Date.now(),
    },
  ]);

  useEffect(() => {
    setLoading(false);
    // axios
    //   .get(process.env.REACT_APP_API + "/domains")
    //   .then((res) => {
    //     const domainList = res.data;
    //     setDomains(domainList);
    //   })
    //   .catch((err) => console.error(err))
    //   .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Banner />
      <Box p={1} m={2}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{ color: "#52b107" }}
                gutterBottom
              >
                Magazines
              </Typography>
            </Grid>
            {magazines.length &&
              magazines.map((magazine) => (
                <Grid item xs={12} md={4} key={magazine._id}>
                  <IndividualMagazineCard
                    id={magazine._id}
                    imageURL={magazine.imageURL}
                    title={magazine.magazineTitle}
                    description={magazine.magazineDescription}
                    pdfUrl={magazine.pdfUrl}
                    date={magazine.date}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Projects;
