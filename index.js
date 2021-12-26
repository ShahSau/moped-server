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
app.get("/all", (req,res)=>{
    dataStorage.getAll()
    .then(data=>res.render("getAll", {result:data}))
})
server.listen(port, host, () =>
  console.log(`server started on ${host}:${port}`)
);
