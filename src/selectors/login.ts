import { RootState } from "../reducers";
import { createSelector } from "reselect";
import { LoginState } from "../types/login";

const getLoginState = createSelector(
  (state: RootState) => state.login,
  (login): LoginState => login.loginState
);

export { getLoginState };
