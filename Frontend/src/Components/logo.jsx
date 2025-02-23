import React from "react"; // Import React to build the component
import { Link } from "react-router-dom"; // Import Link to create internal navigation links
import "./Logo.css"; // Import CSS file for styling the logo component
import ieeeLogo from "../Assets/IEEE.png"; // Import the IEEE logo image asset

// Logo component renders the header logo that links back to the homepage
const Logo = () => {
  return (
    <header className="logo-header">
      {/* Link component to navigate to the homepage when clicked */}
      <Link to="/" className="logo-link">
        {/* Display the IEEE logo image with appropriate alt text for accessibility */}
        <img src={ieeeLogo} alt="IEEE Logo" className="ieee-logo" />
      </Link>
    </header>
  );
};

export default Logo; // Export the Logo component for use in other parts of the application
