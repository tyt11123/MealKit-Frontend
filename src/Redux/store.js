import { createStore, combineReducers,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productMenuReducer, productCarouselReducer, productCarouselSaveReducer, } from './Reducers/productReducer';
import { cartReducer } from './Reducers/cartReducer';

import { orderCreateReducer, OrderDetailsReducer, myOrderListReducer, OrderListReducer, orderPayReducer, orderDeliverReducer, orderDeleteReducer, orderAnonymousReducer, orderEmailReducer, orderRemarkReducer, } from './Reducers/orderReducer';
import { shippingCreateReducer, shippingListReducer, shippingDeleteReducer } from './Reducers/shippingReducer';
import { userSigninReducer, userFacebookReducer, userRegisterReducer, userUpdateReducer, userSMSReducer, userPhoneReducer, userForgotReducer, userResetValidateReducer, userResetReducer, userFullListReducer, userFavouriteReducer, userAddFavouriteReducer, userRemoveFavouriteReducer, } from './Reducers/userReducer';
import { menuPageAccordionReducer } from './Reducers/menuPageReducer';
import { planCreateReducer, planListReducer } from './Reducers/planReducer';
import { dayOffCreateReducer, dayOffListReducer } from './Reducers/dayOffReducer';
import { couponVerifyReducer, couponRedeemReducer, couponWelcomeReducer, couponEmailReducer, couponListReducer, couponSaveReducer, couponDeleteReducer, } from './Reducers/couponReducer';
import { dashboardListReducer, dashboardDetailsReducer, } from './Reducers/dashboardReducer';
import { shipmentTimeReducer } from './Reducers/shipmentReducer';
import { deliveryTodayReducer, deliveryCreateReducer, deliveryListReducer, deliveryDetailsReducer, deliveryUpdateReducer, deliveryMissReducer, deliveryDeleteReducer, } from './Reducers/deliveryReducer';
import reduceReducers from 'reduce-reducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") ||null;

const initialState = {cart:{cartItems,shipping:{},payment:{}},userSignin:{userInfo}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: reduceReducers(userSigninReducer, userFacebookReducer, userPhoneReducer, userUpdateReducer),
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userSMS: userSMSReducer,
    userForgot: userForgotReducer,
    userResetValidate: userResetValidateReducer,
    userReset: userResetReducer,
    userFullList: userFullListReducer,
    userFavourite: userFavouriteReducer,
    userAddFavourite: userAddFavouriteReducer,
    userRemoveFavourite: userRemoveFavouriteReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productMenu: productMenuReducer,
    productCarousel: productCarouselReducer,
    productCarouselSave: productCarouselSaveReducer,
    orderCreate: orderCreateReducer,
    orderDetails: OrderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderRemark: orderRemarkReducer,
    myOrderList: myOrderListReducer,
    orderList: OrderListReducer,
    orderDelete: orderDeleteReducer,
    orderAnonymous: orderAnonymousReducer,
    orderEmail: orderEmailReducer,
    shippingCreate: shippingCreateReducer,
    shippingList: shippingListReducer,
    shippingDelete: shippingDeleteReducer,
    menuPageWeekly: menuPageAccordionReducer,
    planCreate: planCreateReducer,
    planList: planListReducer,
    dayOffCreate: dayOffCreateReducer,
    dayOffList: dayOffListReducer,
    couponVerify: couponVerifyReducer,
    couponRedeem: couponRedeemReducer,
    couponWelcome: couponWelcomeReducer,
    couponEmail: couponEmailReducer,
    couponList: couponListReducer,
    couponSave: couponSaveReducer,
    couponDelete: couponDeleteReducer,
    dashboardList: dashboardListReducer,
    dashboardDetails: dashboardDetailsReducer,
    shipmentTime: shipmentTimeReducer,
    deliveryToday: deliveryTodayReducer,
    deliveryCreate: deliveryCreateReducer,
    deliveryList: deliveryListReducer,
    deliveryDetails: deliveryDetailsReducer,
    deliveryUpdate: deliveryUpdateReducer,
    deliveryMiss: deliveryMissReducer,
    deliveryDelete: deliveryDeleteReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk,logger)));
export default store;