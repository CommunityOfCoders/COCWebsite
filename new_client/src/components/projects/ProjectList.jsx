import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography, Box } from "@material-ui/core";
import IndividualProjectCard from "./IndividualProjectCard";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import BackButton from "../Utilities/BackButton";

const ProjectList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [domain, setDomain] = useState([]);
  const id = useParams().id;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + `/projects/filter/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const projectsList = res.data.projects;
          setProjects(projectsList);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(process.env.REACT_APP_API + `/domains/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setDomain(res.data.domainName);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  const DisplayProjects = () => {
    return projects.length ? (
      <Box p={1} m={2}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ color: "#52b107" }} gutterBottom>
              {`${domain} projects`}
            </Typography>
          </Grid>
          {projects.map((project) => (
            <Grid item xs={12} md={4} key={project["_id"]}>
              <IndividualProjectCard
                imgSrc={project.imageUrl}
                title={project.projectTitle}
                domains={project.domains}
                owner={project.owner}
                shortDesc={project.projectDescription}
                linkToRepo={project.projectUrl}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    ) : (
      <Typography align="center" variant="h4" gutterBottom>
        Sorry, projects in this category are not yet available.
      </Typography>
    );
  };

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <BackButton link="/projects" />
          <DisplayProjects />
        </>
      )}
    </Container>
  );
};

export default ProjectList;
