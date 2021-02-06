import React from "react";
import "./Description.scss";
// import image from 'assets/home/linkedin.jpg';

const Description = (props) => {
  return (
    <section className="Description" ref={props.scrollToRef}>
      {/* <div className="parallax"> */}
      <div className="description-top">
        <div className="description-mission" role="textbox">
          <h3 className="description-mission-heading">Our Mission</h3>
          <MissionContent width={props.width} />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

const MissionContent = ({ width }) => {
  // The line doesn't evenly break until ~716px so we need to up it from 700px
  if (width < 720) {
    return (
      <p className="MissionContent">
        To help students interested in the field of Computer Science to meet
        other like&#8209;minded students and to help them advance their careers.
      </p>
    );
  } else {
    return (
      // eslint-disable-next-line
      <p className="MissionContent" role="text">
        To help students interested in the field of Computer Science to meet
        other
        <br />
        like&#8209;minded students and to help them advance their careers.
      </p>
    );
  }
};

export default Description;
