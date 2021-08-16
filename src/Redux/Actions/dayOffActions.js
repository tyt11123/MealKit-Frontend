import axios from 'axios';
import { DAYOFF_READ_REQUEST, DAYOFF_READ_SUCCESS, DAYOFF_READ_FAIL,
    DAYOFF_SAVE_REQUEST, DAYOFF_SAVE_SUCCESS, DAYOFF_SAVE_FAIL, } from '../Constants/dayOffConstant';

const saveDayOff = (bulkDate) => async (dispatch, getState) => {
    try {
        dispatch({ type: DAYOFF_SAVE_REQUEST, payload: { bulkDate } });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.post(`${process.env.REACT_APP_API_SERVER}/api/dayoff/`, { bulkDate }, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: DAYOFF_SAVE_SUCCESS, payload: { bulkDate } })
    } catch (error) {
        dispatch({ type: DAYOFF_SAVE_FAIL, payload: error.message })
    }
}

const listDayOff = () => async (dispatch) => {
    try {
        dispatch({ type: DAYOFF_READ_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}/api/dayoff/`);
        dispatch({ type: DAYOFF_READ_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: DAYOFF_READ_FAIL, payload: error.message })
    }
}

export { saveDayOff, listDayOff, }