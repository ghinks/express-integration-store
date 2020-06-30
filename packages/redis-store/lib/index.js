const path = require("path");
const fs = require("fs");
const debug = require("debug")("session");
const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");
const isDocker = require("is-docker");
const https = require("https");
const getCertificates = require("certificates");

const app = express();
const secret = "keyboardcat";
const REDIS_PORT = 6379;
const APP_PORT = 3000;

// the docker compose service is called redis
let host = "localhost";
if (isDocker()) {
  host = "redis";
}

const redisClient = redis.createClient({
  host,
  port: REDIS_PORT,
});

app.use(
  session({
    cookie: {
      secure: true,
      path: "/bar",
      maxAge: 60000,
      domain: "localhost",
    },
    store: new RedisStore({ client: redisClient }),
    secret,
    resave: false,
    name: "test-integration-sid",
    proxy: true,
    saveUninitialized: true,
  })
);
app.get("/bar", (req, res) => {
  debug(`${req.route.path}`);
  res.send("hello");
});

getCertificates()
  .then(({ certificate:cert, key }) => {
    https
      .createServer(
        {
          key,
          cert: certificate
        },
        app
      )
      .listen(APP_PORT);
  });

