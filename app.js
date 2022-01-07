const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { request, response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

const mainRoutes = require("./routes");
const cardRoutes = require("./routes/cards");
app.use(mainRoutes);
app.use("/cards", cardRoutes);

app.use((request, response, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, request, response, next) => {
  response.locals.error = err;
  response.status(err.status);
  response.render("error");
});

app.listen(3000, () => {
  console.log("The app is running on port 3000");
});
