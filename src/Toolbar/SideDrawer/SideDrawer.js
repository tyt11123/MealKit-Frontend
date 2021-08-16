import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, update } from "../../Redux/Actions/userActions";

//above to change pages by using those components from above

// import from '../../screens/HomePageScreen/';
import HomePageScreen from "../../screens/HomePageScreen/HomePageScreen";
import MenuPageScreen from "../../screens/MenuPageScreen/MenuPageScreen";
// above we will need to import other page for Menu, Pricing, SignIn pages
import UserIconLoggedIn from "./Asset/loggedin.png";
import UserIconUnlogin from "./Asset/user_icon.png";

// below: import icon
import { Icon } from "react-icons-kit";
import {home} from 'react-icons-kit/fa/home'
import { listAlt } from "react-icons-kit/fa/listAlt";
import { u1F373 } from "react-icons-kit/noto_emoji_regular/u1F373";
// import Drawer_specialMenuIcon from "./Asset/specialMenu2.png";
import {ic_help} from 'react-icons-kit/md/ic_help';
import {ic_info} from 'react-icons-kit/md/ic_info';
import {ic_local_shipping} from 'react-icons-kit/md/ic_local_shipping'
import { heartO } from "react-icons-kit/fa/heartO";
import "./SideDrawer.css";
// above： styling

const SideDrawer = (props) => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  } else {
    drawerClasses = "side-drawer close";
  }
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <nav className={drawerClasses}>
      <div className="drawer_userDiv">
        <div className="drawer_greeting user_Heading">
          {userInfo ? (
            <h3 className="drawer_userName">Hello, {userInfo.name} !</h3>
          ) : (
            <h3 className="drawer_userName">Hello, there ! </h3>
          )}
          <a className="changeLanguages user_Heading">
            <h3> 中文(繁) | ENG</h3>
          </a>
        </div>
        <div className="drawer_userIcon">
          {userInfo ? (
            <>
              <NavLink onClick={props.close} to="/profile">
                <div className="drawer_userIcon">
                  <img
                    src={UserIconLoggedIn}
                    alt="User icon"
                    className="drawer_Img"
                  />
                  <h3>{userInfo.name}</h3>
                  <h3></h3>
                </div>
              </NavLink>
              <NavLink
                className="drawer_logout"
                onClick={() => {
                  handleLogOut();
                  props.close();
                }}
                to="#"
              >
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink onClick={props.close} to="/signin">
              <div className="drawer_userIcon">
                <img
                  src={UserIconUnlogin}
                  alt="User icon"
                  className="drawer_Img"
                />
                <h3 className="text-signIn">Sign In</h3>
              </div>
            </NavLink>
          )}
        </div>
      </div>
      <ul>
        <NavLink onClick={props.close} to="/" className="sideDrawer_link">
          <li>
          <Icon
              size={30}
              icon={home}
              style={{ color: "#fd7e14" }}
              className="drawer_Icon_Link"
            />
            <p>Home</p>
          </li>
        </NavLink>

        <NavLink
          onClick={props.close}
          to="/OnTheMenu"
          className="sideDrawer_link"
        >
          <li>
            <Icon
              size={25}
              icon={listAlt}
              style={{ color: "#fd7e14" }}
              className="drawer_Icon_Link"
            />
            <p>OpenKitchen Menu</p>
          </li>
        </NavLink>
        <NavLink onClick={props.close} to="/shop" className="sideDrawer_link">
          <li>
            <Icon
              size={30}
              icon={u1F373 }
              style={{ color: "#fd7e14"}}
              className="drawer_Icon_Link"
            />
            <p>Cooking Hint</p>
          </li>
        </NavLink>
        <NavLink onClick={props.close} to="/favourite" className="sideDrawer_link">
          <li>
          <Icon
              size={25}
              // icon={ic_help}
              icon={heartO}
              style={{ color: "#fd7e14"}}
              className="drawer_Icon_Link"
            />
            <p>Favourite</p>
          </li>
        </NavLink>
        <NavLink onClick={props.close} to="/shop" className="sideDrawer_link">
          <li>
          <Icon
              size={25}
              icon={ic_info}
              style={{ color: "#fd7e14"}}
              className="drawer_Icon_Link"
            />
            <p>About OpenKitchen</p>
          </li>
        </NavLink>
        <NavLink onClick={props.close} to="/shop" className="sideDrawer_link">
          <li>
          <Icon
              size={25}
              icon={ic_local_shipping}
              style={{ color: "#fd7e14"}}
              className="drawer_Icon_Link"
            />
            <p>About Delivery Service</p>
          </li>
        </NavLink>
        {/* <NavLink onClick={props.close} to="/cart" className="sideDrawer_link">
          <li>
            {" "}
            <p>Cart </p>
          </li>
        </NavLink> */}
        {/* <li>
          {userInfo && userInfo.isAdmin && (
            <div className="child-content">
              <li>
                <NavLink onClick={props.close} to="/orders">
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink onClick={props.close} to="/products">
                  Products
                </NavLink>
              </li>
            </div>
          )}
        </li> */}
      </ul>
    </nav>
  );
};
export default SideDrawer;
