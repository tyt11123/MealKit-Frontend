import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isTablet, isMobile } from "react-device-detect";
import { menuProduct } from "../../../../Redux/Actions/productActions";

import "./specialMenu_slider.css";

const SpecialMenu = (props) => {
  const productMenu = useSelector((state) => state.productMenu);
  const { menu, loading, error } = productMenu;
  const dispatch = useDispatch();
  const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";
  const carouselRef = useRef(null);
  useEffect(() => {
    dispatch(menuProduct());
    return () => {
      // cleanup
    };
  }, []);
  return (
    <div className="specialMenu_outta">
      <div className="specialMenu_content">
        <h2>Set Menu</h2>
      </div>
      <Carousel
        ref={(el) => (carouselRef.current = el)}
        additionalTransfrom={0}
        arrows
        // autoPlay
        // autoPlaySpeed={4500}
        centerMode={true}
        className="specialMenu_Carousel"
        // containerClass="container-with-dots"
        dotListClass=""
        draggable={true}
        focusOnSelect={false}
        infinite
        itemClass="specialMenu_itemEach"
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 5,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 2,
            partialVisibilityGutter: 20,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {menu
          ? menu[0]
            ? menu.map((item, index) => (
                <div key={index} className="card specialmenu_item">
                  <Link to={`/product/${item._id}`} className="showLink_mobile">
                    <div className="pfl_special ">
                      <img className="pflimage_special" src={item.image[0]} />
                      <div className="pflhover_special">
                        <div
                          className="pflhover_special_btn btn "
                          type="button"
                        >
                          <h4>{item.name}</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            : ""
          : ""}
      </Carousel>
    </div>
  );
};
export default SpecialMenu;
