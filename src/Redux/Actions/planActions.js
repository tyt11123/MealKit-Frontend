import axios from 'axios';
import { PLAN_READ_REQUEST, PLAN_READ_SUCCESS, PLAN_READ_FAIL,
    PLAN_SAVE_REQUEST, PLAN_SAVE_SUCCESS, PLAN_SAVE_FAIL, } from '../Constants/planConstant';

const savePlan = (bulkQty, bulkAmount, bulkCeiling) => async (dispatch, getState) => {
    try {
        dispatch({ type: PLAN_SAVE_REQUEST, payload: { bulkQty, bulkAmount, bulkCeiling } });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/bundle/`, { bulkQty, bulkAmount, bulkCeiling }, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: PLAN_SAVE_SUCCESS, payload: { bulkQty, bulkAmount, bulkCeiling } })
    } catch (error) {
        dispatch({ type: PLAN_SAVE_FAIL, payload: error.message })
    }
}

const listPlan = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PLAN_READ_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/bundle/`);
        dispatch({ type: PLAN_READ_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PLAN_READ_FAIL, payload: error.message })
    }
}

export { savePlan, listPlan }