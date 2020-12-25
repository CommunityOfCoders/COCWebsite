// @flow
import React from 'react';
import Highlight from './Highlight/';
import './Highlights.scss';

import learn from 'assets/home/highlights/learn.jpg';
import collaborate from 'assets/home/highlights/collaborate.jpg';
import network from 'assets/home/highlights/network.jpg';

const descriptions = [
  // Learn
  `Whether you’ve never even seen a line of code before or you’ve written
  full-stack applications that scale, we’ve got you covered. With tech
  talks, workshops, challenges, and more, there’s plenty of ways to gain
  new skills and level up your career. Our exciting events, ranging from
  beginner to advanced, will get you up and running with your first
  website or how to deploy and auto-scale your application on the cloud.`,

  // Collaborate
  `Teamwork makes the dream work! Find team members to work on a project
  with, form your winning hackathon team, or practice mock interviewing
  and whiteboarding with others and score your dream job.`,

  // Network
  `The Computer Science Club is built upon the foundations of diversity and
  inclusivity. Connect with people from all walks of life and grow your
  network with some of the brightest people in the industry.`,
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
      <Highlight
        containerClass="highlight-network"
        title="Network"
        description={descriptions[2]}
        linkUrl="/join"
        linkText="Join The Community"
        image={network}
        imageAlt="Network"
        backgroundColor="#EEF7FF"
      />
    </section>
  );
};

export default Highlights;
