import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listOrders, deleteOrder } from "../Redux/Actions/OrderActions";
import { createDelivery, } from "../Redux/Actions/deliveryActions";
import { Button } from "react-bootstrap";
import { NotificationManager } from 'react-notifications';
import { ExportReactCSV } from '../Components/TableExport/ExportReactCSV';

const OrdersScreen = (props) => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;

  const deliveryCreate = useSelector((state) => state.deliveryCreate);
  const { loading: loadingCreate, success: successCreate, error: errorCreate } = deliveryCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      // cleanup
    };
  }, [successDelete]);

  useEffect(() => {
    loadingCreate && NotificationManager.info('Loading...');
    successCreate && NotificationManager.success('Completed', 'Delivery Created');
    errorCreate && NotificationManager.error('Error', 'Delivery Creation Fail');
    return () => {};
  }, [loadingCreate, successCreate, errorCreate]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };

  const deliverHandler = (order) => {
    const answer = window.confirm("Are You Sure ?");
    if (answer) {dispatch(createDelivery({order_id: order._id, date: new Date()}));}
  };

  if (orders) {
        for (let i = 0; i < orders.length; i++) {
            orders[i].createdAt = new Date(orders[i].createdAt).toLocaleString();
            if (orders[i].isPaid) {orders[i].paidAt = new Date(orders[i].paidAt).toLocaleString();};
            if (orders[i].isDelivered) {orders[i].deliveredAt = new Date(orders[i].deliveredAt).toLocaleString();};
        };
    var ordersForExport = [];
    for (let i = 0; i < orders.length; i++) {
      let order = orders[i];
      ordersForExport.push(
        Object.assign({
        _id: order._id, createdAt: order.createdAt,
        itemsPrice: order.itemsPrice, redemptionPrice: order.redemptionPrice,
        shippingPrice: order.shippingPrice, totalPrice: order.totalPrice,
        isPaid: order.isPaid, paidAt: order.paidAt,
        isDelivered: order.isDelivered, deliveredAt: order.deliveredAt,
        remark: order.remark,
        })
      );
      if (order.user) {
        ordersForExport[i].userName = order.user.name;
        ordersForExport[i].userEmail = order.user.email;
        ordersForExport[i].userPhone = order.user.phone;
      };
      if (order.anonymous_user) {
        ordersForExport[i].anonymousName = order.anonymous_user.name;
        ordersForExport[i].anonymousEmail = order.anonymous_user.email;
        ordersForExport[i].anonymousPhone = order.anonymous_user.phone;
        ordersForExport[i].recipient = order.anonymous_user.recipient;
        ordersForExport[i].recipientPhone = order.anonymous_user.recipientPhone;
      };
    };
   };

  return (
    <div className="content-margined">
      <div className="order-header">
        <h3>Orders</h3>
        {}
      </div>
      {ordersForExport && <div className="col-md-4 center">
        <ExportReactCSV csvData={ordersForExport} />
      </div>}
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>NON-MEMBER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody className="orderTbody">
            {orders ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.user ? order.user.name : ""}</td>
                  <td>{order.anonymous_user ? order.anonymous_user.email : ""}</td>
                  <td>{order.isPaid ? "Paid" : ""}</td>
                  <td>{order.paidAt}</td>
                  <td>{order.isDelivered ? "Delivered" : ""}</td>
                  <td>{order.deliveredAt}</td>
                  <td>
                    <Link className=" btn btn-primary"to={"/order/" + order._id}>
                      Details
                    </Link>&nbsp;
                    <div
                      onClick={() => deleteHandler(order)}
                      className="order_btn__secondary btn"
                    >
                      Delete
                    </div>&nbsp;
                    {order.isPaid && !order.isDelivered &&
                    <>
                    <button
                      onClick={() => deliverHandler(order)}
                      className="btn btn-primary"
                    >
                      Retrospective Delivery
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
export default OrdersScreen;
