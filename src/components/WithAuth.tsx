import { useState } from "react";
import Loader from "./Loader";
import hoistNonReactStatics from "hoist-non-react-statics";
import { redirectToLogin, isLoggedIn } from "../utils/login";
import useSWR from "swr";

const WithAuth = (WrappedComponent) => {
  const LoginHOC = (props) => {
    const [authDone, setAuthDone] = useState(false);

    useSWR("LoginCheck", () => {
      let isMounted = true;

      isLoggedIn().then((loggedIn) => {
        if (!isMounted) {
          return;
        }

        if (loggedIn) {
          setAuthDone(true);
        } else {
          redirectToLogin();
        }
      });

      return () => {
        isMounted = false;
      };
    });

    if (!authDone) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };

  hoistNonReactStatics(LoginHOC, WrappedComponent);

  return LoginHOC;
};

export default WithAuth;
