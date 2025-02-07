import React, { useEffect, useState } from 'react';
import OfficersCard from '../../Components/Officers_FormerOfficers';
import './FormerOfficers.css';
import { FaUserCircle, FaLinkedin, FaInstagram, FaSnapchat, FaYoutube, FaTwitch, FaTwitter, FaFacebook } from 'react-icons/fa';

const OfficersGrid = () => {
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  const [backendData, setBackendData] = useState([]);

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
  
  //Test Fetch data from the backend, this is the basic of connecting frontend to backend
  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, []);

  // Dynamically import all images from the photos directory
  const images = require.context('../../Assets', false, /\.(png|jpe?g|svg)$/);

  const photoMap = images.keys().reduce((map, path) => {
    const fileName = path.replace('./', ''); // Remove './' from the path
    map[fileName] = images(path); // Add to map
    return map;
  }, {});

  const EmailLink = ({ email }) => (
    <a href={`mailto:${email}`} style={{ color: '#002855', textDecoration: 'none' }}>
      {email}
    </a>
  );
  

  const officerSections = {
    chapter: {
      title: "Former Officers",
      officers: [
        {
          name: 'Jihoo Kim',
          title: 'Former CEO',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />,
          bio: "Former CEO",
          socialMedia: [
            { platform: 'LinkedIn', url: 'https://www.linkedin.com' },
          ]
        },
        {
          name: 'Steven He',
          title: 'CEO of Beijing Corn',
          email: '-',
          icon: <img 
            src={photoMap['beijingcorn.jpg']}
            alt="Travis Ho" 
            style={{ width: 150, height: 150, borderRadius: '50%' }} 
          />, 
          bio: 'Buy 1 rice bag get 2 free for 60% discount',
          socialMedia: [
            { platform: 'Youtube', url: 'https://www.youtube.com/channel/UCP0_k4INXrwPS6HhIyYqsTg' },
            { platform: 'Instagram', url: 'instagram.com/thestevenhe'},
            { platform: 'Twitter', url: 'twitter.com/TheStevenHe'},
            { platform: 'Facebook', url: 'facebook.com/profile.php?id=100080346755167'},
          ]
        },
      ]
    },
  };

  const handleBioClick = (officer) => {
    setSelectedOfficer(officer);
  };

  const handleClosemodal = () => {
    setSelectedOfficer(null);
  };

  return (
    <div className="officers-page">
      <h1 className="page-title">IEEE EWU Officers</h1>
      
      {Object.entries(officerSections).map(([sectionKey, section]) => (
        <section key={sectionKey} className="officer-section">
          <h2 className="section-title">{section.title}</h2>
          <div className="officers-grid">
            {section.officers.map((officer, index) => (
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

      {/* Bio Model */}
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
            {selectedOfficer.socialMedia && selectedOfficer.socialMedia.length > 0 && (
              <div className="social-media-icons">
                <h4>Socials:</h4>
                <div className="icons-container">
                  {selectedOfficer.socialMedia.map((social, index) => (
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
