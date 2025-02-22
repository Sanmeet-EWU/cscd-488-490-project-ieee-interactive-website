import React from "react";
import "./Footer.css";

// Footer component that renders the websites footer section
const Footer = () => {
  return (
    <footer className="footer">
      {/* Navigation Links */}
      <div className="footer-nav">
        <a href="http://localhost:3000/">Home</a>
        <span> | </span>
        <a href="https://www.ieee.org/sitemap.html">Sitemap</a>
        <span> | </span>
        <a href="https://www.ieee.org/accessibility-statement.html">
          Accessibility
        </a>
        <span> | </span>
        <a href="https://www.ieee.org/about/corporate/governance/p9-26.html">
          Nondiscrimination Policy
        </a>
        <span> | </span>
        <a href="https://www.ieee.org/about/help/site-terms-conditions.html">
          Terms and Conditions
        </a>
        <span> | </span>
        <a href="https://www.ieee.org/security-privacy.html">
          IEEE Privacy Policy
        </a>
      </div>

      {/* Copyright Text */}
      <p className="footer-text">
        © Copyright 2024 IEEE – All rights reserved. Use of this website
        signifies your agreement to the IEEE Terms and Conditions. A
        not-for-profit organization, IEEE is the world’s largest technical
        professional organization dedicated to advancing technology for the
        benefit of humanity.
      </p>

      {/* Social Media Links */}
      <div className="social-icons">
        <a
          href="https://www.youtube.com/user/IEEEorg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/youtube.png"
            alt="Youtube"
          />
        </a>
        <a
          href="https://x.com/IEEEorg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/twitter.png"
            alt="Twitter"
          />
        </a>
        <a
          href="https://www.facebook.com/ieeespokane/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/facebook.png"
            alt="Facebook"
          />
        </a>
        <a
          href="https://www.linkedin.com/company/ieee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/linkedin.png"
            alt="LinkedIn"
          />
        </a>
        <a
          href="https://www.instagram.com/ieeeypspokane/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/instagram-new.png"
            alt="Instagram"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
