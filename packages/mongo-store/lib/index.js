const fs = require('fs');
const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const https = require('https');
const isDocker = require("is-docker");

const APP_PORT = 3000;
const secret = 'keyboard cat 123';
const fsp = fs.promises;
const app = express();
const MongoStore = require('connect-mongo')(session);

const debug = require('debug')('test-session');
// the docker compose service is called mongo
let mongoHostName = "localhost";
if (isDocker()) {
  mongoHostName = "mongo";
}
mongoose.connect(`mongodb://${mongoHostName}/session`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(
  session({
    cookie: {
      secure: true, path: '/bar', maxAge: 60000, httpOnly: true, domain: 'localhost',
    },
    store: new MongoStore({dbName: "session", mongooseConnection: mongoose.connection}),
    secret,
    // resave: true,
    name: 'test-integration-sid-mongo',
    proxy: true,
  }),
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
    console.error('bad ...things'); // eslint-disable-line no-console
    console.log(e.message); // eslint-disable-line no-console
  })

