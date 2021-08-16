import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createAnonymousOrder } from "../Redux/Actions/OrderActions";
import CheckoutSteps from "../Components/CheckoutSteps";
import { listPlan } from "../Redux/Actions/planActions";
import { verifyCoupon } from "../Redux/Actions/CouponActions";
import { detailsOrder, payOrder, emailOrder, } from "../Redux/Actions/OrderActions";
import PriceCalculation from "../Components/PriceCalculation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import stripeAPI from "../StripeAPI";
import StripeForm from "../Components/StripeForm";
import axios from "axios";

import "./PlaceOrderScreen.css";
import { rgb } from "color";

const stripePromise = stripeAPI
  .getPublicStripeKey()
  .then((key) => loadStripe(key));

function PlaceOrderScreen(props) {
  const [recipientPhone, setRecipientPhone] = useState('');
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment, remark, coupon: code, user, } = cart;
  const planList = useSelector((state) => state.planList);
  const { bulkQty, bulkAmount, bulkCeiling, } = planList;
  const couponVerify = useSelector((state) => state.couponVerify);
  const {
    loading: loadingCoupon,
    success: successCoupon,
    error: errorCoupon,
    coupon,
  } = couponVerify;
  const orderAnonymous = useSelector((state) => state.orderAnonymous);
  const { order, loading: loadingOrder, success: successOrder, error: errorOrder, } = orderAnonymous;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay, } = orderPay;
  const orderEmail = useSelector((state) => state.orderEmail);
  const { loading: loadingEmail, success: successEmail, error: errorEmail, } = orderEmail;

  const dispatch = useDispatch();

  const [itemsQty, setItemsQty] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [bulkPrice, setBulkPrice] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [fullPrice, setFullPrice] = useState(0);
  const [redemptionPrice, setRedemptionPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //createOrder
  const placeOrderHandler = () => {
    // dispatch(createOrder({ cartItems, shipping, payment, itemsPrice, taxPrice, shippingPrice, totalPrice }));
    dispatch(
      createAnonymousOrder(
        {
          orderItems: cartItems,
          coupon: code,
          payment, remark, shipping, user,
          itemsPrice, shippingPrice, redemptionPrice, totalPrice,
        }
      )
    );
  };

  const handleBack = (e) => {
    e.preventDefault();
    props.history.goBack();
  };

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  useEffect(() => {
    if (!shipping.address) {
      props.history.push("/shipping");
    } else if (!user.name) {
      props.history.push("/payment");
    }
    dispatch(listPlan());
    return () => {};
  }, []);

  useEffect(() => {
    if (fullPrice) {
      dispatch(verifyCoupon(code, fullPrice));
    };
    return () => {};
  }, [fullPrice]);

  useEffect(() => {
    const calculation = new PriceCalculation(cart, planList, coupon, shipping && shipping.country);
    setItemsQty(calculation.itemsQty);
    setOriginalPrice(calculation.originalPrice);
    setBulkPrice(calculation.bulkPrice);
    setItemsPrice(calculation.itemsPrice);
    setShippingPrice(calculation.shippingPrice);
    setFullPrice(calculation.fullPrice);
    setRedemptionPrice(calculation.redemptionPrice);
    setTotalPrice(calculation.totalPrice);
    return () => {};
  }, [cart, planList, coupon, shipping]);

  useEffect(() => {
    if (user && recipientPhone === user.recipientPhone) {
      dispatch(createAnonymousOrder(
        {
          orderItems: cartItems,
          coupon: code,
          payment, remark, shipping, user,
          itemsPrice, shippingPrice, redemptionPrice, totalPrice,
        }
      ));
    };
    return () => {};
  }, [recipientPhone]);

  useEffect(() => {
    if ((successOrder && (totalPrice <= 0)) || successPay) {
      let followUpMail = {
        ...user, ...order, ...cart, successPay: true,
      };
      dispatch(emailOrder(followUpMail));
    };
    return () => {};
  }, [successOrder, successPay]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="PayStep2_form__outta">
        <div className="reviewCart_div">
          {successCoupon &&
          <div className="formQs">
            <label htmlFor="name">確認收件人電話號碼︰Confirm Recipient's Phone Number:&nbsp;</label>
            <input
              type="text" name="name" id="name"
              style={recipientPhone && user && (recipientPhone !== user.recipientPhone) ? {borderColor: "#FF0000"} : {}}
              placeholder="Enter Phone Number"
              autoComplete="off"
              onChange={(e) => {
                setRecipientPhone(e.target.value);
              }}
            ></input>
            {recipientPhone && user && (recipientPhone !== user.recipientPhone) &&
            <div style={{color: "#FF0000", textAlign: "left"}}>
              號碼不相同。The 2 numbers are different.
            </div>}
          </div>}
          {loadingPay && 
          <div className="formQs">
            <h3>付款模組載入中，請不要重新載入‥‥ </h3>
            <h3>Payment Loading. Please Do Not Refresh The Page...</h3>
          </div>}
          {successPay && 
          <div className="formQs">
            <h3>多謝惠顧。</h3>
            <h3>Thank You For Your Payment.</h3>
          </div>}
          {errorPay && 
          <div className="formQs">
            <h3>付款未能成功處理，請重新下單。</h3>
            <h3>Payment Failure. This Order is Void and Please Place a New One.</h3>
          </div>}
          {loadingEmail && 
          <div className="formQs">
            <h3>訂單確認電郵處理中。完成前請稍候，不要離開此頁面。</h3>
            <h3>Sending Confirmation Email to {user.email}. Please Wait. Do not refresh the page.</h3>
          </div>}
          {successEmail && 
          <div className="formQs">
            <h3>訂單確認電郵己發送。</h3>
            <h3>A Confirmation Has Been Sent to Your Email. Please Check.</h3>
          </div>}
          {errorEmail && 
          <div className="formQs">
            <h3>訂單確認電郵未能成功發送。</h3>
            <h3>Confirmation Email Send Fail.</h3>
          </div>}
          {loadingOrder && 
          <div className="formQs">
            <h3>訂單處理中，請不要重新載入‥‥</h3>
            <h3>Loading. Please Do Not Refresh The Page...</h3>
          </div>}
          {successOrder && (totalPrice > 0) && !(successPay) &&
          <div className="formQs">
            <h3>請完成付款。Please Complete the Payment.</h3>
            <Elements stripe={stripePromise}>
              <StripeForm
                user={user}
                amount={order && order.totalPrice}
                currency="HKD"
                onSuccess={handleSuccessPayment}
              />
            </Elements>
          </div>}
          {errorOrder && 
          <div className="formQs">
            <h3>系統未能成功處理訂單，請稍後重試。</h3>
            <h3>System Busy. Please Retry Later.</h3>
          </div>}
          {(successEmail || errorEmail) && <div className="back-to-shop" >
            <Link to="/shop" className="pages_path_BackToShop" style={{}}>
              <h2 style={{margin:"5rem 0 0 0"}}>Continue Shopping</h2>
            </Link>
          </div>}
        </div>
        {successCoupon && <div className="back-to-result" >
          <Link onClick={handleBack} to="#" className="pages_path_BackToResult " style={{}}>
            <h2 style={{margin:"0"}}>Previous Page </h2>
          </Link>
        </div>}
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
