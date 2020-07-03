const express = require("express");
const session = require("express-session");
const memoryStore = require("memorystore");
const fs = require('fs');
const path = require('path');
const https = require('https');
const debug = require('debug')('test-session');

const fsp = fs.promises;
const app = express();
const MemoryStore = memoryStore(session);

const APP_PORT = 3004;
const secret = 'keyboard cat 123';
app.use(session({
  store: new MemoryStore({ checkPeriod: 24 * 60 *60 * 1000}),
  cookie: {
    secure: true, path: '/bar', maxAge: 60000, httpOnly: true, domain: 'localhost',
  },
  secret,
  name: 'test-integration-sid-memorystore',
  proxy: true,
}));

app.get("/bar", (req, res) => {
  debug(`${req.route.path}`);
  res.send("hello");
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

