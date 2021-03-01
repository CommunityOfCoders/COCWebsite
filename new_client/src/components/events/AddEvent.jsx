import "date-fns";
import React from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import "../auth/Error.css";
import { useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { connect } from "react-redux";
import AlertUtility from "../Utilities/Alert";
import { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

function AddEvent(props) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventVenue, setEventVenue] = useState("");
  const [eventGraduationYear, setEventGraduationYear] = useState("");
  const [eventSelectedFile, setEventSelectedFile] = useState(null);

  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const eventID = pathname.split("/")[3];
  const isEditPage = !!eventID;

  const successString = isEditPage
    ? "Event edited successfully! "
    : "Event added successfully";
  const btnText = isEditPage ? "Update" : "Submit";

  const [error, setError] = useState({
    eventNameError: "",
    descriptionError: "",
    dateError: "",
    venueError: "",
    graduationYearError: "",
  });

  useEffect(() => {
    if (isEditPage && eventID) {
      axios
        .get(process.env.REACT_APP_API + `/events/${eventID}`)
        .then((res) => {
          setEventName(res.data.eventName);
          setEventDescription(res.data.description);
          setEventDate(res.data.date);
          setEventVenue(res.data.venue);
          setEventGraduationYear(res.data.graduationYear);
        })
        .catch((err) => console.log(err));
    }
  }, [isEditPage, eventID]);

  const handleClose = () => {
    setIsSubmitted(false);
    if (props.closeModal !== undefined) props.closeModal(); // EditPage is a page, so no modal
    props.history.push("/events");
  };

  const isValid = () => {
    let ret = true;
    if (eventName === "") {
      setError((prevError) => ({
        ...prevError,
        eventNameError: "*Event name cannot be empty",
      }));
      ret = false;
    }
    if (eventDescription === "") {
      setError((prevError) => ({
        ...prevError,
        descriptionError: "*Event description cannot be empty",
      }));
      ret = false;
    }
    if (eventVenue === "") {
      setError((prevError) => ({
        ...prevError,
        venueError: "*Event venue cannot be empty",
      }));
      ret = false;
    }
    if (!eventDate) {
      setError((prevError) => ({
        ...prevError,
        dateError: "*Event date cannot be empty",
      }));
      ret = false;
    }
    if (!eventGraduationYear) {
      setError((prevError) => ({
        ...prevError,
        graduationYearError: "*Graduation year cannot be empty",
      }));
      ret = false;
    } else {
      const isMatch = eventGraduationYear.match(/^[12]0[1-5]\d$/);
      if (!isMatch) {
        setError((prevError) => ({
          ...prevError,
          graduationYearError: "*Enter valid graduation year",
        }));
        ret = false;
      }
    }
    return ret;
  };

  const onFileChange = (e) => {
    setEventSelectedFile(e.target.files[0]);
  };

  const handleAddEvent = (event) => {
    event.preventDefault();
    if (isValid()) {
      const formData = new FormData();
      if (eventSelectedFile) {
        formData.append("COC_Event", eventSelectedFile, eventSelectedFile.name);
      }
      formData.append("eventName", eventName);
      formData.append("description", eventDescription);
      formData.append("date", eventDate);
      formData.append("venue", eventVenue);
      formData.append("graduationYear", eventGraduationYear);
      setIsLoading(true);
      axios
        .post(process.env.REACT_APP_API + "/events", formData, {
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
    } else {
      alert("You have errors in your form");
    }
  };

  const handleEditEvent = (event) => {
    event.preventDefault();
    if (isValid()) {
      const formData = new FormData();
      if (eventSelectedFile) {
        formData.append("COC_Event", eventSelectedFile, eventSelectedFile.name);
      }
      formData.append("description", eventDescription);
      formData.append("date", eventDate);
      formData.append("venue", eventVenue);
      formData.append("graduationYear", eventGraduationYear);
      setIsLoading(true);
      console.log(eventDescription);
      axios
        .put(process.env.REACT_APP_API + `/events/${eventID}`, formData, {
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
          <form onSubmit={isEditPage ? handleEditEvent : handleAddEvent}>
            <div className="form-group">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Event Name"
                    name="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                    label="Enter Event Name"
                    disabled={isEditPage}
                  />
                  <div className="errorMsg">{error.eventNameError}</div>
                </Grid>
              </Grid>
            </div>

            <div className="form-group">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Event description"
                    name="description"
                    label="Enter event description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
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
                    value={eventDate}
                    onChange={(date) => setEventDate(date)}
                    id="date-picker-dialog"
                    label="Event date"
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
                    placeholder="Event venue"
                    name="venue"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    fullWidth
                    required
                    label="Enter Event Venue"
                  />
                  <div className="errorMsg">{error.venueError}</div>
                </Grid>
              </Grid>
            </div>

            <div className="form-group">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    placeholder="Graduation year"
                    name="graduationYear"
                    value={eventGraduationYear}
                    onChange={(e) => setEventGraduationYear(e.target.value)}
                    required
                    label="Enter graduation year"
                  />
                  <div className="errorMsg">{error.graduationYearError}</div>
                </Grid>
              </Grid>
            </div>

            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                className="btn"
                name="COC_Event"
                accept="image/*"
                onChange={onFileChange}
              />
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
        message={successString + " Reloading events..."}
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

export default withRouter(connect(mapStateToProps)(AddEvent));
