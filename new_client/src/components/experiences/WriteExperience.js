import React, { useState, useEffect, useRef } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Grid, Typography, Box, Button, TextField, FormControl,
        RadioGroup, FormLabel, FormControlLabel, Radio  } from "@material-ui/core";
import "../auth/Error.css";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
const EDITTOR_HOLDER_ID = 'editorjs';

const WriteExperience = (props) => {
    // const authenticatedAxios = useAuthenticatedAxios();

    const ejInstance = useRef();
	const [editorData, setEditorData] = useState("");

    useEffect(() => {
		if (!ejInstance.current) {
			initEditor();
		}
		return () => {
			ejInstance.current.destroy();
			ejInstance.current = null;
		}
	}, []);

    const initEditor = () => {
		const editor = new EditorJS({
		//   readOnly: true,
		  holder: EDITTOR_HOLDER_ID,
		  logLevel: "ERROR",
		  data: editorData,
          placeholder: "type here...",
		  onReady: () => {
			ejInstance.current = editor;
		  },
		  onChange: () => {
			editor.save().then((outputData) => {
				setEditorData(outputData);
			}).catch((error) => {
				console.log(error);
			})
		  },
		  autofocus: true,
		  tools: {
			header: Header,
		  }, 
		});
	};
    
    return (
        <React.Fragment>
            <Box p={1} m={2}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                style={{ color: "#52b107" }}
                                gutterBottom
                            >
                            Write Experience
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                placeholder="Your Name"
                                label="Enter Your Name*" 
                                id="fullWidth" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                placeholder="Company/Org Name"
                                label="Enter Company/Org Name*"
                                InputProps={{
                                    style: { width: `${300}px` },
                                }}
                                id="fullWidth" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                placeholder="Year"
                                label="Enter Year*"
                                InputProps={{
                                    style: { width: `${300}px` },
                                }}
                                id="fullWidth" />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Role Type:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="internship"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="internship" control={<Radio />} label="Internship" />
                                <FormControlLabel value="fte" control={<Radio />} label="Full Time" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormLabel id="">Write your experience here:</FormLabel>
                            <div style={{width: "100%", backgroundColor: "#fffaed", borderRadius: "5px"}} id={EDITTOR_HOLDER_ID}></div>
                            {/* {JSON.stringify(editorData)} */}
                        </Grid>
                        <Grid item xs={12} >
                            <Button type="submit" 
                                variant="outlined"
                                color="primary"
                                className="btn btn-primary">
                                    Submit Experience
                            </Button>
                        </Grid>
                        
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    userID: state.auth.userID,
    token: state.auth.token,
    username: state.auth.username,
});

export default withRouter(connect(mapStateToProps)(WriteExperience));