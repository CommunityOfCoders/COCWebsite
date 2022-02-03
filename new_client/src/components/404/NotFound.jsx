import { Button, Container, Grid } from "@material-ui/core";
import React from "react";
import SVG from "./SVG";

export default function NotFound({ history }) {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item lg={8}>
          <SVG />
        </Grid>
        <Grid item lg={4}>
          <h1>404</h1>
          <h2>UH OH! You're lost.</h2>
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/")}
          >
            HOME
          </Button>
          <div style={{ paddingTop: 20 }}>
            If you think there should be a page here, please create an issue at{" "}
            <a href="https://github.com/CommunityOfCoders/COCWebsite">
              the website repository
            </a>
            .
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
