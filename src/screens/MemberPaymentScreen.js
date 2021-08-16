import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { savePayment, saveRemark, saveTime, } from "../Redux/Actions/CartActions";
import MemberCheckoutSteps from "../Components/MemberCheckoutSteps";
import { listDayOff, } from "../Redux/Actions/dayOffActions";
import DayOffCalculation from "../Components/DayOffCalculation";
import { constant } from "lodash";
import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";

import "./MemberPaymentScreen.css";

const MemberPaymentScreen = (props) => {
  const [paymentMethod, setpaymentMethod] = useState("");
  const [remark, setRemark] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const [timeOption, setTimeOption] = useState([]);
  const dayOffList = useSelector(state => state.dayOffList);
  const { bulkDate, loading: loadingDayOff, success: successDayOff, error: errorDayOff, } = dayOffList;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    dispatch(saveRemark(remark));
    dispatch(saveTime(deliveryTime.value));
    props.history.push("memberPlaceorder");
  };
  
  useEffect(() => {
    if (userInfo.allergies && userInfo.allergies[0]) {
      setRemark(`需確保所有食材不含以下成分︰
The Ingredient Listed Below has to be Excluded:
${userInfo.allergies.join("\n")}`);
    }
    return () => {}; // cleanup
  }, [userInfo]);

  useEffect(() => {
    dispatch(listDayOff());
    return () => {};
  }, []);

  useEffect(() => {
    if (successDayOff && !(timeOption[0])) {
      const calculation = new DayOffCalculation(bulkDate);
      setTimeOption([...calculation.timeOption]);
    };
    return () => {};
  }, [successDayOff]);

  return (
    <>
      <div>
        <MemberCheckoutSteps step1 step2 step3 />
        <div className="member_payment_wrapper">
          <form className="member_payment_column" onSubmit={submitHandler}>
            <div className="member_payment_card">
              <div className="card-header">
                <h2>Payment</h2>
              </div>
              <div className="member_payment_card-body">
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    value="stripe"
                    onChange={(e) => setpaymentMethod(e.target.value)}
                  ></input>
                  &nbsp;
                  <label htmlFor="paymentMethod">Credit Card</label>
                </div>
              </div>
            </div>
            <div className="member_payment_card">
              <div className="card-header">
                <h2>Supplementary Information</h2>
              </div>
              <div className="member_payment_card-body">
                <div>
                  <textarea
                    name="remark"
                    id="remark"
                    cols="40"
                    rows="10"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="member_payment_card">
              <div className="card-header">
                <h2>Preferred Delivery Time</h2>
              </div>
              <div className="member_payment_card-body">
                <div>
                  { loadingDayOff ?
                  <DropdownList busy /> :
                  <DropdownList
                  data={timeOption}
                  textField="text"
                  name="time" id="time"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e)} />
                  }
                </div>
              </div>
            </div>
              <div>
                {paymentMethod && deliveryTime?
                <button type="submit" className="button primary">
                  Continue
                </button>:
                <button disabled type="submit" className="button primary">
                  Continue
                </button>}
              </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default MemberPaymentScreen;