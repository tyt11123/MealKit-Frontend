import {
    COUPON_VERIFY_REQUEST, COUPON_VERIFY_SUCCESS, COUPON_VERIFY_FAIL, 
    COUPON_REDEEM_REQUEST, COUPON_REDEEM_SUCCESS, COUPON_REDEEM_FAIL, 
    COUPON_WELCOME_REQUEST, COUPON_WELCOME_SUCCESS, COUPON_WELCOME_FAIL, 
    COUPON_LIST_REQUEST, COUPON_LIST_SUCCESS, COUPON_LIST_FAIL,
    COUPON_SAVE_REQUEST, COUPON_SAVE_SUCCESS, COUPON_SAVE_FAIL,
    COUPON_DELETE_REQUEST, COUPON_DELETE_SUCCESS, COUPON_DELETE_FAIL,
    COUPON_EMAIL_REQUEST, COUPON_EMAIL_SUCCESS, COUPON_EMAIL_FAIL,
} from '../Constants/couponConstant';
  
const { USER_LOGOUT } = require("../Constants/userConstants");
const { ORDER_CREATE_SUCCESS, ORDER_ANONYMOUS_SUCCESS, } = require("../Constants/orderConstant");
const { CART_SAVE_SHIPPING, CART_SAVE_ANONYMOUS, } = require('../Constants/cartConstant');
const { USER_SMS_GET_REQUEST, } = require('../Constants/userConstants');

function couponVerifyReducer(state = {}, action) {
    switch (action.type) {
      case COUPON_VERIFY_REQUEST:
        return { loading: true };
      case COUPON_VERIFY_SUCCESS:
        return { loading: false, coupon: action.payload, success: true };
      case COUPON_VERIFY_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      case ORDER_CREATE_SUCCESS:
        return {};
      case ORDER_ANONYMOUS_SUCCESS:
        return {};
      case CART_SAVE_SHIPPING:
        return {};
      case CART_SAVE_ANONYMOUS:
        return {};
      default:
        return state;
    }
}

function couponRedeemReducer(state = {}, action) {
  switch (action.type) {
    case COUPON_REDEEM_REQUEST:
      return { loading: true };
    case COUPON_REDEEM_SUCCESS:
      return { loading: false, coupon: action.payload, success: true };
    case COUPON_REDEEM_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case CART_SAVE_SHIPPING:
      return {};
    default:
      return state;
  }
}

function couponWelcomeReducer(state = {}, action) {
  switch (action.type) {
    case COUPON_WELCOME_REQUEST:
      return { loading: true };
    case COUPON_WELCOME_SUCCESS:
      return { loading: false, coupon: action.payload, success: true };
    case COUPON_WELCOME_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case USER_SMS_GET_REQUEST:
      return {};
    default:
      return state;
  }
}

function couponEmailReducer(state = {}, action) {
  switch (action.type) {
    case COUPON_EMAIL_REQUEST:
      return { loading: true };
    case COUPON_EMAIL_SUCCESS:
      return { loading: false, success: true };
    case COUPON_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case COUPON_VERIFY_REQUEST:
      return {};
    default:
      return state;
  }
}

function couponListReducer(state = { coupons: [] }, action) {
  switch (action.type) {
    case COUPON_LIST_REQUEST:
      return { loading: true };
    case COUPON_LIST_SUCCESS:
      return { loading: false, coupons: action.payload, success: true };
    case COUPON_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { coupons: [] };
    default:
      return state;
  }
}

function couponDeleteReducer(state = { coupon: {} }, action) {
  switch (action.type) {
    case COUPON_DELETE_REQUEST:
      return { loading: true };
    case COUPON_DELETE_SUCCESS:
      return { loading: false, coupon: action.payload, success: true };
    case COUPON_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {coupon: {} };
    default:
      return state;
  }
}

function couponSaveReducer(state = { coupon: {} }, action) {
  switch (action.type) {
    case COUPON_SAVE_REQUEST:
      return { loading: true };
    case COUPON_SAVE_SUCCESS:
      return { loading: false, success: true, coupon: action.payload };
    case COUPON_SAVE_FAIL:
      return { lodading: false, error: action.payload };
    case USER_LOGOUT:
      return {coupon: {} };
    default:
      return state;
  }
}

export { couponVerifyReducer, couponRedeemReducer, couponWelcomeReducer, couponEmailReducer,
  couponListReducer, couponDeleteReducer, couponSaveReducer, };
