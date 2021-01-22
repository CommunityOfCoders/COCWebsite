import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid } from '@material-ui/core';
import IndividualGlimpse from './IndividualGlimpse';
import Spinner from '../spinner/Spinner';

const Glimpse = () => {
	const [glimpses, setGlimpses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let shouldCancel = false;
		const call = async () => {
			try {
				const response = await axios.get(
					process.env.REACT_APP_API + '/glimpses'
				);
				if (!shouldCancel && response.data && response.data.data.length > 0) {
					setGlimpses(response.data.data);
				}
			} catch (e) {
				console.log(e.message);
				setGlimpses([]);
			}
			setIsLoading(false);
		};
		call();
		return () => (shouldCancel = true);
	}, []);

	return (
		<Container maxWidth='lg'>
			<Grid container spacing={4}>
				{isLoading ? <Spinner /> : null}
				{glimpses.map((glimpse) => (
					<Grid item xs={6} md={6} lg={4} key={glimpse._id}>
						<IndividualGlimpse
							imgSrc={glimpse.preview}
							title={glimpse.eventName}
							albumPath={glimpse.albumPath}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Glimpse;
