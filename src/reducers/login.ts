import { combineReducers } from "redux";
import { SET_LOGIN_STATE } from "../constants/ActionTypes";
import { LoginActionType, LoginState } from "../types/login";

const setLoginState = (
  state: LoginState = LoginState.NotYetVerified,
  action: LoginActionType
) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return action.value;
  }
  return state;
};

export default combineReducers({
  loginState: setLoginState,
});
