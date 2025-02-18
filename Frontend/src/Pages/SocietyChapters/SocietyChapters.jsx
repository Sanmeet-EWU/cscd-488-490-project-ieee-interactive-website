import React from 'react';
import './SocietyChapters.css';
import IEEE_USA from '../../Assets/IEEE_USA.png';
import IEEE_Life from '../../Assets/IEEE_Life_Members.png';
import IEEE_WIE from '../../Assets/IEEE_Women_in_Engineering.png';
import IEEE_YP from '../../Assets/IEEE_young_professionals.png';
import Spokane from '../../Assets/Spokane.jpeg';

const SocietyChapters = () => {
  return (
    <div className="society-chapters-page" style={{ backgroundImage: `url(${Spokane})` }}>
      <div className="section" onClick={() => window.open('https://ieeeusa.org', '_blank')}>
        <img src={IEEE_USA} alt="IEEE USA" className="section-image" />
        <div className="section-content">
          <h2>IEEE-USA</h2>
          <p>This platform connects businesses and individuals with experienced IEEE consultants in various engineering and technical fields. It serves as a resource for professionals seeking consulting opportunities and companies looking for specialized expertise.</p>
        </div>
      </div>
      <div className="section" onClick={() => window.open('https://life.ieee.org', '_blank')}>
        <img src={IEEE_Life} alt="IEEE Life Members" className="section-image" />
        <div className="section-content">
          <h2>IEEE Life Members</h2>
          <p>The IEEE Life Members program is dedicated to engaging long-standing IEEE members who have made significant contributions to the organization. It provides networking opportunities, volunteer activities, and initiatives that allow retired or senior professionals to stay involved with IEEE and mentor younger generations.</p>
        </div>
      </div>
      <div className="section" onClick={() => window.open('https://wie.ieee.org', '_blank')}>
        <img src={IEEE_WIE} alt="IEEE Women in Engineering (WIE) Affinity Groups" className="section-image" />
        <div className="section-content">
          <h2>IEEE Women in Engineering (WIE) Affinity Groups</h2>
          <p>IEEE WIE Affinity Groups promote the participation and advancement of women in STEM fields. These groups provide networking, mentorship, and leadership opportunities at local and global levels to support women in engineering and technology.</p>
        </div>
      </div>
      <div className="section" onClick={() => window.open('https://yp.ieee.org', '_blank')}>
        <img src={IEEE_YP} alt="IEEE Young Professionals (YP)" className="section-image" />
        <div className="section-content">
          <h2>IEEE Young Professionals (YP)</h2>
          <p>IEEE YP is a global community that helps recent graduates and early-career professionals transition into the workforce. It offers career development resources, networking events, leadership training, and opportunities to collaborate with industry experts and peers.</p>
        </div>
      </div>
    </div>
  );
};

export default SocietyChapters;
