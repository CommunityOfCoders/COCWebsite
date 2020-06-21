import React, { Component } from 'react';
import axios from 'axios';

import '../auth/Error.css';

class AddEvent extends Component {
  state = {
    event: {
      eventName: '',
      description: '',
      date: '',
      venue: '',
      graduationYear: '',
      selectedFile: null
    },
    error: {
      eventNameError: '',
      descriptionError: '',
      dateError: '',
      venueError: '',
      graduationYearError: ''
    }
  };

  onFileChange = (e) => {
    const event = { ...this.state.event };
    event.selectedFile = e.target.files[0];
    this.setState({ event: event });
  };

  handleChange = (e) => {
    const field = e.target.name;

    const event = { ...this.state.event, [field]: e.target.value };

    this.setState({
      event: event
    });
  };

  isValid = () => {
    const error = {
      ...this.state.error
    };
    let ret = true;
    if (this.state.event.eventName === '') {
      error.eventNameError = '*Event name cannot be empty';
      ret = false;
    }
    if (this.state.event.description === '') {
      error.descriptionError = '*Event description cannot be empty';
      ret = false;
    }
    if (this.state.event.venue === '') {
      error.venueError = '*Event venue cannot be empty';
      ret = false;
    }
    if (this.state.event.date === '') {
      error.dateError = '*Event date cannot be empty';
      ret = false;
    }
    if (this.state.event.graduationYear === '') {
      error.graduationYearError = '*Graduation year cannot be empty';
      ret = false;
    }
    this.setState({ error: error });
    return ret;
  };

  handleSubmit = (event) => {
    if (this.isValid()) {
      const formData = new FormData();
      if (this.state.event.selectedFile) {
        formData.append(
          'COC_Event',
          this.state.event.selectedFile,
          this.state.event.selectedFile.name
        );
      }
      const {
        eventName,
        description,
        date,
        venue,
        graduationYear
      } = this.state.event;
      formData.append('eventName', eventName);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('venue', venue);
      formData.append('graduationYear', graduationYear);
      if (this.props.isUpdating) {
        const updatingEventId = this.props.updatingEvent._id;
        axios
          .put(
            process.env.REACT_APP_API + `/events/${updatingEventId}`,
            formData
          )
          .then((res) => {
            console.log(res.data, this.props.updatingEvent);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(process.env.REACT_APP_API + '/events', formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      event.preventDefault();
    }
  };

  renderSubmitButton() {
    if (this.props.isUpdating) {
      return (
        <button type="submit" className="btn btn-primary">
          Update This Event
        </button>
      );
    }
    return (
      <button type="submit" className="btn btn-primary">
        Add Event
      </button>
    );
  }

  componentDidUpdate(nextProps) {
    if (
      JSON.stringify(this.props.updatingEvent) !==
        JSON.stringify(this.state.event) &&
      JSON.stringify(this.props.updatingEvent) !==
        JSON.stringify(nextProps.updatingEvent)
    ) {
      if (this.props.updatingEvent) {
        this.setState({ event: this.props.updatingEvent });
      } else {
        this.setState({
          event: {
            eventName: '',
            description: '',
            date: '',
            venue: '',
            graduationYear: '',
            selectedFile: null
          }
        });
      }
    }
  }

  render() {
    return (
      <div>
        <div className="jumbotron" style={{ margin: '20px 150px' }}>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label>Event Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event title"
                name="eventName"
                value={this.state.event.eventName}
                onChange={this.handleChange}
              />
              <div className="errorMsg">{this.state.error.eventNameError}</div>
            </div>

            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event description"
                name="description"
                value={this.state.event.description}
                onChange={this.handleChange}
              />
              <div className="errorMsg">
                {this.state.error.descriptionError}
              </div>
            </div>

            <div className="form-group">
              <label>Event Date:</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={this.state.event.date}
                onChange={this.handleChange}
              />
              <div className="errorMsg">{this.state.error.dateError}</div>
            </div>

            <div className="form-group">
              <label>Venue:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter event venue"
                name="venue"
                value={this.state.event.venue}
                onChange={this.handleChange}
              />
              <div className="errorMsg">{this.state.error.venueError}</div>
            </div>

            <div className="form-group">
              <label>Graduation Year:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Graduation Year"
                name="graduationYear"
                value={this.state.event.graduationYear}
                onChange={this.handleChange}
              />
              <div className="errorMsg">
                {this.state.error.graduationYearError}
              </div>
            </div>

            <div className="form-group">
              <label>Image:</label>
              <input
                type="file"
                className="btn"
                name="COC_Event"
                onChange={this.onFileChange}
              />
            </div>

            {this.renderSubmitButton()}
          </form>
        </div>
      </div>
    );
  }
}

export default AddEvent;
