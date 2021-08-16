import {
  MENU_PAGE_WEEKLY_ACCORDION_ALL_OPEN,
  MENU_PAGE_WEEKLY_ACCORDION_ALL_CLOSE,
} from "../Constants/menuPageConstant";


const { USER_LOGOUT } = require("../Constants/userConstants");

function menuPageAccordionReducer(state = {}, action) {
  switch (action.type) {
    case MENU_PAGE_WEEKLY_ACCORDION_ALL_OPEN:
      return { ...state, allOpen: true, allClose: false };
    case MENU_PAGE_WEEKLY_ACCORDION_ALL_CLOSE:
      return { ...state, allOpen: false, allClose: true };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export { menuPageAccordionReducer };
