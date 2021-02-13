import React, { useState, useEffect } from "react";
import axios from "axios";
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

import Spinner from "../spinner/Spinner";
import AlumnusCard from "./AlumnusCard";
import MobileMenu from "./MobileMenu";

const responsiveFonts = responsiveFontSizes(createMuiTheme());

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

export default function AlumniPage() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [alumni, setAlumni] = useState([]);
  const [years, setYears] = useState([]);
  const [value, setValue] = useState(0);
  const largerScreen = useMediaQuery("(min-width:600px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getAlumni = async () => {
      try {
        const { data } = await axios.get(process.env.REACT_APP_API + "/alumni");
        // console.log(data.alumni);
        setAlumni(data);
        let years = new Set();
        data.forEach((alumnus) => years.add(parseInt(alumnus.graduationYear)));
        setYears(Array.from(years).sort((a, b) => b - a));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getAlumni();
  }, []);

  return (
    <ThemeProvider theme={responsiveFonts}>
      {isLoading ? (
        <Spinner />
      ) : (
        years.length > 0 && (
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
                    {alumni
                      .filter(
                        (alumnus) => alumnus.graduationYear === year.toString()
                      )
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
        )
      )}
    </ThemeProvider>
  );
}
