import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import "./Events.css";
import request from "../../api/axiosConfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Utility function to convert a 24-hour time string (e.g., "14:30") to a 12-hour format with AM/PM
const convertTo12HourFormat = (time24) => {
  const [hours, minutes] = time24.split(":");
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM"; // Determine if time is AM or PM

  hour = hour % 12; // Convert to 12-hour format
  if (hour === 0) hour = 12; // Handle midnight

  return `${hour}:${minutes} ${ampm}`; // Return the formatted time string
};

// Utility function to format a date string into a more readable format
const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options); // Format date with given options
};

const Events = () => {
  // State to store upcoming events and past events separately
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  // Function to fetch events from the API and separate them into upcoming and past events
  const fetchEvents = async () => {
    try {
      // Fetch event data from the API
      const data = await request("get", "/events");
      const now = new Date(); // Get current date and time

      // Filter events to get only future events based on event date and time
      const futureEvents = data.filter((event) => {
        const eventDate = new Date(event.event_date);
        // Extract hours and minutes from the event time and set them on the eventDate
        const [hours, minutes] = event.event_time.split(":");
        eventDate.setHours(hours);
        eventDate.setMinutes(minutes);
        return eventDate >= now; // Include events that occur after now
      });

      // Filter events to get past events (those that occurred before the current date/time)
      const pastEventsData = data.filter((event) => {
        const eventDate = new Date(event.event_date);
        const [hours, minutes] = event.event_time.split(":");
        eventDate.setHours(hours);
        eventDate.setMinutes(minutes);
        return eventDate < now; // Include events that occurred before now
      });

      // Sort upcoming events chronologically
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

      // Update state: sorted upcoming events and reversed past events (most recent first)
      setUpcomingEvents(sortedUpcomingEvents);
      setPastEvents(pastEventsData.reverse());
    } catch (error) {
      // Log any errors that occur during fetching
      console.error("Error fetching events:", error);
    }
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    centerMode: false,
  };

  // useEffect to fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      {/* Header section with title and description */}
      <div className="events-header">
        <h1>IEEE Events</h1>
        <p>Join us for exciting events and opportunities!</p>
      </div>

      {/* Upcoming events section */}
      <section className="upcoming-events-section">
        <h2>Upcoming Event{upcomingEvents.length > 1 ? "s" : ""}</h2>
        {upcomingEvents.length > 0 ? (
          <Slider {...sliderSettings} className="event-slider">
            {upcomingEvents.map((event) => (
              <div className="event-slide" key={event.id}>
                <div className="event-card">
                  {/* Event banner image */}
                  <div className="event-banner">
                    <img
                      src={`http://localhost:3001/${event.banner}`}
                      alt={event.title}
                    />
                  </div>
                  {/* Event content details */}
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>

                    {/* Event metadata: date, time, and location */}
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

                    {/* Action button to register for the event */}
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
              </div>
            ))}
          </Slider>
        ) : (
          // Message to display when there are no upcoming events
          <p className="no-events">
            No upcoming events scheduled yet. Check back later!
          </p>
        )}
      </section>

      {/* Past events section */}
      <section className="past-events-section">
        <h2>Past Events</h2>
        {pastEvents.length > 0 ? (
          <Slider {...sliderSettings} className="event-slider">
            {pastEvents.map((event) => (
              <div className="event-slide" key={event.id}>
                <div className="event-card">
                  {/* Event banner image */}
                  <div className="event-banner">
                    <img
                      src={`http://localhost:3001/${event.banner}`}
                      alt={event.title}
                    />
                  </div>
                  {/* Event content details */}
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>

                    {/* Event metadata: date, time, and location */}
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

                    {/* Action button to register for the event */}
                    <div className="event-actions">
                      <a
                        href={event.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="register-button"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          // Message to display when there are no past events
          <p className="no-events">No past events to display.</p>
        )}
      </section>
    </div>
  );
};

export default Events;
