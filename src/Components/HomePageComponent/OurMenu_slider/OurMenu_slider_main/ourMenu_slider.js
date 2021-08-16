import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isTablet, isMobile } from "react-device-detect";
import Card from "react-bootstrap/Card";
import axios from "axios";


import "./ourMenu_slider.css";
import { type } from "jquery";

const OurMenu = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 375 },
      items: 10,
    },
  };
  const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";
  const [typeOption, setTypeOption] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/tags/type`)
      .then((result) => {
        setTypeOption(result.data);
      });
    return () => {};
  }, []);
  return (
    <div className="ourMenu_outta">
      <div className="ourMenu_content">
        <h2>OpenKitchen Menu Type</h2>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="ourMenu_Carousel"
        dotListClass=""
        focusOnSelect={false}
        infinite={false}
        itemClass="ourMenu_itemEach"
        keyBoardControl
        minimumTouchDrag={300}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 3,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        draggable={false}
        swipeable={false}
      >
        {typeOption.map((type, index) => (
          <div key={index} className="card menu_item">
            <Link to={`/type/${type.name}`}>
              <div className="pfl_ourMenu">
                <img
                  className="pflimage_ourMenu"
                  src={type.image}
                />
                <div className="pflhover_ourMenu">
                  <div className="pflhover_each_type_btn btn" type="button">
                    {type.name}
                  </div>
                </div>
              </div>
            </Link>
            <div className="card-body body_ourMenu">
              <Link to={`/type/${type.name}`} className="ourMenu_each_type_btn " >
                <p>{type.name}</p>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default OurMenu;
