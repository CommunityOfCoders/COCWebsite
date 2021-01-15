import React from "react";
import "./Banner.scss";
import { Button } from "@material-ui/core";

function Banner({ isMember, setShowModal }) {
  return (
    <section className="Banner">
      <div className="parallax_events"></div>
      <div className="banner-center">Events</div>
      {isMember && (
        <div className="banner-text">
          <Button variant="contained" onClick={() => setShowModal(true)}>
            CREATE EVENT
          </Button>
        </div>
      )}
    </section>
  );
}

export default Banner;
