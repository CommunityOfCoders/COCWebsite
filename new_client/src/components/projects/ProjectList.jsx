import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@material-ui/core";
import IndividualProjectCard from './IndividualProjectCard';
import { useParams } from "react-router-dom";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const category = useParams().category;

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API + `/projects/${category}`)
            .then((res) => {
                if(res.status == 200)
                    setProjects(res.data);
            });
    }, [])

    return (
        <Container maxWidth="lg">
        <Grid container spacing={1}>
        <Grid item xs={12}>
        <Typography align="center" variant="h4" gutterBottom="true"> {`${category} projects`} </Typography>
        </Grid>
        {projects.map((project) => (
            <Grid item xs={6} md={4} key={project['id']['$oid']}>
                <IndividualProjectCard 
                    imgSrc={project.image}
                    title={project.title}
                    domain={project.domain}
                    shortDesc={project.shortDesc}
                    linkToRepo={project.linkToRepo}
                />
            </Grid>
        ))}
        </Grid>
        </Container>
    );
}

export default ProjectList;