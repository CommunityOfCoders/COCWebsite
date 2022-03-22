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

const ReadExperience = (props) => {

  const ejInstance = useRef();
  const [exp, setExp] = useState({});

  const { pathname } = useLocation();
  const interviewID = pathname.split("/")[2];

  useEffect(() => {

    axios
        .get(process.env.REACT_APP_API + `/interview/${interviewID}`)
        .then((res) => {
            console.log(res.data);
            setExp(res.data);
        });

    
  }, []);

  useEffect(() => {
    if(exp.content){
        initEditor();
    }
  }, [exp]);

  const initEditor = () => {
    const editor = new EditorJS({
      readOnly: true,
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
            // setEditorData(outputData);
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


  return (
    <React.Fragment>
      <Box pt={6} pb={6}>
        <BackButton link={`/exp/list/${exp.company}`} />
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box mt={4}>
                
                    <Typography
                        style={{ color: "#224903", fontWeight: "bold" }}
                        variant="h4"
                    >
                        {exp.companyRequest}
                    </Typography>
                    <Typography
                        style={{ color: "#5e5e5e", fontWeight: "500" }}
                        variant="h6"
                    >
                        {exp.createdBy}
                    </Typography>
                    <Typography
                        style={{ color: "#5e5e5e", fontWeight: "500" }}
                        variant="h6"
                    >
                        {exp.appliedFor}, {exp.appliedYear}
                    </Typography>
                
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#fafafa",
                  borderRadius: "5px",
                  padding: "5px"
                }}
                id={EDITTOR_HOLDER_ID}
              ></div>
              {/* {JSON.stringify(editorData)} */}
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

export default withRouter(connect(mapStateToProps)(ReadExperience));
