import {
  Box,
  Grid,
  Slide,
  Tabs,
  Tab,
  ThemeProvider,
  Typography,
  makeStyles,
  responsiveFontSizes,
  createMuiTheme,
  useMediaQuery
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

import AlumniCard from "./AlumniCard";
import MobileMenu from './MobileMenu'

const responsiveFonts = responsiveFontSizes(createMuiTheme());

const imgMasks = {
  circle: "circle(50% at 50% 50%)",
  bevel:
    "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
  leftPoint: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
  rightPoint: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
};

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    '&:hover': {
      color: theme.palette.secondary.dark,
      opacity: 1,
    },
    '&$selected': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.secondary.dark,
    },
  },
  tabLabel: {
    fontSize: theme.typography.h5.fontSize
  }
}));

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
            >
              {years.map((year, index) => (
                <Tab key={index} className={classes.tab} label={<span className={classes.tabLabel}>{year}</span>} {...a11yProps(year)} />
              ))}
            </Tabs>
          </Grid>
        ) : (
          <MobileMenu value={value} setValue={setValue} options={years} label={"Year"} />
        )}

        <Grid item xs={10}>
          {years.map((_, index) => (
            <TabPanel key={index} value={value} index={index}>
              <Grid container justify="center" spacing={3}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                  <Slide
                    key={index}
                    direction="up"
                    in={true}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Grid item>
                      <AlumniCard mask={imgMasks.circle} />
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
