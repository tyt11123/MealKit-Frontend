const {
    SHIPMENT_TIME_REQUEST, SHIPMENT_TIME_SUCCESS, SHIPMENT_TIME_FAIL,
} = require("../Constants/shipmentConstants");

const { USER_LOGOUT } = require("../Constants/userConstants");

function shipmentTimeReducer(state = {}, action) {
    switch (action.type) {
        case SHIPMENT_TIME_REQUEST:
        return { loading: true };
        case SHIPMENT_TIME_SUCCESS:
        return { loading: false, success: true };
        case SHIPMENT_TIME_FAIL:
        return { loading: false, error: action.payload };
        case USER_LOGOUT:
        return {};
        default:
        return state;
    }
}

export { shipmentTimeReducer };
