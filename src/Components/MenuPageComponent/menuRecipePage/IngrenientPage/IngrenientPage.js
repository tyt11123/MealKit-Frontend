import React from "react";

import IngreImg from "./ingrenientAsset/frestIngreImg.png";
import "./IngrenientPage.css";

const IngrenientPage = () => {
  return (
    <div className="ingredient__outta">
      <div className="frestIngre_Img col-sm-12 col-md-6 col-lg-6">
        <img src={IngreImg} alt="fresh ingredients image" />
      </div>

      <div className="frestIngre_detail_div col-sm-12 col-md-4 col-lg-4">
        <h1 className="d-inline-flex p-1">
          <small>
            <h4>Fresh</h4>
          </small>
          Ingredient
        </h1>
        <table>
          <tbody>
            <tr>
              <td>
                <span>10 oz</span>
              </td>
              <td>Chopped Chicken Breast</td>
            </tr>
            <tr>
              <td>
                <span>2 cloves </span>
              </td>
              <td>Garlic</td>
            </tr>
            <tr>
              <td>
                <span>2</span>
              </td>
              <td>Scallions</td>
            </tr>
            <tr>
              <td>
                <span>4 oz</span>
              </td>
              <td>Snow Peas</td>
            </tr>
            <tr>
              <td>
                <span>3 Tbsps</span>
              </td>
              <td>Sweet Chili Sauce</td>
            </tr>
            <tr>
              <td>
                <span>2 Tbsps </span>
              </td>
              <td>Mayonnaise</td>
            </tr>
            <tr>
              <td>
                <span>1 Tbsp</span>
              </td>
              <td>Sambal Oelek</td>
            </tr>
            <tr>
              <td>
                <span>¼ cup</span>
              </td>
              <td>Cornstarch</td>
            </tr>
            <tr>
              <td>
                <span>1 Tbsp </span>
              </td>
              <td>Sesame Oil</td>
            </tr>
            <tr>
              <td>
                <span>3 Tbsps </span>
              </td>
              <td>Roasted Peanuts</td>
            </tr>
            <tr>
              <td>
                <span>1 Tbsp </span>
              </td>
              <td>Rice Vinegar</td>
            </tr>
            <tr>
              <td>
                <span>½ cup </span>
              </td>
              <td>Sushi Rice</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngrenientPage;
