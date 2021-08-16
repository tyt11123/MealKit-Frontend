import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Delivery_detail.css";
import Map from "./DiscountAsset/map01.png";

const Delivery = () => {
  const [hidePrice1, setHidePrice1] = useState(true);
  const [hidePrice2, setHidePrice2] = useState(true);
  const [hidePrice3, setHidePrice3] = useState(true);
  return (
    <div className="deliveryDetail__outta">
      <div className="deliveryDetail__title">
        <h2>
          <span className="deliveryDetail__heading_main">delivery Area</span>
        </h2>
      </div>
      <div className="deliveryDetail__content ">
        <div className="deliveryDetial_description">
          <h2>
            <span>Delivery? </span>
            <span>Absolutely! </span>
            <span>
              We are currently delivering to all of HK Island (except Stanley &
              Tai Tam area), TST, and Kowloon. For TKO and New Territories
              areas, we charge an extra delivery fee. But yes, we deliver!
            </span>
          </h2>
        </div>
        <div className="area-btn">
          <div
            onClick={() => {
              setHidePrice1(!hidePrice1);
            }}
            className="onClick_btn"
          >
            Area{" "}
          </div>
          <div
            className={hidePrice1 && "displayN "}
            style={{
              justifyContent: "center",
              fontSize: "2.5rem",
            }}
          >
            $1234
          </div>
          <div
            onClick={() => {
              setHidePrice2(!hidePrice2);
            }}
            className="onClick_btn"
          >
            Area{" "}
          </div>
          <div
            className={hidePrice2 && "displayN "}
            style={{
              justifyContent: "center",
              fontSize: "2.5rem",
            }}
          >
            $1234
          </div>
          <div
            onClick={() => {
              setHidePrice3(!hidePrice3);
            }}
            className="onClick_btn"
          >
            Area{" "}
          </div>
          <div
            className={hidePrice3 && "displayN "}
            style={{
              justifyContent: "center",
              fontSize: "2.5rem",
             
            }}
          >
            $1234
          </div>
        </div>
      </div>
      {/* <div className="delivery_FriendlyRemind">
        <fakebtn>
          <p>Friendly Reminding: Please Check  </p>
        </fakebtn>
      </div> */}
    </div>
  );
};
export default Delivery;
