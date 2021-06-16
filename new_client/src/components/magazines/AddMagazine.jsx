import "date-fns";
import React from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import "../auth/Error.css";
import { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { connect } from "react-redux";
import AlertUtility from "../Utilities/Alert";
import { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

function AddMagazine(props) {
  const [magazineName, setMagazineName] = useState("");
  const [magazineDescription, setMagazineDescription] = useState("");
  const [magazineDate, setMagazineDate] = useState(new Date());
  const [magazineURL, setMagazineURL] = useState("");
  const [magazineSelectedFile, setMagazineSelectedFile] = useState(null);

  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const magazineID = pathname.split("/")[3];
  const isEditPage = !!magazineID;

  const successString = isEditPage
    ? "Magazine edited successfully! "
    : "Magazine added successfully";
  const btnText = isEditPage ? "Update" : "Submit";

  const [error, setError] = useState({
    magazineNameError: "",
    descriptionError: "",
    dateError: "",
    urlError: "",
    fileError: "",
  });

  useEffect(() => {
    if (isEditPage && magazineID) {
      axios
        .get(process.env.REACT_APP_API + `/magazines/${magazineID}`, {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        })
        .then((res) => {
          setMagazineName(res.data.magazineName);
          setMagazineDescription(res.data.description);
          setMagazineDate(res.data.date);
          setMagazineURL(res.data.downloadURL);
        })
        .catch((err) => console.log(err));
    }
  }, [isEditPage, magazineID]);

  const handleClose = () => {
    setIsSubmitted(false);
    if (props.closeModal !== undefined) props.closeModal(); // EditPage is a page, so no modal
    props.history.push("/magazines");
  };

  const isValid = () => {
    let ret = true;
    if (magazineName === "") {
      setError((prevError) => ({
        ...prevError,
        magazineNameError: "*Magazine name cannot be empty",
      }));
      ret = false;
    }
    if (magazineDescription === "") {
      setError((prevError) => ({
        ...prevError,
        descriptionError: "*Magazine description cannot be empty",
      }));
      ret = false;
    }
    if (!magazineDate) {
      setError((prevError) => ({
        ...prevError,
        dateError: "*Magazine date cannot be empty",
      }));
      ret = false;
    }
    if (magazineURL === "") {
      setError((prevError) => ({
        ...prevError,
        urlError: "*Magazine URL cannot be empty",
      }));
      ret = false;
    }
    if (!magazineSelectedFile) {
      setError((prevError) => ({
        ...prevError,
        fileError: "*Magazine image field cannot be empty",
      }));
      ret = false;
    }
    return ret;
  };

  const onFileChange = (e) => {
    setMagazineSelectedFile(e.target.files[0]);
  };

  const handleAddMagazine = (event) => {
    event.preventDefault();
    if (isValid()) {
      const formData = new FormData();
      if (magazineSelectedFile) {
        formData.append(
          "image",
          magazineSelectedFile,
          magazineSelectedFile.name
        );
      }
      formData.append("magazineName", magazineName);
      formData.append("description", magazineDescription);
      formData.append("date", magazineDate);
      formData.append("downloadURL", magazineURL);
      setIsLoading(true);
      axios
        .post(process.env.REACT_APP_API + "/magazines", formData, {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        })
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

  const handleEditMagazine = (event) => {
    event.preventDefault();
    if (isValid()) {
      const formData = new FormData();
      if (magazineSelectedFile) {
        formData.append(
          "image",
          magazineSelectedFile,
          magazineSelectedFile.name
        );
      }
      formData.append("magazineName", magazineName);
      formData.append("description", magazineDescription);
      formData.append("date", magazineDate);
      formData.append("downloadURL", magazineURL);
      setIsLoading(true);
      axios
        .put(process.env.REACT_APP_API + `/magazines/${magazineID}`, formData, {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        })
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
          <form onSubmit={isEditPage ? handleEditMagazine : handleAddMagazine}>
            <div className="form-group">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Magazine Name"
                    name="magazineName"
                    value={magazineName}
                    onChange={(e) => setMagazineName(e.target.value)}
                    required
                    label="Enter Magazine Name"
                    disabled={isEditPage}
                  />
                  <div className="errorMsg">{error.magazineNameError}</div>
                </Grid>
              </Grid>
            </div>

            <div className="form-group">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Magazine description"
                    name="description"
                    label="Enter magazine description"
                    value={magazineDescription}
                    onChange={(e) => setMagazineDescription(e.target.value)}
                    fullWidth
                    multiline
                    required
                  />
                  <div className="errorMsg">{error.descriptionError}</div>
                </Grid>
              </Grid>
            </div>

            <div className="form-group">
              <Grid container>
                <Grid item xs={12}>
                  <DateTimePicker
                    autoOk
                    ampm={false}
                    value={magazineDate}
                    onChange={(date) => setMagazineDate(date)}
                    id="date-picker-dialog"
                    label="Magazine date"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <div className="errorMsg">{error.dateError}</div>
                </Grid>
              </Grid>
            </div>

            <div className="form-group">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Magazine File URL"
                    name="magazineURL"
                    value={magazineURL}
                    onChange={(e) => setMagazineURL(e.target.value)}
                    fullWidth
                    required
                    label="Enter Magazine URL"
                  />
                  <div className="errorMsg">{error.urlError}</div>
                </Grid>
              </Grid>
            </div>

            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                className="btn"
                name="magazineImage"
                accept="image/*"
                onChange={onFileChange}
              />
              <div className="errorMsg">{error.fileError}</div>
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
                  >
                    {btnText}
                  </Button>
                )}
              </Grid>
              <Grid item>
                {isEditPage && (
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className="btn btn-primary"
                    onClick={() => props.history.goBack()}
                  >
                    Cancel
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
        message={successString + " Reloading magazines..."}
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

export default withRouter(connect(mapStateToProps)(AddMagazine));
