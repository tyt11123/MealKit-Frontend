import React from "react";
import { useHistory } from "react-router-dom";
import Img from "../recipe_component/recipeImg";
import Heading from "../recipe_component/recipeHeading";
import Clock from "../../../MenuPageComponent/menuRecipePage/menuRecipeHeader/menuRecipeHeaderAsset/Clock";
import "./recipeCardUi.css";

const RecipeCard = (props) => {
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/product/${props._id}`);
  };
  return (
    <>
      <a onClick={handleClick} className="Card_link">
        <div className="card recipeCard_div">
          <div className="overflow">
            <Img className="card-img-top " image={props.image} />
          </div>
          <div className="card-body text-dark">
            <div className="card-title cardUi_Text">
              
                <Heading name={props.name} />
              
              {/* <h4 className="text-secondary">
                {/* with Lemon-Dressed Broccoli
                {props.description}
              </h4>  */}
            </div>

            <p>
              <Clock width={20} fill={"#6A9A1D"} />
              {/* 25min */}&nbsp; Cooking Time : &nbsp;
              {props.countInStock}
            </p>
          </div>
        </div>
      </a>
    </>
  );
};

export default RecipeCard;
