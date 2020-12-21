import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@material-ui/core";
import ProjectGroup from './ProjectGroupCard';

const Projects = () => {
    const [domains, setDomains] = useState([]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API + "/projects")
            .then((res) => setDomains(res.data));
    }, [])

    return (
        <Container maxWidth="lg">
        <Grid container spacing={1}>
        <Grid item xs={12}>
        <Typography align="center" variant="h4" gutterBottom="true"> Project Categories </Typography>
        </Grid>
        {domains.map((group) => (
            <Grid item xs={12} md={4} key={group.id}>
                <ProjectGroup 
                    imageURL={group.url}
                    title={group.title}
                    description={group.descr}
                />
            </Grid>
        ))}
        </Grid>
        </Container>
    )
}

export default Projects;