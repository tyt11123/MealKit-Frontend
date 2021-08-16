import React, { useState } from "react";
import { NavLink } from "react-router-dom";
//above to change pages by using those components from above

import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../Backdrop/Backdrop";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
// above for toolbar component

import { useSelector } from "react-redux";
// import Category from "../Category/Category";

// import HomePageScreen from "../../screens/HomePageScreen/HomePageScreen";
// import MenuPageScreen from "../../screens/MenuPageScreen/MenuPageScreen";
// above Main pages's componest

import PreviousOrderBtn from "./ToolbarAsset/pastOrder.png";
import CartIconOrange from "./ToolbarAsset/cartIcon_orange.png";
import CartBtn from "./ToolbarAsset/empty_cart.png";
import mealkitLogo from "./ToolbarAsset/logoMealkit.svg";
import LogoVer from "./ToolbarAsset/OKLogoVer5.png";
import "./Toolbar.css";
// icon
import { Icon } from "react-icons-kit";
import { history } from "react-icons-kit/icomoon/history";
import { shoppingCart } from "react-icons-kit/fa/shoppingCart";
import { whatsapp } from "react-icons-kit/fa/whatsapp";
import { listAlt } from "react-icons-kit/fa/listAlt";
import { u1F373 } from "react-icons-kit/noto_emoji_regular/u1F373";
import { heart } from "react-icons-kit/fa/heart";
// import Drawer_specialMenuIcon from "../../Toolbar/SideDrawer/Asset/specialMenu2.png";
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
// above : styling & images

import Countdown from "react-countdown";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/userActions";

const Toolbar = (props) => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems, } = cart;
  const itemsQty = cartItems.reduce((a, c) => a + Number(c.qty), 0);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const drawerToggleClickHandler = () => {
    if (sideDrawerOpen) {
      setSideDrawerOpen(false);
    } else {
      setSideDrawerOpen(true);
    }
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };
  const [backdrop, setBackdrop] = useState();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="toolbar">
        <nav className="toolbar__nav toolbar__destkop">
          <div className="toolbar__logo">
            <NavLink to="/">
              <img src={LogoVer} alt="brand logo" className="toolbar__Logo" />
            </NavLink>
          </div>
          <div className="spacer"></div>

          <div className="toolbar_nav-items">
            <ul>
              {/* <li className="toolbar_nav-items_links ">
                <NavLink to="/shop">
                 
                  Menu
                </NavLink>
              </li> */}
              <li className="toolbar_nav-items_links " style={{margin:"0 2rem 0 .1rem"}}>
                <NavLink to="/OnTheMenu">
                  <Icon
                    size={40}
                    icon={u1F373}
                    className="drawer_Icon_Link"
                  />
                  {/* Cooking Hint */}
                </NavLink>
              </li>
              <li className="toolbar_nav-items_links ">
                <NavLink to="/shipping">
                <Icon
                  size={35}
                  icon={shoppingCart}
                  className="drawer_Icon_Link"
                />
                  {/* Cart */}
                </NavLink>
                <NotificationBadge count={itemsQty} effect={Effect.SCALE}/>
              </li>
              {userInfo && (
                <li className="toolbar_nav-items_links ">
                  <NavLink to="/favourite">
                    <Icon
                      size={35}
                      icon={heart}
                      className="drawer_Icon_Link"
                    />
                    {/* Favourite */}
                  </NavLink>
                </li>
              )}
              <li className="toolbar_nav-items_links ">
                {userInfo ? (
                  <NavLink to="/profile">{userInfo.name}</NavLink>
                ) : (
                  <NavLink to="/signin">Sign In</NavLink>
                )}
              </li>
              {userInfo && (
                <li className="toolbar_nav-items_links ">
                  <NavLink onClick={handleLogOut} to="/signin">
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          
        </nav>
        {/* start mobile version (bottom navbar) */}
        <nav className="toolbar__nav nav2">
          <div className="toolbar__toggle-button mobile_nav">
            <DrawerToggleButton
              click={drawerToggleClickHandler}
              className="mobile_btn"
            />
            <NavLink to="/cart" className=" cart_btn">
              <div className=" cart_btn">
                {/* <img src={CartIconOrange} className="cart_btn_img" /> */}
                <Icon
                  size={30}
                  icon={shoppingCart}
                  // style={{ color: "#fd7e14" }}
                  className="drawer_Icon_Link"
                />
                <NotificationBadge count={itemsQty} effect={Effect.SCALE}/>
                <h5>my cart</h5>
              </div>
            </NavLink>
            <NavLink to="/history" className=" cart_btn">
              <div className=" cart_btn">
                {/* <img src={PreviousOrderBtn} className="cart_btn_img" /> */}
                <Icon
                  size={30}
                  icon={history}
                  // style={{ color: "#fd7e14" }}
                  className="drawer_Icon_Link"
                />
                <h5>previous order</h5>
              </div>
            </NavLink>
          </div>
          <div className="spacer-01"></div>

          <div className="spacer"></div>
        </nav>
        {/* <nav className="time">
          <Countdown date={tomorrow} renderer={renderer} />
        </nav> */}
      </header>
      <SideDrawer show={sideDrawerOpen} close={drawerToggleClickHandler} />
      {backdrop}
      {sideDrawerOpen ? <Backdrop click={backdropClickHandler} /> : <></>}
    </>
  );
};

export default Toolbar;
