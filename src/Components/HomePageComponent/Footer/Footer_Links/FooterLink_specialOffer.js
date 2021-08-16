import React, { useState } from "react";

import imgDelivery from "./FooterAsset/deliv2.svg";
import imgMeal from "./FooterAsset/specialMeal.svg";
import imgSaving from "./FooterAsset/saving4.svg";

import "./FooterLink_specialOffer.css";

const SpecialOffer = () => {
  const [msg, setMSG] = useState(false);
  const handleMSG = (e) => {
    e.preventDefault();
    setMSG(true);
  }
  return (
    <div className="specialOffer__outta">
      <header className="specialOffer__header">
        <h1>
          MEALKIT<span>+</span>
        </h1>
        <h2>
          Get the best of Shopping and Enjoy the freshest Meal with MealKit
          <small>+</small>
        </h2>
        <a type="button" className="specialOffer__btn" onClick={handleMSG}>
          {msg?<p>Coming In Future</p>:<p>Try MealKit Plus</p>}
        </a>
        <p>
          <small>(don't worry you can change your menu every week)</small>
        </p>
      </header>
      <section className="specialOffer__inner_main">
        <h2>Check out what's included with your Plus membership:</h2>
        <div className="specialOffer__content_first">
          <div className="specialOffer__details col-sm-12 col-md-4 col-lg-3">
            <img src={imgDelivery} className="specialOffer__detail_img" />
            <p>
              <span>FREE Delivery</span>
              <br></br>Enjoy all the fast, convenient delivery options Prime
              offers
            </p>
          </div>
          <div className="specialOffer__details col-sm-12 col-md-4 col-lg-3">
            <img src={imgMeal} className="specialOffer__detail_img" ></img>
            <p>
              <span>Exclusive Meal Just for you</span>
              <br></br>Get exclusive access to deals and discounts
            </p>
          </div>
          <div className="specialOffer__details col-sm-12 col-md-4 col-lg-3">
            <img src={imgSaving} className="specialOffer__detail_img" />
            <p>
              <span>Savings for the Family</span>
              <br></br>Plus members save up to 20% on food subscription
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SpecialOffer;
