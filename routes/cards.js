const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.render("card", {
    prompt: "What is the capital of Sweden?",
  });
});

module.exports = router;
