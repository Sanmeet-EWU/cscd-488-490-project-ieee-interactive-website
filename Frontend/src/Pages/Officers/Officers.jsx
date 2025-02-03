import React, { useEffect, useState } from 'react';
import OfficersCard from '../../Components/Officers_FormerOfficers';
import './Officers.css';
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
      title: "Spokane Section",
      officers: [
        {
          name: 'Travis Ho',
          title: 'Developer',
          email: 'hotravis2001@gmail.com',
          icon: <img 
            src={photoMap['me.jpg']}
            alt="Travis Ho" 
            style={{ width: 150, height: 150, borderRadius: '50%' }} 
          />,
          bio: "Hi, I'm Travis, a passionate software developer with a love for building efficient, user-friendly applications. I specialize in full-stack development, with experience in front-end, back-end, and database management. I am proficient in JavaScript",
          socialMedia: [
            { platform: 'Youtube', url: 'https://www.youtube.com/@assassinsblade5471' },
            { platform: 'Instagram', url: 'https://www.instagram.com/travish.143/' },
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/travis-ho-0b5b3a1b7/' },
            { platform: 'Snapchat', url: 'https://www.snapchat.com/add/travish.143' },
            { platform: 'Twitch', url: 'https://www.twitch.tv/assassinsblade5471' },
            { platform: 'Twitter', url: 'https://twitter.com/TravisHo2001' },
            { platform: 'Facebook', url: 'https://www.facebook.com/travis.ho.5471' }
          ]
        },
        {
          name: 'Caitlin "Cady" Hernandez-Brito',
          title: 'Chair',
          email: 'caitlinchb@ieee.org',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-',
          socialMedia: [
            { name: 'LinkedIn', url: 'https://linkedin.com/in/caitlinchb' },
            { name: 'Twitter', url: 'https://twitter.com/caitlinchb' }
          ]
        },
        {
          name: 'Steve Simmons',
          title: 'Vice Chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        },
        {
          name: 'Adriana Oliveira',
          title: 'Treasurer',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        },
      ]
    },
    powerEnergy: {
      title: "Chapter: Power & Energy Society",
      officers: [
        {
          name: 'Philip Roice',
          title: 'Chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        }
      ]
    },
    jointChapter: {
      title: "Joint Chapter: Antennas and Propagation, Circuits and Systems, Electron Devices, Computer, and Control System Societies",
      officers: [
        {
          name: 'Steve Simmons',
          title: 'Vice Chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        },
        {
          name: 'Eric Ruberg',
          title: 'Vice-chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        }
      ]
    },
    technologyManagement: {
      title: "Joint Chapter: Technology Management and Industry Application Societies",
      officers: [
        {
          name: 'Janelle Lee',
          title: 'Chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        }
      ]
    },
    wie: {
      title: "Affinity Group: Women In Engineering (WIE)",
      officers: [
        {
          name: 'Amy Sawyer',
          title: 'Chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        },
        {
          name: 'Sara Koeff',
          title: 'Vice-Chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        }
      ]
    },
    yp: {
      title: "Affinity Group: Young Professionals (YP)",
      officers: [
        {
          name: 'Caitlin "Cady" Hernandez-Brito',
          title: 'Chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        },
        {
          name: 'Kathryn "Kat" Warner',
          title: 'Vice-Chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        },
        {
          name: 'Adriana Oliveira',
          title: 'Treasurer',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
        }
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
      <h1 className="page-title">Officers</h1>
      
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
