import React from "react";
import "../Events/Events.css";

const events = [
  {
    title: "Event #",
    description: "Insert Description Here",
    date: "Insert Date Here",
    time: "Insert Time Here",
    location: "Insert Location Here",
    image: "Insert Image URL Here",
  },
  {
    title: "Event #",
    description: "Insert Description Here",
    date: "Insert Date Here",
    time: "Insert Time Here",
    location: "Insert Location Here",
    image: "Insert Image URL Here",
  },
  {
    title: "Event #",
    description: "Insert Description Here",
    date: "Insert Date Here",
    time: "Insert Time Here",
    location: "Insert Location Here",
    image: "Insert Image URL Here",
  },
  {
    title: "Event #",
    description: "Insert Description Here",
    date: "Insert Date Here",
    time: "Insert Time Here",
    location: "Insert Location Here",
    image: "Insert Image URL Here",
  },
  {
    title: "Event #",
    description: "Insert Description Here",
    date: "Insert Date Here",
    time: "Insert Time Here",
    location: "Insert Location Here",
    image: "Insert Image URL Here",
  },
  {
    title: "Event #",
    description: "Insert Description Here",
    date: "Insert Date Here",
    time: "Insert Time Here",
    location: "Insert Location Here",
    image: "Insert Image URL Here",
  },
  {
    title: "Event #",
    description: "Insert Description Here",
    date: "Insert Date Here",
    time: "Insert Time Here",
    location: "Insert Location Here",
    image: "Insert Image URL Here",
  },
  {
    title: "Event #",
    description: "Insert Description Here",
    date: "Insert Date Here",
    time: "Insert Time Here",
    location: "Insert Location Here",
    image: "Insert Image URL Here",
  },
  
];

const Events = () => {
  return (
    <div className="events-page">
      <header className="events-header">
        <h1>Events</h1>
        <p>Check out some of our upcoming and past events! RSVP to get some food!</p>
      </header>
      <div className="events-grid">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-details">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p className="event-meta">
                <strong>Date:</strong> {event.date} <br />
                <strong>Time:</strong> {event.time} <br />
                <strong>Location:</strong> {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
