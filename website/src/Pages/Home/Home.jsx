/*import React from "react";
import '../Home/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>This is Home</h1>
      <p>This is the main content area.</p>
    </div>
  );
};

export default Home;*/

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Home/Home.css";

import Spokane from "../../Assets/Spokane.jpeg";
import AdobeStock_1 from "../../Assets/AdobeStock_1.jpeg";
import AdobeStock_2 from "../../Assets/AdobeStock_2.jpeg";
import AdobeStock_3 from "../../Assets/AdobeStock_3.jpeg";
import AdobeStock_4 from "../../Assets/AdobeStock_4.jpeg";
import AdobeStock_5 from "../../Assets/AdobeStock_5.jpeg";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <Slider {...settings}>
  <div>
    <img src={Spokane} alt="" />
  </div>
  <div>
  <img src={AdobeStock_1} alt="" />
  </div>
  <div>
  <img src={AdobeStock_2} alt="" />
  </div>
  <div>
  <img src={AdobeStock_3} alt="" />
  </div>
  <div>
  <img src={AdobeStock_4} alt="" />
  </div>
  <div>
  <img src={AdobeStock_5} alt="" />
  </div>

      </Slider>

    </div>
  );
};

export default Home;

/*import images from "../../Components/ImageImports";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <Slider {...settings}>
        {Object.values(images).map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;*/