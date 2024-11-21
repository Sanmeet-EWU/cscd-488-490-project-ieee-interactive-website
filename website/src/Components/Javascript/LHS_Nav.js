import React from "react";
import './LHS_Nav.css';
import { NavLink } from "react-router-dom"; // Optional for routing

const LHS_Nav = ({ links }) => {
  return (
    <div className="LHS_Nav">
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

export default LHS_Nav;
