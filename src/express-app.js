const express = require("express");
const cors = require("cors");
const { SENTRY_URL } = require("./config");
const {
  email,
  tour,

} = require("./api");
// const { user, products, shopping } = require('./api');
// const Sentry = require("@sentry/node");
// const Tracing = require("@sentry/tracing");
module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  // Sentry.init({
  //   dsn: SENTRY_URL,
  //   tracesSampleRate: 1.0,
  // });

  //api
  email(app);
  tour(app);

  // app.use(HandleErrors);
};
