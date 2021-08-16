import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Banner_slider.css";
// icon
import { Icon } from "react-icons-kit";
import { u1F447 } from "react-icons-kit/noto_emoji_regular/u1F447";

import axios from "axios";

const Banner_slider = () => {
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
    <div className="Banner_slider_outta">
      <div className="BG_Overlay ">
        <p>
          <span>Delicious recipes </span>
          <span>Get</span>{" "}
          <span>
            Started in
            <Icon
              size={30}
              icon={u1F447}
              style={{ color: "#31525b" }}
              className="drawer_Icon_Link"
            />
          </span>
        </p>
        <div className="banner_btn ">
          {typeOption[0] && <Link to={`/type/${typeOption[0].name}`} className="Ban_btnE btn-float">{typeOption[0].name}</Link>}
          {typeOption[1] &&<Link to={`/type/${typeOption[1].name}`} className="Ban_btnE btn-float">{typeOption[1].name}</Link>}
        </div>
      </div>
    </div>
  );
};
export default Banner_slider;

// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

// import "./Banner_slider.css";

// import i1 from "./BannerAsset/step1.jpg";
// import i2 from "./BannerAsset/step2.jpg";
// import i3 from "./BannerAsset/step3.jpg";
// import i4 from "./BannerAsset/step4.jpg";
// import i5 from "./BannerAsset/step5.jpg";

// const Banner_slider = () => {
//   const getConfigurableProps = () => ({
//     showArrows: true,
//     showStatus: true,
//     showIndicators: true,
//     infiniteLoop: true,
//     showThumbs: false,
//     useKeyboardArrows: true,
//     autoPlay: false,
//     stopOnHover: true,
//     swipeable: true,
//     dynamicHeight: false,
//     emulateTouch: true,
//     thumbWidth: 1000,
//     selectedItem: 0,
//     interval: 5000,
//     transitionTime: 150,
//     swipeScrollTolerance: 5,
//   });

//   return (
//     <div className="Banner_slider_outta">
//       <Carousel {...getConfigurableProps()}>
//         <div className="Banner_imgItem">
//           <img
//             src="https://hk.appledaily.com/resizer/vkKXbVxM627qKc5ZU0GURioS_5E=/512x0/filters:quality(100)/cloudfront-ap-northeast-1.images.arcpublishing.com/appledaily/BIMNCZOB6UNXI6D2GILEJSE5XI.jpg"
//             className="Banner_img"
//           />
//         </div>
//         <div className="Banner_imgItem">
//           <img
//             src="https://hk.appledaily.com/resizer/-f-GKaTLrrCQcYG8P6qdUudco0E=/512x0/filters:quality(100)/cloudfront-ap-northeast-1.images.arcpublishing.com/appledaily/UZALCHCCT3QSOV6PWL2XD7RPZU.jpg"
//             className="Banner_img"
//           />
//         </div>
//         <div className="Banner_imgItem">
//           <img
//             src="https://hk.appledaily.com/resizer/JCvLZ8_ZkV21H0dbQezGekqJMbY=/512x0/filters:quality(100)/cloudfront-ap-northeast-1.images.arcpublishing.com/appledaily/HC7GQXFPEAZEXVG3J42XPTMJAE.jpg"
//             className="Banner_img"
//           />
//         </div>
//       </Carousel>
//     </div>
//   );
// };
// export default Banner_slider;
