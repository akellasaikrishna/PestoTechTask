const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("./db/connection.js");
const tasks = require("./endpoints/tasks");

// const mongoose = require("./config/database"); //database configuration
const app = express();
app.set("secretKey", "nodeRestApi"); // jwt secret token
// mongoose.connection.on(
//     "error",
//     console.error.bind(console, "MongoDB connection error:")
// );
app.use(cors());

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// Add headers
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(logger("dev"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", async function (req, res) {
  res.json({ tutorial: "App running" });
});

app.use("/tasks", tasks);

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something Went Wrong" });
});
app.listen(3000, function () {
  console.log("Node server listening on port 3000");
});
