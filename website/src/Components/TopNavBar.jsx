import React from "react";
import "./TopNavBar.css";
import { FaGlobe, FaBook, FaRocket, FaEllipsisH } from 'react-icons/fa';

const TopNavBar = () => {
  return (
    <nav className="top-nav">
      <div className="nav-links">
        <a 
          href="https://www.ieee.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="nav-link"
        >
          <FaGlobe className="nav-link-icon" />
          IEEE.org
        </a>
        <a 
          href="https://ieeexplore.ieee.org/Xplore/home.jsp"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link special"
        >
          <FaBook className="nav-link-icon" />
          IEEE Xplore Digital Library
        </a>
        <a 
          href="https://standards.ieee.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          <FaRocket className="nav-link-icon" />
          IEEE Standards
        </a>
        <a 
          href="https://spectrum.ieee.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          <FaGlobe style={{ marginRight: '5px' }} /> IEEE Spectrum
        </a>
        <a 
          href="https://www.ieee.org/sitemap.html"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          <FaEllipsisH className="nav-link-icon" />
          More Sites
        </a>
      </div>
    </nav>
  );
};

export default TopNavBar;