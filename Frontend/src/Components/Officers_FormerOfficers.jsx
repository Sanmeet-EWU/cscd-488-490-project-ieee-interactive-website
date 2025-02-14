import React from "react";
import "./Officers_FormerOfficers.css";

const OfficersCard = ({ name, title, email, icon, onAboutClick }) => {
  return (
    <div className="officer-card">
      <div className="officer-image">{icon}</div>
      <div className="officer-info">
        <h3 className="officer-name">{name}</h3>
        <p className="officer-title">{title}</p>
        <p className="officer-email">{email}</p>
        <button className="about-button" onClick={onAboutClick}>
          About Me
        </button>
      </div>
    </div>
  );
};

export default OfficersCard;
