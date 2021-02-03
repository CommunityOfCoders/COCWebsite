import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  ThemeProvider,
  Typography,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core";

import Topic from "./Topic";
import Spinner from "../spinner/Spinner";

const colors = [
  "rgba(188, 51, 51, 1)",
  "rgba(52, 131, 61, 1)",
  "rgba(105,1,38,1)",
  "rgba(0, 1, 106, 1)",
  "rgba(188, 51, 51, 1)",
  "rgba(122,88,255,1)",
];

const responsiveFonts = responsiveFontSizes(createMuiTheme());

export default function ResourcePage() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const { data: topics } = await axios.get(
          process.env.REACT_APP_API + "/topics"
        );
        setTopics(topics);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTopics();
  }, []);

  return (
    <ThemeProvider theme={responsiveFonts}>
      <Container maxWidth="lg">
        <Typography align="center" variant="h2" component="h2" gutterBottom>
          Resources
        </Typography>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box p={4}>
            <Grid container spacing={8}>
              {topics
                ? topics.map((topic, index) => (
                    <Topic
                      key={index}
                      name={topic.name}
                      resources={topic.resources}
                      color={colors[index % colors.length]}
                    />
                  ))
                : "Your mind, and your calm"}
            </Grid>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
