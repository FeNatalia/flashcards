const express = require("express");

const app = express();

app.set("view engine", "pug");

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/cards", (request, response) => {
  response.render("card", {
    prompt: "What is the capital of Sweden?",
  });
});

app.listen(3000, () => {
  console.log("The app is running on port 3000");
});
