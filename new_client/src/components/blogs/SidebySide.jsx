import { Container, Badge, Grid, Box, TextField } from "@material-ui/core";
import React from "react";
import { markdownRender, sanitizeHTML } from "./utils";
let marked = require("marked");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: "",
    };
  }

  updateMarkdown(markdown) {
    this.setState({ markdown });
  }

  render() {
    var inputStyle = {
      width: "40vw",
      height: "67vh",
      marginRight: "auto",
      padding: "10px",
    };
    var outputStyle = {
      width: "40vw",
      height: "67vh",
      backgroundColor: "#DCDCDC",
      marginRight: "auto",
      padding: "10px",
      overflow: "scroll",
    };

    return (
      <Grid container>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: "4" }}>
          <h4 style={{ textAlign: "center" }}>Markdown Input</h4>
          <Box style={inputStyle}>
            <TextField
              value={this.state.markdown}
              onChange={(e) => {
                this.updateMarkdown(e.target.value);
              }}
              fullWidth
              multiline
              variant="outlined"
              rows={19}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: "4" }}>
          <h4 style={{ textAlign: "center" }}>Markdown Preview</h4>
          <div
            style={outputStyle}
            dangerouslySetInnerHTML={markdownRender(
              sanitizeHTML(this.state.markdown)
            )}
          />
        </Grid>
      </Grid>
    );
  }
}
