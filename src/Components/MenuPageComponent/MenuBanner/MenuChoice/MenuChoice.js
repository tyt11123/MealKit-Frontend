import React from "react";
import { Card, CardHeader, CardTitle, CardBody, CardImg } from "reactstrap";

import "./MenuChoice.css";

class MenuChoice extends React.Component {
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
            this.props.borderBottom ? "borderBottomPlus" : "borderBottom"
          } `}
          onClick={this.props.toggleTextDiv}
        >
          <div className="card_div">
            <Card className="card card__style">
              
              <CardHeader style={center} className="cardHeader_style">
                <CardImg
                  className="img_style"
                  src={this.props.img}
                  alt="choice pic"
                />
              </CardHeader>

              <CardTitle style={center} className="menuChoice_title">
                {" "}
                <p> {this.props.title} </p>{" "}
              </CardTitle>
            </Card>
          </div>
        </a>
      </>
    );
  }
}

export default MenuChoice;
