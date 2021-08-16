import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
  CART_SAVE_REMARK,
  CART_SAVE_TIME,
  CART_SAVE_COUPON,
  CART_SAVE_ANONYMOUS,
} from "../Constants/cartConstant";

const { USER_LOGOUT, } = require("../Constants/userConstants");
const { ORDER_CREATE_SUCCESS, ORDER_EMAIL_SUCCESS, } = require("../Constants/orderConstant");

function cartReducer(
  state = { cartItems: [], shipping: {}, payment: {}, 
    remark: '', coupon: '', user: {}, },
  action
) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }

      return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    case CART_SAVE_REMARK:
      return { ...state, remark: action.payload };
    case CART_SAVE_TIME:
      return { ...state, shipping: {...state.shipping, time: action.payload, } };
    case CART_SAVE_COUPON:
      return { ...state, coupon: action.payload };
    case CART_SAVE_ANONYMOUS:
      return { ...state, user: action.payload };
    case USER_LOGOUT:
      return {cartItems: [], shipping: {}, payment: {}, remark: '', coupon: '', user: {}, };
    case ORDER_CREATE_SUCCESS:
      return {cartItems: [], shipping: {}, payment: {}, remark: '', coupon: '', user: {}, };
    case ORDER_EMAIL_SUCCESS:
      return {cartItems: [], shipping: {}, payment: {}, remark: '', coupon: '', user: {}, };
    default:
      return state;
  }
}

export { cartReducer };
