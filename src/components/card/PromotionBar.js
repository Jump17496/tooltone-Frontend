import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const Promotionbar = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://ctmusicshop.com/wp-content/uploads/2022/05/banner-blue-lava_5.jpg"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://ctmusicshop.com/wp-content/uploads/2021/09/hiend-guitar.jpg"
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://ctmusicshop.com/wp-content/uploads/2020/10/sadowsky-web2-copy.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
    
      </Carousel>
    </div>
  );
};

export default Promotionbar;
