const express = require("express");
const router = express.Router();

// In-memory card storage
let cards = [];
let nextId = 1;

// GET all cards
router.get("/", (req, res) => {
  res.json(cards);
});

// GET a card by ID
router.get("/:id", (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }
  res.json(card);
});

// POST add a new card
router.post("/", (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ error: "Suit and value are required" });
  }

  const card = { id: nextId++, suit, value };
  cards.push(card);

  res.status(201).json({ message: "Card added", card });
});

// DELETE a card by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Card not found" });
  }

  const deletedCard = cards.splice(index, 1);
  res.json({ message: "Card deleted", card: deletedCard[0] });
});

module.exports = router;
