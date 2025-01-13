import React from "react";
import "../Events/Events.css";

const events = [
  {
    title: "Trick-IEEE Towers",
    description: "Bring your skills and creativity to build the tallest tower. Prizes included!",
    date: "January 10, 2025",
    time: "7 PM to 8 PM",
    location: "ETC 2.136",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Bouldering w/ SWAICHIEE",
    description: "Take a break and join us for bouldering fun and skill-building.",
    date: "December 7, 2024",
    time: "All day",
    location: "Austin Bouldering Project",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Slime GM + Fam Closing",
    description: "Create stretchy slime and compete for prizes in our slime-making contest.",
    date: "December 5, 2024",
    time: "7 PM to 9 PM",
    location: "ETC 2.134",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Escape the ETC",
    description: "Solve puzzles and win prizes in our escape room challenge.",
    date: "January 11, 2025",
    time: "6 PM to 9 PM",
    location: "ETC 2.136",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Escape the ETC",
    description: "Solve puzzles and win prizes in our escape room challenge.",
    date: "January 11, 2025",
    time: "6 PM to 9 PM",
    location: "ETC 2.136",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Escape the ETC",
    description: "Solve puzzles and win prizes in our escape room challenge.",
    date: "January 11, 2025",
    time: "6 PM to 9 PM",
    location: "ETC 2.136",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Escape the ETC",
    description: "Solve puzzles and win prizes in our escape room challenge.",
    date: "January 11, 2025",
    time: "6 PM to 9 PM",
    location: "ETC 2.136",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Escape the ETC",
    description: "Solve puzzles and win prizes in our escape room challenge.",
    date: "January 11, 2025",
    time: "6 PM to 9 PM",
    location: "ETC 2.136",
    image: "https://via.placeholder.com/300x200",
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
