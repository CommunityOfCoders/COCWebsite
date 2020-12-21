import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import cx from "clsx";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
    margin: "auto",
    borderRadius: 12,
    padding: 12,
  },
  media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      borderRadius: 16 ,
  },
  font: {
      alignContent: 'center', 
  }
}));

export default function IndividualProjectCard({
  imgSrc,
  title,
  domain,
  shortDesc,
  linkToRepo
}) {
  const classes = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h5" component="h2" align='center'>
          {title}
      </Typography>
      <Typography variant="subtitle" component="h5" align='center'>
          {domain}
      </Typography>
      {imgSrc.length ? 
          (
          <React.Fragment>
              <br />  
              <CardMedia 
              className={classes.media} 
              image={imgSrc}
              title={title}
              />
          </React.Fragment>) 
          : (null)
      }
      <br />
      <Typography variant="body" component="p" align='center'>
          {shortDesc}
      </Typography>
      </CardContent>
      <CardActions>
        <a href={linkToRepo} target="_blank" rel="noopener noreferrer"><Button size="small">View project</Button></a>
      </CardActions>
  </Card>
  );
}
