import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaGraduationCap, FaUsers, FaBriefcase, FaCalendarAlt, FaLightbulb, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Spokane from "../../Assets/Spokane.jpeg";
import request from '../../api/axiosConfig';

const features = [
  {
    icon: <FaGraduationCap />,
    title: "Academic Excellence",
    description: "Access resources and support for your academic journey in engineering.",
    url: "https://iln.ieee.org/public/TrainingCatalog.aspx"
  },
  {
    icon: <FaUsers />,
    title: "Professional Network",
    description: "Connect with peers, professors, and industry professionals.",
    url: "https://yp.ieee.org/"
  },
  {
    icon: <FaBriefcase />,
    title: "Career Opportunities",
    description: "Discover internships and job opportunities in engineering.",
    url: "https://jobs.ieee.org/"
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation Hub",
    description: "Stay updated with the latest technological advancements.",
    url: "https://ieee-collabratec.ieee.org/"
  },
];

const upcomingEvent = {
  title: "Student Presentations: Rising Stars 2025",
  description: "Join us for an exciting evening of student presentations! STEM Students Welcome! Free Pizza provided.",
  date: "2025-01-30",
  time: "5:00 PM - 6:30 PM",
  location: "EWU Catalyst Building, 601 E Riverside Ave, Room CAT 304",
  type: "Student Event",
  registration: "https://events.vtools.ieee.org/m/462092",
  bannerImage: "/images/events/rising-stars-2025.jpg"
};

const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};


const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const data = await request('get', '/events');

      const now = new Date();

      const futureEvents = data.filter(event => {
        const eventDate = new Date(event.event_date);
        const [hours, minutes] = event.event_time.split(':');
        eventDate.setHours(hours);
        eventDate.setMinutes(minutes);
        return eventDate >= now;
      });


      const sortedUpcomingEvents = futureEvents.sort((a, b) => {
        const dateA = new Date(a.event_date);
        const [hoursA, minutesA] = a.event_time.split(':');
        dateA.setHours(hoursA);
        dateA.setMinutes(minutesA);

        const dateB = new Date(b.event_date);
        const [hoursB, minutesB] = b.event_time.split(':');
        dateB.setHours(hoursB);
        dateB.setMinutes(minutesB);
        return dateA - dateB;
      });

      setUpcomingEvents(sortedUpcomingEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="home-container" style={{ backgroundImage: `url(${Spokane})` }}>
      <div className="content-overlay">
        <section className="hero-section">
          <h1 className="hero-title">IEEE Spokane</h1>
          <p className="hero-subtitle">Where Engineering meets Social, Academic, and Professional Growth</p>
          <div className="cta-buttons">
            <a href="https://www.ieee.org/membership/join/index.html" className="button-primary" target="_blank" rel="noopener noreferrer">
              Join Us Today
            </a>
            <Link to="/officers" className="button-secondary">
              Meet Our Team
            </Link>
          </div>
        </section>

        <section className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              onClick={() => window.open(feature.url, '_blank', 'noopener,noreferrer')} 
              className="feature-card animate-in" 
              style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </section>

        {upcomingEvents.length > 0 && (
          <section className="upcoming-event-section">
            <h2>Upcoming Event{upcomingEvents.length > 1 ? 's' : ''}</h2>
            <div className="event-grid-container">
              {upcomingEvents.map((event) => (
                <div className="event-card-home" key={event.id}>
                  <div className="event-banner-home">
                    <img src={`http://localhost:3001/${event.banner}`} alt={event.title} style={{ height: "400px", objectFit: "cover", width: "100%" }} />
                  </div>
                  <div className="event-content-home">
                    <h3 className="event-title-home">{event.title}</h3>
                    <p className="event-description-home">{event.description}</p>

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
              ))}
            </div> {/* End of grid container */}
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;