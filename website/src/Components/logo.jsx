import React from "react";
import './Logo.css';
import ieeeLogo from '../Assets/IEEE.png';
import Kurukuru from '../Assets/Kurukuru.gif';

const Logo = () => {
  return (
    /*<header className = "logo-header">
      <img src = {ieeeLogo} alt = "IEEE Logo" className = "ieee-logo"/>
    </header>*/
    
    // Mess around
    <header className = "logo-header">
      <img src = {ieeeLogo} alt = "Kurukuru Logo" className = "kurukuru-logo"/>
    </header>
  );
};

export default Logo;