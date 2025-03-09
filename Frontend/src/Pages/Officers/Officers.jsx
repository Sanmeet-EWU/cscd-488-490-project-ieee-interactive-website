/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useState, useCallback } from "react";
import OfficersCard from "../../Components/Officers_FormerOfficers";
import "./Officers.css";
import {
  FaUserCircle,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import request from "../../api/axiosConfig";

// OfficersGrid component displays a grid of current officers categorized by section
const OfficersGrid = () => {
  // State to store the officer selected for viewing detailed bio in a modal
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  // State to store officers grouped by their chapter/section
  const [officerSections, setOfficerSections] = useState({});

  // Mapping of chapter group codes to their full display names
  const SECTION_MAPPING = {
    sc: "Spokane Section",
    power: "Chapter: Power & Energy Society",
    comp: "Joint Chapter: Antennas and Propagation, Circuits and Systems, Electron Devices, Computer, and Control System Societies",
    tech: "Joint Chapter: Technology Management and Industry Application Societies",
    yp: "Affinity Group: Young Professionals (YP)",
    wie: "Affinity Group: Women In Engineering (WIE)",
  };

  // Returns the corresponding social media icon for a given platform name
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

  // Processes the fetched officers data by filtering out former officers
  // and grouping the remaining officers by their chapter group
  const processOfficersData = useCallback((officers) => {
    // Filter out former officers (we only want current officers)
    const regularOfficers = officers.filter(
      (officer) => officer.is_former_officer !== 1,
    );
    console.log(regularOfficers);

    // Group the officers by their chapter group
    const grouped = regularOfficers.reduce((acc, officer) => {
      // Get the full section title from the mapping, default to "Other Officers" if not found
      const sectionTitle =
        SECTION_MAPPING[officer.chapter_group] || "Other Officers";

      // Initialize the group if it doesn't exist yet
      if (!acc[sectionTitle]) {
        acc[sectionTitle] = [];
      }

      // Prepare the profile image URL if available
      const profileImageUrl = officer.profile
        ? `${officer.profile}`
        : null;

      // Push the officer's data into the appropriate group
      acc[sectionTitle].push({
        name: officer.name,
        title: officer.position,
        email: officer.email,
        // If a profile image is available, render it as an image; otherwise, use a default icon
        icon: profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={officer.name}
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <FaUserCircle size={150} color="#002855" />
        ),
        bio: officer.bio,
        social_media: officer.social_media,
      });

      return acc;
    }, {});

    return grouped;
  }, []);
  
  const fetchOfficers = useCallback(async () => {
    try {
      const data = await request("get", "/officers");
      const processedData = processOfficersData(data);
      console.log(processedData);
      setOfficerSections(processedData);
    } catch (error) {
      console.error("Error fetching officers:", error);
    }
  }, [processOfficersData]);

  useEffect(() => {
    fetchOfficers();
  }, [fetchOfficers]);


  // Handler to open the modal with the selected officer's details
  const handleBioClick = (officer) => {
    setSelectedOfficer(officer);
  };

  // Handler to close the modal by clearing the selected officer
  const handleClosemodal = () => {
    setSelectedOfficer(null);
  };

  return (
    <div className="officers-page">
      <h1 className="page-title">Officers</h1>

      {/* Render a section for each group of officers */}
      {Object.entries(officerSections).map(([sectionTitle, officers]) => (
        <section key={sectionTitle} className="officer-section">
          <h2 className="section-title">{sectionTitle}</h2>
          <div className="officers-grid">
            {/* Render each officer's card */}
            {officers.map((officer, index) => (
              <OfficersCard
                key={index}
                name={officer.name}
                title={officer.title}
                email={officer.email}
                icon={officer.icon}
                onAboutClick={() => handleBioClick(officer)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Modal to display detailed information for the selected officer */}
      {selectedOfficer && (
        <div className="modal-overlay" onClick={handleClosemodal}>
          {/* Prevent clicks within the modal content from closing the modal */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClosemodal}>
              &times;
            </button>
            <div className="modal-header">
              <div className="modal-icon">{selectedOfficer.icon}</div>
              <div className="modal-title">
                <h3>{selectedOfficer.name}</h3>
                <p>{selectedOfficer.title}</p>
                <p className="modal-email">{selectedOfficer.email}</p>
              </div>
            </div>
            <div className="modal-body">
              <p>{selectedOfficer.bio}</p>
              {/* Display social media icons if available */}
              {selectedOfficer.social_media.length > 0 && (
                <div className="social-media-icons">
                  <h4>Socials:</h4>
                  <div className="icons-container">
                    {selectedOfficer.social_media.map((social, index) => (
                      <a
                        key={index}
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
