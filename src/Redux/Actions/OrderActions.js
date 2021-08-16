import Axios from "axios";
import Cookie from "js-cookie";
import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL,
    ORDER_ANONYMOUS_REQUEST, ORDER_ANONYMOUS_SUCCESS, ORDER_ANONYMOUS_FAIL,
    ORDER_EMAIL_REQUEST, ORDER_EMAIL_SUCCESS, ORDER_EMAIL_FAIL,
    ORDER_REMARK_REQUEST, ORDER_REMARK_SUCCESS, ORDER_REMARK_FAIL,
    ORDER_COURIER_LIST_REQUEST, ORDER_COURIER_LIST_SUCCESS, ORDER_COURIER_LIST_FAIL,
} from "../Constants/orderConstant";
import {
    COUPON_REDEEM_REQUEST, COUPON_REDEEM_SUCCESS, COUPON_REDEEM_FAIL, 
} from '../Constants/couponConstant';

const createOrder = (order, code = null) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
        const { userSignin: { userInfo } } = getState();
        const { data: { data: newOrder } } = await Axios.post(`${process.env.REACT_APP_API_SERVER}/api/orders/`, order, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            }
        })
        if (code) {
            dispatch({ type: COUPON_REDEEM_REQUEST, payload: code });
            let redeemObj = { amount: order.redemptionPrice, order_id: newOrder._id };
            const { data } = await Axios.post(`${process.env.REACT_APP_API_SERVER}/api/redeem/${code}/`, redeemObj, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                }
            })
            dispatch({ type: COUPON_REDEEM_SUCCESS, payload: data })
        };
        Cookie.remove("cartItems");
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder })
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.message })
        if (code) {dispatch({ type: COUPON_REDEEM_FAIL, payload: error.message });};
    }
}

const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_ORDER_LIST_REQUEST});
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.get(`${process.env.REACT_APP_API_SERVER}/api/orders/mine`, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message })
    }
}

const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST});
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.get(process.env.REACT_APP_API_SERVER + "/api/orders/", {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.message })
    }
}


const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.get(process.env.REACT_APP_API_SERVER + "/api/orders/" + orderId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message })
    }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.put(process.env.REACT_APP_API_SERVER + "/api/orders/" + order._id + "/pay", paymentResult, {
        headers:
          { Authorization: userInfo ? 'Bearer ' + userInfo.token : '' }
      });
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
    }
}

const deliverOrder = (id, courier) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVER_REQUEST, payload: courier });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.put(process.env.REACT_APP_API_SERVER + "/api/orders/" + id + "/deliver", courier, {
        headers:
          { Authorization: userInfo ? 'Bearer ' + userInfo.token : '' }
      });
      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_DELIVER_FAIL, payload: error.message });
    }
}

const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.delete(process.env.REACT_APP_API_SERVER + "/api/orders/" + orderId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({type:ORDER_DELETE_SUCCESS,payload:orderId})
    } catch (error) {
        dispatch({type:ORDER_DELETE_FAIL, payload:error.message})
    }
}

const createAnonymousOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_ANONYMOUS_REQUEST, payload: order });
        const { data: { data: newOrder } } = await Axios.post(`${process.env.REACT_APP_API_SERVER}/api/orders/anonymous`, order);
        if (order.coupon) {
            dispatch({ type: COUPON_REDEEM_REQUEST, payload: order.coupon });
            let redeemObj = { amount: order.redemptionPrice, order_id: newOrder._id };
            const { data } = await Axios.post(`${process.env.REACT_APP_API_SERVER}/api/redeem/${order.coupon}/`, redeemObj);
            dispatch({ type: COUPON_REDEEM_SUCCESS, payload: data })
        };
        Cookie.remove("cartItems");
        dispatch({ type: ORDER_ANONYMOUS_SUCCESS, payload: newOrder })
    } catch (error) {
        dispatch({ type: ORDER_ANONYMOUS_FAIL, payload: error.message })
        if (order.coupon) {dispatch({ type: COUPON_REDEEM_FAIL, payload: error.message });};
    }
}

const emailOrder = (info) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_EMAIL_REQUEST, payload: info });
        const { data } = await Axios.post(`${process.env.REACT_APP_API_SERVER}/api/orders/clientmail`, info);
        Cookie.remove("cartItems");
        dispatch({ type: ORDER_EMAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ORDER_EMAIL_FAIL, payload: error.message })
    }
}

const remarkOrder = (id, remark) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_REMARK_REQUEST, payload: remark });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.put(process.env.REACT_APP_API_SERVER + "/api/orders/" + id + "/info", { remark }, {
        headers:
          { Authorization: userInfo ? 'Bearer ' + userInfo.token : '' }
      });
      dispatch({ type: ORDER_REMARK_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_REMARK_FAIL, payload: error.response.status });
    }
}

export { createOrder,detailsOrder, listMyOrders, listOrders, payOrder, deliverOrder, 
    deleteOrder, createAnonymousOrder, emailOrder, remarkOrder, };