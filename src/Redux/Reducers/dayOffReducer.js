const {
    DAYOFF_READ_REQUEST, DAYOFF_READ_SUCCESS, DAYOFF_READ_FAIL,
    DAYOFF_SAVE_REQUEST, DAYOFF_SAVE_SUCCESS, DAYOFF_SAVE_FAIL,
  } = require("../Constants/dayOffConstant");
  
  const { USER_LOGOUT } = require("../Constants/userConstants");
  
  function dayOffCreateReducer(state = {}, action) {
    switch (action.type) {
      case DAYOFF_SAVE_REQUEST:
        return { loading: true };
      case DAYOFF_SAVE_SUCCESS:
        return { loading: false, success: true, bulkDate: action.payload.bulkDate, };
      case DAYOFF_SAVE_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  }

  function dayOffListReducer(
    state = {
      bulkDate: [],
    },
    action
  ) {
    switch (action.type) {
      case DAYOFF_READ_REQUEST:
        return { ...state, loading: true, success: false, };
      case DAYOFF_READ_SUCCESS:
        return { loading: false, ...action.payload, success: true, };
      case DAYOFF_READ_FAIL:
        return { loading: false, error: action.payload, bulkDate: [], };
      case USER_LOGOUT:
        return { bulkDate: [], };
      default:
        return state;
    }
  }

  export {
    dayOffCreateReducer,
    dayOffListReducer,
  };
  