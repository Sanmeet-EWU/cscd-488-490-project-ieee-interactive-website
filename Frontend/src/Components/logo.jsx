import React from "react";
import {Link} from "react-router-dom";
import './Logo.css';
import ieeeLogo from '../Assets/IEEE.png';

const Logo = () => {
  return (
    <header className = "logo-header">
      <Link to="/" className = "logo-link">
      <img src = {ieeeLogo} alt = "IEEE Logo" className = "ieee-logo"/>
      </Link>
    </header>
  );
};

export default Logo;