import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@material-ui/core";
import ProjectGroup from "./ProjectGroupCard";

const Projects = () => {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/domains").then((res) => {
      const domainList = res.data;
      setDomains(domainList);
    });
  });
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography align="center" variant="h4" gutterBottom>
            {" "}
            Project Categories{" "}
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
  );
};

export default Projects;
