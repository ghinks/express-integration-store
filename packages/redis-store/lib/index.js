// const path = require("path");
// const fs = require("fs");
const debug = require("debug")("session");
const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");
const isDocker = require("is-docker");
// const https = require("https");

// const fsp = fs.promises;
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
    name: "test-integration-sid-redis",
    proxy: true,
    saveUninitialized: true,
  })
);
app.get("/bar", (req, res) => {
  debug(`${req.route.path}`);
  res.send("hello");
});

app.get("/bar/bye", (req, res) => {
  debug(`${req.route.path}`);
  res.json({
    path: req.route.path,
    value: "bye bye"
  })
});

const getCertificates = async () => {
  const cert = await fsp.readFile(path.join(__dirname, '../certificates/selfsigned.crt'), 'utf-8');
  const key = await fsp.readFile(path.join(__dirname, '../certificates/selfsigned.key'), 'utf-8');
  return {
    cert,
    key
  };
}

getCertificates()
  .then(({ cert, key }) => {
    https
      .createServer(
        {
          key,
          cert
        },
        app
      )
      .listen(APP_PORT);
  })
  .catch((e) => {
   console.error('bad ...things');
   console.log(e.message);
  });

