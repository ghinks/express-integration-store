const { Sequelize } = require('sequelize');
const path = require("path");
const fs = require("fs");
const debug = require("debug")("session");
const express = require("express");
const session = require("express-session");
const isDocker = require("is-docker");
const https = require("https");
const connectSessionSequelize = require("connect-session-sequelize");

const SequelizeStore = connectSessionSequelize(session.Store);
const sequelize = new Sequelize('postgres://postgres:keyboardcat@localhost:5432/sequelize');
const fsp = fs.promises;
const app = express();
const secret = "keyboardcat";
const APP_PORT = 3005;

// the docker compose service is called redis
let host = "localhost";
if (isDocker()) {
  host = "redis";
}

var myStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: "keyboard cat",
    store: myStore,
    resave: false,
    proxy: true,
  })
);

myStore.sync();

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
  })

