import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createOrder } from "../Redux/Actions/OrderActions";
import MemberCheckoutSteps from "../Components/MemberCheckoutSteps";
import { listPlan } from "../Redux/Actions/planActions";
import { verifyCoupon } from "../Redux/Actions/CouponActions";
import PriceCalculation from "../Components/PriceCalculation";
import axios from "axios";

import "./MemberPlaceOrderScreen.css";

function MemberPlaceOrderScreen(props) {
  const [code, setCode] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin; 
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const couponVerify = useSelector((state) => state.couponVerify);
  const {
    loading: loadingCoupon,
    success: successCoupon,
    error: errorCoupon,
    coupon,
  } = couponVerify;

  const { cartItems, shipping, payment, remark, time, } = cart;
  const planList = useSelector((state) => state.planList);
  const { bulkQty, bulkAmount, bulkCeiling } = planList;

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
      createOrder(
        {
          orderItems: cartItems,
          shipping_id: cart.shipping._id,
          shipping,
          payment: totalPrice > 0 ? payment : { paymentMethod: "Giftcard" },
          itemsPrice,
          shippingPrice,
          redemptionPrice,
          totalPrice,
          remark,
        },
        coupon ? (coupon.valid ? coupon.code : null) : null
      )
    );
  };

  const couponHandler = (e) => {
    e.preventDefault();
    dispatch(verifyCoupon(code, fullPrice));
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      props.history.push("/shop");
    } else if (!shipping.address) {
      props.history.push("/memberShipping");
    } else if (!payment.paymentMethod) {
      props.history.push("/memberPayment");
    };
    return () => {};
  }, [cart]);

  useEffect(() => {
    dispatch(listPlan());
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success]);

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

  return (
    <div>
      <MemberCheckoutSteps step1 step2 step3 step4></MemberCheckoutSteps>
      <div className="placeorder">
        {cartItems.length > 0 &&
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {cart.shipping.address}, {cart.shipping.area}, {cart.shipping.city}
              , {cart.shipping.country},
            </div>
          </div>
          <div>
            <h3>Preferred Shipping Time</h3>
            <div>
              {cart.shipping.time ?
              `${new Date(cart.shipping.time.split('~')[0]).toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })} ~ ${new Date(cart.shipping.time.split('~')[1]).toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })}`:
              ""}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>
          <div>
            <div className="productPicked__div ">
              <div>
                <h3>Shopping Cart</h3>
              </div>
              <ul className="cart-list-container">
                {cartItems.length === 0 ? (
                  <div>Cart is empty</div>
                ) : (
                  cartItems.map((item, index) => (
                    <div key={index} className="card text-center">
                      <div className="card-harder">
                        <div className=" card-img-top">
                          <img
                            src={item.image[0]}
                            alt="product"
                            className="img-thumbnail "
                          />
                        </div>
                        <div className="text-center ">
                          <div className="card-title">
                            <Link
                              target="_blank"
                              to={"/product/" + item.product}
                            >
                              {item.name}
                            </Link>
                            <h2>$ {item.price}</h2>
                          </div>
                        </div>
                        <div>Quantity: {item.qty}</div>
                      </div>
                    </div>
                  ))
                )}
              </ul>
            </div>
          </div>
          <div>
            <h3>Supplementary Information</h3>
            {cart.remark ?
            cart.remark.split(/\r?\n/g).map(x=>
              (<div>{x}</div>)
            ) :
            'No Supplementary Information Provided'}
          </div>
        </div>}
      </div>
      <div className="placeorder-action">
        <h3>Coupon</h3>
        <form onSubmit={couponHandler}>
          <label htmlFor="code">Enter Your Coupon Code:&nbsp;</label>
          <input
            type="text"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          ></input>
          &nbsp;
          <button type="submit">Check</button>
          <div>
            {loadingCoupon && "Loading..."}
            {successCoupon
              ? coupon.valid
                ? (coupon.balance >= 0)
                  ? `Current Gift Card Balance: $${coupon.balance}`
                  : coupon.amount_off
                  ? `One-time Amount Off: $${coupon.amount_off}`
                  : coupon.percent_off
                  ? `${coupon.percent_off}% Discount`
                  : coupon.unit_type
                  ? `${coupon.unit_type} Waiver`
                  : ""
                : coupon.expiredAt && (new Date(coupon.expiredAt) < new Date())
                ? "Coupon Expired"
                : coupon.amount_minimum &&
                  fullPrice < Number(coupon.amount_minimum)
                ? `Minimum order $${coupon.amount_minimum}!`
                : "Coupon Invalid"
              : ""}
            {errorCoupon && "Coupon Verification Failure"}
          </div>
        </form>
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>
              $
              {bulkPrice[0] && bulkPrice[0] < originalPrice ? (
                <>
                  <del>{originalPrice}</del>&nbsp;{bulkPrice[0]}
                </>
              ) : (
                originalPrice
              )}
            </div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${coupon && coupon.unit_off ? <><del>{shippingPrice}</del>&nbsp;0</>: shippingPrice}</div>
          </li>
          {/* <li>
                            <div>Tax</div>
                            <div>${taxPrice}</div>
                        </li> */}
          <li>
            <div>Order Total</div>
            <div>
              $
              {redemptionPrice ? (
                <>
                  <del>{fullPrice}</del>&nbsp;{totalPrice}
                </>
              ) : (
                totalPrice
              )}
            </div>
          </li>
          <li>
            <button
              className="button primary full-width"
              onClick={placeOrderHandler}
            >
              PlaceOrder
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MemberPlaceOrderScreen;