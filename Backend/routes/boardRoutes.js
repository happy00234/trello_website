const express = require("express");
const router = express.Router();

const {
  createBoardHandler,
  getBoardsHandler,
  deleteBoardHandler,
} = require("../controllers/boardController");

router.post("/", createBoardHandler);
router.get("/", getBoardsHandler);
router.delete("/:id", deleteBoardHandler);

module.exports = router;