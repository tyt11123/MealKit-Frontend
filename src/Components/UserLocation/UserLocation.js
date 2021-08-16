import React, { useEffect, useState, } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsOrder, deliverOrder, } from "../../Redux/Actions/OrderActions";
import { detailsDelivery, updateDelivery, } from "../../Redux/Actions/deliveryActions";
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import * as Nominatim from "nominatim-browser";
import axios from 'axios';
import "./UserLocation.css"
// https://www.youtube.com/watch?v=U3dLjHN0UvM

const UserLocation = (props) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const dispatch = useDispatch();

    const deliveryDetails = useSelector(state => state.deliveryDetails);
    const { loading, delivery, error } = deliveryDetails;
    if (delivery) {delivery.paidAt = new Date(delivery.paidAt).toLocaleString();
        delivery.deliveredAt = new Date(delivery.deliveredAt).toLocaleString();};
    const deliveryUpdate = useSelector(state => state.deliveryUpdate);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = deliveryUpdate;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver, error: errorDeliver } = orderDeliver;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const handleSuccess = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoorodinatesAndSuccess, handleLocationError);

        } else {
            alert("Geolocation is not supported by this browser");
        }
    }

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoorodinates, handleLocationError);

        } else {
            alert("Geolocation is not supported by this browser");
        }
    }

    const handleFailure = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getCoorodinatesAndFail, handleLocationError);

      } else {
          alert("Geolocation is not supported by this browser");
      }
  }

    const getCoorodinates = (position) => {
        const {latitude, longitude} = position.coords;
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        dispatch(updateDelivery(props.match.params.id, { latitude, longitude, }, undefined));
    }

    const getCoorodinatesAndSuccess = (position) => {
        const {latitude, longitude} = position.coords;
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        dispatch(updateDelivery(props.match.params.id, { latitude, longitude, }, true));
    }

    const getCoorodinatesAndFail = (position) => {
      const {latitude, longitude} = position.coords;
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      dispatch(updateDelivery(props.match.params.id, { latitude, longitude, }, false));
  }

    useEffect(() => {
        dispatch(detailsDelivery(props.match.params.id));
        return () => {
        };
      }, [successDeliver, successUpdate]);

    useEffect(() => {
        if (delivery && delivery.delivery) {
            setLatitude(delivery.delivery.latitude);
            setLongitude(delivery.delivery.longitude);
        };
        return () => {
        };
    }, [delivery]);

    useEffect(() => {
        if (latitude && longitude) {
            reverseGeocodeCoordinates();
        };
        return () => {};
    }, [latitude, longitude]);

    const reverseGeocodeCoordinates = () => {
        // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB_kdArgo8TxFEEG32do-NXUOKmEq2Koqc`)
        //     .then((response) => setUserAddress(response.data.results[2].formatted_address))
        //     .catch(error => console.log(error))
        Nominatim.reverseGeocode({
            lat: latitude,
            lon: longitude,
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
    }

    const handleLocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                alert("An unknown error occurred.")
        }
    }

    const openStreetMap = (x, y, z) => {
        const s = String.fromCharCode(97 + ((x + y + z) % 3))
        return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
    };
    
    const map = (
        <Map 
            center={[Number(latitude), Number(longitude)]} 
            defaultZoom={17}
            provider={openStreetMap}
            dprs={[1, 2]}
        >
          <Marker anchor={[Number(latitude), Number(longitude)]} payload={1} onClick={({ event, anchor, payload }) => {}} />
        </Map>
    );

    return (
        <>
                {loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="orderScreen__div">
      <div className="orderScreen_placeorder">
        <div className="orderScreen_placeorder-info">
          {delivery &&
                <div>
                    <h3>Supplementary Information</h3>
                    {delivery.remark ?
                    delivery.remark.split(/\r?\n/g).map((x, index)=>
                    (<div key={index}>{x}</div>)
                    ) :
                    'No Supplementary Information Provided'}
                </div>
          }
          {delivery.user &&
          <div>
            <h3>Customer</h3>
            <div>Name: {delivery.user.name}</div>
            <div>Email: {delivery.user.email}</div>
            <div>Phone: {delivery.user.phone}</div>
            {delivery.anonymous_user && <div>Recipient: {delivery.user.recipient}</div>}
            {delivery.anonymous_user && <div>Recipient Phone: {delivery.user.recipientPhone}</div>}
          </div>}
          <div>
            <h3>Shipping</h3>
            <a
            target="_blank"
            href={`https://www.openstreetmap.org/?mlat=${delivery.shipping.latitude}&mlon=${delivery.shipping.longitude}#map=17/${delivery.shipping.latitude}/${delivery.shipping.longitude}`}
            >
              {delivery.shipping.address}, {delivery.shipping.area},
              {delivery.shipping.city},{delivery.shipping.country},
            </a>
            <div>
              Requested Shipping Time:
            </div>
            <div>
              {delivery.shipping.time ?
              `${new Date(delivery.shipping.time.split('~')[0]).toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })} ~ ${new Date(delivery.shipping.time.split('~')[1]).toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })}`:
              ""}
            </div>
            <div>
              {delivery.isDelivered
                ? "Delivered at " + delivery.deliveredAt
                : "Not Delivered."}
            </div>
          </div>
          <div className="productPicked__div">
            <div>
              <h3>Shopping Cart</h3>
            </div>
            <ul className="cart-list-container ">
              {delivery.orderItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                delivery.orderItems.map((item, index) => (
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
        </div>
        </div>
    </div>
  )}
        <div className="location">
          <h2> User Co-ordinates</h2>
          {userInfo && !userInfo.isAdmin &&
          <>
            <button onClick={handleSuccess}>Delivery Successful</button>&nbsp;
            <button onClick={handleLocation}>Under Progress</button>&nbsp;
            <button onClick={handleFailure}>Delivery Fail</button>&nbsp;
          </>}
          <p>
              {delivery && delivery.isDelivered
              ? "Delivered at " + delivery.deliveredAt
              : delivery && delivery.delivery && delivery.delivery.fail
              ? "Delivery Fail"
              : "Pending"
              }
          </p>
          {userAddress && 
          <>
            <span>Latest Position:&nbsp;</span>
            <a
            target="_blank"
            href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`}
            >
              {userAddress}
            </a>
            <div className="location_map">
                {map}
            </div>
          </>}
        </div>
        {loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="orderScreen__div">
      <div className="orderScreen_placeorder">
        <div className="orderScreen_placeorder-info">
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {delivery.payment.paymentMethod}</div>
            <div>{delivery.isPaid ? "Paid at " + delivery.paidAt : "Not Paid."}</div>
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
              <div>${delivery.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${delivery.shippingPrice}</div>
            </li>
            {delivery.redemptionPrice ?
            <li>
              <div>Discount</div>
              <div>-${delivery.redemptionPrice}</div>
            </li> : ""
            }
            {/* <li>
                            <div>Tax</div>
                            <div>${order.taxPrice}</div>
                        </li> */}
            <li>
              <div>Order Total</div>
              <div>${delivery.totalPrice}</div>
            </li>
          </ul>
        </div>
      
    </div>
  )}
        </>
    );
};

export default UserLocation;
