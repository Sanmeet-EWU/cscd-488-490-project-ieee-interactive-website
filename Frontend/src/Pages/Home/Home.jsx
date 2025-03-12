import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {
  FaGraduationCap,
  FaUsers,
  FaBriefcase,
  FaCalendarAlt,
  FaLightbulb,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import Spokane from "../../Assets/Spokane.jpeg";
import request from "../../api/axiosConfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define a list of feature cards to display on the home page
const features = [
  {
    icon: <FaGraduationCap />, // Icon representing academic resources
    title: "IEEE Learning Network",
    description:
      "Access resources and support for your academic journey in engineering.",
    url: "https://iln.ieee.org/public/TrainingCatalog.aspx",
  },
  {
    icon: <FaUsers />, // Icon representing networking opportunities
    title: "Young Professional Network",
    description: "Connect with peers, professors, and industry professionals.",
    url: "https://yp.ieee.org/",
  },
  {
    icon: <FaBriefcase />, // Icon representing career opportunities
    title: "Career Opportunities",
    description: "Discover internships and job opportunities in engineering.",
    url: "https://jobs.ieee.org/",
  },
  {
    icon: <FaLightbulb />, // Icon representing collaborative ideas and projects
    title: "IEEE Collaboratec",
    description: "Collaborate and connect with IEEE communities.",
    url: "https://ieee-collabratec.ieee.org/",
  },
];

// Utility function to create a date object from a date string without timezone issues
const createLocalDate = (dateString) => {
  // Parse the YYYY-MM-DD part only to avoid timezone issues
  const dateParts = dateString.split('T')[0].split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JS
  const day = parseInt(dateParts[2], 10);
  
  return new Date(year, month, day);
};

// Utility function to format a date string into a readable format
const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  // Create a date object and ensure it's treated as a local date
  // by parsing the YYYY-MM-DD part only
  const dateParts = dateString.split('T')[0].split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JS
  const day = parseInt(dateParts[2], 10);
  
  const date = new Date(year, month, day);
  return date.toLocaleDateString("en-US", options);
};

