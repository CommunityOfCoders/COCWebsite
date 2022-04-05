import React, { useState, useEffect, useRef } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BackButton from "../Utilities/BackButton";
import axios from "axios";
import useAuthenticatedAxios from "../Utilities/useAuthenticatedAxios.js";
import AlertUtility from "../Utilities/Alert";

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
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";

const EDITTOR_HOLDER_ID = "editorjs";

const WriteExperience = (props) => {
  const authenticatedAxios = useAuthenticatedAxios();

  const ejInstance = useRef();
  const [draftID, setDraftID] = useState("_");
  const [exp, setExp] = useState({});
  const [personName, setPersonName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [appliedYear, setAppliedYear] = useState("");
  const [roleType, setRoleType] = useState("Internship");
  const [editorData, setEditorData] = useState("");
  const ALERT_MESSAGES = {
    submit: 'Your experience is submitted! ✨ It will be verified by COC',
    update: 'Updated your experience!',
    draft: 'Saved as a draft 🚀'
  }

  const [isDraftSavedAlert, setIsDraftSavedAlert] = useState(false);
  const [isSubmittedAlert, setIsSubmittedAlert] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState(false);
  const [submitAlertMessage, setSubmitAlertMessage] = useState(ALERT_MESSAGES.submit);
  

  const [error, setError] = useState({
    personNameError: "",
    companyNameError: "",
    appliedYearError: "",
    contentError: "",
  });

  const { pathname } = useLocation();
  const expID = pathname.split("/")[3];
  const isEditPage = !!expID;

  useEffect(() => {
    if (!isEditPage && !ejInstance.current) {
      initEditor();
    }
    if (isEditPage && expID) {
      authenticatedAxios
        .get(process.env.REACT_APP_API + `/interview/${expID}`)
        .then((res) => {
          setExp(res.data);
          setDraftID(res.data._id);
          setPersonName(res.data.createdBy);
          setCompanyName(res.data.companyRequest);
          setAppliedYear(res.data.appliedYear);
          setRoleType(res.data.appliedFor);
          setEditorData(res.data.content);
        })
        .catch((err) => console.log(err));
    }
  }, []);
 
  useEffect(() => {
    if(isEditPage && exp.content){
        initEditor();
    }
  }, [exp]);

  useEffect(() => {
    if(draftID === '_'){
      setSubmitAlertMessage(ALERT_MESSAGES.submit);
    }else{
      setSubmitAlertMessage(ALERT_MESSAGES.update);
    }
  }, [draftID]);

  const initEditor = () => {
    const editor = new EditorJS({
      //   readOnly: true,
      holder: EDITTOR_HOLDER_ID,
      logLevel: "ERROR",
      data: (exp.content),
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
        list: { class: List, inlineToolbar: true },
        code: CodeTool,
        table: Table,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                if (file) {
                  formData.append("expImage", file, file.name);
                }
                const res = await authenticatedAxios.post(
                  process.env.REACT_APP_API + "/interviewImageUpload",
                  formData
                );
                return res.data;
              },
            },
          },
        },
      },
    });
  };

  const isValid = () => {
    let ret = true;
    if (personName === "") {
      setError((prevError) => ({
        ...prevError,
        personNameError: "*Name cannot be empty",
      }));
      ret = false;
    }else{
      setError((prevError) => ({
        ...prevError,
        personNameError: "",
      }));
    }
    if (companyName === "") {
      setError((prevError) => ({
        ...prevError,
        companyNameError: "*Company name cannot be empty",
      }));
      ret = false;
    }else{
      setError((prevError) => ({
        ...prevError,
        companyNameError: "",
      }));
    }
    if (appliedYear === "") {
      setError((prevError) => ({
        ...prevError,
        appliedYearError: "*Year cannot be empty",
      }));
      ret = false;
    }else{
      setError((prevError) => ({
        ...prevError,
        appliedYearError: "",
      }));
    }
    if (editorData === "") {
      setError((prevError) => ({
        ...prevError,
        contentError: "*Experience cannot be empty",
      }));
      ret = false;
    }else{
      setError((prevError) => ({
        ...prevError,
        contentError: "",
      }));
    }
    return ret;
  };

  const handleSubmitExperience = async (event) => {
    event.preventDefault();
    if (isValid()) {
      const body = {
        draftID: draftID,
        title: `${companyName} ${personName} ${appliedYear} ${roleType}`,
        createdBy: personName,
        companyName: companyName,
        content: editorData,
        appliedFor: roleType,
        appliedYear: appliedYear,
        userId: props.userID,
      };
      const url = process.env.REACT_APP_API + `/interview`;
      try{
        const res = await authenticatedAxios.post(url, body);
        setIsSubmittedAlert(true);
      }catch(err){
        console.log(err.response.data.error);
        setErrorAlertMessage(err.response.data.error);
        setIsErrorAlert(true);
      }
    }
  };

  const handleSaveAsDraft = async (event) => {
    event.preventDefault();
    if(isValid()){
      const body = {
        draftID: draftID,
        title: `${companyName} ${personName} ${appliedYear} ${roleType}`,
        createdBy: personName,
        companyName: companyName,
        content: editorData,
        appliedFor: roleType,
        appliedYear: appliedYear,
        userId: props.userID,
      };
      const url = process.env.REACT_APP_API + '/interview/draft';
      try{
        const res = await authenticatedAxios.post(url, body);
        setDraftID(res.data.interview._id);
        setIsDraftSavedAlert(true);
      }catch(err){
        console.log(err.response.data.error);
        setErrorAlertMessage(err.response.data.error);
        setIsErrorAlert(true);
      }
    }
  }

  return (
    <article>
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
                  onChange={(e) => {
                    setPersonName(e.target.value);
                  }}
                  helperText={error.personNameError}
                  error={(error.personNameError) !== ""}
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
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  id="fullWidth"
                  helperText={error.companyNameError}
                  error={(error.companyNameError) !== ""}
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
                  onChange={(e) => {
                    setAppliedYear(e.target.value);
                  }}
                  id="fullWidth"
                  helperText={error.appliedYearError}
                  error={(error.appliedYearError) !== ""}
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
                    onChange={(e) => {
                      setRoleType(e.target.value);
                    }}
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
                <div className="errorMsg">{error.contentError}</div>
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
              <Grid container justifyContent="flex-start">
                <Grid xs={12} md={3} style={{ padding: "10px" }}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmitExperience}
                  >
                    Submit Experience
                  </Button>
                </Grid>
                {
                  (!isEditPage || (isEditPage && exp.isDraft)) && 
                  <Grid xs={12} md={3} style={{ padding: "10px" }}>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      onClick={handleSaveAsDraft}
                    >
                      Save As Draft
                    </Button>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Container>
          
        </Box>
        
      </React.Fragment>
      <AlertUtility
        open={isSubmittedAlert}
        duration={2000}
        onCloseHandler={() => {
          setIsSubmittedAlert(false);
          props.history.push("/exp");
        }}
        severity="success"
        message={submitAlertMessage}
      />
      <AlertUtility
        open={isDraftSavedAlert}
        duration={1000}
        onCloseHandler={() => {
          setIsDraftSavedAlert(false);
        }}
        severity="success"
        message="Saved as a draft 🚀"
      />
      <AlertUtility
        open={isErrorAlert}
        duration={1200}
        onCloseHandler={() => {
          setIsErrorAlert(false);
        }}
        severity="error"
        message={errorAlertMessage}
      />
    </article>
  );
};

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
  token: state.auth.token,
  username: state.auth.username,
});

export default withRouter(connect(mapStateToProps)(WriteExperience));
