import axios from "axios";
import {
    SHIPPING_CREATE_REQUEST, SHIPPING_CREATE_SUCCESS, SHIPPING_CREATE_FAIL,
    SHIPPING_LIST_REQUEST, SHIPPING_LIST_SUCCESS, SHIPPING_LIST_FAIL,
    SHIPPING_DELETE_REQUEST, SHIPPING_DELETE_SUCCESS, SHIPPING_DELETE_FAIL,
} from "../Constants/shippingConstants";

const createShipping = (shipping) => async (dispatch, getState) => {
    try {
        dispatch({ type: SHIPPING_CREATE_REQUEST, payload: shipping });
        const { userSignin: { userInfo } } = getState();
        const { data: { data: newShipping } } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/shippings/`, shipping, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: SHIPPING_CREATE_SUCCESS, payload: newShipping })
    } catch (error) {
        dispatch({ type: SHIPPING_CREATE_FAIL, payload: error.message })
    }
}

const listShippings = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SHIPPING_LIST_REQUEST});
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/shippings/`, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: SHIPPING_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SHIPPING_LIST_FAIL, payload: error.message })
    }
}

const deleteShipping = (shippingId) => async (dispatch, getState) => {
    try {
        dispatch({ type: SHIPPING_DELETE_REQUEST, payload: shippingId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/shippings/` + shippingId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({type: SHIPPING_DELETE_SUCCESS,payload: shippingId})
    } catch (error) {
        dispatch({type: SHIPPING_DELETE_FAIL, payload:error.message})
    }
}

export { createShipping, listShippings, deleteShipping };