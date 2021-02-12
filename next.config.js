const getConfig = () => {
  switch (process.env.ENV) {
    case "local":
      return {
        marketPlaceApiUrl: "https://mplapidev.istakapaza.com/v1",
        istakapazaApiUrl: "https://ispdev.istakapaza.com",
        notificationApiUrl: "https://mplnotifydev.istakapaza.com",
        cdnUrl: "https://mpldev.cdn.istakapaza.com",
        appInsightsKey: "09aa067a-855b-4a40-8f4f-91c5fc0812be",
        istakapazaToken:
          "QlhIUzI0WC1IRko0QkFILUpXNktRTlQtNUM4QzhaNzo1ZjYzOTExMy04YmU0LTQ1YWEtOTcwZC0zYmQ3MmIxMGM0N2M=",
        defaultEcosystemId: "5f4df8de09b13b002dddd380",
      };
    case "dev":
      return {
        marketPlaceApiUrl: "https://mplapidev.istakapaza.com/v1",
        istakapazaApiUrl: "https://ispdev.istakapaza.com",
        notificationApiUrl: "https://mplnotifydev.istakapaza.com",
        cdnUrl: "https://mpldev.cdn.istakapaza.com",
        appInsightsKey: "09aa067a-855b-4a40-8f4f-91c5fc0812be",
        istakapazaToken:
          "QlhIUzI0WC1IRko0QkFILUpXNktRTlQtNUM4QzhaNzo1ZjYzOTExMy04YmU0LTQ1YWEtOTcwZC0zYmQ3MmIxMGM0N2M=",
        defaultEcosystemId: "5f4df8de09b13b002dddd380",
      };
    case "stage":
      return {
        marketPlaceApiUrl: "https://mplapisit.istakapaza.com/v1",
        istakapazaApiUrl: "https://test.istakapaza.com",
        notificationApiUrl: "https://mplnotifysit.istakapaza.com",
        cdnUrl: "https://mpldev.cdn.istakapaza.com",
        appInsightsKey: "09aa067a-855b-4a40-8f4f-91c5fc0812be",
        istakapazaToken:
          "QlhIUzI0WC1IRko0QkFILUpXNktRTlQtNUM4QzhaNzo1ZjYzOTExMy04YmU0LTQ1YWEtOTcwZC0zYmQ3MmIxMGM0N2M=",
        defaultEcosystemId: "5f4df8de09b13b002dddd380",
      };
    case "prod":
      return {
        marketPlaceApiUrl: "https://mplapi.istakapaza.com/v1",
        istakapazaApiUrl: "https://istakapaza.com",
        notificationApiUrl: "https://mplnotify.istakapaza.com",
        cdnUrl: "https://ispmpl.cdn.istakapaza.com",
        appInsightsKey: "d17a1f4b-6a85-4c33-98dc-e129cae29921",
        istakapazaToken:
          "M0owUkVZOC1RSjg0WEM2LUg0Tlo5N0YtWEdCUjhSNzoxYzgxODc3OS1iYzkwLTRlYjAtODkyYi1mNDlkZWMxNzg0NjA=",
        defaultEcosystemId: "5f548928e3262f002c208ee1",
      };
  }
};

const withPwa = require("next-pwa");
const withImages = require("next-images");

module.exports = withPwa(
  withImages({
    publicRuntimeConfig: getConfig(),
    pwa: {
      disable: process.env.ENV === "local",
      dest: "public",
    },
  })
);
