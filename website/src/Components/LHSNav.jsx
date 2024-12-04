import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./LHSNav.css"; // Ensure your styles are correct

// Import page components
import Home from "../Pages/Home/Home";
import Events from "../Pages/Events/Events";
import Officers from "../Pages/Officers/Officers";
import FormerOfficers from "../Pages/FormerOfficers/FormerOfficers";
import ContactForm from "../Pages/ContactForm/ContactForm";
import Employment from "../Pages/Employment/Employment";

const LHSNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      {/* Navigation is always displayed */}
      <div className="lhs-nav">
        <button className="toggle-button" onClick={toggleMenu}>
          ☰ Menu
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <Link to="/">Home</Link> {/* Default */}
            <Link to="/Events">
              <img
                src=" https://img.icons8.com/forma-regular/24/planner.png"
                alt="Events Icon"
                style={{ marginRight: "10px" }}
              />
              Events
            </Link>
            <Link to="/Officers">
              <img
                src="https://img.icons8.com/forma-regular/24/user-male-circle.png"
                alt="Officers Icon"
                style={{ marginRight: "10px" }}
              />
              Officers
            </Link>
            <Link to="/FormerOfficers">
              <img
                src="https://img.icons8.com/forma-regular/24/guest-male.png"
                alt="Former Officers Icon"
                style={{ marginRight: "10px" }}
              />
              Former Officers
            </Link>
            <Link to="/ContactForm">
              <img
                src="https://img.icons8.com/forma-regular/24/new-post.png"
                alt="Contact Form Icon"
                style={{ marginRight: "10px" }}
              />
              Contact Form
            </Link>
            <Link to="/Employment">
              <img
                src="https://img.icons8.com/forma-regular/24/briefcase.png"
                alt="Contact Form Icon"
                style={{ marginRight: "10px" }}
              />
              Employment
            </Link>
          </div>
        )}
      </div>

      {/* Routes all of the web pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Officers" element={<Officers />} />
        <Route path="/FormerOfficers" element={<FormerOfficers />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/Employment" element={<Employment />} />
      </Routes>
    </Router>
  );
};

export default LHSNav;
