import { destroyCookie } from "nookies";
import { getIstakapazaApiUrl } from "./url";
import api from "../api";

const istakapazaApiUrl = getIstakapazaApiUrl();

// Should be called only on client side
const redirectToLogin = () => {
  window.location.href =
    istakapazaApiUrl + "/#/login?redirect_uri=" + window.location.href;
};

// Should be called only on client side
const isLoggedIn = () => {
  return api("/auth")
    .then((res) => {
      return true;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        destroyCookie(null, "isp-jwt", {
          path: ".istakapaza.com",
        });
        return false;
      }
      return true;
    });
};

export { isLoggedIn, redirectToLogin };
