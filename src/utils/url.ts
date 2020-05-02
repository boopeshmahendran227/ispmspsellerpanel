const publicRuntimeConfig = require("next/config").default()
  .publicRuntimeConfig;

const {
  marketPlaceApiUrl,
  istakapazaApiUrl,
  notificationApiUrl,
  cdnUrl,
} = publicRuntimeConfig;

const getIstakapazaApiUrl = () => {
  return istakapazaApiUrl;
};

const getApiUrl = (route) => {
  if (route.includes("chat")) {
    return notificationApiUrl + "/chat";
  } else if (route.includes("notification")) {
    return notificationApiUrl + "/v1" + route;
  } else if (
    route.includes("/users/address") ||
    route.includes("preorder") ||
    route.includes("/users/subscription")
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

export { getProductUrl, getProductImageUrl, getApiUrl, getIstakapazaApiUrl };
