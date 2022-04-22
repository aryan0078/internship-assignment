var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var booksRouter = require("./routes/books");
var notificationRouter = require("./routes/notification");
var genreRouter = require("./routes/genre");
const db = require("./db");
var cors = require("cors");
const { default: mongoose } = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
//set view engine
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/books", booksRouter);
app.use("/api/genre", genreRouter);
app.use("/api/notification", notificationRouter);
app.use(function (req, res, next) {
  res.send({ msg: "Error", error: "Page not found" });
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
