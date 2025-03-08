import React, { useEffect, useState } from "react";
import OfficersCard from "../../Components/Officers_FormerOfficers";
import "./FormerOfficers.css";
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import request from "../../api/axiosConfig";

// OfficersGrid component displays a categorized grid of former officers
const OfficersGrid = () => {
  // State to store the currently selected officer for displaying bio details in a modal
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  // State to store all officers fetched from the API
  const [officers, setOfficers] = useState([]);

  // Function to get the appropriate social media icon for a given platform
  const getSocialMediaIcon = (platform) => {
    switch (platform) {
      case "LinkedIn":
        return <FaLinkedin size={24} color="#0A66C2" />;
      case "Instagram":
        return <FaInstagram size={24} color="#E1306C" />;
      case "GitHub":
        return <FaGithub size={24} color="#333333" />;
      default:
        return null;
    }
  };

  // Fetch officers data from the API
  const fetchOfficers = async () => {
    try {
      const data = await request("get", "/officers");
      setOfficers(data);
    } catch (error) {
      console.error("Error fetching officers:", error);
    }
  };

  // useEffect hook to fetch officers data when the component mounts
  useEffect(() => {
    fetchOfficers();
  }, []);

  // Handler to display the selected officer's bio in a modal
  const handleBioClick = (officer) => {
    setSelectedOfficer(officer);
  };

  // Handler to close the modal by clearing the selected officer
  const handleClosemodal = () => {
    setSelectedOfficer(null);
  };

  // Filter out only former officers from the fetched officers data
  const formerOfficers = officers.filter(
    (officer) => officer.is_former_officer === 1,
  );

  // Categorize former officers by their chapter_group property
  const categorizedOfficers = formerOfficers.reduce((categories, officer) => {
    const { chapter_group } = officer;
    if (!categories[chapter_group]) {
      categories[chapter_group] = [];
    }
    categories[chapter_group].push(officer);
    return categories;
  }, {});

  // Mapping from chapter_group identifiers to their display names
  const SECTION_MAPPING = {
    sc: "Spokane Section",
    power: "Chapter: Power & Energy Society",
    comp: "Joint Chapter: Antennas and Propagation, Circuits and Systems, Electron Devices, Computer, and Control System Societies",
    tech: "Joint Chapter: Technology Management and Industry Application Societies",
    yp: "Affinity Group: Young Professionals (YP)",
    wie: "Affinity Group: Women In Engineering (WIE)",
  };

  return (
    <div className="officers-page">
      <h1 className="page-title">Former Officers</h1>

      {/* Render a section for each category of former officers */}
      {Object.keys(categorizedOfficers).map((chapterGroup, index) => (
        <div key={index} className="officer-category">
          <h2 className="section-title">{SECTION_MAPPING[chapterGroup]}</h2>
          <div className="officers-grid">
            {/* Render an OfficersCard for each officer in the current chapter group */}
            {categorizedOfficers[chapterGroup].map((officer, idx) => (
              <OfficersCard
                key={idx}
                name={officer.name}
                title={officer.position}
                email={officer.email}
                // Pass an image as the icon prop for the officer card
                icon={
                  <img
                    src={`${officer.profile}`}
                    alt={officer.name}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                }
                // When "About Me" is clicked, show the bio modal for this officer
                onAboutClick={() => handleBioClick(officer)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Modal for displaying selected officer's bio and social media links */}
      {selectedOfficer && (
        <div className="modal-overlay" onClick={handleClosemodal}>
          {/* Stop propagation so clicking inside the modal doesn't close it */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Button to close the modal */}
            <button className="modal-close" onClick={handleClosemodal}>
              &times;
            </button>
            <div className="modal-header">
              {/* Officer's image in the modal */}
              <div className="modal-icon">
                <img
                  src={`${selectedOfficer.profile}`}
                  alt={selectedOfficer.name}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Officer's basic information */}
              <div className="modal-title">
                <h3>{selectedOfficer.name}</h3>
                <p>{selectedOfficer.position}</p>
                <p className="modal-email">{selectedOfficer.email}</p>
              </div>
            </div>
            <div className="modal-body">
              {/* Officer's bio */}
              <p>{selectedOfficer.bio}</p>
              {/* Display social media icons if available */}
              {selectedOfficer.social_media &&
                selectedOfficer.social_media.length > 0 && (
                  <div className="social-media-icons">
                    <h4>Socials:</h4>
                    <div className="icons-container">
                      {selectedOfficer.social_media.map((social, idx) => (
                        <a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                        >
                          {getSocialMediaIcon(social.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficersGrid;
