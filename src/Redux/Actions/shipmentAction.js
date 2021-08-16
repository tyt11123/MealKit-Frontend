import axios from "axios";
import {
    SHIPMENT_TIME_REQUEST, SHIPMENT_TIME_SUCCESS, SHIPMENT_TIME_FAIL,
} from "../Constants/shipmentConstants";

const saveShipmentTime = (id, time) => async (dispatch, getState) => {
    try {
        dispatch({ type: SHIPMENT_TIME_REQUEST, payload: time });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.put(process.env.REACT_APP_API_SERVER + "/api/shipments/" + id + "/time", { time }, {
            headers:
            { Authorization: userInfo ? 'Bearer ' + userInfo.token : '' }
        });
        dispatch({ type: SHIPMENT_TIME_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SHIPMENT_TIME_FAIL, payload: error.response.status });
    }
}

export { saveShipmentTime };