/**
 * Inspired from https://read.reduxbook.com/markdown/part2/13-authenticated-requests.html
 */
const axios = require("axios");
const parseCookies = require("nookies").parseCookies;

const BASE_URL = "http://api.mpl.istakapaza.com/v1";
// const BASE_URL = "http://192.168.0.103:5000/v1";

module.exports = (url, options) => {
  const headers = {};

  const { token } = parseCookies(options && options.context);
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const combinedOptions = Object.assign({}, options, { headers });
  return axios({
    url: BASE_URL + url,
    ...combinedOptions
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      // todo
      throw err;
    });
};
