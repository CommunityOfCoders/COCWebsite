import React, { Component } from 'react';

const buttonStyle = {
	margin: '10px 15px',
	maxWidth: '120px',
};

const EventList = (props) => {
	const handleEdit = (eventId) => {
		props.handleEdit(eventId);
	};

	const handleDelete = (eventId) => {
		props.handleDelete(eventId);
	};

	return (
		<div>
			{props.events.length ? (
				props.events.map((event) => (
					<div
						className='list-group'
						key={event._id}
						style={{ margin: '20px 100px' }}>
						<div className='list-group-item list-group-item-action flex-column align-items-start'>
							{/* <img src={event.url} alt='coc event 1' /> */}
							<div className='d-flex w-100 justify-content-between'>
								<h5 className='mb-1'>{event.eventName}</h5>
								<small>{event.date}</small>
							</div>
							<small
								style={{
									position: 'absolute',
									right: '20px',
								}}>
								Venue:
								{' ' + event.venue}
							</small>
							<p className='mb-1'>{event.description}</p>
							<div className='controls row'>
								<button
									className='btn btn-outline-warning col'
									data-toggle='modal'
									data-target='#myModal'
									type='button'
									style={buttonStyle}
									onClick={() => handleEdit(event._id)}>
									Edit Event
								</button>
								<button
									className='btn btn-outline-danger col'
									style={buttonStyle}
									onClick={() =>
										handleDelete(event._id)
									}>
									Delete Event
								</button>
							</div>
						</div>
					</div>
				))
			) : (
				<div>OOOPSY: NO EVENTS REGISTERED</div>
			)}
		</div>
	);
};

export default EventList;
