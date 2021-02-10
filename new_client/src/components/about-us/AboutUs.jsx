import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import COC from "../Utilities/COC";
import Title from "../Utilities/Title";
import GenericCard from "./GenericCard";
import Workshops from "../assets/photo_11.webp";
import Discussions from "../assets/photo_12.webp";
import Projects from "../assets/Tips-for-Making-Side-Projects.webp";
import C_WS from "../assets/C_WS.webp";
import CP from "../assets/CP.webp";
import Inheritance from "../assets/Inheritance.webp";
import GenericDetails from "./GenericDetails";
import GSes from "../assets/coc-gses.webp";
import Members from "../assets/coc-members.webp";

import "./AboutUs.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eee",
    padding: "0 30px",
    margin: "0 5px",
  },
  paragraph: {
    fontSize: "1.2rem",
  },
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <>
      <div className="about-us-parallax" />
      <Box className={classes.root}>
        <Grid container spacing={2} alignContent="center" justify="center">
          <Grid item xs={12}>
            <Title>Who we are</Title>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.paragraph}>
              For those who need mentoring and help, for those who need a
              collaborative environment where they can learn from friendly and
              familiar faces, and for those who want to be good software
              engineers and help others achieve the same, the Community of
              Coders was formed.
            </p>
            <p className={classes.paragraph}>
              {" "}
              Initially, there was no planned working model, no strategies and
              no blueprints to rely on. But there was a vision: to build a
              community that would continue to bring out the best within each
              individual, regardless of age or stream. The dots somehow
              connected. That's where the journey began, and since then it has
              been getting better, with the seniors always being there to help
              us grow.
            </p>{" "}
            <p className={classes.paragraph}>
              {" "}
              Currently in its fourth year, <COC /> is a student-run
              organization aimed at cultivating and nurturing talents in the
              fields of programming and software development, through community
              bonding, peer discussions, and active cooperation with seniors. We
              feel extremely grateful to <COC /> for the way in which we were
              introduced to it. It is a satisfying experience working with other
              members for organising workshops for our juniors, which leads them
              to explore different aspects of programming. We learnt from our
              experience in <COC /> that how and what we learn can also be
              shaped by the people we are surrounded by.
            </p>
            <p className={classes.paragraph}>
              The best and most innovative software engineers, data scientists,
              and Competitive Programming experts all started from somewhere! We
              welcome members of all skill levels and fields, ranging from
              complete beginner developers to the most seasoned experts. Our
              welcoming community is here to help you if you’re new to the world
              of computer science! Whether you need help with an assignment,
              want some advice about your career, or simply want to learn more
              about the field, our friendly community members can help point you
              in the right direction. No matter what your current programming
              experience is or whether you’re planning on adopting a specific
              domain or not, there’s a place for you here at Community Of
              Coders.
            </p>
          </Grid>
          <Grid item xs={12}>
            <Title>What we do</Title>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.paragraph}>
              We prepare all our juniors to face the challenges of the outside
              world, by introducing them to the necessities of the outside
              World. Have a look at some of the work that <COC /> does:
            </p>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <GenericCard
                  imgSrc={Workshops}
                  title={"Interactive Workshops"}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <h5>Interactive Workshops</h5>
                <br />
                <p className={classes.paragraph}>
                  The workshops conducted by <COC /> are great starters for
                  learning something new. The community always comes up with
                  initiatives to help novices of the field to gain confidence to
                  face the competitive world of programming. The seniors are
                  always there to hold the hands of their juniors - especially
                  freshers - and pave the way for them by providing a very
                  friendly environment to learn and grow, through various
                  workshops, events, and seminars.
                </p>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <h5>Engaging Discussions</h5>
                <br />
                <p className={classes.paragraph}>
                  At <COC />, we have always relied on the concept of teamwork.
                  It is our strong belief that together, we can achieve
                  anything. A bunch of people with different ideas can come
                  together to discuss the limitless possibilites that they can
                  achieve. Discussions are a strong point to engage the mind. We
                  are sure, that at <COC />, you will always find people who
                  will listen to you, and correct you if you tread the wring
                  path.
                </p>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <GenericCard
                  imgSrc={Discussions}
                  title={"Engaging Discussions"}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <GenericCard imgSrc={Projects} title={"Project building"} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <h5>Project Building</h5>
                <br />
                <p className={classes.paragraph}>
                  A Software Engineer needs to learn several things in their
                  lifetime, but how can <b>YOU</b>, who knows a lot about
                  something, show it to others? Through your{" "}
                  <code>projects</code>. Only when people build stuff do they
                  realize the significance of learning stuff, and project
                  building is the place where theory meets practice. <COC />{" "}
                  hosts a plethora of workshops, like the{" "}
                  <b>Web Development Workshop</b>, or the <b>Cloud Workshop</b>,
                  that give you a hands-on approach to the theoretical
                  knowledge.
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Title>
              The Origins of <COC />
            </Title>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.paragraph}>
              <span style={{ color: "#52B107" }}>C</span>ommunity Of{" "}
              <span style={{ color: "#52B107" }}>C</span>oders was founded in
              the year 2016, under the guidance of our veterans and the General
              Secretaries at that time: <b>Ankitesh Gupta, Dharin Parekh</b> and{" "}
              <b>Himanshu Maheshwari</b>. Since then, CoC is always committed to
              conducting workshops, organizing events and holding discussions
              solely aimed at improving our peers.
            </p>
          </Grid>
          <Grid item xs={12}>
            <Title>Some of our flagship events are...</Title>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4}>
                <GenericDetails imgSrc={Inheritance} title="Inheritance" />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <GenericDetails imgSrc={CP} title="CP Workshop" />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <GenericDetails imgSrc={C_WS} title="C Workshop" />
              </Grid>
              <Grid item xs={12}>
                To view more of our upcoming events, head over{" "}
                <Link to="/events">here</Link>.
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Title>Meet the Team</Title>
            {/* <Grid container> */}
            {/* <Grid item xs={0} md={4} lg={4} /> */}
            <div style={{ textAlign: "center" }}>
              {/* <Grid item xs={12} md={6} lg={6}> */}
              <img src={GSes} style={{ width: "50%" }} />
              <br />
              <Typography variant="h5">
                General Secretaries - Saif Kazi, Shubhankar Gupta
              </Typography>
              {/* </Grid> */}
            </div>
            <div style={{ textAlign: "center" }}>
              {/* <Grid item xs={12} md={6} lg={6}> */}
              <img src={Members} style={{ width: "50%" }} />
              <br />
              <Typography variant="h5">The Core Committee - 2020-21</Typography>
              {/* </Grid> */}
            </div>
            {/* <Grid item xs={12} md={6} lg={6}><img src={Members} style={{ width: "90%" }} /></Grid> */}
            {/* <img src={Members} /> */}
            {/* </Grid> */}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Sounds good?</Typography>
          </Grid>
          <Grid item xs={12}>
            Want to be a part of us? Head over to register{" "}
            <Link to="/signup">here</Link>.
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
