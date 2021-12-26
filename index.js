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
    header: "Get",
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
});

//removing one
app.get("/removemoped", (req, res) =>
  res.render("search", {
    header: "Delete",
    action: "/removemoped",
  })
);
app.post("/removemoped", async (req, res) => {
  if (!req.body || !req.body.id) {
    res.sendStatus(500);
  }
  const mopedid = Number(req.body.id);

  await dataStorage
    .remove(mopedid)
    .then((status) => sendStatusPage(res, status))
    .catch((err) => sendErrorPage(res, err));
});

//adding one
app.get("/addmoped", (req, res) => {
  res.render("form", {
    header: "Add",
    action: "/add",
    mopedId: { value: "", readonly: "" },
    name: { value: "", readonly: "" },
    topspeed: { value: "", readonly: "" },
    rating: { value: "", readonly: "" },
    itemsInStock: { value: "", readonly: "" },
  });
});
app.post("/add", async (req, res) => {
  if (!req.body || !req.body.mopedId) {
    res.sendStatus(500);
  }
  await dataStorage
    .insert(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((err) => sendErrorPage(res, err));
});

//updating one
app.get("/updatemoped", async (req, res) => {
  res.render("form", {
    header: "Update",
    action: "/updatedmoped",
    mopedId: { value: "", readonly: "" },
    name: { value: "", readonly: "readonly" },
    topspeed: { value: "", readonly: "readonly" },
    rating: { value: "", readonly: "readonly" },
    itemsInStock: { value: "", readonly: "readonly" },
  });
});
app.post("/updatedmoped", async (req, res) => {
  if (!req.body || !req.body.mopedId) {
    res.sendStatus(500);
  }
  const mopedid = Number(req.body.mopedId);
  await dataStorage
    .getOne(mopedid)
    .then((moped) =>
      res.render("form", {
        header: "Updated info",
        action: "/update",
        mopedId: { value: moped.mopedId, readonly: "readonly" },
        name: { value: moped.name, readonly: "" },
        topspeed: { value: moped.topspeed, readonly: "" },
        rating: { value: moped.rating, readonly: "" },
        itemsInStock: { value: moped.itemsInStock, readonly: "" },
      })
    )
    .catch((err) => sendErrorPage(res, err));
});
app.post("/update",async(req,res)=>{
  if (!req.body ) {
    res.sendStatus(500);
  }
  req.body.mopedId = Number(req.body.mopedId)
  await dataStorage.update(req.body)
  .then(status=>sendStatusPage(res,status))
  .catch((err) => sendErrorPage(res, err));
  // console.log(typeof(req.body.mopedId))
})
//error page
function sendErrorPage(res, error, title = "Error", header = "Error") {
  sendStatusPage(res, error, title, header);
}
function sendStatusPage(res, status, title = "Status", header = "Status") {
  res.render("statusPage", { title, header, status });
}
server.listen(port, host, () =>
  console.log(`server started on ${host}:${port}`)
);
