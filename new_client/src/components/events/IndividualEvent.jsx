import {IconButton,Card,CardActionArea,CardMedia,CardContent,Typography,CardActions,Button,Grid,makeStyles} from "@material-ui/core";
import {format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import EventIcon from '@material-ui/icons/Event';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import {green,red} from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  card: {
    margin: "20px 100px",
    backgroundColor: "white",
    position: "relative",
  },
  media: {
    height: "auto",
    paddingTop: "56.25%", // 16:9
  },
}));

export default function IndividualEvent({ article, isMember, handleDelete }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
        <Card raised={true}>
        
        {!!article.image && (
        <CardMedia className={classes.media} image={article.image.url} />
      )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {article.eventName}
          </Typography><br/>
          <Typography variant="body2" color="textSecondary" component="p">
          <EventIcon style={{color:'#52b107'}}/> {format(new Date(article.date), "EEEE, do MMMM, yyyy")}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <RoomOutlinedIcon style={{color:'#52b107'}}/>
            {" " + article.venue}
          </Typography><br/>
          <Typography variant="body2" color="textSecondary" component="p">
          {article.description}
          </Typography>
        </CardContent>
      {isMember && (
      <CardActions disableSpacing='true'>
        <Link to={`event/edit/${article._id}`}>
      <IconButton>
        <EditOutlinedIcon style={{ color: green[500] }} />
      </IconButton>
      </Link>
      <IconButton onClick={() => handleDelete(article._id)}>
        <DeleteOutlinedIcon style={{ color: red[400] }} />
      </IconButton>
      </CardActions>
      )}
          </Card>
      </Grid>
  );
}
