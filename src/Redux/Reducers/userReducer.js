const {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
  USER_FACEBOOK_REQUEST, USER_FACEBOOK_SUCCESS, USER_FACEBOOK_FAIL,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  USER_SMS_GET_REQUEST, USER_SMS_GET_SUCCESS, USER_SMS_GET_FAIL,
  USER_SMS_VER_REQUEST, USER_SMS_VER_SUCCESS, USER_SMS_VER_FAIL,
  USER_SMS_START_OVER,
  USER_FORGOT_REQUEST, USER_FORGOT_SUCCESS, USER_FORGOT_FAIL,
  USER_RESET_VALIDATE_REQUEST, USER_RESET_VALIDATE_SUCCESS, USER_RESET_VALIDATE_FAIL,
  USER_RESET_REQUEST, USER_RESET_SUCCESS, USER_RESET_FAIL,
  USER_FULLLIST_REQUEST, USER_FULLLIST_SUCCESS, USER_FULLLIST_FAIL,
  USER_FAV_LIST_REQUEST, USER_FAV_LIST_SUCCESS, USER_FAV_LIST_FAIL, 
  USER_FAV_ADD_REQUEST, USER_FAV_ADD_SUCCESS, USER_FAV_ADD_FAIL, 
  USER_FAV_DELETE_REQUEST, USER_FAV_DELETE_SUCCESS, USER_FAV_DELETE_FAIL, 
  USER_ANONYMOUS_REQUEST, USER_ANONYMOUS_SUCCESS, USER_ANONYMOUS_FAIL, 
} = require("../Constants/userConstants");

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userFacebookReducer(state = {}, action) {
  switch (action.type) {
    case USER_FACEBOOK_REQUEST:
      return { loading: true };
    case USER_FACEBOOK_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_FACEBOOK_FAIL:
      return {
        loading: false,
        error: "Fail to receive your email from Facebook.",
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      let obj = { ...state, loading: false, success: true };
      obj.userInfo = { ...obj.userInfo, ...action.payload };
      return obj;
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userSMSReducer(state = {}, action) {
  switch (action.type) {
    case USER_SMS_GET_REQUEST:
      return { loading: true };
    case USER_SMS_VER_REQUEST:
      return { loading: true };
    case USER_SMS_GET_SUCCESS:
      return { loading: false, status: action.payload };
    case USER_SMS_GET_FAIL:
      return { loading: false, error: action.payload };
    case USER_SMS_VER_FAIL:
      return { loading: false, error: "Verification Failed" };
    case USER_SMS_START_OVER:
      return { loading: false, status: null };
    case USER_SMS_VER_SUCCESS:
      return { loading: false, status: null, success: action.payload.status };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userPhoneReducer(state = {}, action) {
  switch (action.type) {
    case USER_SMS_VER_SUCCESS:
      let obj = { ...state };
      obj.userInfo.phone = action.payload.localphone;
      return obj;
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userForgotReducer(state = {}, action) {
  switch (action.type) {
    case USER_FORGOT_REQUEST:
      return { loading: true };
    case USER_FORGOT_SUCCESS:
      return { loading: false, success: action.payload.status };
    case USER_FORGOT_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userResetValidateReducer(state = {}, action) {
  switch (action.type) {
    case USER_RESET_VALIDATE_REQUEST:
      return { loading: true };
    case USER_RESET_VALIDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_RESET_VALIDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userResetReducer(state = {}, action) {
  switch (action.type) {
    case USER_RESET_REQUEST:
      return { loading: true };
    case USER_RESET_SUCCESS:
      return { loading: false, success: true };
    case USER_RESET_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userFullListReducer(state = {}, action) {
  switch (action.type) {
    case USER_FULLLIST_REQUEST:
      return { loading: true };
    case USER_FULLLIST_SUCCESS:
      return { loading: false, success: true, userlist: action.payload };
    case USER_FULLLIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userFavouriteReducer(state = {}, action) {
  switch (action.type) {
    case USER_FAV_LIST_REQUEST:
      return { loading: true };
    case USER_FAV_LIST_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case USER_FAV_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userAddFavouriteReducer(state = {}, action) {
  switch (action.type) {
    case USER_FAV_ADD_REQUEST:
      return { loading: true };
    case USER_FAV_ADD_SUCCESS:
      return { loading: false, success: true, };
    case USER_FAV_ADD_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function userRemoveFavouriteReducer(state = {}, action) {
  switch (action.type) {
    case USER_FAV_DELETE_REQUEST:
      return { loading: true };
    case USER_FAV_DELETE_SUCCESS:
      return { loading: false, success: true, };
    case USER_FAV_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export {
  userSigninReducer,
  userFacebookReducer,
  userRegisterReducer,
  userUpdateReducer,
  userSMSReducer,
  userPhoneReducer,
  userForgotReducer,
  userResetValidateReducer,
  userResetReducer,
  userFullListReducer,
  userFavouriteReducer,
  userAddFavouriteReducer, 
  userRemoveFavouriteReducer,
};
