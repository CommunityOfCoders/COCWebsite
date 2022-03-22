import React, { useState, useEffect, useRef } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BackButton from "../Utilities/BackButton";
import axios from "axios";

import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import "../auth/Error.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import Table from '@editorjs/table';
import ImageTool from '@editorjs/image';

const EDITTOR_HOLDER_ID = "editorjs";

const WriteExperience = (props) => {
  // const authenticatedAxios = useAuthenticatedAxios();

  const ejInstance = useRef();
  const [personName, setPersonName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [appliedYear, setAppliedYear] = useState("");
  const [roleType, setRoleType] = useState("Internship");
  const [editorData, setEditorData] = useState("");

  const [error, setError] = useState({
    personNameError: "",
    companyNameError: "",
    appliedYearError: ""
  });

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
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
        editor
          .save()
          .then((outputData) => {
            setEditorData(outputData);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      autofocus: true,
      tools: {
        header: Header,
        linkTool: LinkTool,
        raw: RawTool,
        list: {class: List,
        inlineToolbar: true,},
        code: CodeTool,
        table: Table,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file){
                const formData = new FormData();
                if (file) {
                  formData.append(
                    "expImage",
                    file,
                    file.name
                  );
                }
                const res = await axios.post(process.env.REACT_APP_API + "/interviewImageUpload", 
                  formData);
                console.log(res.data);
                return res.data;
              }
            }
          }
        }
      },
    });
  };

  const isValid = () => {
    let ret = true;
    if (personName === "") {
      setError((prevError) => ({
        ...prevError,
        personNameError: "*Person name cannot be empty",
      }));
      ret = false;
    }
    if (companyName === "") {
      setError((prevError) => ({
        ...prevError,
        companyNameError: "*Company name cannot be empty",
      }));
      ret = false;
    }
    if (appliedYear === "") {
      setError((prevError) => ({
        ...prevError,
        appliedYearError: "*Year cannot be empty",
      }));
      ret = false;
    }
    return ret;
  };

  const handleSubmitExperience = async (event) => {
    event.preventDefault();
    if(isValid()){
      const body = {
        title: `${companyName} ${personName} ${appliedYear} ${roleType}`,
        createdBy: personName,
        companyName: companyName,
        content: editorData,
        appliedFor: roleType,
        appliedYear: appliedYear
      };
      const url = process.env.REACT_APP_API + `/interview`;
      const res = await axios.post(url, body);
      console.log(res.data);
      if(res.data.interview){
        props.history.push("/exp");
      }
    }
  }

  return (
    <React.Fragment>
      <Box p={1} m={2}>
        <BackButton link="/exp" />
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
                id="fullWidth"
                value={personName}
                onChange={(e) => {setPersonName(e.target.value);}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Company/Org Name"
                label="Enter Company/Org Name*"
                InputProps={{
                  style: { width: `${300}px` },
                }}
                value={companyName}
                onChange={(e) => {setCompanyName(e.target.value);}}
                id="fullWidth"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Year"
                label="Enter Year*"
                InputProps={{
                  style: { width: `${300}px` },
                }}
                value={appliedYear}
                onChange={(e) => {setAppliedYear(e.target.value);}}
                id="fullWidth"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Role Type:
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="internship"
                  name="radio-buttons-group"
                  value={roleType}
                  onChange={(e) => {setRoleType(e.target.value);}}
                >
                  <FormControlLabel
                    value="Internship"
                    control={<Radio />}
                    label="Internship"
                  />
                  <FormControlLabel
                    value="Full Time"
                    control={<Radio />}
                    label="Full Time"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="">Write your experience here:</FormLabel>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#fffaed",
                  borderRadius: "5px",
                }}
                id={EDITTOR_HOLDER_ID}
              ></div>
              {/* {JSON.stringify(editorData)} */}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className="btn btn-primary"
                onClick={handleSubmitExperience}
              >
                Submit Experience
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
  token: state.auth.token,
  username: state.auth.username,
});

export default withRouter(connect(mapStateToProps)(WriteExperience));
