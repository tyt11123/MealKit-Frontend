import React from "react";
import './DrawerToggleButton.css';
import MenuBtn from "./Asset/mobile_Btn.png";
const drawerToggleButton = (props) => (
  <img src={MenuBtn} onClick={props.click} className="menuBtn"/>
  // <button className="toggle-button">
  //   <div className="toggle-button__line"></div>
  //   <div className="toggle-button__line middle"></div>
  //   <div className="toggle-button__line"></div>
  // </button>
);
export default drawerToggleButton;
