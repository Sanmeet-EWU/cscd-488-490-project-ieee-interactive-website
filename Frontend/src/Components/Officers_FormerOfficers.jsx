import React from "react"; // Import React library
import "./Officers_FormerOfficers.css"; // Import CSS file for styling the officer card component

// OfficersCard component renders a card for an officer with their image/icon, information, and an "About Me" button
const OfficersCard = ({ name, title, email, icon, onAboutClick }) => {
  return (
    <div className="officer-card">
      <div className="officer-image">{icon}</div>
      <div className="officer-info">
        <h3 className="officer-name">{name}</h3>
        <p className="officer-title">{title}</p>
        <p className="officer-email">{email}</p>
        {/* Button that triggers the onAboutClick callback when clicked */}
        <button className="about-button" onClick={onAboutClick}>
          About Me
        </button>
      </div>
    </div>
  );
};

export default OfficersCard; // Export the OfficersCard component for use in other parts of the application
