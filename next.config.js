let publicRuntimeConfig = null;

switch (process.env.ENV) {
  case "local":
    publicRuntimeConfig = {
      marketPlaceApiUrl: "https://mplapidev.istakapaza.com/v1",
      istakapazaApiUrl: "https://ispdev.istakapaza.com",
      notificationApiUrl: "https://mplnotifydev.istakapaza.com",
      cdnUrl: "https://mpldev.cdn.istakapaza.com",
    };
    break;
  case "dev":
    publicRuntimeConfig = {
      marketPlaceApiUrl: "https://mplapidev.istakapaza.com/v1",
      istakapazaApiUrl: "https://ispdev.istakapaza.com",
      notificationApiUrl: "https://mplnotifydev.istakapaza.com",
      cdnUrl: "https://mpldev.cdn.istakapaza.com",
    };
    break;
  case "stage":
    publicRuntimeConfig = {
      marketPlaceApiUrl: "https://mplapisit.istakapaza.com/v1",
      istakapazaApiUrl: "https://test.istakapaza.com",
      notificationApiUrl: "https://mplnotifysit.istakapaza.com",
      cdnUrl: "https://mpldev.cdn.istakapaza.com",
    };
    break;
  case "prod":
    publicRuntimeConfig = {
      marketPlaceApiUrl: "https://mplapi.istakapaza.com",
      istakapazaApiUrl: "https://istakapaza.com",
      notificationApiUrl: "https://mplnotify.istakapaza.com",
      cdnUrl: "https://mpldev.cdn.istakapaza.com",
    };
    break;
}

module.exports = {
  publicRuntimeConfig,
};
