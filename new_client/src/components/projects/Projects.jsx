import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography, Box } from "@material-ui/core";
import ProjectGroup from "./ProjectGroupCard";
import Spinner from "../spinner/Spinner";
import Banner from "./Banner";

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/domains")
      .then((res) => {
        const domainList = res.data;
        setDomains(domainList);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
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
                Project Categories
              </Typography>
            </Grid>
            {domains.length &&
              domains.map((group) => (
                <Grid item xs={12} md={4} key={group._id}>
                  <ProjectGroup
                    id={group._id}
                    imageURL={group.imageUrl}
                    title={group.domainName}
                    description={group.domainDescription}
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
