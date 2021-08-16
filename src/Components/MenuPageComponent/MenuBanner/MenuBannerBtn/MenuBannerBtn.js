import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { openAllAccordion, closeAllAccordion } from '../../../../Redux/Actions/menuPageActions';

import "./MenuBannerBtn.css";

const MenuBannerBtn = () => {
  const menuPageWeekly = useSelector(state => state.menuPageWeekly);
  const { allOpen, allClose } = menuPageWeekly;
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.preventDefault();
    dispatch(closeAllAccordion());
  };
  const handleOpen = (e) => {
    e.preventDefault();
    dispatch(openAllAccordion());
  };
  return (
    <div className="menuBtn__Outta">
      <p >menu of month</p>
      {allOpen ?
       <a type="button" className="menuBtn__btn" onClick={handleClose}><span>get cooking</span></a>:
       <a type="button" className="menuBtn__btn" onClick={handleOpen}><span>get cooking</span></a>}
    </div>
  );
};
export default MenuBannerBtn;
