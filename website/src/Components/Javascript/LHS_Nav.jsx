import React, { useState } from "react";
import "./SideNav.css"; // Create this file for custom styles

const LHSNav = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility

  // Toggle the dropdown visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lhs-nav">
      <button className="toggle-button" onClick={toggleMenu}>
        ☰ Menu {/* A hamburger icon */}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="dropdown-menu">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
      )}
    </div>
  );
};

export default LHSNav;
