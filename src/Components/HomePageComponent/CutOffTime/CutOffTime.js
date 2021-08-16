import React from "react";
import { NavLink } from "react-router-dom";
import "./CutOffTime.css";

// Cut Off Time package
import Countdown from "react-countdown";
// below: import icon
import { Icon } from "react-icons-kit";
import { facebook } from "react-icons-kit/entypo/facebook";
import { instagram } from "react-icons-kit/entypo/instagram";
import { linkedin } from "react-icons-kit/entypo/linkedin";
import { pinterest } from "react-icons-kit/entypo/pinterest";
import { twitter } from "react-icons-kit/entypo/twitter";

const Delivery = () => {
  var tomorrow = new Date();
  if (tomorrow.getHours() !== 17) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  }
  tomorrow.setHours(17, 0, 0, 0);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <h1>Our Cut Off Time is 5PM Everyday</h1>;
    } else {
      return (
        <div className="cutOffTimeDiv__heading_main Cutoffdiv_mobileVer">
          {/* <table className="table">
            <thead>
              <tr>
                <th>HOUR</th>
                <th>MINUTE</th>
                <th>SECOND</th>
              </tr>
            </thead>
            <tbody className="orderTbody">
              <tr>
                <td>{hours}</td>
                <td>{minutes.toString().padStart(2, "0")}</td>
                <td>{seconds.toString().padStart(2, "0")}</td>
              </tr>
            </tbody>
          </table> */}
        <h2>
         &nbsp;{hours}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </h2>
        </div>
      );
    }
  };
  return (
    <div className="cutOffTimeDiv__outta">
      <div className="cutOffTimeDiv content">
        <h2>
          <span className="cutOffTimeDiv__heading_main">
            Order Cut Off time{" "}
          </span>
        </h2>
        <Countdown date={tomorrow} renderer={renderer} />
      </div>
      <div className="followUsDiv content">
        <h2>
          <span className="cutOffTimeDiv__heading_main">Follow Us</span>
        </h2>
        <social className="social_media Cutoffdiv_mobileVer" style={{ color: "#F4A261" }}>
          <a target="_blank" href="https://www.facebook.com">
            <Icon size={30} icon={facebook} />
          </a>{" "}
          <a target="_blank" href="https://www.instgram.com">
            <Icon size={30} icon={instagram } />
          </a>{" "}
          <a target="_blank" href="https://www.linkedin.com">
            <Icon size={30} icon={linkedin} />
          </a>{" "}
          <a target="_blank" href="https://www.pinterest.com">
            <Icon size={30} icon={pinterest} />
          </a>{" "}
          <a target="_blank" href="https://www.twitter.com">
            <Icon size={30} icon={twitter} />
          </a>{" "}
        </social>
      </div>
    </div>
  );
};
export default Delivery;
