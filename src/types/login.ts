import { LOGOUT_REQUEST, SET_LOGIN_STATE } from "../constants/ActionTypes";

export enum LoginState {
  NotYetVerified,
  LoggedIn,
  NotLoggedIn,
}

interface LogoutAction {
  type: typeof LOGOUT_REQUEST;
}

interface SetLoginStateAction {
  type: typeof SET_LOGIN_STATE;
  value: LoginState;
}

export type LoginActionType = LogoutAction | SetLoginStateAction;
