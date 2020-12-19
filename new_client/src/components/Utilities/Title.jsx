import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

function Title(props) {
  return (
    <Typography variant="h3" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
