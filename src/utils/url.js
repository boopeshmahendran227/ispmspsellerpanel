const publicRuntimeConfig = require("next/config").default()
  .publicRuntimeConfig;

const {
  marketPlaceApiUrl,
  istakapazaApiUrl,
  notificationApiUrl,
  cdnUrl,
  appInsightsKey,
  istakapazaToken,
} = publicRuntimeConfig;

const getIstakapazaApiUrl = () => {
  return istakapazaApiUrl;
};

const getIstakapazaToken = () => {
  return istakapazaToken;
};

const getApiUrl = (route) => {
  if (route.includes("chat")) {
    return notificationApiUrl + "/chat";
  } else if (route.includes("notification")) {
    return notificationApiUrl + "/v1" + route;
  } else if (
    route.includes("/users/address") ||
    route.includes("preorder") ||
    route.includes("/users/subscription") ||
    route.includes("/auth/logout") ||
    route.includes("/auth/verify/token/seller") ||
    route.includes("/businesses/business") ||
    route.includes("/businesses/ecosystems/all") ||
    route.includes("/businesses/ecosystem") ||
    route.includes("/users/image/mpl")
  ) {
    return istakapazaApiUrl + route;
  }
  return marketPlaceApiUrl + route;
};

const getProductUrl = (name, id) => {
  const slug = name.split(" ").join("-");
  return `/p/${slug}/${id}`;
};

const getProductImageUrl = (relativePath) => {
  return encodeURI(cdnUrl + "/" + relativePath);
};

const getAppInsightsKey = () => {
  return appInsightsKey;
};

module.exports = {
  getProductUrl,
  getProductImageUrl,
  getApiUrl,
  getIstakapazaApiUrl,
  getAppInsightsKey,
  getIstakapazaToken,
};
