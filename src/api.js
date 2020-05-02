/**
 * Inspired from https://read.reduxbook.com/markdown/part2/13-authenticated-requests.html
 */
const axios = require("axios");
const createAuthRefreshInterceptor = require("axios-auth-refresh").default;
const { parseCookies, setCookie, destroyCookie } = require("nookies");
const NProgress = require("nprogress");
const { getApiUrl } = require("./utils/url");

// This is dangerous. Todo: Remove it and fix ssl issue
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

NProgress.configure({ showSpinner: false });

const getAccessToken = (options) => {
  const cookies = parseCookies(options && options.context);
  const token = cookies["isp-jwt"];
  return token;
};

module.exports = (route, options) => {
  const headers = {};

  if (process.browser) {
    // NProgress.start();
  }

  const refreshAuthLogic = (failedRequest) => {
    // const axios = require("axios");
    // const cookies = parseCookies();
    // const refreshtoken = cookies["isp-refresh"];

    // Temp fix. Todo: Remove this and add refresh logic
    console.log("refresh auth");
    // destroyCookie(null, "isp-jwt");
    return Promise.resolve();

    // return axios({
    //   method: "GET",
    //   url: "https://ispdev.istakapaza.com/auth/verify/token",
    //   headers: {
    //     refreshtoken,
    //   },
    // })
    //   .then((tokenRefreshResponse) => {
    //     const token = tokenRefreshResponse.data.token;
    //     failedRequest.response.config.headers["Authorization"] =
    //       "Bearer " + token;
    //     // setCookie(null, "isp-jwt", token);
    //     return Promise.resolve();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // window.location.href =
    //     //   "http://isp.app.dev.istakapaza.com/#/login?redirect_uri=" +
    //     //   window.location.href;
    //   });
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
    url: getApiUrl(route),
    ...combinedOptions,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request cancelled", err);
      }
      console.log("Request error");
      console.log(err);
      // todo
      throw err;
    })
    .finally(() => {
      if (process.browser) {
        // NProgress.done();
      }
    });
};
