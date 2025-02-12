import React, { useEffect, useState } from 'react';
import OfficersCard from '../../Components/Officers_FormerOfficers';
import './Officers.css';
import { FaUserCircle, FaLinkedin, FaInstagram, FaSnapchat, FaYoutube, FaTwitch, FaTwitter, FaFacebook } from 'react-icons/fa';
import request from '../../api/axiosConfig';

const OfficersGrid = () => {
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [officerSections, setOfficerSections] = useState({});

  const SECTION_MAPPING = {
    sc: "Spokane Section",
    power: "Chapter: Power & Energy Society",
    comp: "Joint Chapter: Antennas and Propagation, Circuits and Systems, Electron Devices, Computer, and Control System Societies",
    tech: "Joint Chapter: Technology Management and Industry Application Societies",
    yp: "Affinity Group: Young Professionals (YP)",
    wie: "Affinity Group: Women In Engineering (WIE)",
  };

  const getSocialMediaIcon = (platform) => {
    switch (platform) {
      case 'LinkedIn': return <FaLinkedin size={24} color="#0A66C2" />;
      case 'Instagram': return <FaInstagram size={24} color="#E1306C" />;
      case 'Snapchat': return <FaSnapchat size={24} color="#FFFC00" />;
      case 'Youtube': return <FaYoutube size={24} color="#FF0000" />;
      case 'Twitch': return <FaTwitch size={24} color="#6441A5" />;
      case 'Twitter': return <FaTwitter size={24} color="#1DA1F2" />;
      case 'Facebook': return <FaFacebook size={24} color="#1877F2" />;
      default: return null;
    }
  };

  const processOfficersData = (officers) => {
    const regularOfficers = officers.filter(officer => officer.is_former_officer !== 1);
    console.log(regularOfficers)

    const grouped = regularOfficers.reduce((acc, officer) => {
      const sectionTitle = SECTION_MAPPING[officer.chapter_group] || 'Other Officers';

      if (!acc[sectionTitle]) {
        acc[sectionTitle] = [];
      }

      const profileImageUrl = officer.profile ? `http://localhost:3001/${officer.profile}` : null;

      acc[sectionTitle].push({
        name: officer.name,
        title: officer.position,
        email: officer.email,
        icon: profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={officer.name}
            style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : <FaUserCircle size={150} color="#002855" />,
        bio: officer.bio,
        social_media: officer.social_media,
      });

      return acc;
    }, {});

    return grouped;
  };
  const fetchOfficers = async () => {
    try {
      const data = await request('get', '/officers');
      const processedData = processOfficersData(data);
      console.log(processedData)
      setOfficerSections(processedData);
    } catch (error) {
      console.error('Error fetching officers:', error);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  const handleBioClick = (officer) => {
    setSelectedOfficer(officer);
  };

  const handleClosemodal = () => {
    setSelectedOfficer(null);
  };

  return (
    <div className="officers-page">
      <h1 className="page-title">Officers</h1>

      {Object.entries(officerSections).map(([sectionTitle, officers]) => (
        <section key={sectionTitle} className="officer-section">
          <h2 className="section-title">{sectionTitle}</h2>
          <div className="officers-grid">
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

      {/* Modal remains the same */}
      {selectedOfficer && (
        <div className="modal-overlay" onClick={handleClosemodal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClosemodal}>&times;</button>
            <div className="modal-header">
              <div className="modal-icon">
                {selectedOfficer.icon}
              </div>
              <div className="modal-title">
                <h3>{selectedOfficer.name}</h3>
                <p>{selectedOfficer.title}</p>
                <p className="modal-email">{selectedOfficer.email}</p>
              </div>
            </div>
            <div className="modal-body">
              <p>{selectedOfficer.bio}</p>
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