import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import eventBanner from "../../Assets/rising-stars-2025-banner.jpg"; // Default banner, can be updated based on fetched data
import "./Events.css";
import request from "../../api/axiosConfig";
const convertTo12HourFormat = (time24) => {
  const [hours, minutes] = time24.split(":");
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minutes} ${ampm}`;
};
const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const data = await request("get", "/events");

      const now = new Date();

      const futureEvents = data.filter((event) => {
        const eventDate = new Date(event.event_date);
        const [hours, minutes] = event.event_time.split(":");
        eventDate.setHours(hours);
        eventDate.setMinutes(minutes);
        return eventDate >= now;
      });

      const pastEventsData = data.filter((event) => {
        const eventDate = new Date(event.event_date);
        const [hours, minutes] = event.event_time.split(":");
        eventDate.setHours(hours);
        eventDate.setMinutes(minutes);
        return eventDate < now;
      });

      const sortedUpcomingEvents = futureEvents.sort((a, b) => {
        const dateA = new Date(a.event_date);
        const [hoursA, minutesA] = a.event_time.split(":");
        dateA.setHours(hoursA);
        dateA.setMinutes(minutesA);

        const dateB = new Date(b.event_date);
        const [hoursB, minutesB] = b.event_time.split(":");
        dateB.setHours(hoursB);
        dateB.setMinutes(minutesB);
        return dateA - dateB;
      });

      setUpcomingEvents(sortedUpcomingEvents);
      setPastEvents(pastEventsData.reverse());
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>IEEE Events</h1>
        <p>Join us for exciting events and opportunities!</p>
      </div>

      <section className="upcoming-events-section">
        <h2>Upcoming Event{upcomingEvents.length > 1 ? "s" : ""}</h2>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-banner">
                <img
                  src={`http://localhost:3001/${event.banner}` || eventBanner}
                  alt={event.title}
                />
              </div>
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                <div className="event-meta">
                  <div className="meta-item">
                    <FaCalendarAlt className="meta-icon" />
                    <span>{formatDate(event.event_date)}</span>
                  </div>
                  <div className="meta-item">
                    <FaClock className="meta-icon" />
                    <span>
                      {convertTo12HourFormat(event.event_time.substring(0, 5))}
                    </span>
                  </div>
                  <div className="meta-item">
                    <FaMapMarkerAlt className="meta-icon" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="event-actions">
                  <a
                    href={event.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="register-button"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">
            No upcoming events scheduled yet. Check back later!
          </p>
        )}
      </section>

      <section className="past-events-section">
        <h2>Past Events</h2>
        {pastEvents.length > 0 ? (
          <ul>
            {pastEvents.map((event) => (
              <li key={event.id}>
                <div className="event-card">
                  <div className="event-banner">
                    <img
                      src={
                        `http://localhost:3001/${event.banner}` || eventBanner
                      }
                      alt={event.title}
                    />
                  </div>
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>

                    <div className="event-meta">
                      <div className="meta-item">
                        <FaCalendarAlt className="meta-icon" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="meta-item">
                        <FaClock className="meta-icon" />
                        <span>
                          {convertTo12HourFormat(
                            event.event_time.substring(0, 5),
                          )}
                        </span>
                      </div>
                      <div className="meta-item">
                        <FaMapMarkerAlt className="meta-icon" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="event-actions">
                      <a
                        href={event.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="register-button"
                      >
                        Register Now
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-events">No past events to display.</p>
        )}
      </section>
    </div>
  );
};

export default Events;
