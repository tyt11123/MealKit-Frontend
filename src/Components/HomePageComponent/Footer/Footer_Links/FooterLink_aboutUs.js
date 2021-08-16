import React from "react";

import Img1 from "./FooterAsset/1.jpg";
import Img2 from "./FooterAsset/2.jpg";
import Img3 from "./FooterAsset/3.jpg";
import "./FooterLink_aboutUs.css";

const Footer_aboutus = () => {
  return (
    <div className="aboutUs__outta ">
      <header className="aboutus_header text-center">
        <h1>Our Purpose </h1>
      </header>
      <section className="aboutUs__outta_secondary">
        <div className="aboutUs__inner">
          <div className="aboutUs__content_Heading text-center">
            <h2>
              Together we can make a difference in these uncertain times.{" "}
            </h2>
            <br></br>
            <h6>
              Each week we send hundreds of thousands of customers all the
              pre-measured and perfectly proportioned ingredients they need to
              prepare delicious and healthy meals at home. We introduce our
              members to new ingredients, flavors, and cooking techniques with
              seasonally-inspired recipes that are always delicious, fun and
              easy to prepare. To support our growth and develop a more
              sustainable food system, we work directly with family-run farms to
              grow specialty produce just for us, affordably bringing the
              freshest ingredients into our customers' kitchens.
            </h6>
          </div>
          <div className="aboutUs__content_secondary">
            <h3>How We Work</h3>
          </div>
          <div className="aboutUs__content_third">
            <div className="col-sm-12 col-md-4 col-lg-4 abtus_detail">
              <div className="abtUs_img_div">
                <img src={Img1} className="abtUs_img" />
              </div>
              <h4>Thoroughly Vetted, Quality Guarantee</h4>
              <hr></hr>
              <br></br>
              <p>
                We carefully vet each vendor so you can eat safe, including
                certificate checks and site visits. Quality guaranteed or your
                money back.
              </p>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 abtus_detail">
              <div className="abtUs_img_div">
                <img src={Img2} className="abtUs_img" />
              </div>
              <h4>Largest Farm-Direct Selection </h4>
              <hr></hr>
              <br></br>
              <p>
                Shop over 1500 products, including hundreds of farm-direct
                groceries, from 50 local farms and importers.
              </p>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 abtus_detail">
              <div className="abtUs_img_div">
                <img src={Img3} className="abtUs_img" />
              </div>
              <h4>Direct From Source</h4>
              <hr></hr>
              <br></br>
              <p>
                Delivered soonest within 12 hours of harvest. Order are placed
                directly to farms and importers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer_aboutus;
