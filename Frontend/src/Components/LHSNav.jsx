import React, { useState, useEffect } from "react"; // Import React and hooks for state management and side effects
import { Link, useLocation } from "react-router-dom"; // Import Link for internal routing and useLocation to track route changes
import "./LHSNav.css"; // Import CSS for styling the navigation component
import {
  FaHome,
  FaUsers,
  FaHistory,
  FaEnvelope,
  FaBriefcase,
  FaLock,
  FaCalendarAlt,
  FaRegImages,
} from "react-icons/fa"; // Import icons for menu items from react-icons

// Left-Hand Side Navigation component
const LHSNav = () => {
  // State to track if the navigation menu is open or closed (for responsive/hamburger menu)
  const [isOpen, setIsOpen] = useState(false);
  // Get the current location to determine active links and for closing the menu on route changes
  const location = useLocation();

  // Define the list of menu items with their paths, icons, labels, and if they're internal links
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
      label: "Former Officers",
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
      // External link to IEEE job site
      path: "https://jobs.ieee.org/jobs/?keywords=&pos_flt=0&location=Spokane%2C+WA%2C+United+States&location_completion=city%3DSpokane%24state%3DWashington%24country%3DUnited+States&location_type=city&location_text=Spokane%2C+WA%2C+United+States&location_autocomplete=true&radius=320",
      icon: <FaBriefcase className="nav-icon" />,
      label: "IEEE Job Site",
      internal: false,
    },
    {
      path: "/admin",
      icon: <FaLock className="nav-icon" />,
      label: "Admin",
      internal: true,
    },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Function to render individual menu items based on whether they are internal or external
  const renderMenuItem = (item, index) => {
    // Common content for the menu item: icon and label
    const itemContent = (
      <>
        <div className="menu-icon">{item.icon}</div>
        <span className="menu-label">{item.label}</span>
      </>
    );

    // For internal links, use Link component from react-router-dom
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
      // For external links, use a regular anchor tag with appropriate attributes
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
    // Main navigation container with dynamic class based on isOpen state for responsive behavior
    <nav className={`navigation ${isOpen ? "nav-open" : ""}`}>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
      </button>

      {/* Container for menu items; visible when isOpen is true */}
      <div className={`menu-items ${isOpen ? "show" : ""}`}>
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </div>

      {/* Optional overlay to close the menu when clicking outside */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </nav>
  );
};

export default LHSNav;
