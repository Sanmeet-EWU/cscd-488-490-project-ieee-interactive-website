import React from "react"; // Import React library
import "./TopNavBar.css"; // Import CSS for styling the top navigation bar
import { FaGlobe, FaBook, FaRocket, FaEllipsisH } from "react-icons/fa"; // Import specific icons from react-icons

// TopNavBar component renders a horizontal navigation bar with external links to IEEE sites
const TopNavBar = () => {
  return (
    <nav className="top-nav">
      {/* Container for the navigation links */}
      <div className="nav-links">
        {/* Link to IEEE.org */}
        <a
          href="https://www.ieee.org/"
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security measure to prevent access to window.opener
          className="nav-link"
        >
          {/* Icon for IEEE.org */}
          <FaGlobe className="nav-link-icon" />
          IEEE.org
        </a>

        {/* Link to IEEE Xplore Digital Library */}
        <a
          href="https://ieeexplore.ieee.org/Xplore/home.jsp"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link special" // Additional styling for special link
        >
          {/* Icon for IEEE Xplore */}
          <FaBook className="nav-link-icon" />
          IEEE Xplore Digital Library
        </a>

        {/* Link to IEEE Standards */}
        <a
          href="https://standards.ieee.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          {/* Icon for IEEE Standards */}
          <FaRocket className="nav-link-icon" />
          IEEE Standards
        </a>

        {/* Link to IEEE Spectrum */}
        <a
          href="https://spectrum.ieee.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          {/* Inline style applied to icon for spacing */}
          <FaGlobe style={{ marginRight: "5px" }} /> IEEE Spectrum
        </a>

        {/* Link for "More Sites" */}
        <a
          href="https://www.ieee.org/sitemap.html"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          {/* Icon for additional sites */}
          <FaEllipsisH className="nav-link-icon" />
          More Sites
        </a>
      </div>
    </nav>
  );
};

export default TopNavBar; // Export the TopNavBar component for use in other parts of the application
