import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../Redux/Actions/OrderActions'

function HistoryScreen(props) {
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList

    useEffect(() => {
        if (!userInfo) {
            props.history.push("/signin?redirect=history")
        }
        dispatch(listMyOrders());
        return () => {

        }
    }, []);

    if (orders) {
        for (let i = 0; i < orders.length; i++) {
            orders[i].createdAt = new Date(orders[i].createdAt).toLocaleString();
            if (orders[i].isPaid) {orders[i].paidAt = new Date(orders[i].paidAt).toLocaleString();};
            if (orders[i].isDelivered) {orders[i].deliveredAt = new Date(orders[i].deliveredAt).toLocaleString();};
        };
   };

    return <div className="profile">
        <div className="profile-orders content-margin">
            {
                loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders}</div> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders ? orders.map(order => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid? "Paid": "Not Paid"}</td>
                                    <td><Link to={"/order/" + order._id}>DETAILS</Link></td>
                                </tr>) : <tr />}
                            </tbody>
                        </table>
            }
        </div>
    </div>


}
export default HistoryScreen;
