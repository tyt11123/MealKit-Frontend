import React, { useState, useRef } from "react";
import Chevron from "../../../../MenuPageComponent/MenuPages/MenuPagesList/Chevron";
// import Chevron from "../../MenuPages/MenuPagesList/Chevron";

import "./HelpCenter_btn.css";

const MenuPageWeekly = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon")

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "accordion_active" : "");
    setHeightState(
      setActive === "accordion_active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === 'accordion_active' ? "accordion__icon" : "accordion__icon rotate"
    )
  }
  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive} d-inline-block justify-content-around`} onClick={toggleAccordion}>
        <p className="accordion__title">{props.title}</p>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion_content_outta">
        <div
          className="helpCenter_btn__content"
        ><p>{props.content}</p></div>
      </div>
    </div>
  );
};

export default MenuPageWeekly;
