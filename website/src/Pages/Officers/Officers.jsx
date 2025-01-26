import React, { useState } from 'react';
import OfficersCard from '../../Components/Officers_FormerOfficers';
import './Officers.css';
import { FaUserCircle } from 'react-icons/fa';

const OfficersGrid = () => {
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  const officerSections = {
    chapter: {
      title: "Spokane Section",
      officers: [
        {
          name: 'Caitlin "Cady" Hernandez-Brito',
          title: 'Chair',
          email: '-',
          icon: <FaUserCircle size={150} color="#002855" />, 
          bio: '-'
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

  const handleCloseModal = () => {
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

      {/* Bio Modal */}
      {selectedOfficer && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>&times;</button>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficersGrid;
