import React, { useState, useRef } from "react";
import DetailChoice from "./ProductScreen_details";
// import RecipeCard from "../../../RecipePageComponent/Recipe_card/recipeCard/recipeCard2";
import Linkify from 'react-linkify';
// import MenuBannerBtn from "../MenuBannerBtn/MenuBannerBtn";

import "./ProductScreenDetailOption.css";

const ProductScreenDetailOption = (props) => {
  const headingTitle = "Our Recommended Recipe";
  const choice = [
            {
              id: 1,
              title: "Product Detail",
              detail: props.product.description ? props.product.description.split('\n') : "",
              detail3: "Cooking Time: ",
              detail4: "Difficulty: ",
              detail5: "Ingredient:",
              CookTime: `${props.product.c_time} minutes`,
              Difficulty: `${props.product.difficulty}/5`,
              Ingredient: props.product.ingredient ? props.product.ingredient.split('\n') : "",
            },
            {
              id: 2,
              title: "Payment & Delivery ",
              detail:
                "Meat-free dishes that celebrate the best of seasonal produce.",
            },
          ];
  const [tabType, setTabType] = useState(0);

  const ChoiceItems = choice.map((item, index) => (
      <DetailChoice
        key={item.id}
        serving={item.serving}
        img={item.img}
        title={item.title}
        detail={item.detail}
        toggleTextDiv={() => toggleTextDiv(index)}
        borderBottom={tabType === index ? true : false}
      />
    ));

  const toggleTextDiv = (value) => {setTabType(value);};
  
  return (
    <div className="productDetail_bottom">
      <ul>{ChoiceItems}</ul>
      <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
        <a target="blank" href={decoratedHref} key={key}>
            {decoratedText}
        </a>
      )}>
        <div className="ServicesOptions_details">
          <h2>{choice[tabType].title}</h2>
          <div className="ServicesOptions_content_main">
            {Array.isArray(choice[tabType].detail) ? 
             choice[tabType].detail.map((x, i) => <h2 key={i}>{x}</h2>) :
             choice[tabType].detail }
            <div className="ServicesOptions_content_sub">
              <h2 className="content_sub_qs">
                {choice[tabType].detail3}
                <span>{choice[tabType].CookTime}</span>
              </h2>
              <h2 className="content_sub_qs">
                {choice[tabType].detail4}
                <span>{choice[tabType].Difficulty}</span>
              </h2>
              <h2 className="content_sub_qs">
                {choice[tabType].detail5}
                <span>{choice[tabType].Ingredient && choice[tabType].Ingredient.slice(0,1)}</span>
              </h2>
              {choice[tabType].Ingredient && 
                choice[tabType].Ingredient.slice(1).map((x, i) =>
                  <h2 key={i} className="content_sub_ps">{x}</h2>
              )}
            </div>
          </div>
        </div>
      </Linkify>
    </div>
    );
};

export default ProductScreenDetailOption;
