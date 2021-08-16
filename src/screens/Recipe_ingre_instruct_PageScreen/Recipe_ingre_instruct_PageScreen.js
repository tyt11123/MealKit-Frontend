import React from "react";

import MenuRecipeHeader from "../../menuRecipePage/menuRecipeHeader/menuRecipeHeader";
import IngrenientPage from "../../menuRecipePage/IngrenientPage/IngrenientPage";
import InstructionBtn from "../../menuRecipePage/InstructionPage/InstructionBtn/InstructionBtn";
//adding pages from folder menuRecipePage

import "./Recipe_ingre_instruct_PageScreen.css";
//style sheet for Recipe Screen page

const RecipePageScreen = () => {
  return (
    <div className="recipePageScreen">
      <MenuRecipeHeader />
      <IngrenientPage />
      <InstructionBtn />
    </div>
  );
};
export default RecipePageScreen;
