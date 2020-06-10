import axios from 'axios';
import React, { Component } from 'react';
import AddEvent from './AddEvent';
import EventList from './EventList';

class Event extends Component {
	state = {
		events: [],
		isUpdating: false,
		updatingEvent: null,
	};

	handleEdit = (eventId) => {
		const updatingEvent = this.state.events.find(
			(event) => event._id === eventId
		);
		this.setState({ isUpdating: true, updatingEvent: updatingEvent });
	};

	handleDelete = (eventId) => {
		axios.delete(process.env.REACT_APP_API + `/events/${eventId}`);
		const deletedEvent = this.state.events.find(
			(event) => event._id === eventId
		);
		if (
			JSON.stringify(deletedEvent) ===
			JSON.stringify(this.state.updatingEvent)
		) {
			this.setState({ isUpdating: false, updatingEvent: null });
		}
		this.setState({ events: [] });
	};

	componentDidMount() {
		axios
			.get(process.env.REACT_APP_API + '/events')
			.then((res) => {
				this.setState({ events: res.data });
			})
			.catch((error) => console.log(error));
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			JSON.stringify(this.state.events) !==
			JSON.stringify(prevState.events)
		) {
			axios
				.get(process.env.REACT_APP_API + '/events')
				.then((res) => {
					this.setState({ events: res.data });
				})
				.catch((error) => console.log(error));
		}
	}

	render() {
		return (
			<div>
				<EventList
					events={this.state.events}
					handleEdit={this.handleEdit}
					handleDelete={this.handleDelete}
				/>
				<AddEvent
					isUpdating={this.state.isUpdating}
					updatingEvent={this.state.updatingEvent}
				/>
			</div>
		);
	}
}

export default Event;
