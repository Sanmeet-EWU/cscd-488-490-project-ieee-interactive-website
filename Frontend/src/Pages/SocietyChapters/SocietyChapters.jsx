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
      <h1 className="society-chapters-header">Society Chapters</h1>
      <div className="chapter-section">
        <img src={IEEEUSAImage} alt="IEEE USA" className="chapter-banner" />
        <div className="chapter-content">
          <h2>IEEE-USA</h2>
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
          <h2>IEEE Women in Engineering (WIE) Affinity Groups</h2>
          <p>IEEE WIE Affinity Groups promote women’s participation in engineering and technology. These groups connect professionals, support career growth, and organize events that inspire and empower women in STEM fields.</p>
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
    </div>
  );
};

export default SocietyChapters;
