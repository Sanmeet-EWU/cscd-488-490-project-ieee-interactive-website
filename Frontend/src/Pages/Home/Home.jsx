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

// Utility function to format a date string into a readable format
const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
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

      // Filter out events that occur in the future
      const futureEvents = data.filter((event) => {
        const eventDate = new Date(event.event_date);
        // Extract hours and minutes from the event time and set on eventDate
        const [hours, minutes] = event.event_time.split(":");
        eventDate.setHours(hours);
        eventDate.setMinutes(minutes);
        return eventDate >= now;
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

      // Update the state with the sorted upcoming events
      setUpcomingEvents(sortedUpcomingEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

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
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={5000}
              arrows={true}
              className="event-slider"
              centerMode={false}
            >
              {upcomingEvents.map((event) => (
                <div className="event-slide" key={event.id}>
                  <div className="event-card-home">
                    <div className="event-banner-home">
                      <img
                        src={`http://localhost:3001/${event.banner}`}
                        alt={event.title}
                        style={{
                          height: "400px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div className="event-content-home">
                      <h3 className="event-title-home">{event.title}</h3>
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
                          <span>{event.event_time}</span>
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
                </div>
              ))}
            </Slider>
          </section>
        )}

        {/* Testimonial section: display member testimonials */}
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
            <p className="testimonial-author">- John Doe</p>
          </div>
          <div className="testimonial">
            <div className="stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>☆</span>
            </div>
            <p className="testimonial-quote">
              "Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat."
            </p>
            <p className="testimonial-author">- Jane Smith</p>
          </div>
          <div className="testimonial">
            <div className="stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>☆</span>
            </div>
            <p className="testimonial-quote">
              "Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur."
            </p>
            <p className="testimonial-author">- Alex Johnson</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
