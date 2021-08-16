import React from "react";

// import OrderStep from "../../Components/HomePageComponent/OrderStep/OrderStep";
import Banner_slider from "../../Components/HomePageComponent/Banner_top/Banner_slider";
import OurMenu_slider from "../../Components/HomePageComponent/OurMenu_slider/OurMenu_slider_main/ourMenu_slider";
import SpecialMenu_slider from "../../Components/HomePageComponent/SpecialMenu_slider/SpecialMenu_slider_main/specialMenu_slider";
import OrderProcess from "../../Components/HomePageComponent/OrderProcess/orderProcess";
import DeliveryArea from "../../Components/HomePageComponent/Delivery_detail/Delivery_detail";
import CutOffTimeDiv from "../../Components/HomePageComponent/CutOffTime/CutOffTime";
const HomePageScreen = (props) => {
  return (
    <>
      <Banner_slider />
      <OurMenu_slider />
      <SpecialMenu_slider />
      <OrderProcess />
      <DeliveryArea />
      <CutOffTimeDiv />
      {/* <OrderStep /> */}
    </>
  );
};
export default HomePageScreen;
