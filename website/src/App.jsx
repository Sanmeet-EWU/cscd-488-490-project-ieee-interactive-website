import React from "react";
import LHSNav from "./Components/LHSNav";
import Footer from "./Components/Footer";
import TopNavBar from "./Components/TopNavBar";
import Logo from "./Components/logo";


const App = () => {
  return (
    <div>
      <Logo />
      <TopNavBar />
      <LHSNav />
      <Footer />
    </div>
  );
};

export default App;
