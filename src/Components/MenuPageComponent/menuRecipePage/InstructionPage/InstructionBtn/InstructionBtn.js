import React from "react";

import InstructionContent from "../InstructionContent/InstructionContent";
import "./InstructionBtn.css";

class InstructionBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  render() {
    return (
      <div className="btn_outta">
        <button
          className="instructionBtn_btn"
          onClick={this.toggleHidden.bind(this)}
        >
          <small>step-by-step</small>
          <h2> Instructions</h2>
        </button>
        {this.state.isHidden && <InstructionContent />}
      </div>
    );
  }
}

export default InstructionBtn;
