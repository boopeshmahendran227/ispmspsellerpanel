const getConfig = () => {
  switch (process.env.ENV) {
    case "local":
      return {
        marketPlaceApiUrl: "https://mplapidev.istakapaza.com/v1",
        istakapazaApiUrl: "https://ispdev.istakapaza.com",
        notificationApiUrl: "https://mplnotifydev.istakapaza.com",
        cdnUrl: "https://mpldev.cdn.istakapaza.com",
        appInsightsKey: "09aa067a-855b-4a40-8f4f-91c5fc0812be",
        defaultEcosystemId: "5f4df8de09b13b002dddd380",
      };
    case "dev":
      return {
        marketPlaceApiUrl: "https://mplapidev.istakapaza.com/v1",
        istakapazaApiUrl: "https://ispdev.istakapaza.com",
        notificationApiUrl: "https://mplnotifydev.istakapaza.com",
        cdnUrl: "https://mpldev.cdn.istakapaza.com",
        appInsightsKey: "09aa067a-855b-4a40-8f4f-91c5fc0812be",
        defaultEcosystemId: "5f4df8de09b13b002dddd380",
      };
    case "stage":
      return {
        marketPlaceApiUrl: "https://mplapisit.istakapaza.com/v1",
        istakapazaApiUrl: "https://test.istakapaza.com",
        notificationApiUrl: "https://mplnotifysit.istakapaza.com",
        cdnUrl: "https://mpldev.cdn.istakapaza.com",
        appInsightsKey: "09aa067a-855b-4a40-8f4f-91c5fc0812be",
        defaultEcosystemId: "5f4df8de09b13b002dddd380",
      };
    case "prod":
      return {
        marketPlaceApiUrl: "https://mplapi.istakapaza.com/v1",
        istakapazaApiUrl: "https://istakapaza.com",
        notificationApiUrl: "https://mplnotify.istakapaza.com",
        cdnUrl: "https://ispmpl.cdn.istakapaza.com",
        appInsightsKey: "d17a1f4b-6a85-4c33-98dc-e129cae29921",
        defaultEcosystemId: "5f548928e3262f002c208ee1",
      };
  }
};

const withImages = require("next-images");

module.exports = withImages({
  publicRuntimeConfig: getConfig(),
});
