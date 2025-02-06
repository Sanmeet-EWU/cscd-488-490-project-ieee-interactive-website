import React, {useEffect, useState} from "react";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';
import eventBanner from "../../Assets/rising-stars-2025-banner.jpg";
import "./Events.css";


// Fetches data from the database
/*useEffect(() => {
  fetch('http://localhost:5000/events')
    .then((res) => res.json())
    .then((data) => console.log(data)) // Replace with setState to display on UI
    .catch((err) => console.error('Error fetching events:', err));
}, []);*/


const upcomingEvent = {
  title: "Student Presentations: Rising Stars 2025",
  description: "Join us for an exciting evening of student presentations! STEM Students Welcome! Free Pizza provided.",
  date: "2025-01-30",
  time: "5:00 PM - 6:30 PM",
  location: "EWU Catalyst Building, 601 E Riverside Ave, Room CAT 304",
  type: "Student Event",
  registration: "https://events.vtools.ieee.org/m/462092",
  banner: eventBanner
};

const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Events = () => {
  return (
    <div className="events-page">
      <div className="events-header">
        <h1>IEEE Events</h1>
        <p>Join us for exciting events and opportunities!</p>
      </div>

      <section className="upcoming-events-section">
        <h2>Upcoming Event</h2>
        <div className="event-card">
          <div className="event-banner">
            <img src={upcomingEvent.banner} alt={upcomingEvent.title} />
          </div>
          <div className="event-content">
            <div className="event-type-badge">{upcomingEvent.type}</div>
            <h3 className="event-title">{upcomingEvent.title}</h3>
            <p className="event-description">{upcomingEvent.description}</p>
            
            <div className="event-meta">
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{formatDate(upcomingEvent.date)}</span>
              </div>
              <div className="meta-item">
                <FaClock className="meta-icon" />
                <span>{upcomingEvent.time}</span>
              </div>
              <div className="meta-item">
                <FaMapMarkerAlt className="meta-icon" />
                <span>{upcomingEvent.location}</span>
              </div>
            </div>

            <div className="event-actions">
              <a 
                href={upcomingEvent.registration} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="register-button"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="past-events-section">
        <h2>Past Events</h2>
        <p className="no-events">No past events to display.</p>
      </section>
    </div>
  );
};

export default Events;