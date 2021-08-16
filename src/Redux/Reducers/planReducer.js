const {
    PLAN_READ_REQUEST, PLAN_READ_SUCCESS, PLAN_READ_FAIL,
    PLAN_SAVE_REQUEST, PLAN_SAVE_SUCCESS, PLAN_SAVE_FAIL,
  } = require("../Constants/planConstant");
  
  const { USER_LOGOUT } = require("../Constants/userConstants");
  
  function planCreateReducer(state = {}, action) {
    switch (action.type) {
      case PLAN_SAVE_REQUEST:
        return { loading: true };
      case PLAN_SAVE_SUCCESS:
        return { loading: false, success: true, bulkQty: action.payload.bulkQty, bulkAmount: action.payload.bulkAmount, };
      case PLAN_SAVE_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  }

  function planListReducer(
    state = {
      bulkQty: [],
      bulkAmount: [],
      bulkCeiling: [],
    },
    action
  ) {
    switch (action.type) {
      case PLAN_READ_REQUEST:
        return { ...state, loading: true, success: false, };
      case PLAN_READ_SUCCESS:
        return { loading: false, ...action.payload, success: true, };
      case PLAN_READ_FAIL:
        return { loading: false, error: action.payload, bulkQty: [], bulkAmount: [], bulkCeiling: [], };
      case USER_LOGOUT:
        return {bulkQty: [], bulkAmount: [], bulkCeiling: [], };
      default:
        return state;
    }
  }

  export {
    planCreateReducer,
    planListReducer,
  };
  