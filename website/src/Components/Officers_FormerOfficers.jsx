import React from 'react';
import './OfficersCard.css'; // Import the CSS file

const OfficersCard = ({ name, title, email, image, onAboutClick }) => {
  return (
    <div className="officer-card" title={`Officer: ${name}`}>
      <div className="officer-card-header">
        <div className="officer-card-details">
          <h3 className="officer-name" title={title}>{name}</h3>
          <p className="officer-title">{title}</p>
          <hr className="officer-divider" />
          <a href={`mailto:${email}`} className="officer-email">{email}</a>
        </div>
        <img
          src={image}
          alt={`${name}'s profile`}
          className="officer-image"
        />
      </div>
      <div className="officer-card-footer">
        <button className="officer-about-button" onClick={onAboutClick}>
          About
        </button>
      </div>
    </div>
  );
};

export default OfficersCard;
