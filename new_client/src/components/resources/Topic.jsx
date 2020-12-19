import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Resource from "./Resource";

const useTopicStyles = makeStyles({
  topic: {
    width: "100%",
    color: "rgba(255, 255, 255, 0.95)",
    marginTop: "0.5%",
    marginBottom: "0.5%",
  },
});

export default function Topic({ name, resources, color }) {
  const classes = useTopicStyles();
  return (
    <ExpansionPanel
      xs={12}
      style={{ backgroundColor: color }}
      className={classes.topic}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography component="h4" variant="h4">
          {name}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container justify="space-around" spacing={4}>
          {resources &&
            resources.map((resource, index) => (
              <Resource key={index} name={resource.name} link={resource.link} />
            ))}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
