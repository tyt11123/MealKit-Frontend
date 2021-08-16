import React from "react";

import "./ProductScreen_details.css";

class DetailChoice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let center = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      padding: "none",
    };

    return (
      <>
        <a
          type="button"
          className={`${
            this.props.borderBottom
              ? "borderBottomPlus detailATag"
              : "borderBottom detailATag"
          } `}
          onClick={this.props.toggleTextDiv}
        >
          <p> {this.props.title} </p>
        </a>
      </>
    );
  }
}

export default DetailChoice;
