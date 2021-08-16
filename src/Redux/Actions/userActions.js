import axios from 'axios';
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    USER_FACEBOOK_REQUEST, USER_FACEBOOK_SUCCESS, USER_FACEBOOK_FAIL, 
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
    USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, 
    USER_SMS_GET_REQUEST, USER_SMS_GET_SUCCESS, USER_SMS_GET_FAIL, 
    USER_SMS_VER_REQUEST, USER_SMS_VER_SUCCESS, USER_SMS_VER_FAIL, USER_SMS_START_OVER, 
    USER_FORGOT_REQUEST, USER_FORGOT_SUCCESS, USER_FORGOT_FAIL, 
    USER_RESET_VALIDATE_REQUEST, USER_RESET_VALIDATE_SUCCESS, USER_RESET_VALIDATE_FAIL, 
    USER_RESET_REQUEST, USER_RESET_SUCCESS, USER_RESET_FAIL,
    USER_FULLLIST_REQUEST, USER_FULLLIST_SUCCESS, USER_FULLLIST_FAIL,
    USER_FAV_LIST_REQUEST, USER_FAV_LIST_SUCCESS, USER_FAV_LIST_FAIL, 
    USER_FAV_ADD_REQUEST, USER_FAV_ADD_SUCCESS, USER_FAV_ADD_FAIL, 
    USER_FAV_DELETE_REQUEST, USER_FAV_DELETE_SUCCESS, USER_FAV_DELETE_FAIL, 
 } from '../Constants/userConstants';

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/users/signin`, { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.message });
    }
}

const facebook = (access_token) => async (dispatch) => {
    dispatch({ type: USER_FACEBOOK_REQUEST, payload: { access_token } });
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/users/facebook`, { access_token });
        dispatch({ type: USER_FACEBOOK_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_FACEBOOK_FAIL, payload: error.message });
    }
}

const update = ({ userId, name, email, password, preference, allergies,tags }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password, preference, allergies,tags } });
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/users/` + userId,
            { name, email, password, preference, allergies,tags }, {
            headers:
                { Authorization: 'Bearer ' + userInfo.token }
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
}

const register = (name, email, password, preference, allergies) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password, preference, allergies } });
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/users/register`, { name, email, password, preference, allergies });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

const generate = (phone) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_SMS_GET_REQUEST, payload: { phone } });
        const { userSignin: { userInfo } } = getState();
        const { status } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/phones/request`, { phone }, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: USER_SMS_GET_SUCCESS, payload: status });
    } catch (error) {
        dispatch({ type: USER_SMS_GET_FAIL, payload: error.message });
    }
}

const verify = (phone, smscode, localphone) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_SMS_VER_REQUEST, payload: { phone, smscode } });
        const { userSignin: { userInfo } } = getState();
        const { status } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/phones/check`, { phone, smscode }, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        if (status === 202) {
            dispatch({ type: USER_SMS_VER_SUCCESS, payload: { status } });
        } else {
            userInfo.phone = localphone;
            Cookie.set('userInfo', JSON.stringify(userInfo));
            dispatch({ type: USER_SMS_VER_SUCCESS, payload: { localphone, status } });
        };
    } catch (error) {
        dispatch({ type: USER_SMS_VER_FAIL, payload: error.message });
    }
}

const restart = () => (dispatch) => {
    dispatch({ type: USER_SMS_START_OVER })
}

const forgot = (email) => async (dispatch) => {
    try {
        dispatch({ type: USER_FORGOT_REQUEST, payload: { email } });
        const { status } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/users/forgot`, { email } );
        dispatch({ type: USER_FORGOT_SUCCESS, payload: { status } });
    } catch (error) {
        dispatch({ type: USER_FORGOT_FAIL, payload: error.message });
    }
}

const reset_validate = (token) => async (dispatch) => {
    try {
        dispatch({ type: USER_RESET_VALIDATE_REQUEST, payload: { token } });
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/users/validate`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({ type: USER_RESET_VALIDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_RESET_VALIDATE_FAIL, payload: error.message });
    }
}

const reset = ({ userId, password, token }) => async (dispatch) => {
    try {
        dispatch({ type: USER_RESET_REQUEST, payload: { userId } });
        const { data } = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/users/reset`, { userId, password }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({ type: USER_RESET_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_RESET_FAIL, payload: error.message });
    }
}

const fulllist = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_FULLLIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/users/fulllist`, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: USER_FULLLIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_FULLLIST_FAIL, payload: error.message });
    }
}

const listFavourite = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_FAV_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/users/favourite`, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: USER_FAV_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_FAV_LIST_FAIL, payload: error.message });
    }
}

const addFavourite = (product_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_FAV_ADD_REQUEST, payload: {product_id} });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/users/favourite`, {product_id}, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: USER_FAV_ADD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_FAV_ADD_FAIL, payload: error.message });
    }
}

const removeFavourite = (product_id) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    try {
        dispatch({ type: USER_FAV_DELETE_REQUEST, payload: {product_id} });
        //const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/users/favourite/${product_id}`, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: USER_FAV_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_FAV_DELETE_FAIL, payload: userInfo.token });
    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
}

export { signin, facebook, register, logout, update, 
    generate, verify, restart, forgot, reset_validate, reset, 
    fulllist, listFavourite, addFavourite, removeFavourite, };