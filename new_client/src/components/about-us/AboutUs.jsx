import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import COC from "../Utilities/COC";
import Title from "../Utilities/Title";

export default function AboutUs() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={0} md={4} lg={4} />
        <Grid item xs={12} md={8} lg={8}>
          <Typography variant="h2">
            About <COC />{" "}
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
              Interactive Workshops
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              Engaging Discussions
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              Project building
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
          Secretaries at that time: _____________ . Since then, CoC is always
          committed to conducting workshops, organizing events and holding
          discussions solely aimed at improving our peers.
        </Grid>
        <Grid item xs={12}>
          <Title>Some of our flagship events</Title>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              Inheritance
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              Competitive Programming Workshop
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              C Workshop
            </Grid>
            <Grid item xs={12}>
              To view more of our upcoming events, head over{" "}
              <Link to="/events">here</Link>.
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          Sounds good? Want to be a part of us? Head over to register{" "}
          <Link to="/signup">here</Link>
        </Grid>
      </Grid>
    </Container>
  );
}
