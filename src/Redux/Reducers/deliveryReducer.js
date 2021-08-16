const {
    DELIVERY_DISPATCH_REQUEST, DELIVERY_DISPATCH_SUCCESS, DELIVERY_DISPATCH_FAIL,
    DELIVERY_CREATE_REQUEST, DELIVERY_CREATE_SUCCESS, DELIVERY_CREATE_FAIL,
    DELIVERY_LIST_REQUEST, DELIVERY_LIST_SUCCESS, DELIVERY_LIST_FAIL,
    DELIVERY_DETAILS_REQUEST, DELIVERY_DETAILS_SUCCESS, DELIVERY_DETAILS_FAIL,
    DELIVERY_UPDATE_REQUEST, DELIVERY_UPDATE_SUCCESS, DELIVERY_UPDATE_FAIL,
    DELIVERY_MISS_REQUEST, DELIVERY_MISS_SUCCESS, DELIVERY_MISS_FAIL,
    DELIVERY_DELETE_REQUEST, DELIVERY_DELETE_SUCCESS, DELIVERY_DELETE_FAIL,
} = require("../Constants/deliveryConstant");

const { USER_LOGOUT } = require("../Constants/userConstants");

function deliveryTodayReducer(state = {}, action) {
    switch (action.type) {
        case DELIVERY_DISPATCH_REQUEST:
        return { loading: true };
        case DELIVERY_DISPATCH_SUCCESS:
        return { loading: false, success: true, };
        case DELIVERY_DISPATCH_FAIL:
        return { loading: false, error: action.payload };
        case USER_LOGOUT:
        return {};
        default:
        return state;
    }
}

function deliveryCreateReducer(state = {}, action) {
    switch (action.type) {
        case DELIVERY_CREATE_REQUEST:
        return { loading: true };
        case DELIVERY_CREATE_SUCCESS:
        return { loading: false, success: true, };
        case DELIVERY_CREATE_FAIL:
        return { loading: false, error: action.payload };
        case USER_LOGOUT:
        return {};
        default:
        return state;
    }
}

function deliveryListReducer(state = {}, action) {
    switch (action.type) {
        case DELIVERY_LIST_REQUEST:
        return { loading: true };
        case DELIVERY_LIST_SUCCESS:
        return { loading: false, success: true, deliveries: action.payload };
        case DELIVERY_LIST_FAIL:
        return { loading: false, error: action.payload };
        case USER_LOGOUT:
        return {};
        default:
        return state;
    }
}

function deliveryDetailsReducer(
    state = {
        delivery: {
            orderItems: [],
            shipping: {},
            payment: {},
        },
    }, 
    action ) {
    switch (action.type) {
        case DELIVERY_DETAILS_REQUEST:
        return { loading: true };
        case DELIVERY_DETAILS_SUCCESS:
        return { loading: false, delivery: action.payload };
        case DELIVERY_DETAILS_FAIL:
        return { loading: false, error: action.payload };
        case USER_LOGOUT:
        return {
            delivery: {
                orderItems: [],
                shipping: {},
                payment: {},
            }
        };
        default:
        return state;
    }
}

function deliveryUpdateReducer(state = {}, action ) {
    switch (action.type) {
        case DELIVERY_UPDATE_REQUEST:
        return { loading: true };
        case DELIVERY_UPDATE_SUCCESS:
        return { loading: false, success: true };
        case DELIVERY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
        case USER_LOGOUT:
        return {};
        default:
        return state;
    }
}

function deliveryMissReducer(state = {}, action ) {
    switch (action.type) {
        case DELIVERY_MISS_REQUEST:
        return { loading: true };
        case DELIVERY_MISS_SUCCESS:
        return { loading: false, success: true };
        case DELIVERY_MISS_FAIL:
        return { loading: false, error: action.payload };
        case USER_LOGOUT:
        return {};
        default:
        return state;
    }
}

function deliveryDeleteReducer(state = {}, action ) {
    switch (action.type) {
        case DELIVERY_DELETE_REQUEST:
        return { loading: true };
        case DELIVERY_DELETE_SUCCESS:
        return { loading: false, success: true };
        case DELIVERY_DELETE_FAIL:
        return { loading: false, error: action.payload };
        case USER_LOGOUT:
        return {};
        default:
        return state;
    }
}

export {
    deliveryTodayReducer, deliveryCreateReducer, 
    deliveryListReducer, deliveryDetailsReducer, 
    deliveryUpdateReducer, deliveryMissReducer, 
    deliveryDeleteReducer,
};