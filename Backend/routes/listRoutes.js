const express = require("express");
const router = express.Router();

const {
  createListHandler,
  getListsHandler,
} = require("../controllers/listController");

router.post("/", createListHandler);
router.get("/:boardId", getListsHandler);
router.delete("/:id", deleteListHandler);
router.put("/:id", updateListHandler);  

module.exports = router;