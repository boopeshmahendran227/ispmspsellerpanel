import { useEffect } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { redirectToLogin } from "../utils/login";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getLoginState } from "../selectors/login";
import { LoginState } from "../types/login";
import AuthWall from "./AuthWall";

interface StateProps {
  loginState: LoginState;
}

type LoginHOCProps = StateProps;

const WithAuth = (WrappedComponent) => {
  const LoginHOC = (props: LoginHOCProps) => {
    useEffect(() => {
      if (props.loginState === LoginState.NotLoggedIn) {
        redirectToLogin();
      }
    }, [props.loginState]);

    return (
      <>
        <AuthWall />
        <WrappedComponent {...props} />
      </>
    );
  };

  hoistNonReactStatics(LoginHOC, WrappedComponent);

  const mapStateToProps = (state: RootState) => ({
    loginState: getLoginState(state),
  });

  return connect(mapStateToProps)(LoginHOC);
};

export default WithAuth;
