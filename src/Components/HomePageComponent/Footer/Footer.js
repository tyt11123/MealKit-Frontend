import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "./FooterLogo/logoMealkit2.svg";
import "./Footer.css";

// icon
import { Icon } from "react-icons-kit";
import { whatsapp } from "react-icons-kit/fa/whatsapp";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="footer_inner">
        {/* column1 */}
        <div className="footer_detail_div ">
          <h4>Contact Us:</h4>
          <a className="footer_hastag">
            <h4 style={{ margin: "0" }}>#OpenKitchen</h4>
          </a>
          <ul className="list-unstyled">
            <li>OPENKITCHEN COMPANY</li>
            <li>
              {/* <h2 style={{marginBottom:"0",fontSize:"3rem"}}>(852)-1234-5678</h2>{" "} */}
              <a
                style={{ display: "inline-flex", alignItems: "center" }}
                target="_blank"
                href="https://api.whatsapp.com/send?phone=85251042075"
                className="phoneNo"
              >
                <h2 style={{ marginBottom: "0", fontSize: "3rem" }}>
                  (852)-1234-5678
                </h2>{" "}
                <Icon
                  size={30}
                  icon={whatsapp}
                  style={{ color: "#64dd17" }}
                  className="drawer_Icon_Link"
                />{" "}
              </a>
            </li>
              <a target="_blank" href="https://www.openstreetmap.org/?mlat=22.35915&mlon=114.11938#map=19/22.35915/114.11938" className="footerLink">
              <li>Gold Way Industrial Centre</li>
              <li>16-20 Wing Kin Road</li>
              <li>Kwai Chung, Hong Kong</li>
              </a>
              <object data="https://www.openstreetmap.org/export/embed.html?bbox=114.11834836006166%2C22.358443007840066%2C114.12040293216707%2C22.35985692351017&amp;layer=mapnik&amp;marker=22.359149967469154%2C114.11937564611435" border="1" width="100%">
              </object>
          </ul>
        </div>
        {/* column2 */}
        <div className="footer_detail ">
          <h4>About Us:</h4>
          <ul className="list-unstyled">
            <li>
              <NavLink to="/HowWeWork" className="footerLink">
                How We Work
              </NavLink>
            </li>
            <li>
              <NavLink to="/Delivery" className="footerLink">
                Delivery
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/specialOffer" className="footerLink">
                MealKit<small>+</small>
              </NavLink>
            </li> */}
          </ul>
        </div>
        {/* column3 */}
        <div className="footer_detail">
          <h4>Customer Support:</h4>
          <ul className="list-unstyled">
            <li>
              <NavLink to="/helpCenter" className="footerLink">
                Help Center{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="footer_bottom text-center">
        <p >
          &copy;{new Date().getFullYear()} OPENKITCHEN | All right reserved |
          Terms Of Service | Privacy
        </p>
      </div>
    </div>
  );
};

export default Footer;
