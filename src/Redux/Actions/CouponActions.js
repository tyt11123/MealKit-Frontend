import axios from 'axios';
import { COUPON_VERIFY_REQUEST, COUPON_VERIFY_SUCCESS, COUPON_VERIFY_FAIL, 
    COUPON_WELCOME_REQUEST, COUPON_WELCOME_SUCCESS, COUPON_WELCOME_FAIL,
    COUPON_LIST_REQUEST, COUPON_LIST_SUCCESS, COUPON_LIST_FAIL,
    COUPON_SAVE_REQUEST, COUPON_SAVE_SUCCESS, COUPON_SAVE_FAIL,
    COUPON_DELETE_REQUEST, COUPON_DELETE_SUCCESS, COUPON_DELETE_FAIL,
    COUPON_EMAIL_REQUEST, COUPON_EMAIL_SUCCESS, COUPON_EMAIL_FAIL,
} from '../Constants/couponConstant';

const verifyCoupon = (code = '', amount = 0) => async (dispatch, getState) => {
    try {
        dispatch({ type: COUPON_VERIFY_REQUEST, payload: { code, amount } })
        const { data } = await axios.get(process.env.REACT_APP_API_SERVER + "/api/vouchers/validate?code=" + code + "&amount=" + amount);
        dispatch({ type: COUPON_VERIFY_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: COUPON_VERIFY_FAIL, payload: error.message });
    }
}

const welcomeCoupon = () => async (dispatch, getState) => {
    try {
        dispatch({ type: COUPON_WELCOME_REQUEST })
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post(process.env.REACT_APP_API_SERVER + "/api/vouchers/welcome", null, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        const temp1 = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/vouchers/${data.code}/publish`, null, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: COUPON_WELCOME_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: COUPON_WELCOME_FAIL, payload: error.message });
    }
}

const emailCoupon = (code, name, email) => async (dispatch, getState) => {
    try {
        dispatch({ type: COUPON_EMAIL_REQUEST, payload: {code, name, email} })
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post(process.env.REACT_APP_API_SERVER + "/api/vouchers/email", {code, name, email}, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        const temp1 = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/vouchers/${code}/publish`, null, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: COUPON_EMAIL_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: COUPON_EMAIL_FAIL, payload: error.message });
    }
}

const listCoupons = () => async (dispatch, getState) => {
    try {
        dispatch({ type: COUPON_LIST_REQUEST })
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get(process.env.REACT_APP_API_SERVER + "/api/vouchers/", {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: COUPON_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: COUPON_LIST_FAIL, payload: error.message });
    }
}

const saveCoupon = (coupon) => async (dispatch, getState) => {
    try {
        dispatch({ type: COUPON_SAVE_REQUEST, payload: coupon })
        const { userSignin: { userInfo } } = getState();
        if (!coupon._id) {
            const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/vouchers`, coupon, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: COUPON_SAVE_SUCCESS, payload: data })
        }
        else {
            const { data } = await axios.put(`${process.env.REACT_APP_API_SERVER}/api/vouchers/` + coupon._id , coupon, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({ type: COUPON_SAVE_SUCCESS, payload: data })
        }
    } catch (error) {
        dispatch({ type: COUPON_SAVE_FAIL, payload: error.response.status })
    }
}

const deleteCoupon = (couponId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: COUPON_DELETE_REQUEST, payload: couponId })
        const { data } = await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/vouchers/` + couponId, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: COUPON_DELETE_SUCCESS, payload: data, success: true })
    } catch (error) {
        dispatch({ type: COUPON_DELETE_FAIL, payload: error.response.status })
    }
}

export { verifyCoupon, welcomeCoupon, emailCoupon, listCoupons, saveCoupon, deleteCoupon, }