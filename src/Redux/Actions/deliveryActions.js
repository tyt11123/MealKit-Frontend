import axios from 'axios';
import {
    DELIVERY_DISPATCH_REQUEST, DELIVERY_DISPATCH_SUCCESS, DELIVERY_DISPATCH_FAIL,
    DELIVERY_CREATE_REQUEST, DELIVERY_CREATE_SUCCESS, DELIVERY_CREATE_FAIL,
    DELIVERY_LIST_REQUEST, DELIVERY_LIST_SUCCESS, DELIVERY_LIST_FAIL,
    DELIVERY_DETAILS_REQUEST, DELIVERY_DETAILS_SUCCESS, DELIVERY_DETAILS_FAIL,
    DELIVERY_UPDATE_REQUEST, DELIVERY_UPDATE_SUCCESS, DELIVERY_UPDATE_FAIL,
    DELIVERY_MISS_REQUEST, DELIVERY_MISS_SUCCESS, DELIVERY_MISS_FAIL,
    DELIVERY_DELETE_REQUEST, DELIVERY_DELETE_SUCCESS, DELIVERY_DELETE_FAIL,
} from '../Constants/deliveryConstant';

const todayRelease = () => async (dispatch, getState) => {
    try {
        dispatch({ type: DELIVERY_DISPATCH_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/deliveries/today`, null, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: DELIVERY_DISPATCH_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVERY_DISPATCH_FAIL, payload: error.response.status })
    }
}

const createDelivery = (delivery) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELIVERY_CREATE_REQUEST, payload: delivery });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/deliveries/`, delivery, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: DELIVERY_CREATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVERY_CREATE_FAIL, payload: error.response.status })
    }
}

const listDelivery = () => async (dispatch, getState) => {
    try {
        dispatch({ type: DELIVERY_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        let timespan = "today";
        if ( userInfo.isAdmin ) { timespan = "7days"; };
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/deliveries/${timespan}`, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: DELIVERY_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVERY_LIST_FAIL, payload: error.response.status })
    }
}

const detailsDelivery = (deliveryId) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELIVERY_DETAILS_REQUEST, payload: deliveryId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/deliveries/${deliveryId}`, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: DELIVERY_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVERY_DETAILS_FAIL, payload: error.response.status })
    }
}

const updateDelivery = (deliveryId, latlon, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELIVERY_UPDATE_REQUEST, payload: deliveryId });
        const { userSignin: { userInfo } } = getState();
        let response = {};
        switch ( status ) {
            case true:
                response = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/deliveries/${deliveryId}/success`, latlon, {
                    headers: {
                        Authorization: 'Bearer ' + userInfo.token
                    }
                });
                break;
            case false:
                response = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/deliveries/${deliveryId}/fail`, latlon, {
                    headers: {
                        Authorization: 'Bearer ' + userInfo.token
                    }
                });
                break;
            default:
                response = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/deliveries/${deliveryId}/latlon`, latlon, {
                    headers: {
                        Authorization: 'Bearer ' + userInfo.token
                    }
                });
        };
        const { data } = response;
        dispatch({ type: DELIVERY_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVERY_UPDATE_FAIL, payload: error.response.status })
    }
}

const missDelivery = (deliveryId, missed) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELIVERY_MISS_REQUEST, payload: deliveryId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/deliveries/${deliveryId}/missed`, { missed }, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: DELIVERY_MISS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVERY_MISS_FAIL, payload: error.response.status })
    }
}

const deleteDelivery = (deliveryId) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELIVERY_DELETE_REQUEST, payload: deliveryId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/deliveries/${deliveryId}`, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: DELIVERY_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DELIVERY_DELETE_FAIL, payload: error.response.status })
    }
}

export { todayRelease, createDelivery, listDelivery, detailsDelivery, updateDelivery, 
    missDelivery, deleteDelivery, }