const express = require("express");
const router = express.Router();

const {
  createCardHandler,
  getCardsHandler,
  updateCardHandler,
} = require("../controllers/cardController");

router.post("/", createCardHandler);
router.get("/:listId", getCardsHandler);
router.put("/:id", updateCardHandler);

module.exports = router;