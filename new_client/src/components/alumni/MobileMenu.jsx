import React from 'react'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  menuItem: {
    width: "100vw",
    justifyContent: "center",
    '&:hover': {
      color: theme.palette.secondary.dark,
      opacity: 1,
    },
    '&$selected': {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.secondary.dark
    },
    '&:focus': {
      color: theme.palette.secondary.dark,
    },
  },
  listItem: {
    textAlign: "center",
  },
}))


export default function MobileMenu({value, setValue, options, label}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, newValue) => {
    setValue(newValue);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12}>
            <List component="nav" aria-label={`Select ${label}`}>
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label={label}
                onClick={handleClickListItem}
              >
                <ListItemText
                  primary={options[value]}
                  primaryTypographyProps={{
                    variant: "h4",
                  }}
                  secondary={label}
                  className={classes.listItem}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  selected={index === value}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  className={classes.menuItem}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
  )
}

MobileMenu.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string
}