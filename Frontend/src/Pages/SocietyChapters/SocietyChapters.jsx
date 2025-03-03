import React from 'react';
import '../SocietyChapters/SocietyChapters.css';
import SpokaneImage from '../../Assets/Spokane.jpeg';
import IEEEUSAImage from '../../Assets/IEEE_USA.png';
import IEEELifeMembersImage from '../../Assets/IEEE_Life_Members.png';
import IEEEWomenInEngineeringImage from '../../Assets/IEEE_Women_in_Engineering.png';
import IEEEYoungProfessionalsImage from '../../Assets/IEEE_young_professionals.png';

const SocietyChapters = () => {
  return (
    <div className="society-chapters-container" style={{ backgroundImage: `url(${SpokaneImage})` }}>
      {/* Affinity Groups Section */}
      <div className="section-header-container">
        <h2 className="section-header">Affinity Groups</h2>
      </div>
      <div className="chapter-section">
        <img src={IEEEUSAImage} alt="IEEE USA" className="chapter-banner" />
        <div className="chapter-content">
          <h2>IEEE USA</h2>
          <p>IEEE-USA supports the career and public policy interests of IEEE members in the United States. It provides resources such as career development tools, public policy advocacy, and professional networking opportunities to help engineers and technologists advance their careers.</p>
          <a href="https://ieeeusa.org" target="_blank" rel="noopener noreferrer" className="learn-more-button">Learn More</a>
        </div>
      </div>
      <div className="chapter-section">
        <img src={IEEELifeMembersImage} alt="IEEE Life Members" className="chapter-banner" />
        <div className="chapter-content">
          <h2>IEEE Life Members</h2>
          <p>IEEE Life Members is a network for long-standing IEEE members who have reached Life Member status. It offers opportunities for mentorship, professional engagement, and contributions to humanitarian and educational initiatives.</p>
          <a href="https://life.ieee.org" target="_blank" rel="noopener noreferrer" className="learn-more-button">Learn More</a>
        </div>
      </div>
      <div className="chapter-section">
        <img src={IEEEWomenInEngineeringImage} alt="IEEE Women in Engineering" className="chapter-banner" />
        <div className="chapter-content">
          <h2>IEEE Women in Engineering (WIE)</h2>
          <p>IEEE WIE Affinity Groups promote women's participation in engineering and technology. These groups connect professionals, support career growth, and organize events that inspire and empower women in STEM fields.</p>
          <a href="https://wie.ieee.org/affinity-groups" target="_blank" rel="noopener noreferrer" className="learn-more-button">Learn More</a>
        </div>
      </div>
      <div className="chapter-section">
        <img src={IEEEYoungProfessionalsImage} alt="IEEE Young Professionals" className="chapter-banner" />
        <div className="chapter-content">
          <h2>IEEE Young Professionals</h2>
          <p>IEEE Young Professionals provides networking, career growth, and leadership development opportunities for early-career IEEE members. It helps young engineers and technologists transition from academia to industry through mentorship programs, events, and technical resources.</p>
          <a href="https://yp.ieee.org" target="_blank" rel="noopener noreferrer" className="learn-more-button">Learn More</a>
        </div>
      </div>

      {/* Region - Joint - Chapter Section */}
      <div className="section-header-container">
        <h2 className="section-header">Region - Joint - Student</h2>
      </div>
      <div className="chapter-section">
        <div className="chapter-content">
          <div className="chapter-group">
            {/* Items with URLs */}
            <div className="chapter-item">
              <h3>R6 (Western USA - Region 6)</h3>
              <p className="type-label">Type: Region</p>
              <p>The IEEE Region 6 encompasses the Western United States, serving members across multiple sections and chapters.</p>
              <a href="https://ieee-region6.org" target="_blank" rel="noopener noreferrer" className="learn-more-button">Learn More</a>
            </div>

            <div className="chapter-item">
              <h3>Gonzaga University (STB00661)</h3>
              <p className="type-label">Type: Student Branch</p>
              <p>IEEE Student Branch at Gonzaga University's School of Engineering and Applied Science.</p>
              <a href="https://blogs.gonzaga.edu/seas/category/clubs/ieee-institute-of-electrical-and-electronics-engineers/" target="_blank" rel="noopener noreferrer" className="learn-more-button">Learn More</a>
            </div>

            <div className="chapter-item">
              <h3>Eastern Washington University (STB35111)</h3>
              <p className="type-label">Type: Student Branch</p>
              <p>IEEE Student Branch at Eastern Washington University.</p>
              <a href="https://edu.ieee.org/us-ewu/" target="_blank" rel="noopener noreferrer" className="learn-more-button">Learn More</a>
            </div>

            {/* Items without URLs */}
            <div className="chapter-item">
              <h3>CH06107 - Spokane Section Joint Chapter</h3>
              <p className="type-label">Type: Joint Chapter</p>
              <p>AP03/CAS04/ED15/C16/CS23 - Joint Chapter focusing on Antennas and Propagation, Circuits and Systems, Electron Devices, Computer Society, and Control Systems.</p>
            </div>

            <div className="chapter-item">
              <h3>CH06109 - Spokane Section Chapter</h3>
              <p className="type-label">Type: Chapter</p>
              <p>PE31 - Chapter dedicated to Power and Energy.</p>
            </div>

            <div className="chapter-item">
              <h3>CH06291 - Spokane Section Joint Chapter</h3>
              <p className="type-label">Type: Joint Chapter</p>
              <p>TEM14/IA34 - Joint Chapter focusing on Technology and Engineering Management and Industry Applications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyChapters;
