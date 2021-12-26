"use strict";

const http = require("http");
const path = require("path");

const express = require("express");
const app = express();
const { host, port, storage } = require("./config.json");
const server = http.createServer(app);

const DataStorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));

const dataStorage = new DataStorage();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const menuPath = path.join(__dirname, "menu.html");
//homepage
app.get("/", (req, res) => {
  res.sendFile(menuPath);
});

//getall
app.get("/all", (req, res) => {
  dataStorage.getAll().then((data) => res.render("getAll", { result: data }));
});

//get one
app.get("/getmoped", (req, res) => {
  res.render("search", {
    action: "/getmoped",
  });
});

app.post("/getmoped", async (req, res) => {
  if (!req.body || !req.body.id) {
    res.sendStatus(500);
  }
  const mopedid = Number(req.body.id);

  await dataStorage
    .getOne(mopedid)
    .then((moped) => res.render("getMoped", { result: moped }))
    .catch((err) => sendErrorPage(res, err));

  mopedid;
});

function sendErrorPage(res, error, title = "Error", header = "Error") {
  sendStatusPage(res, error, title, header);
}
function sendStatusPage(res, status, title = "Status", header = "Status") {
  res.render("statusPage", { title, header, status });
}
server.listen(port, host, () =>
  console.log(`server started on ${host}:${port}`)
);
