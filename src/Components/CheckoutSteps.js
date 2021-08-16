import React from "react";

function CheckoutSteps(props) {
  return (
    <div className="payment_outta">
      <div className="checkout-steps ">
        <div className={props.step2 ? "active" : ""}style={{fontSize:"1.4rem", fontWeight:"bold"}}>My Cart</div>
        <div className={props.step3 ? "active" : ""}style={{fontSize:"1.4rem", fontWeight:"bold"}}>Input Info</div>
        <div className={props.step4 ? "active" : ""}style={{fontSize:"1.4rem", fontWeight:"bold"}}>To Confirm</div>
      </div>
    </div>
  );
}

export default CheckoutSteps;
