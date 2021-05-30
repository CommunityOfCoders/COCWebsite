import { Box, Grid, Typography } from "@material-ui/core";
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
import Banner from "./Banner";
import "./AboutUs.css";
import Image from "./Image";
import Details from "./details";

export default function AboutUs() {
  const details = Details;
  const arr = [];

  for (let i = 0; i < 30; i += 2) {
    arr.push(
      <div class="com-mem">
        <Image class="member" name={details[i].name} img={details[i].img} />
        <Image
          class="member"
          name={details[i + 1].name}
          img={details[i + 1].img}
        />
      </div>
    );
  }

  return (
    <>
      <Banner />
      <Box className="root">
        <Grid container spacing={2} alignContent="center" justify="center">
          <Grid item xs={12}>
            <Title>Who We Are</Title>
          </Grid>
          <Grid item xs={12}>
            <Typography className="paragraph">
              {" "}
              Initially, there was only a vision: to build a community that
              would continue to bring out the best within each individual,
              regardless of year or stream. That's where the journey began, and
              since then we have been growing.
            </Typography>{" "}
            <br />
            <Typography className="paragraph">
              Currently in its fourth year, <COC /> is a student-run
              organization aimed at cultivating and nurturing talents in the
              fields of programming and software development, through a
              collaborative community, peer discussions, mentorship and active
              cooperation with seniors.
            </Typography>
            {/* <Typography className="paragraph">
              {" "}
              We feel extremely grateful to <COC /> for the way in which we were
              introduced to it. It is a satisfying experience working with other
              members for organising workshops for our juniors, which leads them
              to explore different aspects of programming. We learnt from our
              experience in <COC /> that how and what we learn can also be
              shaped by the people we are surrounded by.
            </Typography> */}
          </Grid>
          <Grid item xs={12}>
            <Title>What We Do</Title>
          </Grid>
          <Grid item xs={12}>
            <Typography className="paragraph">
              The best software engineers, data scientists, and competitive
              programming experts all started from somewhere! We welcome members
              of all skill levels and fields, ranging from complete beginners to
              seasoned experts. <COC /> is here to help you if you’re new to the
              world of Computer Science!
            </Typography>
            <br />
            <Typography className="paragraph">
              Whether it's an assignment, some advice about your career, or you
              simply want to learn more about a field, our friendly community
              members can help point you in the right direction. No matter what
              your current programming experience is or whether you’re planning
              on adopting a specific domain or not, there’s a place for you here
              at Community Of Coders.
            </Typography>
            <Typography className="paragraph">
              We prepare all our juniors to face the challenges of the outside
              world, by introducing them to the necessities of the outside
              world. Have a look at some of the work that <COC /> does!
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            spacing={3}
            style={{ paddingTop: "4rem" }}
            alignItems="center"
          >
            <Grid item container xs={12}>
              <Grid item xs={12} md={6} lg={6}>
                <GenericCard
                  imgSrc={Workshops}
                  title={"Interactive Workshops"}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <h4>Interactive Workshops</h4>
                <br />
                <Typography className="paragraph-side">
                  Workshops conducted by <COC /> are great starters for learning
                  something new. The community always comes up with initiatives
                  to help novices in the field to gain confidence to face the
                  competitive world of programming. Seniors are always there to
                  hold the hands of their juniors - especially freshers - and
                  pave the way for them by providing a very friendly environment
                  to learn and grow, through various workshops, events and
                  seminars.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              direction="row-reverse"
              alignItems="center"
            >
              <Grid item xs={12} md={6} lg={6}>
                <GenericCard
                  imgSrc={Discussions}
                  title={"Engaging Discussions"}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <h4>Engaging Discussions</h4>
                <br />
                <Typography className="paragraph-side">
                  At <COC />, we have always relied on the concept of teamwork.
                  It is our strong belief that together, we can achieve
                  anything. A bunch of people with different ideas can come
                  together to discuss the limitless possibilites that they can
                  achieve. Discussions are a strong point to engage the mind.
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} alignItems="center">
              <Grid item xs={12} md={6} lg={6}>
                <GenericCard imgSrc={Projects} title={"Project building"} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <h4>Project Building</h4>
                <br />
                <Typography className="paragraph-side">
                  Only when people build <em>stuff</em> do they realize the
                  significance of <em>learning</em> stuff, and project building
                  is the place where theory meets practice. <COC /> hosts a
                  plethora of workshops, like the{" "}
                  <b>Web Development Workshop</b> and the <b>Cloud Workshop</b>,
                  that give you a hands-on approach to theoretical knowledge
                  used in practice.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Title>
              The Origins of <COC />
            </Title>
          </Grid>
          <Grid item xs={12}>
            <Typography className="paragraph">
              <span style={{ color: "#52B107" }}>C</span>ommunity Of{" "}
              <span style={{ color: "#52B107" }}>C</span>oders was founded in
              the year 2016, under the guidance of our veterans and the General
              Secretaries at that time: <b>Ankitesh Gupta, Dharin Parekh</b> and{" "}
              <b>Himanshu Maheshwari</b>. Since then, <COC /> is always
              committed to conducting workshops, organizing events and holding
              discussions aimed at improving our peers.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Title>Flagship Events</Title>
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
                <Typography variant="subtitle1" align="center">
                  To view more of our upcoming events, head over{" "}
                  <Link to="/events">here</Link>.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Title>Meet the Team</Title>
            <br />
            {/* <Grid container> */}
            {/* <Grid item xs={0} md={4} lg={4} /> */}

            <div style={{ textAlign: "center" }}>
              <Typography variant="h4">General Secretaries</Typography>
              <div class="gene-sec-cont">
                <Image
                  name="Saif Kazi"
                  img="https://res.cloudinary.com/dxleddac7/image/upload/v1622393523/Saif_Kazi_sjujcu.jpg"
                />
                <Image
                  name="Shubhankar Gupta"
                  img="https://res.cloudinary.com/dxleddac7/image/upload/v1622393522/Shubhankar_Gupta_wklcuf.jpg"
                />
              </div>
              {/* <Grid item xs={12} md={6} lg={6}> */}
              <br />
              <br />
              {/* </Grid> */}
            </div>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h4">The Core Committee - 2020-21</Typography>
              {arr.map((item) => item)}
              <br />
            </div>
            {/* <Grid item xs={12} md={6} lg={6}><img src={Members} style={{ width: "90%" }} /></Grid> */}
            {/* <img src={Members} /> */}
            {/* </Grid> */}
          </Grid>
          <Grid item xs={12} style={{ marginTop: "2rem" }}>
            <Title>Sounds good?</Title>
            <Typography align="center">
              Join us by registering <Link to="/signup">here</Link>.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
