import React from "react";
import "./TopNavBar.css";

const TopNavBar = () => {
  return (
    <div className="nav-container">
      <div className="top-nav-bar">
        <a
          href="https://www.ieee.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-sm font-medium"
        >
          IEEE.org
        </a>
        <span className="divider">|</span>
        <a
          href="https://ieeexplore.ieee.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-sm font-medium"
        >
          IEEE Xplore Digital Library
        </a>
        <span className="divider">|</span>
        <a
          key="ieee-standards"
          href="https://standards.ieee.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          IEEE Standards
        </a>
        <span className="divider">|</span>
        <a
          key="ieee-spectrum"
          href="https://spectrum.ieee.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          IEEE Spectrum
        </a>
        <span className="divider">|</span>
        <a
          key="more-sites"
          href="https://www.ieee.org/more-sites"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          More Sites
        </a>
        </div>
    </div>
  );
};

export default TopNavBar;