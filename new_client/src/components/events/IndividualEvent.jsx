import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	card: {
		margin: '20px 100px',
		backgroundColor: 'white',
		position: 'relative',
	},
	media: {
		height: 'auto',
		paddingTop: '56.25%', // 16:9
	},
}));

export default function IndividualEvent({ article, isMember, handleDelete }) {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardHeader title={article.eventName} />{' '}
			{!!article.image && (
				<CardMedia className={classes.media} image={article.image.url} />
			)}
			<CardContent>
				{' '}
				<p>{format(new Date(article.date), 'dd/MM/yyyy')}</p>{' '}
				<Typography>
					<small
						style={{
							position: 'absolute',
							right: '20px',
						}}
					>
						Venue:
						{' ' + article.venue}
					</small>
					{article.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Grid container spacing={2} justify='space-between'>
					{isMember && (
						<>
							<Grid item xs={4}>
								<Button className='btn-outline-success' variant='outlined'>
									<Link
										to={`event/edit/${article._id}`}
										className='btn-outline-success'
									>
										Edit Event
									</Link>
								</Button>
							</Grid>
							<Grid item xs={4}>
								<Button
									className='btn-outline-danger'
									onClick={() => handleDelete(article._id)}
									color='secondary'
									variant='outlined'
								>
									Delete Event
								</Button>
							</Grid>
						</>
					)}
				</Grid>
			</CardActions>
		</Card>
	);
}
