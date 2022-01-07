const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const { data } = require("../data/flashcardData.json");
const { cards } = data;

router.get("/", (request, response) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  response.redirect(`/cards/${flashcardId}`);
});

router.get("/:id", (request, response) => {
  const { side } = request.query;
  const { id } = request.params;

  if (!side) {
    response.redirect(`/cards/${id}?side=question`);
  }

  const name = request.cookies.username;
  const text = cards[id][side];
  const { hint } = cards[id];
  // instead of:
  // prompt: cards[request.params.id].question,
  // hint: cards[request.params.id].hint
  const templateData = { id, text, name };

  if (side === "question") {
    templateData.hint = hint;
    templateData.sideToShow = "answer";
    templateData.sideToShowDisplay = "Show the answer";
  } else if (side === "answer") {
    templateData.sideToShow = "question";
    templateData.sideToShowDisplay = "Show the question";
  }

  response.render("card", templateData);
});

module.exports = router;
