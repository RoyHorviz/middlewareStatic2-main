const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

/**
 * a logger to update the time, the request method and the url it requested
 */
function logger(req, res, next) {
  const currentDate = new Date().toISOString();
  console.log(`[${currentDate}] ${req.method} ${req.url}`);
  next();
}

/**
 *
 * @param {requestted url} req
 * @param {responde to the request if the user is admin or not} res
 * @param {exisitng the function} next
 * @returns acess denied if the user isnt admin
 */
function checkAdmin(req, res, next) {
  const user = req.query.user;
  if (user !== "admin") {
    return res.status(403).send("Access Denied");
  }
  next();
}

/***
 * using the logger we wrote above
 */
app.use(logger);

/**
 * dealing with general / request
 */
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

/**
 * getting the path of admin now we need to check if the user is admin or not
 */
app.get("/admin", checkAdmin, (req, res) => {
  res.send("Welcome to the administration page!");
});

/**
 * another path
 */
app.get("/public", (req, res) => {
  res.send("This is a public page.");
});

/**
 * port
 */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
