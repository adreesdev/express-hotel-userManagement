var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var cors = require("cors");

var mongoose = require("mongoose");
var config = require("config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
var hotelsRouter = require("./routes/api/hotels");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	next(createError(404));

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

mongoose
	.connect(config.get("db"), { useNewUrlParser: true })
	.then(() => console.log("Connected to Mongodb"))
	.catch((error) => console.log(error.message));

module.exports = app;
