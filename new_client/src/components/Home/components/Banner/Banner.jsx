import React from "react";
import "./Banner.scss";
import COC from "../../../assets/COC.webp";

const Banner = () => {
  return (
    <section className="Banner">
      <div className="parallax"></div>
      <div className="banner-center">
        <img src={COC} style={{ width: 60, height: 60 }} alt="COC Logo PNG" />{" "}
        Community of Coders
      </div>
      <div className="banner-text">
        &nbsp; IMAGINE &nbsp; | &nbsp; BELIEVE &nbsp; | &nbsp; ACHIEVE &nbsp;
      </div>
    </section>
  );
};

export default Banner;
