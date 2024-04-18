require("dotenv").config({ path: "src/config/.env" });
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use('/test', express.static('test'));

// Import route
const crawler = require("./src/routes/crawler");
const download = require("./src/routes/download");

app.use("/api/v1", crawler);
app.use("/api/v1", download);

// Deployment
app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

module.exports = app;