import axios from 'axios';
import React, { Component } from 'react';
import AddEvent from './AddEvent';
import EventList from './EventList';
import Spinner from '../spinner/Spinner';

class Event extends Component {
  state = {
    events: [],
    isUpdating: false,
    updatingEvent: null,
    isLoading: true,
  };

  handleEdit = (eventId) => {
    let updatingEvent = this.state.events.find(
      (event) => event._id === eventId
    );
    this.setState((prevState) => {
      updatingEvent = prevState.isUpdating ? null : updatingEvent;
      return {
        isUpdating: !prevState.isUpdating,
        updatingEvent: updatingEvent
      };
    });
  };

  handleDelete = async (eventId) => {
    this.setState({ isLoading: true });
    await axios.delete(process.env.REACT_APP_API + `/events/${eventId}`);
    const deletedEventIndex = this.state.events.findIndex(
      (event) => event._id === eventId
    );
    if (
      deletedEventIndex >= 0 &&
      JSON.stringify(this.state.events[deletedEventIndex]) ===
        JSON.stringify(this.state.updatingEvent)
    ) {
      this.setState({ isUpdating: false, updatingEvent: null });
    }
    const events = [...this.state.events];
    events.splice(deletedEventIndex, 1);
    this.setState({ events: events, isLoading: false });
  };

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API + '/events')
      .then((res) => {
        console.log(res.data);
        this.setState({ events: res.data });
        axios
          .get('http://res.cloudinary.com/coc-vjti/image/list/event.json')
          .then((res) => {
            console.log(res.data.resources);
            if (this.state.events.length !== 0) {
              const events = [...this.state.events];
              for (const event of events) {
                for (const imageData of res.data.resources) {
                  if (event._id === imageData.public_id) {
                    event.version = imageData.version;
                    break;
                  }
                }
              }
              this.setState({ events: events, isLoading: false });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
					<Spinner />
				) : (
					<EventList
						events={this.state.events}
						isUpdating={this.state.isUpdating}
						handleEdit={this.handleEdit}
						handleDelete={this.handleDelete}
					/>
				)}
        <AddEvent
          isUpdating={this.state.isUpdating}
          updatingEvent={this.state.updatingEvent}
        />
      </>
    );
  }
}

export default Event;
