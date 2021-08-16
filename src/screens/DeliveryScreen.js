import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { todayRelease, listDelivery, missDelivery, deleteDelivery, } from "../Redux/Actions/deliveryActions";
import { listOrders, deleteOrder } from "../Redux/Actions/OrderActions";
import { Button } from "react-bootstrap";

const DeliveryScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const deliveryToday = useSelector((state) => state.deliveryToday);
  const { loading: loadingToday, success: successToday, error: errorToday } = deliveryToday;
  const deliveryList = useSelector((state) => state.deliveryList);
  const { loading: loadingList, deliveries, error: errorList } = deliveryList;
  const deliveryMiss = useSelector((state) => state.deliveryMiss);
  const { loading: loadingMiss, success: successMiss, error: errorMiss } = deliveryMiss;
  const deliveryDelete = useSelector((state) => state.deliveryDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = deliveryDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDelivery());
    return () => {
      // cleanup
    };
  }, [successToday, successMiss, successDelete]);

  if (deliveries) {
        for (let i = 0; i < deliveries.length; i++) {
            deliveries[i].delivery.createdAt = new Date(deliveries[i].delivery.createdAt).toLocaleString();
            if (deliveries[i].isDelivered) {deliveries[i].deliveredAt = new Date(deliveries[i].deliveredAt).toLocaleString();};
        };
   };

  const handleToday = (e) => {
    e.preventDefault();
    dispatch(todayRelease());
  };

  const handleMiss = (deliveryId, missed) => {
    dispatch(missDelivery(deliveryId, missed));
  };

  const handleDelete = (deliveryId, missed) => {
    dispatch(deleteDelivery(deliveryId, missed));
  };

  return (
    <div className="content-margined">
      <div className="product-header">
        <h3>Delivery</h3>
        {userInfo && userInfo.isAdmin &&
        <div>
        <button className=" btn" onClick={handleToday}>Dispatch Today's Delivery</button>
        {loadingToday && <p>Loading...</p>}
        {loadingMiss && <p>Loading...</p>}
        {loadingDelete && <p>Loading...</p>}
        {errorToday && <p>Oops! Server Processing Fail. Please Retry Later.</p>}
        {errorMiss && <p>Oops! Server Processing Fail. Please Retry Later.</p>}
        {errorDelete && errorDelete == 403 &&
        <p>Delivery Already Progressing / Progressed!</p>}
        {errorDelete && errorDelete == 401 &&
        <p>Oops! Server Processing Fail. Please Retry Later.</p>}
        </div>
        }
      </div>
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>USER</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>RESULT</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody className="orderTbody">
            {deliveries ? (
              deliveries.map((delivery, index) => (
                <tr key={index}>
                  <td>{delivery.delivery._id}</td>
                  <td>{delivery._id}</td>
                  <td>{delivery.delivery.createdAt}</td>
                  <td>{delivery.user ? delivery.user.recipient || delivery.user.name : ""}</td>
                  <td>{delivery.user ? delivery.user.recipientPhone || delivery.user.phone : ""}</td>
                  <td>{delivery.shipping && delivery.shipping.city}</td>
                  <td>
                    {delivery.delivery.success ? "Finished" : 
                    delivery.delivery.fail ? "Delivery Fail" : 
                    delivery.delivery.missed ? "Missed" : 
                    "Pending"}
                  </td>
                  <td>{delivery.deliveredAt}</td>
                  <td>
                    <Link className=" btn btn-primary" to={"/signin?redirect=location/" + delivery.delivery._id}>
                      Details
                    </Link>&nbsp;
                    {userInfo && userInfo.isAdmin &&
                    delivery.delivery && !(delivery.delivery.success || delivery.delivery.fail) &&
                    <>
                      <button className=" btn btn-primary" onClick={() => handleMiss(delivery.delivery._id, !delivery.delivery.missed)}>
                        {delivery.delivery.missed ? "Unmiss" : "Missed"}
                      </button>&nbsp;
                    </>}
                    {userInfo && userInfo.isAdmin &&
                    <>
                      <button className=" btn btn-primary" onClick={() => handleDelete(delivery.delivery._id)}>
                        Delete
                      </button>&nbsp;
                    </>}
                  </td>
                </tr>
              ))
            ) : (
              <tr />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DeliveryScreen;
