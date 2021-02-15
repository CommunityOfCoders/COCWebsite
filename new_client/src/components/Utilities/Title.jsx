import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

function Title(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h3">
        <b>{props.children}</b>
      </Typography>
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
