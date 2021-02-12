const express = require("express");
const next = require("next");

const dev = process.env.ENV === "local";
const app = next({ dev });
const handle = app.getRequestHandler();
const api = require("./src/api");
const { getIstakapazaToken } = require("./src/utils/url");

// Below require's makes use of next/config, so make sure
// to require them only after initialization of next()
const publicRuntimeConfig = require("next/config").default()
  .publicRuntimeConfig;
const appInsights = require("applicationinsights");
appInsights.setup(publicRuntimeConfig.appInsightsKey);
appInsights.start();

const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();
    server.enable("trust proxy");

    server.use(express.static(__dirname + "/public"));

    server.get("/health", (req, res) => {
      res.send("I am alive");
    });

    server.get("/manifest.json", (req, res, next) => {
      const origin = req.protocol + "://" + req.get("host");
      const token = getIstakapazaToken();
      api(
        `/businesses/ecosystem/metadata?ecosystem_url=https://dev.istaka.store`,
        {
          headers: {
            Authorization: "Basic " + token,
          },
        }
      )
        .then((manifestData) => {
          res.json(manifestData);
        })
        .catch((err) => {
          res.sendStatus(404);
          next(err);
        });
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:" + port);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
