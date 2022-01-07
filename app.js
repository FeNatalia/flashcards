const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { request, response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "pug");

app.get("/", (request, response) => {
  const name = request.cookies.username;
  if (name) {
    response.render("index", { name });
  } else {
    response.redirect("/hello");
  }
});

app.get("/cards", (request, response) => {
  response.render("card", {
    prompt: "What is the capital of Sweden?",
  });
});

app.get("/hello", (request, response) => {
  const name = request.cookies.username;
  if (name) {
    response.redirect("/");
  } else {
    response.render("hello");
  }
});

app.post("/hello", (request, response) => {
  response.cookie("username", request.body.username);
  response.redirect("/");
  //response.json(request.body);
});

app.post("/goodbye", (request, response) => {
  response.clearCookie("username");
  response.redirect("/hello");
});

app.listen(3000, () => {
  console.log("The app is running on port 3000");
});
