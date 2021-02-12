import React from "react";
import {
  Container,
  Grid,
  TextField,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  search: {
    padding: "20px",
    borderRadius: 8,
  },
}));

const Search = (props) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            type="search"
            size="small"
            fullWidth
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onSearch}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;
