import React from "react";
import "../Events/Events.css";

const events = [
  {
    title: "Event #1",
    description: "Description for Event #1",
    date: "2023-12-25",
    time: "10:00 AM",
    location: "Location #1",
    image: "https://example.com/image1.jpg",
  },
  {
    title: "Event #2",
    description: "Description for Event #2",
    date: "2023-11-15",
    time: "2:00 PM",
    location: "Location #2",
    image: "https://example.com/image2.jpg",
  },
  {
    title: "Event #3",
    description: "Description for Event #3",
    date: "2023-10-01",
    time: "6:00 PM",
    location: "Location #3",
    image: "https://example.com/image3.jpg",
  },
  {
    title: "Event #4",
    description: "Description for Event #4",
    date: "2023-09-15",
    time: "1:00 PM",
    location: "Location #4",
    image: "https://example.com/image4.jpg",
  },
  {
    title: "Event #5",
    description: "Description for Event #5",
    date: "2023-08-20",
    time: "3:00 PM",
    location: "Location #5",
    image: "https://example.com/image5.jpg",
  },
  {
    title: "Event #6",
    description: "Description for Event #6",
    date: "2023-07-10",
    time: "4:00 PM",
    location: "Location #6",
    image: "https://example.com/image6.jpg",
  },
  {
    title: "Event #7",
    description: "Description for Event #7",
    date: "2023-06-05",
    time: "5:00 PM",
    location: "Location #7",
    image: "https://example.com/image7.jpg",
  },
  {
    title: "Event #8",
    description: "Description for Event #8",
    date: "2023-05-25",
    time: "6:00 PM",
    location: "Location #8",
    image: "https://example.com/image8.jpg",
  },
];

const currentDate = new Date();

const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);
const pastEvents = events.filter(event => new Date(event.date) < currentDate);

const EventCard = ({ event }) => (
    <div className="event-card">
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
);

const UpcomingEvents = ({ events }) => (
    <section>
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.map((event, index) => (
            <EventCard key={index} event={event} />
        ))}
      </div>
    </section>
);

const PastEvents = ({ events }) => (
    <section>
      <h2>Past Events</h2>
      <div className="events-grid">
        {events.map((event, index) => (
            <EventCard key={index} event={event} />
        ))}
      </div>
    </section>
);

const Events = () => {
  return (
      <div className="events-page">
        <header className="events-header">
          <h1>Events</h1>
          <p>Check out some of our upcoming and past events! RSVP to get some food!</p>
        </header>
        <UpcomingEvents events={upcomingEvents} />
        <PastEvents events={pastEvents} />
      </div>
  );
};

export default Events;