const express = require("express");
const router = express.Router();

const {
  addItemHandler,
  getItemsHandler,
  toggleItemHandler,
} = require("../controllers/checklistController");

router.post("/", addItemHandler);
router.get("/:cardId", getItemsHandler);
router.put("/:id", toggleItemHandler);

module.exports = router;