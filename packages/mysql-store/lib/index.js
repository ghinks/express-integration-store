const fs = require("fs");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParse = require("cookie-parser");
const mysql = require("mysql");

const fsp = fs.promises;
const app = express();
const MySqlStore = require("express-mysql-session")(session);
const https = require("https");

const secret = "keyboard cat";
const APP_PORT = 3000;
const mySqlOptions = {
  host: "mysql_srv",
  port: 3306,
  user: "root",
  password: "password",
  database: "sessions"
};
const connection = mysql.createConnection(mySqlOptions);
connection.connect();

const sessionStore = new MySqlStore(mySqlOptions);
app.use(cookieParse(secret));
app.use(
  session({
    cookie: {
      secure: true,
      path: "/bar",
      maxAge: 60000,
      httpOnly: true,
      domain: "localhost"
    },
    store: sessionStore,
    secret,
    resave: false,
    name: "test-integration-sid-mysql",
    proxy: true,
    saveUninitialized: true
  })
);

app.get("/bar", (req, res) => {
  console.log("/bar");  // eslint-disable-line no-console
  try {
    connection.query("select session_id, expires, data, bad_column from sessions", function queryHandler(
      error,
      results,
      fields
    ) {
      if (error) {
        console.error(`error ${error.message}`);  // eslint-disable-line no-console
      }
      console.log( // eslint-disable-line no-console
        `results are ${JSON.stringify(results)}, fields ${JSON.stringify(
          fields
        )}`
      );  // eslint-disable-line no-console
    });
  } catch (e) {
    console.log(e.message);  // eslint-disable-line no-console
  }
  res.send("bar");
});

const getCertificates = async () => {
  const cert = await fsp.readFile(
    path.join(__dirname, "../certificates/selfsigned.crt"),
    "utf-8"
  );
  const key = await fsp.readFile(
    path.join(__dirname, "../certificates/selfsigned.key"),
    "utf-8"
  );
  return {
    cert,
    key
  };
};

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
  .catch(e => {
    console.error("bad ...things"); // eslint-disable-line no-console
    console.log(e.message); // eslint-disable-line no-console
  });
