import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddEvent from './AddEvent';
import EventList from './EventList';

function Event() {

  const [events, setEvents] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingEvent, setUpdatingEvent] = useState(null);

  const handleEdit = (eventId) => {
    let updatingEvent = events.find(
      (event) => event._id === eventId
    );
    isUpdating ? setUpdatingEvent(null) : setUpdatingEvent(updatingEvent);
    setIsUpdating(!isUpdating);
  };
  
  const handleDelete = (eventId) => {
    axios.delete(process.env.REACT_APP_API + `/events/${eventId}`);
    const deletedEventIndex = events.findIndex(
      (event) => event._id === eventId
    );
    if (
      deletedEventIndex >= 0 &&
      JSON.stringify(events[deletedEventIndex]) ===
        JSON.stringify(updatingEvent)
    ) {
      setIsUpdating(false);
      setUpdatingEvent(null);
    }
    setEvents(events.splice(deletedEventIndex, 1))
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + '/events')
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
        axios
          .get('http://res.cloudinary.com/coc-vjti/image/list/event.json')
          .then((res) => {
            console.log(res.data.resources);
            if (events.length !== 0) {
              for (const event of events) {
                for (const imageData of res.data.resources) {
                  if (event._id === imageData.public_id) {
                    event.version = imageData.version;
                    break;
                  }
                }
              }
              setEvents(events);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <div>
      <EventList
          events={events}
          isUpdating={isUpdating}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <AddEvent
          isUpdating={isUpdating}
          updatingEvent={updatingEvent}
        />
    </div>
  )
}


export default Event;
