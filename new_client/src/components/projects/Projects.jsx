import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Typography } from "@material-ui/core";
import ProjectGroup from './ProjectGroupCard';

const Projects = () => {
    const projectGroups = [
        {
            id: 1,
            url: 'https://www.goodcore.co.uk/blog/wp-content/uploads/2019/08/what-is-coding.png',
            title: 'Inheritance 2020',
            descr: 'Inheritance 2020 was completely online and we had some amazing projects built.'
        },
        {
            id: 2,
            url: 'https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png',
            title: 'Web development',
            descr: 'Browse through a variety of projects from the widest domain: web dev.'
        },
        {
            id: 3,
            url: 'https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png',
            title: 'Machine learning',
            descr: 'Browse through a variety of projects from the machine learning.'
        },
        {
            id: 4,
            url: 'https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png',
            title: 'All',
            descr: 'View all projects'
        }
    ]

    return (
        <Container maxWidth="lg">
        <Grid container spacing={1}>
        <Grid item xs={12}>
        <Typography align="center" variant="h4" gutterBottom="true"> Project Categories </Typography>
        </Grid>
        {projectGroups.map((group) => (
            <Grid item xs={12} md={4}>
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