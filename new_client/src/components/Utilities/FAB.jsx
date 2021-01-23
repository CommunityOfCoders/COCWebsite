import { Fab, Grid, Tooltip } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

const FAB = ({ isAuthenticated, gotoLink, tooltipTitle }) => {
  let addFab = <div></div>;

  if (isAuthenticated) {
    addFab = (
      <Grid item style={{ position: "fixed", right: "50px", bottom: "25px" }}>
        <Link to={gotoLink} style={{ color: "white" }}>
          <Tooltip title={tooltipTitle} aria-label="add" arrow>
            <Fab color="secondary">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Link>
      </Grid>
    );
  }

  return addFab;
};

export default FAB;
