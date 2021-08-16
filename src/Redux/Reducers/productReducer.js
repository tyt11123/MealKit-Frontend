import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
  PRODUCT_MENU_REQUEST, PRODUCT_MENU_SUCCESS, PRODUCT_MENU_FAIL,
  PRODUCT_CAROUSEL_LOAD_REQUEST, PRODUCT_CAROUSEL_LOAD_SUCCESS, PRODUCT_CAROUSEL_LOAD_FAIL,
  PRODUCT_CAROUSEL_SAVE_REQUEST, PRODUCT_CAROUSEL_SAVE_SUCCESS, PRODUCT_CAROUSEL_SAVE_FAIL,
} from "../Constants/productConstants";

const { USER_LOGOUT } = require("../Constants/userConstants");

function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { products: [] };
    default:
      return state;
  }
}

function productDetailsReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {product: {} };
    default:
      return state;
  }
}

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {product: {} };
    default:
      return state;
  }
}

function productSaveReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_SAVE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {product: {} };
    default:
      return state;
  }
}

function productMenuReducer(state = { menu: [] }, action) {
  switch (action.type) {
    case PRODUCT_MENU_REQUEST:
      return { loading: true };
    case PRODUCT_MENU_SUCCESS:
      return { loading: false, success: true, menu: action.payload };
    case PRODUCT_MENU_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { menu: [] };
    default:
      return state;
  }
}

function productCarouselReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_CAROUSEL_LOAD_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_CAROUSEL_LOAD_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_CAROUSEL_LOAD_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { products: [] };
    default:
      return state;
  }
}

function productCarouselSaveReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_CAROUSEL_SAVE_REQUEST:
      return { loading: true, };
    case PRODUCT_CAROUSEL_SAVE_SUCCESS:
      return { loading: false, success: true, };
    case PRODUCT_CAROUSEL_SAVE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case PRODUCT_CAROUSEL_LOAD_SUCCESS:
      return { ...state, success: false, };
    default:
      return state;
  }
}

export {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productMenuReducer,
  productCarouselReducer,
  productCarouselSaveReducer,
};
