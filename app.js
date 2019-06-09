const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500 } = require("./errors/errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

//handle unsupported routes
app.all("/*", routeNotFound);

app.use(handle500);

// 404 error handling
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
