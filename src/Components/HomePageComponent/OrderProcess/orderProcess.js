// OpenKitchen > order process >
import React from "react";

import deliveryOrder from "./deliveryOrder.png";
import enjoyCook from "./enjoyCook2.png";
import findRecipe from "./findRecipe.png";
import onlineOrder from "./onlineOrder2.png";
import "./orderProcess.css";

const WhyUs = () => {
  return (
    <div className="whyUs__outta">
      <div className="whyUs__title">
        <h2>
          <span className="whyUs__heading_main">Plan FEATURES</span>
          <span className="whyUs__heading_sub">
            Choose your own recipe, make your daily meal healthy and delicious
            with family.
          </span>
        </h2>
      </div>
      <div className="whyUs__content ">
        <div className=" whyus__Ans">
          <img src={findRecipe} alt="find recipe icon" className="whyUs-img" />

          <p>Choose your cuisine </p>
        </div>
        <div className="whyus__Ans">
          <img
            src={onlineOrder}
            alt="online Order icon"
            className="whyUs-img1"
          />
          <p>Order online before 5pm</p>
        </div>
        <div className=" whyus__Ans">
          <img
            src={deliveryOrder}
            alt="delivery order icon"
            className="whyUs-img"
          />
          <p>Delivery start at 3pm</p>
        </div>
        <div className=" whyus__Ans">
          <img
            src={enjoyCook}
            alt="enjpoy cooking icon"
            className="whyUs-img4"
          />
          <p>Follow our instruction, and enjoy your meal</p>
        </div>
      </div>
    </div>
  );
};
export default WhyUs;