// Convert time from 24-hour format to 12-hour format with AM/PM
const convertTo12HourFormat = (time24) => {
  const [hours, minutes] = time24.split(":");
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour}:${minutes} ${ampm}`;
};

// Home component for the IEEE Spokane homepage
const Home = () => {
  // State to store upcoming events fetched from the API
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Function to fetch events from the API and filter/sort upcoming events
  const fetchEvents = async () => {
    try {
      // Fetch events data from the backend
      const data = await request("get", "/events");

      const now = new Date();
      
      // Set hours, minutes, seconds, and milliseconds to 0 for today's date comparison
      const today = new Date(now);
      today.setHours(0, 0, 0, 0);

      // Filter out events that occur in the future
      const futureEvents = data.filter((event) => {
        // Create a date object for the event date without timezone issues
        const eventDate = createLocalDate(event.event_date);
        
        // Create a date object with just the date part (no time) for comparison
        const eventDateOnly = new Date(eventDate);
        eventDateOnly.setHours(0, 0, 0, 0);
        
        // If the event is today, compare with the time
        if (eventDateOnly.getTime() === today.getTime()) {
          // Extract hours and minutes from the event time
          const [hours, minutes] = event.event_time.split(":");
          const eventDateTime = new Date(eventDate);
          eventDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
          
          return eventDateTime >= now; // Include events that occur after current time
        }
        
        // For other dates, just compare the dates
        return eventDateOnly >= today; // Include events that occur on or after today
      });

      // Sort upcoming events chronologically
      const sortedUpcomingEvents = futureEvents.sort((a, b) => {
        const dateA = createLocalDate(a.event_date);
        const [hoursA, minutesA] = a.event_time.split(":");
        dateA.setHours(parseInt(hoursA, 10), parseInt(minutesA, 10), 0, 0);

        const dateB = createLocalDate(b.event_date);
        const [hoursB, minutesB] = b.event_time.split(":");
        dateB.setHours(parseInt(hoursB, 10), parseInt(minutesB, 10), 0, 0);
        return dateA - dateB;
      });

      // Update the state with the sorted upcoming events
      setUpcomingEvents(sortedUpcomingEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Custom slider settings based on number of events
  const getSliderSettings = (events) => {
    // If there's only one event, don't use a slider
    if (events.length <= 1) {
      return null;
    }

    // For multiple events, use a proper slider that shows one event at a time
    return {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      centerMode: false
    };
  };

  // Render a single event card
  const renderEventCard = (event) => (
    <div className="event-card-home" key={event.id}>
      <div className="event-banner-home">
        <img
          src={`${event.banner}`}
          alt={event.title2}
          style={{
            height: "400px",
            objectFit: "cover",
            width: "100%",
          }}
        />
      </div>
      <div className="event-content-home">
        <h3 className="event-title-home">{event.title2}</h3>
        <p className="event-description-home">
          {event.description}
        </p>

        <div className="event-details-home">
          <div className="detail-item-home">
            <FaCalendarAlt className="detail-icon" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          <div className="detail-item-home">
            <FaClock className="detail-icon" />
            <span>{convertTo12HourFormat(event.event_time.substring(0, 5))}</span>
          </div>
          <div className="detail-item-home">
            <FaMapMarkerAlt className="detail-icon" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="event-actions-home">
          <Link to="/events" className="view-all-events-button">
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );

  // useEffect to fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    // Main container with a background image (Spokane)
    <div
      className="home-container"
      style={{ backgroundImage: `url(${Spokane})` }}
    >
      {/* Semi-transparent overlay to improve text readability */}
      <div className="content-overlay">
        {/* Hero section with title, subtitle, and call-to-action buttons */}
        <section className="hero-section">
          <h1 className="hero-title">IEEE Spokane</h1>
          <p className="hero-subtitle">
            Where Engineering meets Social, Academic, and Professional Growth
          </p>
          <div className="cta-buttons">
            {/* External link to join IEEE membership */}
            <a
              href="https://www.ieee.org/membership/join/index.html"
              className="button-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Us Today
            </a>
            {/* Internal link to view officers/team */}
            <Link to="/officers" className="button-secondary">
              Meet Our Team
            </Link>
          </div>
        </section>

        {/* Features grid: display various IEEE resources as clickable cards */}
        <section className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() =>
                window.open(feature.url, "_blank", "noopener,noreferrer")
              }
              className="feature-card animate-in"
              style={{ animationDelay: `${index * 0.1}s`, cursor: "pointer" }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Upcoming events section: display upcoming events if available */}
        {upcomingEvents.length > 0 && (
          <section className="upcoming-event-section">
            <h2>Upcoming Event{upcomingEvents.length > 1 ? "s" : ""}</h2>
            {getSliderSettings(upcomingEvents) ? (
              <Slider {...getSliderSettings(upcomingEvents)} className="event-slider">
                {upcomingEvents.map((event) => (
                  <div key={event.id}>
                    {renderEventCard(event)}
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="single-event-container">
                {renderEventCard(upcomingEvents[0])}
              </div>
            )}
          </section>
        )}
        
        {/* Testimonial section: display member testimonials */}
        {/* 
        <h2 className="testimonial-title">What Our Members Say</h2>
        <hr className="divider" />
        <div className="testimonial-grid">
          <div className="testimonial">
            <div className="stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>☆</span>
            </div>
            <p className="testimonial-quote">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua."
            </p>
            <div className="testimonial-author">- John Doe, Student</div>
          </div>

          <div className="testimonial">
            <div className="stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <p className="testimonial-quote">
              "Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat."
            </p>
            <div className="testimonial-author">- Jane Smith, Professional</div>
          </div>

          <div className="testimonial">
            <div className="stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <p className="testimonial-quote">
              "Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur."
            </p>
            <div className="testimonial-author">- Sam Johnson, Engineer</div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default Home;
