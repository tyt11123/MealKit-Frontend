import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { savePayment } from "../Redux/Actions/CartActions";
import CheckoutSteps from "../Components/CheckoutSteps";
import { detailsOrder, payOrder, emailOrder, remarkOrder, } from "../Redux/Actions/OrderActions";
import { listDayOff, } from "../Redux/Actions/dayOffActions";
import DayOffCalculation from "../Components/DayOffCalculation";
import { saveShipmentTime } from "../Redux/Actions/shipmentAction";
import "react-widgets/dist/css/react-widgets.css";
import DropdownList from "react-widgets/lib/DropdownList";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import stripeAPI from "../StripeAPI";
import PhoneScreen from "./PhoneScreen";
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import * as Nominatim from "nominatim-browser";

import "./OrderScreen.css";

import StripeForm from "../Components/StripeForm";
import { orderBy } from "lodash";
const stripePromise = stripeAPI
  .getPublicStripeKey()
  .then((key) => loadStripe(key));

const OrderScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading: loadingCreate, success: successCreate, error: errorCreate, } = orderCreate;
  const orderRemark = useSelector((state) => state.orderRemark);
  const { loading: loadingRemark, success: successRemark, error: errorRemark, } = orderRemark;
  const dispatch = useDispatch();
  const [remark, setRemark] = useState('');
  const [deliveryTime, setDeliveryTime] = useState("");
  const [timeOption, setTimeOption] = useState([]);
  const dayOffList = useSelector(state => state.dayOffList);
  const { bulkDate, loading: loadingDayOff, success: successDayOff, error: errorDayOff, } = dayOffList;
  const [userAddress, setUserAddress] = useState('');
  const shipmentTime = useSelector(state => state.shipmentTime);
  const { loading: loadingTime, success: successTime, error: errorTime, } = shipmentTime;

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  if (order) {order.paidAt = new Date(order.paidAt).toLocaleString();
      order.deliveredAt = new Date(order.deliveredAt).toLocaleString();};

  useEffect(() => {
    dispatch(detailsOrder(props.match.params.id));
    return () => {
    };
  }, [successRemark, successTime]);

  useEffect(() => {
    order && setRemark(order.remark);
    order && !(order.isDelivered) && dispatch(listDayOff());
    return () => {
    };
  }, [order]);

  useEffect(() => {
    if (successDayOff && !(timeOption[0])) {
      const calculation = new DayOffCalculation(bulkDate);
      setTimeOption([...calculation.timeOption]);
    };
    return () => {};
  }, [successDayOff]);

  useEffect(() => {
      if ((successCreate && order && (order.totalPrice <= 0)) || successPay) {
        let followUpMail = {
            ...userInfo, ...order, successPay,
        };
        dispatch(emailOrder(followUpMail));
        props.history.push("/profile");
      };
      return () => {
      };
    }, [successCreate, order, successPay]);
  
  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const handleNewRemark = () => {
    let confirmRemark = window.confirm("Are You Sure?");
    if (confirmRemark) {
      dispatch(remarkOrder(props.match.params.id, remark));
    };
  };

  const handleNewShippingTime = () => {
    let confirmTime = window.confirm("Are You Sure?");
    if (confirmTime) {
      dispatch(saveShipmentTime(order.shipping._id, deliveryTime.value));
    };
  };

  useEffect(() => {
    if (order && order.latitude && order.longitude) {
        reverseGeocodeCoordinates(order.latitude, order.longitude);
    };
    return () => {};
  }, [order]);

  const reverseGeocodeCoordinates = (lat, lon) => {
      Nominatim.reverseGeocode({
          lat,
          lon,
          addressdetails: true
      })
      .then((result) =>
      {
          const { address } = result;
          // delete address.county;
          delete address.region; delete address.state;
          delete address.postcode; delete address.country; delete address.country_code;
          setUserAddress(Object.values(address).join(", "));
          return;
      })
      .catch(error => console.log(error))
  };

  const openStreetMap = (x, y, z) => {
    const s = String.fromCharCode(97 + ((x + y + z) % 3))
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
  };

  const map = order && (
      <Map 
          center={[Number(order.latitude), Number(order.longitude)]} 
          defaultZoom={17}
          provider={openStreetMap}
          dprs={[1, 2]}
      >
        <Marker anchor={[Number(order.latitude), Number(order.longitude)]} payload={1} onClick={({ event, anchor, payload }) => {}} />
      </Map>
  );

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="orderScreen__div">
      <div className="orderScreen_placeorder">
        <div className="orderScreen_placeorder-info">
          {order.isPaid ? (
            ""
          ) : userInfo.phone ? (
            <div className="orderScreen_placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid && (
                <Elements stripe={stripePromise}>
                  <StripeForm
                    amount={order.totalPrice}
                    currency="HKD"
                    onSuccess={handleSuccessPayment}
                  />
                </Elements>
              )}
            </div>
          ) : (
            <>
              <div>
                <h5>Verify your phone number first before you pay</h5>
                <PhoneScreen />
              </div>
            </>
          )}
          {userInfo.isAdmin &&
          <div>
            <h3>Edit Supplementary Information</h3>
            <textarea
              className="orderScreen_textarea"
              name="remark"
              id="remark"
              rows="4"
              value={remark}
              placeholder="No Supplementary Information Provided"
              onChange={(e) => {setRemark(e.target.value)}}
            ></textarea>
            {errorRemark === 403 && <h3>Amendment Not Allowed in Delivered Orders!</h3>}
            {errorRemark === 401 && <h3>Failure at Server Side</h3>}
            <button onClick={handleNewRemark}>&nbsp;Submit&nbsp;</button>
          </div>
          }
          {userInfo.isAdmin && timeOption[0] && !(order.isDelivered) &&
          <div>
            <h3>Change Delivery Time</h3>
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
            {errorTime === 404 && <h3>Order not Found!</h3>}
            {errorTime === 401 && <h3>Failure at Server Side</h3>}
            {deliveryTime ?
              <button onClick={handleNewShippingTime}>&nbsp;Submit&nbsp;</button> :
              <button disabled>&nbsp;Submit&nbsp;</button>
            }
          </div>
          }
          {userInfo.isAdmin && order.user &&
          <div>
            <h3>{order.anonymous_user ? "Non-Member" : order.facebook_user ? "Facebook User" : "User"}</h3>
            <div>Name: {order.user.name}</div>
            <div>Email: {order.user.email}</div>
            <div>Phone: {order.user.phone}</div>
            {order.anonymous_user && <div>Recipient: {order.user.recipient}</div>}
            {order.anonymous_user && <div>Recipient Phone: {order.user.recipientPhone}</div>}
          </div>}
          <div>
            <h3>Shipping</h3>
            <a
            target="_blank"
            href={`https://www.openstreetmap.org/?mlat=${order.shipping.latitude}&mlon=${order.shipping.longitude}#map=17/${order.shipping.latitude}/${order.shipping.longitude}`}
            >
              {order.shipping.address}, {order.shipping.area},
              {order.shipping.city},{order.shipping.country},
            </a>
            <div>
              Requested Shipping Time:
            </div>
            <div>
              {order.shipping.time ?
              `${new Date(order.shipping.time.split('~')[0]).toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })} ~ ${new Date(order.shipping.time.split('~')[1]).toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })}`:
              ""}
            </div>
            <div>
              {order.isDelivered
                ? "Delivered at " + order.deliveredAt
                : "Not Delivered."}
            </div>
          </div>
          {userAddress &&
          <div>
            <p>
              {order.isDelivered ? "Delivered to " : "Latest Location: "}{userAddress}
            </p>
            <div className="orderScreen_map">
                {map}
            </div>
          </div>
          }
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {order.payment.paymentMethod}</div>
            <div>{order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}</div>
          </div>
          <div className="productPicked__div">
            <div>
              <h3>Shopping Cart</h3>
            </div>
            <ul className="cart-list-container ">
              {order.orderItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                order.orderItems.map((item, index) => (
                  <div className="card text-center" key={index}>
                    <div className=" card-img-top">
                      <img
                        src={item.image[0]}
                        alt="product"
                        className="img-thumbnail "
                      />
                    </div>
                    <div className="text-center ">
                          <div className="card-title">
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>
                      <h2>Qty:{item.qty}</h2>
                    
                    <h2>$ {item.price}</h2></div>
                  </div>
                ))
              )}
            </ul>
          </div>
          <div>
            <h3>Supplementary Information</h3>
            {order.remark ?
            order.remark.split(/\r?\n/g).map((x, index)=>
              (<div key={index}>{x}</div>)
            ) :
            'No Supplementary Information Provided'}
          </div>
        </div>
        </div>
        <div className="orderScreen_placeorder-action">
          <ul>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </li>
            {order.redemptionPrice ?
            <li>
              <div>Discount</div>
              <div>-${order.redemptionPrice}</div>
            </li> : ""
            }
            {/* <li>
                            <div>Tax</div>
                            <div>${order.taxPrice}</div>
                        </li> */}
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>
        </div>
      
    </div>
  );
};
export default OrderScreen;
