import { Button, Tooltip } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const RegisterButton = ({
  isAuthenticated,
  isUserRegistered,
  handleRSVP,
  eventID,
}) => {
  if (!isAuthenticated) {
    return (
      <Tooltip title="You need to login first!">
        <Link to="/signin">
          <Button variant="contained" color="primary">
            {!isUserRegistered ? "Register" : "Unregister"}
          </Button>
        </Link>
      </Tooltip>
    );
  }
  return (
    <Button
      variant="contained"
      color={!isUserRegistered ? "primary" : "secondary"}
      onClick={() => {
        handleRSVP(eventID, isUserRegistered);
      }}
    >
      {!isUserRegistered ? "Register" : "Unregister"}
    </Button>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(RegisterButton);
