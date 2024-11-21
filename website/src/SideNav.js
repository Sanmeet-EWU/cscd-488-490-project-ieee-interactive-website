import React from "react";
import "./SideNav.css"; // Import the CSS file for styling
import { NavLink } from "react-router-dom"; // Optional for routing

const SideNav = ({ links }) => {
  return (
    <div className="sidenav">
      <h2>Navigation</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className="nav-link"
              activeClassName="active"
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
