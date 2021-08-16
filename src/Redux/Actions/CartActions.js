import axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_SAVE_REMARK,
    CART_SAVE_TIME, CART_SAVE_COUPON, CART_SAVE_ANONYMOUS, } from '../Constants/cartConstant';


const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_API_SERVER + "/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {

    }
}
const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data })
}

const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data })
}

const saveRemark = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_REMARK, payload: data })
}

const saveTime = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_TIME, payload: data })
}

const saveCoupon = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_COUPON, payload: data })
}

const saveAnonymous = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_ANONYMOUS, payload: data })
}


export { addToCart, removeFromCart, saveShipping, savePayment, saveRemark, saveTime,
    saveCoupon, saveAnonymous, }