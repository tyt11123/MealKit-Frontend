import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Reactstrap from "reactstrap";
import ScrollToTop from "react-router-scroll-top";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
// above make the Router, Link & Switch in App.js
import Toolbar from "./Toolbar/Toolbar/Toolbar";
import SideDrawer from "./Toolbar/SideDrawer/SideDrawer";
import Backdrop from "./Toolbar/Backdrop/Backdrop";
// above Toolbar(Navbar)&Sidebar components
import Footer from "./Components/HomePageComponent/Footer/Footer";
//above Homepage components

import HelpCenter_innerContent from "./Components/HomePageComponent/Footer/Footer_Links/FooterLink_HelpCenter/HelpCenter_innerContent";
//Above for Demo show on App

import HomePageScreen from "./screens/HomePageScreen/HomePageScreen";
import MenuPageScreen from "./screens/MenuPageScreen/MenuPageScreen";
import FooterLink_delivery from "./Components/HomePageComponent/Footer/Footer_Links/FooterLink_delivery";
import FooterLink_aboutUs from "./Components/HomePageComponent/Footer/Footer_Links/FooterLink_aboutUs";
import FooterLink_helpCenter from "./Components/HomePageComponent/Footer/Footer_Links/FooterLink_HelpCenter/HelpCenter_innerContent";
import FooterLink_specialOffer from "./Components/HomePageComponent/Footer/Footer_Links/FooterLink_specialOffer";

import { useSelector, useDispatch } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import MemberShippingScreen from "./screens/MemberShippingScreen";
import MemberPaymentScreen from "./screens/MemberPaymentScreen";
import MemberPlaceOrderScreen from "./screens/MemberPlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HistoryScreen from "./screens/HistoryScreen";
import OrdersScreen from "./screens/OrdersScreen";
import PhoneScreen from "./screens/PhoneScreen";
import ForgotScreen from "./screens/ForgotScreen";
import ResetScreen from "./screens/ResetScreen";
import PackagePriceScreen from "./screens/PackagePriceScreen";
import CouponsScreen from "./screens/CouponsScreen";
import PublishScreen from "./screens/PublishScreen";
import CarouselScreen from "./screens/CarouselScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import DayOffScreen from "./screens/DayOffScreen";
import JoinChat from "./Components/Join/JoinChat";
import Chat from "./Components/Chat/Chat";
import Email from "./Components/Email/Email";
import Tagsinput from "./Components/Tagsinput/Tagsinput";
import AreaSelect from "./Components/AreaSelect/AreaSelect";
import UserLocation from "./Components/UserLocation/UserLocation";
import TableExport from "./Components/TableExport/TableExport"
import Dashboard from "./Components/Dashboard/Dashboard"
import DeliveryScreen from "./screens/DeliveryScreen";

const App = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Router>
      <ScrollToTop>
        <Toolbar />
        <Switch>
          {userInfo && userInfo.isCourier && <Route path="/location/:id" component={UserLocation} />}
          {userInfo && userInfo.isCourier && <Route path="/signin" component={SigninScreen} />}
          {userInfo && userInfo.isCourier && <Route path="*" component={DeliveryScreen} />}
          {userInfo && userInfo.isAdmin && <Route path="/courier" component={DeliveryScreen} />}
          {userInfo && userInfo.isAdmin && <Route path="/dashboard" component={Dashboard}/>}
          <Route path="/table" component={TableExport}/>
          {userInfo && userInfo.isAdmin && <Route path="/location/:id" component={UserLocation}/>}
          <Route path="/area" component={AreaSelect} />
          <Route path="/tags" component={Tagsinput} />
          <Route path="/email" component={Email} />
          <Route path="/joinchat" component={JoinChat} />
          <Route path="/chat" component={Chat} />
          {userInfo && userInfo.isAdmin && <Route path="/orders" component={OrdersScreen} />}
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/history" component={HistoryScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/verify" component={PhoneScreen} />
          {userInfo && userInfo.isAdmin && <Route path="/products" component={ProductsScreen} />}
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/memberShipping" component={MemberShippingScreen} />
          <Route path="/memberPayment" component={MemberPaymentScreen} />
          <Route path="/memberPlaceorder" component={MemberPlaceOrderScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/type/:id" component={HomeScreen} />
          <Route path="/shop" component={HomeScreen} />
          <Route path="/forgot" component={ForgotScreen} />
          <Route path="/reset/:id" component={ResetScreen} />
          <Route path="/favourite" component={FavouriteScreen} />
          {userInfo && userInfo.isAdmin && <Route path="/bundle" component={PackagePriceScreen} />}
          {userInfo && userInfo.isAdmin && <Route path="/coupon" component={CouponsScreen} />}
          {userInfo && userInfo.isAdmin && <Route path="/publish" component={PublishScreen} />}
          {userInfo && userInfo.isAdmin && <Route path="/carousel" component={CarouselScreen} />}
          {userInfo && userInfo.isAdmin && <Route path="/dayoff" component={DayOffScreen} />}
          <Route path="/" exact={true} component={HomePageScreen} />
          <Route path="/OnTheMenu" exact={true} component={MenuPageScreen} />
          <Route exact path="/HowWeWork"><FooterLink_aboutUs /></Route>
          {/* Above: Footer Link's pages  */}
          <Route exact path="/Delivery"><FooterLink_delivery /></Route>
          <Route exact path="/specialOffer"><FooterLink_specialOffer /></Route>
          <Route exact path="/helpCenter"><FooterLink_helpCenter /></Route>
          <Route path="*" component={HomePageScreen} />
        </Switch>
        <Footer />
        <NotificationContainer />
      </ScrollToTop>
    </Router>
  );
};
export default App;
