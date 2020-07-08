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
  return api("/auth/seller")
    .then((res) => {
      return true;
    })
    .catch((err) => {
      if (err.response?.status === 401) {
        return false;
      }
      return false;
    });
};

export { isLoggedIn, redirectToLogin };
