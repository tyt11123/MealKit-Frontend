import axios from 'axios';
import { DASHBOARD_LIST_REQUEST, DASHBOARD_LIST_SUCCESS, DASHBOARD_LIST_FAIL,
    DASHBOARD_DETAILS_REQUEST, DASHBOARD_DETAILS_SUCCESS, DASHBOARD_DETAILS_FAIL, } from '../Constants/dashboardConstant';

const listChart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: DASHBOARD_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get(process.env.REACT_APP_API_SERVER + "/api/dashboard/", {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: DASHBOARD_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DASHBOARD_LIST_FAIL, payload: error.message })
    }
};

const detailsChart = (value) => async (dispatch, getState) => {
    try {
        dispatch({ type: DASHBOARD_DETAILS_REQUEST, payload: value });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get(process.env.REACT_APP_API_SERVER + "/api/dashboard/" + value, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: DASHBOARD_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DASHBOARD_DETAILS_FAIL, payload: error.message })
    }
};

export { listChart, detailsChart, }