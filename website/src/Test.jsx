import React from "react";
import LHSNav from "./LHSNav";

const Test = () => {
  return (
    <div style={{ display: "flex" }}>
      <LHSNav />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h1>Welcome to My App</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
};

export default Test;
