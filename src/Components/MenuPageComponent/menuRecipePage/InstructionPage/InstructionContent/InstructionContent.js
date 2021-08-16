import React from "react";

import step1 from "./InstructionContentAsset/step1.jpg";
import step2 from "./InstructionContentAsset/step2.jpg";
import step3 from "./InstructionContentAsset/step3.jpg";
import step4 from "./InstructionContentAsset/step4.jpg";
import step5 from "./InstructionContentAsset/step5.jpg";
import "./InstructionContent.css";

const InstructionContent = () => {
  return (
    <div className="instructionContent__outta">
      <div className="step_div col-sm-12 col-md-6 col-lg-6">
        <img src={step1} alt="step 1 img" className="step_img"/>
        <div className="step_title p-2">
          <h6>1</h6>
          <p>Cook the rice</p>
        </div>
        <div className="step_detail">
          <p>
            In a medium pot, combine the rice, a big pinch of salt, and 3/4 cup
            of water. Heat to boiling on high. Once boiling, reduce the heat to
            low. Cover and cook, without stirring, 15 to 17 minutes, or until
            the water has been absorbed and the rice is tender. Turn off the
            heat and fluff with a fork. Cover to keep warm.
          </p>
        </div>
      </div>
      <div className="step_div col-sm-12 col-md-6 col-lg-6">
        <img src={step1} alt="step 1 img" className="step_img"/>
        <div className="step_title p-2">
          <h6>1</h6>
          <p>Cook the rice</p>
        </div>
        <div className="step_detail">
          <p>
            In a medium pot, combine the rice, a big pinch of salt, and 3/4 cup
            of water. Heat to boiling on high. Once boiling, reduce the heat to
            low. Cover and cook, without stirring, 15 to 17 minutes, or until
            the water has been absorbed and the rice is tender. Turn off the
            heat and fluff with a fork. Cover to keep warm.
          </p>
        </div>
      </div>
    </div>
  );
};
export default InstructionContent;
