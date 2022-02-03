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
    maxWidth: 343,
    margin: "auto",
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
}));

export default function IndividualGlimpse({ imgSrc, title, albumPath }) {
  const styles = useStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={cx(styles.media, mediaStyles.root)}
        image={imgSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          to={{
            pathname: `/glimpse/${title.replace(/\s/g, "_")}`,
            state: { albumPath },
          }}
        >
          {" "}
          <Button size="small" color="primary">
            View More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
