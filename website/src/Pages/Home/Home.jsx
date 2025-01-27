import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaGraduationCap, FaUsers, FaBriefcase, FaCalendarAlt, FaLightbulb, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Spokane from "../../Assets/Spokane.jpeg";

const features = [
  {
    icon: <FaGraduationCap />,
    title: "Academic Excellence",
    description: "Access resources and support for your academic journey in engineering."
  },
  {
    icon: <FaUsers />,
    title: "Professional Network",
    description: "Connect with peers, professors, and industry professionals."
  },
  {
    icon: <FaBriefcase />,
    title: "Career Opportunities",
    description: "Discover internships and job opportunities in engineering."
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation Hub",
    description: "Stay updated with the latest technological advancements."
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
  return (
    <div className="home-container" style={{ backgroundImage: `url(${Spokane})` }}>
      <div className="content-overlay">
        <section className="hero-section">
          <h1 className="hero-title">IEEE Spokane</h1>
          <p className="hero-subtitle">Where Engineering meets Social, Academic, and Professional Growth</p>
          <div className="cta-buttons">
            <Link to="/contact" className="button-primary">
              Join Us Today
            </Link>
            <Link to="/officers" className="button-secondary">
              Meet Our Team
            </Link>
          </div>
        </section>

        <section className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card animate-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </section>

        {upcomingEvent && (
          <section className="upcoming-event-section">
            <h2>Upcoming Event</h2>
            <div className="event-card-home">
              {upcomingEvent.bannerImage && (
                <div className="event-banner-home">
                  <img src={upcomingEvent.bannerImage} alt={upcomingEvent.title} />
                </div>
              )}
              <div className="event-content-home">
                <h3 className="event-title-home">{upcomingEvent.title}</h3>
                <p className="event-description-home">{upcomingEvent.description}</p>
                
                <div className="event-details-home">
                  <div className="detail-item-home">
                    <FaCalendarAlt className="detail-icon" />
                    <span>{formatDate(upcomingEvent.date)}</span>
                  </div>
                  <div className="detail-item-home">
                    <FaClock className="detail-icon" />
                    <span>{upcomingEvent.time}</span>
                  </div>
                  <div className="detail-item-home">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{upcomingEvent.location}</span>
                  </div>
                </div>

                <div className="event-actions-home">
                  <a href={upcomingEvent.registration} target="_blank" rel="noopener noreferrer" className="register-button-home">
                    Register Now
                  </a>
                  <Link to="/events" className="view-all-events-button">
                    View All Events
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;

/*const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <Slider {...settings}>
  <div>
    <img src={Spokane} alt="" />
  </div>
  <div>
  <img src={AdobeStock_1} alt="" />
  </div>
  <div>
  <img src={AdobeStock_2} alt="" />
  </div>
  <div>
  <img src={AdobeStock_3} alt="" />
  </div>
  <div>
  <img src={AdobeStock_4} alt="" />
  </div>
  <div>
  <img src={AdobeStock_5} alt="" />
  </div>

      </Slider>*/