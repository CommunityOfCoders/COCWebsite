import {
  Box,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import COC from "../Utilities/COC";
import Title from "../Utilities/Title";
import GenericCard from "./GenericCard";
import Workshops from "./photo_11.jpg";
import Discussions from "./photo_12.jpg";
import Projects from "./Tips-for-Making-Side-Projects.png";
import C_WS from "./C_WS.jpg";
import CP from "./CP.jpg";
import Inheritance from "./Inheritance.jpg";
import AboutUsBanner from "./about.jpeg";
import GenericDetails from "./GenericDetails";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={AboutUsBanner}
          style={{ objectFit: "fill", width: "100%", margin: "10px" }}
        />
      </div>
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
                <GenericCard
                  imgSrc={Discussions}
                  title={"Engaging Discussions"}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <GenericCard imgSrc={Projects} title={"Project building"} />
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
