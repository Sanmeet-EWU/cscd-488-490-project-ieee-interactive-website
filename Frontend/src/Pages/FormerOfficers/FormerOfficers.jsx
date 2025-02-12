import React, { useEffect, useState } from 'react';
import OfficersCard from '../../Components/Officers_FormerOfficers';
import './FormerOfficers.css';
import { FaLinkedin, FaInstagram, FaSnapchat, FaYoutube, FaTwitch, FaTwitter, FaFacebook } from 'react-icons/fa';
import request from '../../api/axiosConfig';

const OfficersGrid = () => {
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [officers, setOfficers] = useState([]);

  const getSocialMediaIcon = (platform) => {
    switch (platform) {
      case 'LinkedIn':
        return <FaLinkedin size={24} color="#0A66C2" />;
      case 'Instagram':
        return <FaInstagram size={24} color="#E1306C" />;
      case 'Snapchat':
        return <FaSnapchat size={24} color="#FFFC00" />;
      case 'Youtube':
        return <FaYoutube size={24} color="#FF0000" />;
      case 'Twitch':
        return <FaTwitch size={24} color="#6441A5" />;
      case 'Twitter':
        return <FaTwitter size={24} color="#1DA1F2" />;
      case 'Facebook':
        return <FaFacebook size={24} color="#1877F2" />;
      default:
        return null;
    }
  };

  const fetchOfficers = async () => {
    try {
      const data = await request('get', '/officers');
      setOfficers(data); 
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

  const formerOfficers = officers.filter(officer => officer.is_former_officer === 1);

  const categorizedOfficers = formerOfficers.reduce((categories, officer) => {
    const { chapter_group } = officer;
    if (!categories[chapter_group]) {
      categories[chapter_group] = [];
    }
    categories[chapter_group].push(officer);
    return categories;
  }, {});

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

      {Object.keys(categorizedOfficers).map((chapterGroup, index) => (
        <div key={index} className="officer-category">
          <h2 className="section-title">{SECTION_MAPPING[chapterGroup]}</h2>
          <div className="officers-grid">
            {categorizedOfficers[chapterGroup].map((officer, idx) => (
              <OfficersCard
                key={idx}
                name={officer.name}
                title={officer.position}
                email={officer.email}
                icon={
                  <img 
                    src={`http://localhost:3001/${officer.profile}`} 
                    alt={officer.name} 
                    style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }} 
                  />
                }
                onAboutClick={() => handleBioClick(officer)}
              />
            ))}
          </div>
        </div>
      ))}

      {selectedOfficer && (
        <div className="modal-overlay" onClick={handleClosemodal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClosemodal}>&times;</button>
            <div className="modal-header">
              <div className="modal-icon">
                <img 
                  src={`http://localhost:3001/${selectedOfficer.profile}`} 
                  alt={selectedOfficer.name} 
                  style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover' }} 
                />
              </div>
              <div className="modal-title">
                <h3>{selectedOfficer.name}</h3>
                <p>{selectedOfficer.position}</p>
                <p className="modal-email">{selectedOfficer.email}</p>
              </div>
            </div>
            <div className="modal-body">
              <p>{selectedOfficer.bio}</p>
              {selectedOfficer.social_media && selectedOfficer.social_media.length > 0 && (
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
