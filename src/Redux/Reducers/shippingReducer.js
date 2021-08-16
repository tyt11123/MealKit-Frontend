const {
  SHIPPING_CREATE_REQUEST,
  SHIPPING_CREATE_SUCCESS,
  SHIPPING_CREATE_FAIL,
  SHIPPING_LIST_REQUEST,
  SHIPPING_LIST_SUCCESS,
  SHIPPING_LIST_FAIL,
  SHIPPING_DELETE_REQUEST,
  SHIPPING_DELETE_SUCCESS,
  SHIPPING_DELETE_FAIL,
} = require("../Constants/shippingConstants");

const { USER_LOGOUT } = require("../Constants/userConstants");

function shippingCreateReducer(state = {}, action) {
  switch (action.type) {
    case SHIPPING_CREATE_REQUEST:
      return { loading: true };
    case SHIPPING_CREATE_SUCCESS:
      return { loading: false, shipping: action.payload, success: true };
    case SHIPPING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function shippingListReducer(
  state = {
    shipping: [],
  },
  action
) {
  switch (action.type) {
    case SHIPPING_LIST_REQUEST:
      return { loading: true };
    case SHIPPING_LIST_SUCCESS:
      return { loading: false, shipping: action.payload };
    case SHIPPING_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {shipping: [],
      };
    default:
      return state;
  }
}

function shippingDeleteReducer(state = {}, action) {
  switch (action.type) {
    case SHIPPING_DELETE_REQUEST:
      return { loading: true };
    case SHIPPING_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SHIPPING_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export { shippingCreateReducer, shippingListReducer, shippingDeleteReducer };
