import React from "react";

function MemberCheckoutSteps(props) {
  return (
    <div className="payment_outta">
      <div className="checkout-steps ">
        <div className={props.step1 ? "active" : ""}style={{fontSize:"1.4rem", fontWeight:"bold"}}>Sign-in</div>
        <div className={props.step2 ? "active" : ""}style={{fontSize:"1.4rem", fontWeight:"bold"}}>Shipping</div>
        <div className={props.step3 ? "active" : ""}style={{fontSize:"1.4rem", fontWeight:"bold"}}>Input Info</div>
        <div className={props.step4 ? "active" : ""}style={{fontSize:"1.4rem", fontWeight:"bold"}}>To Confirm</div>
      </div>
    </div>
  );
}

export default MemberCheckoutSteps;
