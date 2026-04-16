const {
  createMember,
  addMemberToCard,
  getMembersByCard,
  removeMemberFromCard,
} = require("../models/memberModel");

const createMemberHandler = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const member = await createMember(name, avatar);
    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating member");
  }
};

const addMemberHandler = async (req, res) => {
  try {
    const { card_id, member_id } = req.body;
    const result = await addMemberToCard(card_id, member_id);
    res.json(result);
  } catch (err) {
    res.status(500).send("Error assigning member");
  }
};

const getMembersHandler = async (req, res) => {
  try {
    const { cardId } = req.params;
    const members = await getMembersByCard(cardId);
    res.json(members);
  } catch (err) {
    res.status(500).send("Error fetching members");
  }
};

const removeMemberHandler = async (req, res) => {
  try {
    const { card_id, member_id } = req.body;
    await removeMemberFromCard(card_id, member_id);
    res.json({ message: "Member removed" });
  } catch (err) {
    res.status(500).send("Error removing member");
  }
};

module.exports = {
  createMemberHandler,
  addMemberHandler,
  getMembersHandler,
  removeMemberHandler,
};