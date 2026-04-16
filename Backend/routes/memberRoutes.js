const express = require("express");
const router = express.Router();

const {
  createMemberHandler,
  addMemberHandler,
  getMembersHandler,
  removeMemberHandler,
} = require("../controllers/memberController");

router.post("/", createMemberHandler);
router.post("/assign", addMemberHandler);
router.get("/:cardId", getMembersHandler);
router.delete("/", removeMemberHandler);

module.exports = router;