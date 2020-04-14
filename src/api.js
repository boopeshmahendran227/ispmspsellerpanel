/**
 * Inspired from https://read.reduxbook.com/markdown/part2/13-authenticated-requests.html
 */
const axios = require("axios");
const createAuthRefreshInterceptor = require("axios-auth-refresh").default;
const { parseCookies, setCookie } = require("nookies");
const NProgress = require("nprogress");

NProgress.configure({ showSpinner: false });

const BASE_URL = "http://api.mpl.istakapaza.com/v1";
// const BASE_URL = "http://192.168.0.103:5000/v1";

const getAccessToken = (options) => {
  const cookies = parseCookies(options && options.context);
  const token = cookies["isp-jwt"];
  return token;
};

module.exports = (url, options) => {
  const headers = {};

  if (process.browser) {
    NProgress.start();
  }

  const refreshAuthLogic = (failedRequest) => {
    const axios = require("axios");
    const cookies = parseCookies();
    const refreshtoken = cookies["isp-refresh"];

    return axios({
      method: "GET",
      url: "http://isp.app.dev.istakapaza.com/auth/verify/token",
      headers: {
        refreshtoken,
      },
    })
      .then((tokenRefreshResponse) => {
        const token = tokenRefreshResponse.data.token;
        failedRequest.response.config.headers["Authorization"] =
          "Bearer " + token;
        setCookie(null, "isp-jwt", token);
        return Promise.resolve();
      })
      .catch((err) => {
        console.log(err);
        // window.location.href =
        //   "http://isp.app.dev.istakapaza.com/#/login?redirect_uri=" +
        //   window.location.href;
      });
  };

  // Instantiate the interceptor (you can chain it as it returns the axios instance)

  const combinedOptions = Object.assign({}, options, { headers });
  createAuthRefreshInterceptor(axios, refreshAuthLogic);

  // Use interceptor to inject the token to requests
  axios.interceptors.request.use((request) => {
    const token = getAccessToken(options);
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  });

  return axios({
    url: url.includes("notification")
      ? "http://notify.mpl.istakapaza.com/v1" + url
      : BASE_URL + url, // Todo: refine this logic
    ...combinedOptions,
  })
    .then((res) => {
      return res.data;
      // const contentType = res.headers["content-type"];
      // if (contentType && contentType.includes("application/json")) {
      //   return res.json();
      // } else if (contentType && contentType.includes("text/plain")) {
      //   return res.text();
      // } else {
      //   return res;
      // }
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request cancelled", err);
      }
      // todo
      throw err;
    })
    .finally(() => {
      if (process.browser) {
        NProgress.done();
      }
    });
};
