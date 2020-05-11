const getConfig = () => {
  switch (process.env.ENV) {
    case "local":
      return {
        marketPlaceApiUrl: "https://mplapidev.istakapaza.com/v1",
        istakapazaApiUrl: "https://ispdev.istakapaza.com",
        notificationApiUrl: "https://mplnotifydev.istakapaza.com",
        cdnUrl: "https://mpldev.cdn.istakapaza.com",
      };
    case "dev":
      return {
        marketPlaceApiUrl: "https://mplapidev.istakapaza.com/v1",
        istakapazaApiUrl: "https://ispdev.istakapaza.com",
        notificationApiUrl: "https://mplnotifydev.istakapaza.com",
        cdnUrl: "https://mpldev.cdn.istakapaza.com",
      };
    case "stage":
      return {
        marketPlaceApiUrl: "https://mplapisit.istakapaza.com/v1",
        istakapazaApiUrl: "https://test.istakapaza.com",
        notificationApiUrl: "https://mplnotifysit.istakapaza.com",
        cdnUrl: "https://mpldev.cdn.istakapaza.com",
      };
    case "prod":
      return {
        marketPlaceApiUrl: "https://mplapi.istakapaza.com/v1",
        istakapazaApiUrl: "https://istakapaza.com",
        notificationApiUrl: "https://mplnotify.istakapaza.com",
        cdnUrl: "https://ispmpl.cdn.istakapaza.com",
      };
  }
};

const withImages = require("next-images");

module.exports = withImages({
  publicRuntimeConfig: getConfig(),
});
