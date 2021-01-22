import React from 'react';
import {
	Typography,
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@material-ui/core';
import {
	Facebook,
	GitHub,
	Instagram,
	LinkedIn,
	YouTube,
} from '@material-ui/icons';

import COC from '../assets/COC.webp';
import './Footer.css';
import footerStyle from './footerStyle';

const responsiveFonts = responsiveFontSizes(createMuiTheme());

export default function Footer() {
	const classes = footerStyle();
	return (
		<ThemeProvider theme={responsiveFonts}>
			<div className={classes.footerContent}>
				<img src={COC} width='75rem' height='75rem' />
				<Typography variant='h4' className={classes.name} align='center'>
					<span className={classes.cocGreen}>C</span>ommunity{' '}
					<span className={classes.cocGreen}>o</span>f{' '}
					<span className={classes.cocGreen}>C</span>oders
				</Typography>
				<div className={classes.tagline}>
					{['Imagine', 'Believe', 'Achieve'].map((word, index) => (
						<Typography
							variant='body1'
							component='span'
							key={index}
							className={classes.taglineWord}
						>
							{word}
						</Typography>
					))}
				</div>
				<div className={classes.socials}>
					<a
						href='https://www.facebook.com/CommunityOfCoders'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Facebook className={classes.socialIcon} fontSize='large' />
					</a>
					<a
						href='https://www.youtube.com/channel/UCiiLKnn8iU9Q31cByvtT_5w'
						target='_blank'
						rel='noopener noreferrer'
					>
						<YouTube className={classes.socialIcon} fontSize='large' />
					</a>
					<a
						href='https://www.instagram.com/coc_vjti/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<Instagram className={classes.socialIcon} fontSize='large' />
					</a>
					<a
						href='https://in.linkedin.com/company/community-of-coders-vjti'
						target='_blank'
						rel='noopener noreferrer'
					>
						<LinkedIn className={classes.socialIcon} fontSize='large' />
					</a>
					<a
						href='https://github.com/CommunityOfCoders'
						target='_blank'
						rel='noopener noreferrer'
					>
						<GitHub className={classes.socialIcon} fontSize='large' />
					</a>
				</div>
			</div>
			<div className={classes.footerBottom}>
				<Typography variant='body1' className={classes.copyright}>
					&copy; <span className={classes.cocGreen}>C</span>ommunity{' '}
					<span className={classes.cocGreen}>o</span>f{' '}
					<span className={classes.cocGreen}>C</span>oders, VJTI
				</Typography>
			</div>
		</ThemeProvider>
	);
}
