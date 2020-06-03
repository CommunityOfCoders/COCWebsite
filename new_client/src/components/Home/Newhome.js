import React from 'react'
import './App.css'
import {makeStyles} from '@material-ui/core/styles'
import {Typography, Avatar, Grid, Box} from '@material-ui/core'
import Typed from 'react-typed'
import logo from './coc.jpeg'

// CSS STYLES
const useStyles = makeStyles(theme => ({
    logo: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1),
    },
    title: {
        color: "white",
        fontSize: 70,
        fontFamily: "consolas",
    },
    subtitle1: {
        color: "white",
        marginBottom: "1rem",
        fontFamily: "consolas",
        fontSize: 30,
    },
    subtitle2: {
        color: "white",
        marginBottom: "1rem",
        fontFamily: "consolas",
        fontSize: 50,
    },
    typedContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        textAlign: "center",
        zIndex: 1
    }
}));

const NewHome = () => {
    const classes = useStyles()
    return (
        <Box className={classes.typedContainer}>
            <Grid container justify="center">
                <Avatar className={classes.logo} src={logo} alt="picture"/>
            </Grid>
            <Typography className={classes.title} variant="h4">
                <Typed strings={["Community Of Coders"]} typeSpeed={40} />
            </Typography>
            <br />
            <Typography className={classes.subtitle1} >
                <Typed strings={["Good software, like wine, takes time ~ Joel Spolsky"]} typeSpeed={40} />
            </Typography>
            <br />
            <Typography className={classes.subtitle2} variant="h5">
                <Typed strings={["Coding Workshops", "Mentorship Programs", "Projects"]} typeSpeed={40} backSpeed={60}
                loop/>
            </Typography>
        </Box>
    )
}

export default NewHome