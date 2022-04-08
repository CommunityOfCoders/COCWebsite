import React from "react";
import "../Utilities/Banner.scss";
import { Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Banner({ isMember }) {
  const history = useHistory();
  return (
    <section className="experienceBanner">
      <div className="parallax"></div>
      <div className="banner-center">Experiences</div>
      {isMember && (
        <div className="banner-text">
          <Box mr={2}>
            <Button
              variant="contained"
              onClick={() => {
                history.push("/manageexperiences");
              }}
            >
              Manage Experiences
            </Button>
          </Box>
          <Box ml={2}>
            <Button
              variant="contained"
              onClick={() => {
                history.push("/managecompanies");
              }}
            >
              Manage Companies
            </Button>
          </Box>
        </div>
      )}
    </section>
  );
}

export default Banner;
