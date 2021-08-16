import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MenuChoice from "./MenuChoice";
import RecipeCard from "../../../RecipePageComponent/Recipe_card/recipeCard/recipeCard2";

// import MenuBannerBtn from "../MenuBannerBtn/MenuBannerBtn";

import choice1 from "../MenuBannerAsset/choice1.png";
import choice2 from "../MenuBannerAsset/choice2.png";
import choice3 from "../MenuBannerAsset/choice3.png";
import "./MenuChoiceDisplay.css";

class MenuChoiceDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headingTitle: "Our Recommand Recipe",
      choice: [
        {
          id: 1,

          img: choice1,
          title: "Regular",
          detail:
            "Choose from an ever-changing mix of meat, fish, Beyond Meat™, WW Approved, Diabetes Friendly recipes and health-conscious offerings.",
        },
        {
          id: 2,

          img: choice2,
          title: "Vegetarian",
          detail:
            "Meat-free dishes that celebrate the best of seasonal produce.",
        },
        {
          id: 3,

          img: choice3,
          title: "High Protein",
          detail:
            "Choose from an ever-changing mix of meat, for your training needs.",
        },
        {
          id: 4,

          img: choice3,
          title: "Catering",
          detail:
            "Recipes for families, get-togethers, or left-overs, with a variety of options that change weekly, including meat, fish, Beyond Meat™ and other health-conscious offerings.",
        },
      ],
      tabType: 0,
    };
  }
  toggleTextDiv = (value) => {
    this.setState({
      tabType: value,
    });
  };
  render() {
    const ChoiceItems = this.state.choice.map((item, index) => (
      <MenuChoice
        key={item.id}
        serving={item.serving}
        img={item.img}
        title={item.title}
        detail={item.detail}
        toggleTextDiv={() => this.toggleTextDiv(index)}
        borderBottom={this.state.tabType === index ? true : false}
      />
    ));
    return (
      <div>
        <div className="choiceDisplay">
          <h1>{this.state.headingTitle}</h1>
          <ul className="list-group list-group-horizontal ">{ChoiceItems}</ul>
          <div className="choiceDisplay__secondary">
            <p>{this.state.choice[this.state.tabType].detail}</p>
          </div>
        </div>
        <div className="">
          <RecipeCard />
        </div>
        {/* <MenuBannerBtn /> */}
      </div>
    );
  }
}

export default MenuChoiceDisplay;
