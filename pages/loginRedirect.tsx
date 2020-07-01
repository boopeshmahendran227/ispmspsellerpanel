import React, { useEffect } from "react";
import Loader from "../src/components/Loader";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

const LoginRedirect = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const refreshToken = router.query.refreshToken as string;
  const redirectUrl = router.query.redirectUrl as string;

  useEffect(() => {
    setCookie(null, "userToken", token, {
      maxAge: 30 * 24 * 60 * 60,
    });
    setCookie(null, "userRefreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
    });

    // redirect
    window.location.href = redirectUrl;
  }, []);

  return <Loader />;
};

export default LoginRedirect;
