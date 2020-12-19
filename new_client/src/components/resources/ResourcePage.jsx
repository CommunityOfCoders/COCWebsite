import React from "react";
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

const topics = [
  {
    name: "Data Structures and Algorithms",
    resources: [
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "DEF",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "GHI",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
    ],
  },
  {
    name: "Web Development",
    resources: [
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "DEF",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "GHI",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
    ],
  },
  {
    name: "App Development",
    resources: [
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "DEF",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "GHI",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
    ],
  },
  {
    name: "Introduction to Cloud",
    resources: [
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "DEF",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "GHI",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
    ],
  },
  {
    name: "Data Science",
    resources: [
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "DEF",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "GHI",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
      {
        name: "ABC",
        link: "https://www.geeksforgeeks.org/",
      },
    ],
  },
];

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
  return (
    <ThemeProvider theme={responsiveFonts}>
      <Container maxWidth="md">
        <Typography align="center" variant="h2" component="h2" gutterBottom>
          Resources
        </Typography>
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
      </Container>
    </ThemeProvider>
  );
}
