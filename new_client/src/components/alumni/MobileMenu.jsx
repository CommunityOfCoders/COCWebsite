import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    width: "90vw",
    justifyContent: "center",
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
  listItem: {
    textAlign: "center",
  },
  listNav: {
    marginTop: "1rem",
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
  },
}));

function MobileMenu({ value, setValue, options, label }) {
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
    <Grid item xs={10}>
      <List
        component="nav"
        aria-label={`Select ${label}`}
        className={classes.listNav}
      >
        <ListItem
          button
          dense
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label={label}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={
              <>
                {options[value]} <ExpandMoreIcon />{" "}
              </>
            }
            primaryTypographyProps={{
              variant: "h5",
            }}
            secondary={label}
            className={classes.listItem}
          ></ListItemText>
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
  );
}

MobileMenu.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
};

export default MobileMenu;
