import React from "react";
import MenuPageWeekly from "./MenuPageWeekly";

export default class MenuWeeklyContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuListWeekly: [
        {
          id: 1,
          title: "1st week of Month",
          content: "a"
        },
        {
          id: 2,
          title: "2nd week of Month",
          content: "b"
        },
        {
          id: 3,
          title: "3rd week of Month",
          content: "c"
        },
        {
          id: 4,
          title: "4th week of Month",
          content: "d"
        },
      ],
    };
  }
  render() {
    const WeeklyItems = this.state.menuListWeekly.map((item, index)=>
      <MenuPageWeekly
         key={item.id}
         title={item.title}
         
         />
    )
    return (
      <div>
        <div>{WeeklyItems}</div>
      </div>
    );
  }
}
