// @flow
import React from "react";
import "./Banner.scss";
import COC from "../assets/COC.png";

const Banner = () => {
  return (
    <section className="Banner">
      <div className="banner-photo">
        <div className="parallax"></div>
        {/* <img className="photo" src={photo} alt="photo" /> */}
        <div className="banner-center">
          <img src={COC} style={{ width: 60, height: 60 }} alt="COC Logo PNG" />{" "}
          Community of Coders
        </div>
        <div className="banner-text">
          &nbsp; IMAGINE &nbsp; | &nbsp; BELIEVE &nbsp; | ACHIEVE &nbsp;
        </div>
      </div>
    </section>
  );
};

export default Banner;
