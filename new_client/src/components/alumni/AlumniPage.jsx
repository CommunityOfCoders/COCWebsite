import React from "react";
import {
  Box,
  Grid,
  Slide,
  Tabs,
  Tab,
  ThemeProvider,
  makeStyles,
  responsiveFontSizes,
  createMuiTheme,
  useMediaQuery,
} from "@material-ui/core";
import PropTypes from "prop-types";

import AlumnusCard from "./AlumnusCard";
import MobileMenu from "./MobileMenu";

const responsiveFonts = responsiveFontSizes(createMuiTheme());

const years = [2020, 2019, 2018, 2017, 2016];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "80%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    "&:hover": {
      color: "#3B377C",
      opacity: 1,
    },
    "&$selected": {
      fontWeight: theme.typography.fontWeightMedium,
      color: "#3B377C",
    },
    "&:focus": {
      color: "#3B377C",
    },
  },
  tabLabel: {
    fontSize: theme.typography.h5.fontSize,
  },
}));

const dummyAlumni = [];
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
  dummyAlumni.push({
    fullName: "Patrick Jane",
    professionalTitle: "Consultant",
    company: "FBI",
    imageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    socialUrls: new Map([
      ["personal", "https://www.google.com/"],
      ["facebook", "https://www.facebook.com/"],
      ["github", "https://github.com"],
      ["instagram", "https://www.instagram.com/?hl=en"],
      ["linkedin", "https://www.linkedin.com/"],
      ["twitter", "https://twitter.com/?lang=en"],
    ]),
    graduationYear: 2017 + Math.ceil(i / 4),
  })
);

export default function AlumniPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const largerScreen = useMediaQuery("(min-width:600px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={responsiveFonts}>
      <Grid
        container
        direction="row"
        className={classes.root}
        justify="space-evenly"
      >
        {largerScreen ? (
          <Grid item xs={2}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Year of Graduation"
              className={classes.tabs}
              indicatorColor="primary"
            >
              {years.map((year, index) => (
                <Tab
                  key={index}
                  className={classes.tab}
                  label={<span className={classes.tabLabel}>{year}</span>}
                  {...a11yProps(year)}
                />
              ))}
            </Tabs>
          </Grid>
        ) : (
          <MobileMenu
            value={value}
            setValue={setValue}
            options={years}
            label={"Year"}
          />
        )}

        <Grid item xs={10}>
          {years.map((year, index) => (
            <TabPanel key={year} value={value} index={index}>
              <Grid container justify="space-evenly" spacing={4}>
                {dummyAlumni
                  .filter((alumnus) => alumnus.graduationYear === year)
                  .map((alumnus, index) => (
                    <Slide
                      key={index}
                      direction="up"
                      in={true}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Grid item>
                        <AlumnusCard alumnus={alumnus} />
                      </Grid>
                    </Slide>
                  ))}
              </Grid>
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
