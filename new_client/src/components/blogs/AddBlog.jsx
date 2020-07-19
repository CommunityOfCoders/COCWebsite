import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { TextField, Button, Grid } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Editor from "./Editor";
import axios from "axios";

export default function AddBlog() {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogContent, setBlogContent] = useState("**Hello world!!!**");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDataSubmit = async () => {
    const blog = {
      blogTitle: blogTitle,
      blogContent: blogContent,
      date: selectedDate,
      author: blogAuthor,
    };
    console.log(blog);
    const res = await axios.post(
      process.env.REACT_APP_API + "/blogs/new",
      JSON.stringify(blog),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
  };

  return (
    <Container maxWidth="md" style={{ backgroundColor: "white" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            label="Enter your username"
            value={blogAuthor}
            onChange={(e) => setBlogAuthor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Enter a title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Editor content={blogContent} setContent={setBlogContent} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDataSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
