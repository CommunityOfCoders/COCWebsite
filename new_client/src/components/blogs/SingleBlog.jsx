import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { green, red } from "@material-ui/core/colors";
import { calculateReadingTime } from "./utils";

export default function SingleBlog({
  article,
  handleVisibility,
  handleDelete,
}) {
  return (
    <Grid item xs={6} key={article._id}>
      <Card>
        <CardHeader
          title={article.blogTitle}
          action={
            handleVisibility(article.authorID) && (
              <React.Fragment>
                <Link to={`blog/edit/${article._id}`}>
                  <IconButton>
                    <EditOutlinedIcon style={{ color: green[500] }} />
                  </IconButton>
                </Link>
                <IconButton onClick={() => handleDelete(article._id)}>
                  <DeleteOutlinedIcon style={{ color: red[400] }} />
                </IconButton>
              </React.Fragment>
            )
          }
          subheader={`by ${article.author}`}
        />
        <CardContent>
          {/* <Typography> */}
          <p>Date - {format(new Date(article.date), "do MMMM, yyyy")}</p>{" "}
          <p>
            Estimated reading time - {calculateReadingTime(article.blogContent)}
          </p>
          {/* </Typography> */}
        </CardContent>
        <CardActions>
          <Grid container spacing={4} justify="flex-end">
            <Grid item xs={4}>
              <Button color="primary">
                <Link to={`blogs/${article._id}`}>Read More</Link>
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
