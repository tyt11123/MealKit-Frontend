import React from "react";

import Serving from "./menuRecipeHeaderAsset/Serving";
import Clock from "./menuRecipeHeaderAsset/Clock";
import Apple from "./menuRecipeHeaderAsset/Apple";
import dish from "./menuRecipeHeaderAsset/dishEX.png";
import "./menuRecipeHeader.css";

class MenuRecipeHeader extends React.Component {
  render() {
    return (
      <div className="menuRecipeHeader__outta">
        <div className="recipeDetail recipeDetail__div col-sm-12 col-md-5 col-lg-5">
          <h1 className="recipeDetail__dishName">
            Salmon &amp; Spicy Chicken Stir-Fry{" "}
          </h1>
          <h2>
            <span>with Rice &amp; Snow Peas</span>
          </h2>
          <div className="clockIcon_div">
            <Clock width={20} fill={"#6A9A1D"} />
            <p>25min</p>
          </div>
          <div className="recipeDetailIcon_div">
            <div className="servingIcon_div">
              <Serving width={17} />
              <p>2 servings</p>
            </div>
            <div className="appleIcon_div2">
              <Apple width={17} />
              <p>800 Cals/serving</p>
            </div>
          </div>
          <p className="recipeIntro">
            In this easy stir-fry, chicken is dusted with a coating of
            cornstarch just before hitting a hot pan to create a delicate
            crust—perfect for soaking up our vibrant sauce, made with spicy
            sambal oelek, sweet chili, and creamy mayo.
          </p>
          <a href="" className="recipe_cardTap">
            {" "}
            click for recipe card
          </a>
          <a className="btn_getCooking" type="button">
            <p>get cooking</p>
          </a>
        </div>
        <div className="recipeDetail recipeDetailImg__div col-sm-12 col-md-6 col-lg-5">
          <img src={dish} alt="dish pic" />
        </div>
      </div>
    );
  }
}
export default MenuRecipeHeader;
