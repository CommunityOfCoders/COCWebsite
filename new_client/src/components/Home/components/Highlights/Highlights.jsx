import React from "react";
import Highlight from "./Highlight/Highlight";
import "./Highlights.scss";

import learn from "../../../assets/learn.webp";
import collaborate from "../../../assets/collaborate.webp";
// import network from 'assets/home/highlights/network.jpg';

const descriptions = [
  // Learn
  `Whether you’ve never even seen a line of code before or you’ve written
  full-stack applications that scale, we’ve got you covered. With workshops, competitive coding challenges, and more, there’s plenty of ways to gain
  new skills and level up your career. Our exciting events, ranging from
  beginner to advanced, will get you up and running with your first
  website or how to deploy your application on the cloud.`,

  // Collaborate
  `Teamwork makes the dream work! Find team members to work on a project
  with, form your winning hackathon team, or practice mock interviewing
  with others and score your dream job. Do you love making websites/ apps? We've got you covered. 
  Do you wish to explore the path of Competitive Programming? 
  We've got mentors that can help you get on track, ready to achieve your dreams.`,

  // Network
];

const Highlights = () => {
  return (
    <section className="Highlights">
      {/* Learn */}
      <Highlight
        containerClass="highlight-learn"
        title="Learn"
        description={descriptions[0]}
        linkUrl="/events"
        linkText="Browse Events"
        image={learn}
        imageAlt="Learn"
        backgroundColor="#FFF9EE"
      />

      {/* Collaborate */}
      <Highlight
        containerClass="highlight-collaborate"
        title="Collaborate"
        description={descriptions[1]}
        linkUrl="/about"
        linkText="See What We Do"
        image={collaborate}
        imageAlt="Collaborate"
        backgroundColor="#EEFFF0"
      />

      {/* Network */}
      {/* <Highlight
        containerClass="highlight-network"
        title="Network"
        description={descriptions[2]}
        linkUrl="/join"
        linkText="Join The Community"
        // image={network}
        imageAlt="Network"
        backgroundColor="#EEF7FF"
      /> */}
    </section>
  );
};

export default Highlights;
