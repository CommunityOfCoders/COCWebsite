// @flow
import React from 'react';
import './Description.scss';
import image from 'assets/home/linkedin.jpg';

const Description = (props) => {
  return (
    <section className="Description">
      <div className="description-top">
        <h2 className="description-heading">Reach New Heights</h2>
        <OpeningParagraph width={props.width} />
        <div className="description-image-container">
          <img
            className="description-image"
            src={image}
            alt="Club members visiting LinkedIn during a club company visit."
          />
        </div>
        {/* eslint-disable-next-line */}
        <div className="description-mission" role="text">
          <h3 className="description-mission-heading">Our Mission:</h3>
          <MissionContent width={props.width} />
        </div>
      </div>
      <div className="description-main">
        <p>
          The Computer Science Club offers a multitude of fun, exciting, and
          beginner-friendly events designed to enrich and grow your
          understanding of in-demand skills, a community of like-minded students
          and alumni ready to tackle anything that comes their way, and plenty
          of opportunities for members to network and collaborate on projects
          and hackathons.
        </p>

        <p>
          Whether you&apos;re looking to jumpstart your career in Software
          Engineering, Data Science, Cybersecurity, UX/UI Design, and many other
          related fields, or just want to drop by to chill and make some new
          friends, there&apos;s something for everyone here at the Brooklyn
          College Computer Science Club.
        </p>
      </div>
    </section>
  );
};

const OpeningParagraph = ({ width }) => {
  if (width < 700) {
    return (
      <p className="description-opening-paragraph">
        The Brooklyn College Computer Science Club is a community that enables
        students interested in technology to learn and grow together.
      </p>
    );
  } else {
    return (
      // eslint-disable-next-line
      <p className="description-opening-paragraph" role="text">
        The Brooklyn College Computer Science Club is a community that
        <br />
        enables students interested in technology to learn and grow together.
      </p>
    );
  }
};

const MissionContent = ({ width }) => {
  // The line doesn't evenly break until ~716px so we need to up it from 700px
  if (width < 720) {
    return (
      <p className="MissionContent">
        To help students interested in technology to meet other
        like&#8209;minded students and to help advance their careers.
      </p>
    );
  } else {
    return (
      // eslint-disable-next-line
      <p className="MissionContent" role="text">
        To help students interested in technology to meet other
        <br />
        like&#8209;minded students and to help advance their careers.
      </p>
    );
  }
};

export default Description;
