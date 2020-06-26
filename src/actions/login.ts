import { LOGOUT_REQUEST, SET_LOGIN_STATE } from "../constants/ActionTypes";
import { LoginActionType, LoginState } from "../types/login";

const logout = (): LoginActionType => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const setLoginState = (value: LoginState): LoginActionType => {
  return {
    type: SET_LOGIN_STATE,
    value,
  };
};

export default {
  logout,
  setLoginState,
};
