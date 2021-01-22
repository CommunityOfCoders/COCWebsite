import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography } from '@material-ui/core';
import IndividualProjectCard from './IndividualProjectCard';
import { useParams } from 'react-router-dom';

const ProjectList = () => {
	const [projects, setProjects] = useState([]);
	const [domain, setDomain] = useState([]);
	const id = useParams().id;

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API + `/projects/filter/${id}`)
			.then((res) => {
				if (res.status == 200) {
					const projectsList = res.data.projects;
					setProjects(projectsList);
				}
			});
	}, []);

	useEffect(() => {
		axios.get(process.env.REACT_APP_API + `/domains/${id}`).then((res) => {
			if (res.status == 200) {
				setDomain(res.data.domainName);
			}
		});
	}, []);

	return (
		<Container maxWidth='lg'>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Typography align='center' variant='h4' gutterBottom>
						{' '}
						{`${domain} projects`}{' '}
					</Typography>
				</Grid>
				{projects.map((project) => (
					<Grid item xs={6} md={4} key={project['_id']}>
						<IndividualProjectCard
							imgSrc={project.imageUrl}
							title={project.projectTitle}
							domains={project.domains}
							shortDesc={project.projectDescription}
							linkToRepo={project.projectUrl}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default ProjectList;
