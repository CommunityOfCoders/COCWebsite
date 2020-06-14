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
		let updatingEvent = this.state.events.find(
			(event) => event._id === eventId
		);
		this.setState((prevState) => {
			updatingEvent = prevState.isUpdating ? null : updatingEvent;
			return {
				isUpdating: !prevState.isUpdating,
				updatingEvent: updatingEvent,
			};
		});
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

	render() {
		return (
			<div>
				<EventList
					events={this.state.events}
					isUpdating={this.state.isUpdating}
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
