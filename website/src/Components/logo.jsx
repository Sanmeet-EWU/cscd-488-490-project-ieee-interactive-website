import React from "react";
import './Logo.css';
import ieeeLogo from '../Assets/IEEE.png';

const Logo = () => {
  return (
    <header className = "logo-header">
      <img src = {ieeeLogo} alt = "IEEE Logo" className = "ieee-logo"/>
    </header>
  );
};

export default Logo;