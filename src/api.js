/**
 * Inspired from https://read.reduxbook.com/markdown/part2/13-authenticated-requests.html
 */
const axios = require("axios");
const { parseCookies } = require("nookies");
const NProgress = require("nprogress");
const { getApiUrl } = require("./utils/url");

// This is dangerous. Todo: Remove it and fix ssl issue
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

NProgress.configure({ showSpinner: false });

const getAccessToken = (options) => {
  const cookies = parseCookies(options && options.context);
  const token = cookies["userToken"];
  return token;
};

module.exports = (route, options) => {
  const headers = (options && options.headers) || {};

  if (process.browser) {
    // NProgress.start();
  }

  const combinedOptions = Object.assign({}, options, { headers });

  // Use interceptor to inject the token to requests
  axios.interceptors.request.use((request) => {
    const token = getAccessToken(options);
    if (token && !request.headers["Authorization"]) {
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
