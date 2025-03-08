import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./LHSNav.css";
import {
  FaHome,
  FaUsers,
  FaHistory,
  FaEnvelope,
  FaBriefcase,
  FaCalendarAlt,
  FaGlobe,
} from "react-icons/fa";

const LHSNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      icon: <FaHome className="nav-icon" />,
      label: "Home",
      internal: true,
    },
    {
      path: "/events",
      icon: <FaCalendarAlt className="nav-icon" />,
      label: "Events",
      internal: true,
    },
    {
      path: "/officers",
      icon: <FaUsers className="nav-icon" />,
      label: "Officers",
      internal: true,
    },
    {
      path: "/former-officers",
      icon: <FaHistory className="nav-icon" />,
      label: "Officer History",
      internal: true,
    },
    {
      path: "/society-chapters",
      icon: <FaGlobe className="nav-icon" />,
      label: "Society Chapters",
      internal: true,
    },
    /*
    {
      path: "/photo-gallery",
      icon: <FaRegImages className="nav-icon" />,
      label: "Photo Gallery",
      internal: true,
    },*/
    {
      path: "/contact",
      icon: <FaEnvelope className="nav-icon" />,
      label: "Contact Form",
      internal: true,
    },
    {
      path: "https://jobs.ieee.org/jobs/?keywords=&pos_flt=0&location=Spokane%2C+WA%2C+United+States&location_completion=city%3DSpokane%24state%3DWashington%24country%3DUnited+States&location_type=city&location_text=Spokane%2C+WA%2C+United+States&location_autocomplete=true&radius=320",
      icon: <FaBriefcase className="nav-icon" />,
      label: "IEEE Job Site",
      internal: false,
    },
    /*{
      path: "/admin",
      icon: <FaLock className="nav-icon" />,
      label: "Admin",
      internal: true,
    },*/
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const renderMenuItem = (item, index) => {
    const itemContent = (
      <>
        <div className="menu-icon">{item.icon}</div>
        <span className="menu-label">{item.label}</span>
      </>
    );

    if (item.internal) {
      return (
        <Link
          key={index}
          to={item.path}
          className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
        >
          {itemContent}
        </Link>
      );
    }

    return (
      <a
        key={index}
        href={item.path}
        className="menu-item"
        target="_blank"
        rel="noopener noreferrer"
      >
        {itemContent}
      </a>
    );
  };

  return (
    <nav className={`navigation ${isOpen ? "nav-open" : ""}`}>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
      </button>

      <div className={`menu-items ${isOpen ? "show" : ""}`}>
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </div>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </nav>
  );
};

export default LHSNav;
