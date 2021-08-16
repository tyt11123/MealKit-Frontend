import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Chevron from "./Chevron";
import RecipeCard from "../../../RecipePageComponent/Recipe_card/recipeCard/recipeCard2";

import "./MenuPageWeekly.css";

const MenuPageWeekly = (props) => {
  const menuPageWeekly = useSelector((state) => state.menuPageWeekly);
  const { allOpen, allClose } = menuPageWeekly;
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "accordion_active" : "");
    setHeightState(
      setActive === "accordion_active"
        ? "0px"
        : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "accordion_active"
        ? "accordion__icon"
        : "accordion__icon rotate"
    );
  }

  useEffect(() => {
    if (allOpen) {
      setActiveState("accordion_active");
      setHeightState(`${content.current.scrollHeight}px`);
      setRotateState("accordion__icon rotate");
    }
    if (allClose) {
      setActiveState("");
      setHeightState("0px");
      setRotateState("accordion__icon");
    }
    return () => {};
  }, [allOpen, allClose]);

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive} `} onClick={toggleAccordion}>
        <p className="accordion__title">{props.title}</p>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion_content_outta"
      >
        <div className="accordion__content ">
          <RecipeCard className="recipeCard_changes" />
        </div>
      </div>
    </div>
  );
};

export default MenuPageWeekly;
