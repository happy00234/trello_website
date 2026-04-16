const express = require("express");
const router = express.Router();

const {
  createCardHandler,
  getCardsHandler,
  updateCardHandler,
  deleteCardHandler,
  updateMembersHandler,
} = require("../controllers/cardController");

router.post("/", createCardHandler);
router.get("/:listId", getCardsHandler);
router.put("/:id", updateCardHandler);
router.delete("/:id", deleteCardHandler);
router.post("/members", updateMembersHandler);

module.exports = router;