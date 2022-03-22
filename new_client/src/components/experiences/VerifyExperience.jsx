import "date-fns";
import React from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import "../auth/Error.css";
import { useState } from "react";
import { Button, Grid, TextField, Select, MenuItem, FormControl } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { connect } from "react-redux";
import AlertUtility from "../Utilities/Alert";
import { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import useAuthenticatedAxios from "../Utilities/useAuthenticatedAxios.js";

function VerifyExperience(props) {
  const authenticatedAxios = useAuthenticatedAxios();
  const [submittedCompany, setSubmittedCompany] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [appliedYear, setAppliedYear] = useState("");
  const [appliedFor, setAppliedFor] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [companyList, setCompanyList] = useState([]);

  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const interviewID = pathname.split("/")[2];
  const successString = "Experience verified successfully!";
  const btnText = "Verify";

  const [error, setError] = useState({
    companyNameError: "",
  });

  const handleClose = () => {
    setIsSubmitted(false);
    if (props.closeModal !== undefined) props.closeModal(); // EditPage is a page, so no modal
    props.history.push("/manageexperiences");
  };

  const handleCompanyChange = (e) => {
    setCompanyID(e.target.value);
  }

  const isValid = () => {
    let ret = true;
    if (companyID === "") {
      setError((prevError) => ({
        ...prevError,
        companyNameError: "*Select a company",
      }));
      ret = false;
    }
    return ret;
  };

  useEffect(() => {
      console.log(interviewID);
    axios
        .get(process.env.REACT_APP_API + `/interview/${interviewID}`)
        .then((res) => {
            console.log(res.data);
            setSubmittedCompany(res.data.companyRequest);
            setCreatedBy(res.data.createdBy);
            setAppliedYear(res.data.appliedYear);
            setAppliedFor(res.data.appliedFor);
        })
    axios
      .get(process.env.REACT_APP_API + "/companies")
      .then((res) => {
        // console.log(res.data);
        setCompanyList(res.data.companies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [props.userID]);

  const handleVerifyExperience = (event) => {
    event.preventDefault();
    if (isValid()) {
      const url = process.env.REACT_APP_API + "/interview/verify";
      const data = {
          interviewID,
          companyID
      }
      setIsLoading(true);
      authenticatedAxios
        .post(url, data)
        .then((res) => {
          if (res.status === 200) {
            setIsSubmitted(true);
          } else {
            setIsError(true);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="jumbotron" style={{ margin: "20px 50px" }}>
          <form onSubmit={handleVerifyExperience}>
            <div className="form-group">
              <Grid container>
                <Grid item xs={12} sx={{m: 4}}>
                  <TextField
                    placeholder="Submitted Company"
                    name="submittedcompanyName"
                    value={submittedCompany}
                    onChange={(e) => setSubmittedCompany(e.target.value)}
                    required
                    label="Enter Company Name"
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="form-group">
              <Grid container>
                <Grid item xs={12} sx={{m: 4}}>
                  <TextField
                    placeholder="Created by"
                    name="createby"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                    label="Enter Creator Name"
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="form-group">
              <Grid container>
                <Grid item xs={12} sx={{m: 4}}>
                  <TextField
                    placeholder="Year"
                    name="year"
                    value={appliedYear}
                    onChange={(e) => setAppliedYear(e.target.value)}
                    required
                    label="Enter Year"
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="form-group">
              <Grid container>
                <Grid item xs={12} sx={{m: 4}}>
                  <TextField
                    placeholder="Role"
                    name="role"
                    value={createdBy}
                    onChange={(e) => setAppliedFor(e.target.value)}
                    required
                    label="Enter Role"
                    disabled={true}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="form-group">
              <label>Select Company: </label>
              <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={companyID}
                    label="Age"
                    onChange={handleCompanyChange}>
                    {
                        companyList.map((company, index) => {
                            return <MenuItem value={company._id}>{company.title}</MenuItem>
                        })
                    }
                </Select>
              </FormControl>
            </div>
            <Grid container spacing={1}>
              <Grid item>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className="btn btn-primary"
                    onClick={handleVerifyExperience}
                  >
                    {btnText}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </MuiPickersUtilsProvider>
      <AlertUtility
        open={isSubmitted}
        duration={3000}
        onCloseHandler={handleClose}
        severity="success"
        message={successString + " Reloading companies..."}
      />
      <AlertUtility
        open={isError}
        duration={2000}
        onCloseHandler={() => {
          setIsError(false);
        }}
        severity="error"
        message="Oops! An error occurred. Please try again."
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  userID: state.auth.userID,
  token: state.auth.token,
  username: state.auth.username,
});

export default withRouter(connect(mapStateToProps)(VerifyExperience));
