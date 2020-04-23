import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, AppBar, Tabs, Tab, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Signup from './Signup';
import Signin from './Signin';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  container: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  }
}));

export default function Auth() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Sign Up" />
          <Tab label="Login" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Signup />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signin />
      </TabPanel>
    </div>
  );
}