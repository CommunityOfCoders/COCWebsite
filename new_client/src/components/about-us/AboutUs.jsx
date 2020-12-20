import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
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

export default function AboutUs() {
  return (
    <Container maxWidth="lg" style={{ backgroundColor: "#eee" }}>
      <Grid container spacing={3}>
        <Grid item xs={0} md={4} lg={4} />
        <Grid item xs={12} md={8} lg={8}>
          <Typography variant="h2">
            <u>
              About <COC />{" "}
            </u>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Title>What do we do?</Title>
        </Grid>
        <Grid item xs={12}>
          We prepare all our juniors to face the challenges of the outside
          world, by introducing them to the necessities of the{" "}
          <b>Outside World</b>
        </Grid>
        <Grid item xs={12}>
          <Title>How do we do this?</Title>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <GenericCard imgSrc={Workshops} title={"Interactive Workshops"} />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <GenericCard
                imgSrc={Discussions}
                title={"Engaging Discussions"}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <GenericCard imgSrc={Projects} title={"Project building"} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Title>Who are we?</Title>
        </Grid>
        <Grid item xs={12}>
          We are a bunch of individuals, who have been passed down the baton
          from our seniors. We received similar guidance from our seniors, and
          we decided that it is upon us to teach our juniors as well, so that
          when they go out in the broader, bigger scheme of things, they are
          prepared.
        </Grid>
        <Grid item xs={12}>
          <Title>
            Since when is <COC /> ?
          </Title>
        </Grid>
        <Grid item xs={12}>
          <span style={{ color: "#52B107" }}>C</span>ommunity Of{" "}
          <span style={{ color: "#52B107" }}>C</span>oders was founded in the
          year 2016, under the guidance of our veterans and the General
          Secretaries at that time: <b>Ankitesh Gupta, Dharin Parekh</b> and{" "}
          <b>Himanshu Maheshwari</b>. Since then, CoC is always committed to
          conducting workshops, organizing events and holding discussions solely
          aimed at improving our peers.
        </Grid>
        <Grid item xs={12}>
          <Title>Some of our flagship events are...</Title>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <GenericCard imgSrc={Inheritance} title="Inheritance" />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <GenericCard imgSrc={CP} title="CP Workshop" />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <GenericCard imgSrc={C_WS} title="C Workshop" />
            </Grid>
            <Grid item xs={12}>
              To view more of our upcoming events, head over{" "}
              <Link to="/events">here</Link>.
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Title>Sounds good?</Title>
        </Grid>
        <Grid item xs={12}>
          Want to be a part of us? Head over to register{" "}
          <Link to="/signup">here</Link>.
        </Grid>
      </Grid>
    </Container>
  );
}
