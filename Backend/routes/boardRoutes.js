const express = require("express");
const router = express.Router();

const {
  createBoardHandler,
  getBoardsHandler,
  deleteBoardHandler,
  updateBoardHandler
} = require("../controllers/boardController");

router.post("/", createBoardHandler);
router.get("/", getBoardsHandler);
router.delete("/:id", deleteBoardHandler);
router.put("/:id", updateBoardHandler);

module.exports = router;