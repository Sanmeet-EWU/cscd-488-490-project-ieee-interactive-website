import React from "react";
import SideNav from "./SideNav";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const Test = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideNav links={links} />
      <div style={{ marginLeft: "260px", padding: "20px" }}>
        <h1>Welcome to My Website</h1>
        <p>Content goes here...</p>
      </div>
    </div>
  );
};

export default Test;
