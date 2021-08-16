import {
    DASHBOARD_LIST_REQUEST, DASHBOARD_LIST_SUCCESS, DASHBOARD_LIST_FAIL,
    DASHBOARD_DETAILS_REQUEST, DASHBOARD_DETAILS_SUCCESS, DASHBOARD_DETAILS_FAIL, 
} from '../Constants/dashboardConstant';

const { USER_LOGOUT } = require("../Constants/userConstants");

function dashboardListReducer(state = {}, action) {
  switch (action.type) {
    case DASHBOARD_LIST_REQUEST:
      return { loading: true };
    case DASHBOARD_LIST_SUCCESS:
      return { loading: false, dashboardOption: action.payload };
    case DASHBOARD_LIST_FAIL:
      return { lodading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

function dashboardDetailsReducer(state = {}, action) {
  switch (action.type) {
    case DASHBOARD_DETAILS_REQUEST:
      return { loading: true };
    case DASHBOARD_DETAILS_SUCCESS:
      return { loading: false, chart: action.payload };
    case DASHBOARD_DETAILS_FAIL:
      return { lodading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
  
export { dashboardListReducer, dashboardDetailsReducer, };
  
