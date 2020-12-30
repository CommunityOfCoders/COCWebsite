import { Container, Badge, Grid, Box, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { markdownRender, sanitizeHTML } from "./utils";

function SideBySide() {
  const [markdown, setMarkdown] = useState("");

  const updateMarkdown = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  const inputStyle = {
    width: "40vw",
    height: "67vh",
    marginRight: "auto",
    padding: "10px",
  };
  const outputStyle = {
    width: "40vw",
    height: "67vh",
    backgroundColor: "#DCDCDC",
    marginRight: "auto",
    padding: "10px",
    overflow: "scroll",
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6} style={{ marginTop: "4" }}>
        <h4 style={{ textAlign: "center" }}>Markdown Input</h4>
        <Box>
          <TextField
            value={markdown}
            onChange={(e) => {
              updateMarkdown(e.target.value);
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
        <Box
          dangerouslySetInnerHTML={markdownRender(sanitizeHTML(markdown))}
        />
      </Grid>
    </Grid>
  );
}

export default SideBySide;